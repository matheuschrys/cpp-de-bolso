export type ThemePreference = "light" | "dark";

export type UserProgress = {
  completedLessons: string[];
  favoriteLessons: string[];
  quizScores: Record<string, number>;
  quizAttempts: Record<string, number>;
  lastLessonId?: string;
  lastChapterId?: string;
  lastReviewDate?: string;
  theme: ThemePreference;
  answeredQuestionIds: string[];
  incorrectQuestionIds: string[];
  simulationHistory: SimulationHistoryEntry[];
  completedChallenges: string[];
};

export type SimulationHistoryEntry = {
  date: string;
  total: number;
  correct: number;
  weakThemes: string[];
};
