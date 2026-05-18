import { useCallback, useMemo, useState } from "react";
import type { UserProgress } from "../types/progress";

const STORAGE_KEY = "cpp-de-bolso:progress";
type ProgressUpdater = UserProgress | ((currentProgress: UserProgress) => UserProgress);

const defaultProgress: UserProgress = {
  completedLessons: [],
  favoriteLessons: [],
  quizScores: {},
  quizAttempts: {},
  theme: "dark",
};

const loadProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return defaultProgress;
    }

    return { ...defaultProgress, ...JSON.parse(stored) };
  } catch {
    return defaultProgress;
  }
};

export const useProgress = () => {
  const [progress, setProgressState] = useState<UserProgress>(loadProgress);

  const setProgress = useCallback((updater: ProgressUpdater) => {
    setProgressState((currentProgress) => {
      const nextProgress =
        typeof updater === "function" ? updater(currentProgress) : updater;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProgress));
      return nextProgress;
    });
  }, []);

  const completeLesson = useCallback(
    (lessonId: string) => {
      setProgress((currentProgress) => {
        const completedLessons = currentProgress.completedLessons.includes(lessonId)
          ? currentProgress.completedLessons
          : [...currentProgress.completedLessons, lessonId];

        return {
          ...currentProgress,
          completedLessons,
          lastLessonId: lessonId,
        };
      });
    },
    [setProgress],
  );

  const toggleFavorite = useCallback(
    (lessonId: string) => {
      setProgress((currentProgress) => {
        const favoriteLessons = currentProgress.favoriteLessons.includes(lessonId)
          ? currentProgress.favoriteLessons.filter((id) => id !== lessonId)
          : [...currentProgress.favoriteLessons, lessonId];

        return { ...currentProgress, favoriteLessons };
      });
    },
    [setProgress],
  );

  const saveQuizScore = useCallback(
    (lessonId: string, score: number) => {
      setProgress((currentProgress) => ({
        ...currentProgress,
        quizScores: {
          ...currentProgress.quizScores,
          [lessonId]: Math.max(currentProgress.quizScores[lessonId] ?? 0, score),
        },
        quizAttempts: {
          ...currentProgress.quizAttempts,
          [lessonId]: (currentProgress.quizAttempts[lessonId] ?? 0) + 1,
        },
      }));
    },
    [setProgress],
  );

  const setLastLesson = useCallback(
    (lessonId?: string) => {
      setProgress((currentProgress) => ({ ...currentProgress, lastLessonId: lessonId }));
    },
    [setProgress],
  );

  const setTheme = useCallback(
    (theme: UserProgress["theme"]) => {
      setProgress((currentProgress) => ({ ...currentProgress, theme }));
    },
    [setProgress],
  );

  const markReviewed = useCallback(() => {
    setProgress((currentProgress) => ({
      ...currentProgress,
      lastReviewDate: new Date().toISOString(),
    }));
  }, [setProgress]);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
  }, [setProgress]);

  return useMemo(
    () => ({
      progress,
      completeLesson,
      toggleFavorite,
      saveQuizScore,
      setLastLesson,
      setTheme,
      markReviewed,
      resetProgress,
    }),
    [
      progress,
      completeLesson,
      toggleFavorite,
      saveQuizScore,
      setLastLesson,
      setTheme,
      markReviewed,
      resetProgress,
    ],
  );
};
