import { useCallback, useEffect, useMemo, useState } from "react";

type FlashcardProgress = { mastered: string[]; revisit: string[]; due: Record<string, string> };
const storageKey = "cpp-de-bolso:flashcards";
const flashcardsUpdatedEvent = "cpp-de-bolso:flashcards-updated";
const initial: FlashcardProgress = { mastered: [], revisit: [], due: {} };

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

  const toggleMastered = useCallback((id: string) => update((current) => ({
    mastered: current.mastered.includes(id) ? current.mastered.filter((item) => item !== id) : [...current.mastered, id],
    revisit: current.revisit.filter((item) => item !== id),
    due: Object.fromEntries(Object.entries(current.due).filter(([key]) => key !== id)),
  })), [update]);
  const toggleRevisit = useCallback((id: string) => update((current) => {
    const alreadyScheduled = current.revisit.includes(id);
    const due = { ...current.due };
    if (alreadyScheduled) delete due[id]; else due[id] = new Date(Date.now() + 86400000).toISOString();
    return { ...current, revisit: alreadyScheduled ? current.revisit.filter((item) => item !== id) : [...current.revisit, id], due };
  }), [update]);
  const dueToday = useMemo(() => Object.entries(progress.due)
    .filter(([, date]) => new Date(date) <= new Date())
    .map(([id]) => id), [progress.due]);

  return useMemo(() => ({ ...progress, dueToday, toggleMastered, toggleRevisit }), [progress, dueToday, toggleMastered, toggleRevisit]);
};
