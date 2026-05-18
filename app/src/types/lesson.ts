export type Difficulty = "iniciante" | "intermediario" | "avancado";

export type CodeExample = {
  title: string;
  code: string;
  explanation: string[];
};

export type QuizQuestionType =
  | "multiple-choice"
  | "true-false"
  | "complete-code"
  | "output"
  | "find-error";

export type QuizQuestion = {
  type?: QuizQuestionType;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export type OutputChallenge = {
  question: string;
  code: string;
  answer: string;
  explanation: string;
};

export type PracticeExercise = {
  title: string;
  description: string;
  starterCode?: string;
  expectedConcepts: string[];
};

export type Lesson = {
  id: string;
  title: string;
  module: string;
  chapterReference?: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  tags: string[];
  objective: string;
  explanation: {
    short: string;
    detailed: string;
  };
  codeExamples: CodeExample[];
  tips: string[];
  commonMistakes: string[];
  quiz: QuizQuestion[];
  outputChallenges: OutputChallenge[];
  practiceExercises: PracticeExercise[];
  quickReview: string[];
};
