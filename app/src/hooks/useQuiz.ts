import { useMemo, useState } from "react";
import type { QuizQuestion } from "../types/lesson";

export const useQuiz = (questions: QuizQuestion[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentIndex];
  const hasAnswered = selectedAnswer !== undefined;
  const correctCount = useMemo(
    () =>
      questions.filter((question, index) => answers[index] === question.correctAnswer)
        .length,
    [answers, questions],
  );
  const score =
    questions.length === 0 ? 0 : Math.round((correctCount / questions.length) * 100);

  const answerQuestion = (answerIndex: number) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentIndex]: answerIndex,
    }));
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((index) => index + 1);
      return;
    }

    setIsFinished(true);
  };

  const retry = () => {
    setCurrentIndex(0);
    setAnswers({});
    setIsFinished(false);
  };

  return {
    currentIndex,
    currentQuestion,
    selectedAnswer,
    hasAnswered,
    answers,
    correctCount,
    score,
    isFinished,
    answerQuestion,
    goNext,
    retry,
  };
};
