import { useCallback, useEffect, useMemo, useState } from "react";

export type FlashcardRating = "easy" | "medium" | "hard";

type FlashcardSchedule = {
  rating: FlashcardRating;
  intervalDays: number;
  nextReviewAt: string;
  reviewedAt: string;
  reviews: number;
};

type FlashcardProgress = {
  mastered: string[];
  revisit: string[];
  due: Record<string, string>;
  schedule: Record<string, FlashcardSchedule>;
};

const storageKey = "cpp-de-bolso:flashcards";
const flashcardsUpdatedEvent = "cpp-de-bolso:flashcards-updated";
const initial: FlashcardProgress = { mastered: [], revisit: [], due: {}, schedule: {} };

const nextInterval = {
  hard: () => 1,
  medium: (previous?: number) => previous ? Math.min(30, Math.ceil(previous * 1.7)) : 3,
  easy: (previous?: number) => previous ? Math.min(90, Math.ceil(previous * 2.5)) : 7,
} satisfies Record<FlashcardRating, (previous?: number) => number>;

const addDays = (days: number) => new Date(Date.now() + days * 86400000).toISOString();

const read = (): FlashcardProgress => {
  try {
    const value = localStorage.getItem(storageKey);
    return value ? { ...initial, ...JSON.parse(value) } : initial;
  } catch { return initial; }
};

export const useFlashcardProgress = () => {
  const [progress, setProgress] = useState<FlashcardProgress>(read);
  const update = useCallback((fn: (current: FlashcardProgress) => FlashcardProgress) => setProgress((current) => {
    const next = fn(current);
    localStorage.setItem(storageKey, JSON.stringify(next));
    window.dispatchEvent(new Event(flashcardsUpdatedEvent));
    return next;
  }), []);

  useEffect(() => {
    const syncProgress = () => setProgress(read());

    window.addEventListener("storage", syncProgress);
    window.addEventListener(flashcardsUpdatedEvent, syncProgress);

    return () => {
      window.removeEventListener("storage", syncProgress);
      window.removeEventListener(flashcardsUpdatedEvent, syncProgress);
    };
  }, []);

  const rateCard = useCallback((id: string, rating: FlashcardRating) => update((current) => {
    const intervalDays = nextInterval[rating](current.schedule[id]?.intervalDays);
    const nextReviewAt = addDays(intervalDays);
    const mastered = rating === "easy"
      ? current.mastered.includes(id) ? current.mastered : [...current.mastered, id]
      : current.mastered.filter((item) => item !== id);
    const revisit = rating === "hard"
      ? current.revisit.includes(id) ? current.revisit : [...current.revisit, id]
      : current.revisit.filter((item) => item !== id);

    return {
      ...current,
      mastered,
      revisit,
      due: { ...current.due, [id]: nextReviewAt },
      schedule: {
        ...current.schedule,
        [id]: {
          rating,
          intervalDays,
          nextReviewAt,
          reviewedAt: new Date().toISOString(),
          reviews: (current.schedule[id]?.reviews ?? 0) + 1,
        },
      },
    };
  }), [update]);

  const toggleMastered = useCallback((id: string) => update((current) => {
    const alreadyMastered = current.mastered.includes(id);
    if (alreadyMastered) {
      return { ...current, mastered: current.mastered.filter((item) => item !== id) };
    }

    const intervalDays = nextInterval.easy(current.schedule[id]?.intervalDays);
    const nextReviewAt = addDays(intervalDays);
    return {
      ...current,
      mastered: [...current.mastered, id],
      revisit: current.revisit.filter((item) => item !== id),
      due: { ...current.due, [id]: nextReviewAt },
      schedule: {
        ...current.schedule,
        [id]: {
          rating: "easy",
          intervalDays,
          nextReviewAt,
          reviewedAt: new Date().toISOString(),
          reviews: (current.schedule[id]?.reviews ?? 0) + 1,
        },
      },
    };
  }), [update]);

  const toggleRevisit = useCallback((id: string) => update((current) => {
    const alreadyScheduled = current.revisit.includes(id);
    const due = { ...current.due };
    if (alreadyScheduled) {
      delete due[id];
      return { ...current, revisit: current.revisit.filter((item) => item !== id), due };
    }

    const nextReviewAt = addDays(1);
    return {
      ...current,
      mastered: current.mastered.filter((item) => item !== id),
      revisit: [...current.revisit, id],
      due: { ...due, [id]: nextReviewAt },
      schedule: {
        ...current.schedule,
        [id]: {
          rating: "hard",
          intervalDays: 1,
          nextReviewAt,
          reviewedAt: new Date().toISOString(),
          reviews: (current.schedule[id]?.reviews ?? 0) + 1,
        },
      },
    };
  }), [update]);

  const nextReview = useMemo(() => Object.fromEntries(Object.entries(progress.due)
    .map(([id, date]) => [id, progress.schedule[id]?.nextReviewAt ?? date])), [progress.due, progress.schedule]);
  const dueToday = useMemo(() => Object.entries(nextReview)
    .filter(([, date]) => new Date(date) <= new Date())
    .map(([id]) => id), [nextReview]);

  return useMemo(() => ({ ...progress, dueToday, nextReview, rateCard, toggleMastered, toggleRevisit }), [progress, dueToday, nextReview, rateCard, toggleMastered, toggleRevisit]);
};
