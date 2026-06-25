export type ChapterId = "17" | "18" | "20" | "21" | "listas" | "pilhas" | "filas" | "big-o" | "ordenacao" | "busca" | "ponteiros";

export type Difficulty = "Média" | "Difícil" | "Muito difícil";

export type Choice = {
  label: "A" | "B" | "C" | "D" | "E";
  text: string;
};

export type StudyQuestion = {
  id: string;
  chapter: ChapterId;
  theme: string;
  difficulty: Difficulty;
  prompt: string;
  code?: string;
  options: Choice[];
  correctAnswer: Choice["label"];
  explanation: string;
  wrongAnswerNotes?: Partial<Record<Choice["label"], string>>;
  tags: string[];
  kind?: "conceito" | "interpretação de código" | "saída do programa" | "complexidade" | "erro de compilação" | "estado final" | "implementação";
  practical?: boolean;
};

export type QuestionKind = NonNullable<StudyQuestion["kind"]>;

export type TopicBlock = {
  title: string;
  what: string;
  purpose: string;
  analogy?: string;
  trap: string;
  shortcut: string;
  code: string;
};

export type StudyChapter = {
  id: ChapterId;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  themes: string[];
  quickReview: string[];
  topics: TopicBlock[];
};

export type SimulationReport = {
  total: number;
  correct: number;
  incorrectIds: string[];
  weakThemes: string[];
  filters?: {
    chapters: ChapterId[];
    difficulty?: Difficulty;
    kind?: QuestionKind;
  };
  breakdown?: {
    byTheme: { label: string; total: number; correct: number }[];
    byDifficulty: { label: Difficulty; total: number; correct: number }[];
    byKind: { label: QuestionKind; total: number; correct: number }[];
  };
};

export type Flashcard = {
  id: string;
  chapter: ChapterId;
  theme: string;
  front: string;
  back: string;
  hint?: string;
  code?: string;
  tags: string[];
};
