import { useCallback, useMemo, useState } from "react";
import type { UserProgress } from "../types/progress";
import type { SimulationReport } from "../types/study";

const STORAGE_KEY = "cpp-de-bolso:progress";
type ProgressUpdater = UserProgress | ((currentProgress: UserProgress) => UserProgress);

const defaultProgress: UserProgress = {
  completedLessons: [],
  favoriteLessons: [],
  quizScores: {},
  quizAttempts: {},
  theme: "dark",
  answeredQuestionIds: [],
  incorrectQuestionIds: [],
  simulationHistory: [],
  completedChallenges: [],
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

  const setLastChapter = useCallback(
    (chapterId?: string) => {
      setProgress((currentProgress) => ({ ...currentProgress, lastChapterId: chapterId }));
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

  const recordQuestionAnswer = useCallback((questionId: string, correct: boolean) => {
    setProgress((currentProgress) => ({
      ...currentProgress,
      answeredQuestionIds: currentProgress.answeredQuestionIds.includes(questionId)
        ? currentProgress.answeredQuestionIds
        : [...currentProgress.answeredQuestionIds, questionId],
      incorrectQuestionIds: correct
        ? currentProgress.incorrectQuestionIds.filter((id) => id !== questionId)
        : currentProgress.incorrectQuestionIds.includes(questionId)
          ? currentProgress.incorrectQuestionIds
          : [...currentProgress.incorrectQuestionIds, questionId],
    }));
  }, [setProgress]);

  const clearQuestionMistake = useCallback((questionId: string) => {
    setProgress((currentProgress) => ({
      ...currentProgress,
      incorrectQuestionIds: currentProgress.incorrectQuestionIds.filter((id) => id !== questionId),
    }));
  }, [setProgress]);

  const saveSimulation = useCallback((report: SimulationReport) => {
    setProgress((currentProgress) => ({
      ...currentProgress,
      simulationHistory: [{
        date: new Date().toISOString(),
        total: report.total,
        correct: report.correct,
        weakThemes: report.weakThemes,
        filters: report.filters,
      }, ...currentProgress.simulationHistory].slice(0, 8),
    }));
  }, [setProgress]);

  const toggleChallenge = useCallback((challengeId: string) => {
    setProgress((currentProgress) => ({
      ...currentProgress,
      completedChallenges: currentProgress.completedChallenges.includes(challengeId)
        ? currentProgress.completedChallenges.filter((id) => id !== challengeId)
        : [...currentProgress.completedChallenges, challengeId],
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
      setLastChapter,
      setTheme,
      markReviewed,
      recordQuestionAnswer,
      clearQuestionMistake,
      saveSimulation,
      toggleChallenge,
      resetProgress,
    }),
    [
      progress,
      completeLesson,
      toggleFavorite,
      saveQuizScore,
      setLastLesson,
      setLastChapter,
      setTheme,
      markReviewed,
      recordQuestionAnswer,
      clearQuestionMistake,
      saveSimulation,
      toggleChallenge,
      resetProgress,
    ],
  );
};
