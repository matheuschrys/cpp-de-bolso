import { useMemo, useState } from "react";
import { CodeBlock } from "./CodeBlock";
import type { StudyQuestion } from "../types/study";

type Props = {
  question: StudyQuestion;
  position?: number;
  onAnswered?: (question: StudyQuestion, isCorrect: boolean) => void;
  onDismiss?: (question: StudyQuestion) => void;
  shuffleOptions?: boolean;
};

const optionLabels = ["A", "B", "C", "D", "E"] as const;

const shuffle = <T,>(items: T[]) => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled;
};

export const StudyQuestionCard = ({ question, position, onAnswered, onDismiss, shuffleOptions = false }: Props) => {
  const [selected, setSelected] = useState<string>();
  const options = useMemo(() => {
    const ordered = shuffleOptions ? shuffle(question.options) : question.options;
    return ordered.map((option, index) => ({ ...option, originalLabel: option.label, label: shuffleOptions ? optionLabels[index] : option.label }));
  }, [question, shuffleOptions]);
  const correctAnswer = options.find((option) => option.originalLabel === question.correctAnswer)?.label ?? question.correctAnswer;
  const selectedOriginalLabel = options.find((option) => option.label === selected)?.originalLabel ?? selected;

  const answer = (label: string) => {
    if (selected) return;
    setSelected(label);
    onAnswered?.(question, label === correctAnswer);
  };

  const isAnswered = Boolean(selected);

  return (
    <article className="study-question">
      <header className="question-meta">
        <span>{position ? `Questão ${position}` : `Cap. ${question.chapter}`}</span>
        <span>{question.theme}</span>
        <span className={`difficulty difficulty--${question.difficulty.toLowerCase().replace(" ", "-")}`}>{question.difficulty}</span>
        {onDismiss ? <button type="button" className="question-dismiss" onClick={() => onDismiss(question)}>Remover da revisão</button> : null}
      </header>
      <h3>{question.prompt}</h3>
      {question.code ? <CodeBlock code={question.code} title="Código para interpretar" compact /> : null}
      <div className="question-options" role="group" aria-label="Alternativas">
        {options.map((option) => {
          const state = !isAnswered
            ? ""
            : option.label === correctAnswer
              ? " is-correct"
              : option.label === selected
                ? " is-wrong"
                : "";
          return (
            <button key={option.label} type="button" className={`question-option${state}`} onClick={() => answer(option.label)} disabled={isAnswered}>
              <b>{option.label}</b><span>{option.text}</span>
            </button>
          );
        })}
      </div>
      {isAnswered ? (
        <div className={`answer-feedback ${selected === correctAnswer ? "is-correct" : "is-wrong"}`}>
          <strong>{selected === correctAnswer ? "Acertou. Boa leitura de prova." : `Gabarito: ${correctAnswer}.`}</strong>
          <p>{question.explanation}</p>
          {selected !== correctAnswer && selectedOriginalLabel && question.wrongAnswerNotes?.[selectedOriginalLabel as "A"] ? <p>{question.wrongAnswerNotes[selectedOriginalLabel as "A"]}</p> : null}
        </div>
      ) : null}
    </article>
  );
};
