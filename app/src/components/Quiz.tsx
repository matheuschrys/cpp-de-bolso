import { useEffect, useRef } from "react";
import { useQuiz } from "../hooks/useQuiz";
import type { QuizQuestion } from "../types/lesson";

type QuizProps = {
  questions: QuizQuestion[];
  bestScore?: number;
  attempts?: number;
  onFinish: (score: number) => void;
};

const questionTypeLabel: Record<string, string> = {
  "multiple-choice": "Múltipla escolha",
  "true-false": "Verdadeiro ou falso",
  "complete-code": "Completar código",
  output: "Qual é a saída?",
  "find-error": "Encontrar o erro",
};

export const Quiz = ({ questions, bestScore, attempts = 0, onFinish }: QuizProps) => {
  const {
    currentIndex,
    currentQuestion,
    selectedAnswer,
    hasAnswered,
    correctCount,
    score,
    isFinished,
    answerQuestion,
    goNext,
    retry,
  } = useQuiz(questions);
  const savedScoreRef = useRef<number | null>(null);
  const questionType = currentQuestion?.type ?? "multiple-choice";

  useEffect(() => {
    if (isFinished && savedScoreRef.current !== score) {
      onFinish(score);
      savedScoreRef.current = score;
    }
  }, [isFinished, onFinish, score]);

  if (questions.length === 0 || !currentQuestion) {
    return null;
  }

  if (isFinished) {
    const understood = score >= 70;

    return (
      <section className="section-block quiz-panel" aria-labelledby="quiz-title">
        <div className="section-heading">
          <h2 id="quiz-title">Resultado do quiz</h2>
          <span>{score}%</span>
        </div>

        <div className={understood ? "quiz-result is-good" : "quiz-result"}>
          <strong>{understood ? "Lição bem compreendida" : "Vale revisar mais uma vez"}</strong>
          <p>
            Você acertou {correctCount} de {questions.length}. Melhor pontuação salva:{" "}
            {Math.max(bestScore ?? 0, score)}%.
          </p>
        </div>

        <div className="button-row">
          <button
            className="secondary-button"
            type="button"
            onClick={() => {
              savedScoreRef.current = null;
              retry();
            }}
          >
            Refazer quiz
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section-block quiz-panel" aria-labelledby="quiz-title">
      <div className="section-heading">
        <div>
          <h2 id="quiz-title">Quiz rápido</h2>
          <p>
            Pergunta {currentIndex + 1} de {questions.length}
            {attempts > 0 ? ` · ${attempts} tentativa${attempts > 1 ? "s" : ""}` : ""}
          </p>
        </div>
        {bestScore !== undefined ? <span>Recorde {bestScore}%</span> : null}
      </div>

      <article className="quiz-question">
        <span className="question-type">{questionTypeLabel[questionType]}</span>
        <h3>{currentQuestion.question}</h3>
        <div className="answer-list">
          {currentQuestion.options.map((option, optionIndex) => {
            const isSelected = selectedAnswer === optionIndex;
            const isCorrect = currentQuestion.correctAnswer === optionIndex;

            return (
              <button
                className={[
                  "answer-button",
                  isSelected ? "answer-button--selected" : "",
                  hasAnswered && isCorrect ? "answer-button--correct" : "",
                  hasAnswered && isSelected && !isCorrect ? "answer-button--wrong" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                disabled={hasAnswered}
                key={option}
                type="button"
                onClick={() => answerQuestion(optionIndex)}
              >
                {option}
              </button>
            );
          })}
        </div>

        {hasAnswered ? (
          <div
            className={
              selectedAnswer === currentQuestion.correctAnswer
                ? "feedback feedback--correct"
                : "feedback feedback--wrong"
            }
          >
            <strong>
              {selectedAnswer === currentQuestion.correctAnswer ? "Acertou" : "Quase"}
            </strong>
            <p>{currentQuestion.explanation}</p>
          </div>
        ) : null}
      </article>

      <button className="primary-button" type="button" disabled={!hasAnswered} onClick={goNext}>
        {currentIndex < questions.length - 1 ? "Próxima pergunta" : "Ver pontuação"}
      </button>
    </section>
  );
};
