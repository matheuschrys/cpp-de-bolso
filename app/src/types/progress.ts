export type ThemePreference = "light" | "dark";

export type UserProgress = {
  completedLessons: string[];
  favoriteLessons: string[];
  quizScores: Record<string, number>;
  quizAttempts: Record<string, number>;
  lastLessonId?: string;
  lastReviewDate?: string;
  theme: ThemePreference;
};
