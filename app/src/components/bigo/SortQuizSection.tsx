import { useMemo, useState } from "react";
import { sortingQuestionSeeds } from "../../data/sortingQuestions";
import { StudyQuestionCard } from "../StudyQuestionCard";
import type { StudyQuestion } from "../../types/study";

const labels = ["A", "B", "C", "D", "E"] as const;

const toQuestion = (seedIndex: number): StudyQuestion => {
  const seed = sortingQuestionSeeds[seedIndex];
  const correctIndex = seedIndex % labels.length;
  const choices = [seed.answer, ...seed.distractors].map((text, index) => ({ text, position: (index + correctIndex) % labels.length }));
  const options = choices.sort((a, b) => a.position - b.position).map(({ text }, index) => ({ label: labels[index], text }));
  return {
    ...seed,
    id: `local-sort-${seedIndex}`,
    options,
    correctAnswer: labels[correctIndex],
    kind: seed.kind ?? "interpretação de código",
  };
};

export const SortQuizSection = () => {
  const identifyQuestions = useMemo(() => sortingQuestionSeeds
    .map((seed, index) => ({ seed, index }))
    .filter(({ seed }) => seed.tags.includes("identifique o algoritmo"))
    .slice(0, 3)
    .map(({ index }) => toQuestion(index)), []);
  const finalStateQuestions = useMemo(() => sortingQuestionSeeds
    .map((seed, index) => ({ seed, index }))
    .filter(({ seed }) => seed.kind === "estado final")
    .slice(0, 3)
    .map(({ index }) => toQuestion(index)), []);
  const [mode, setMode] = useState<"identify" | "state">("identify");

  const questions = mode === "identify" ? identifyQuestions : finalStateQuestions;

  return (
    <section className="sort-quiz-section" aria-label="Mini desafios de Big O e sort">
      <div className="bigo-section-heading">
        <div>
          <h2>{mode === "identify" ? "Modo Identifique o Sort" : "Modo Estado final"}</h2>
          <p>Treino rápido com o mesmo estilo de alternativas A, B, C, D e E usado no banco geral.</p>
        </div>
        <div className="complexity-tabs">
          <button type="button" className={mode === "identify" ? "is-active" : ""} onClick={() => setMode("identify")}>Identificar sort</button>
          <button type="button" className={mode === "state" ? "is-active" : ""} onClick={() => setMode("state")}>Estado final</button>
        </div>
      </div>
      <div className="quiz-mini-grid">
        {questions.map((question, index) => <StudyQuestionCard key={question.id} question={question} position={index + 1} />)}
      </div>
    </section>
  );
};
