import { useState } from "react";
import { CodeBlock } from "../components/CodeBlock";
import type { Lesson } from "../types/lesson";
import type { UserProgress } from "../types/progress";

type ReviewProps = {
  lessons: Lesson[];
  progress: UserProgress;
  onMarkReviewed: () => void;
  onOpenLesson: (lessonId: string) => void;
};

export const Review = ({ lessons, progress, onMarkReviewed, onOpenLesson }: ReviewProps) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>();
  const favoriteLessons = lessons.filter((lesson) =>
    progress.favoriteLessons.includes(lesson.id),
  );
  const reviewLessons = favoriteLessons.length > 0 ? favoriteLessons : lessons;
  const selectedLesson =
    lessons.find((lesson) => lesson.id === selectedLessonId) ??
    reviewLessons[0] ??
    lessons[0];

  const pickRandomLesson = () => {
    const randomLesson = reviewLessons[Math.floor(Math.random() * reviewLessons.length)];

    if (randomLesson) {
      setSelectedLessonId(randomLesson.id);
      onMarkReviewed();
    }
  };

  return (
    <main className="page">
      <header className="page-header">
        <p className="quiet-label">Revisão rápida</p>
        <h1>Antes da prova, vá no essencial.</h1>
        <p>Use estes cartões para recuperar o ponto principal de cada lição.</p>
      </header>

      <section className="review-highlight">
        <div>
          <span>{selectedLesson.module}</span>
          <h2>{selectedLesson.title}</h2>
          <p>{selectedLesson.explanation.short}</p>
        </div>
        {selectedLesson.codeExamples[0] ? (
          <CodeBlock
            compact
            code={selectedLesson.codeExamples[0].code}
            title="Exemplo mínimo"
          />
        ) : null}
        <div className="button-row">
          <button className="secondary-button" type="button" onClick={pickRandomLesson}>
            Sortear assunto
          </button>
          <button className="primary-button" type="button" onClick={() => onOpenLesson(selectedLesson.id)}>
            Iniciar quiz rápido
          </button>
        </div>
      </section>

      <div className="review-stack">
        {reviewLessons.map((lesson) => (
          <article className="review-card" key={lesson.id}>
            <div>
              <span>{lesson.module}</span>
              <h2>{lesson.title}</h2>
            </div>
            <ul>
              {lesson.quickReview.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <details className="mini-details">
              <summary>Erros comuns</summary>
              <ul>
                {lesson.commonMistakes.slice(0, 2).map((mistake) => (
                  <li key={mistake}>{mistake}</li>
                ))}
              </ul>
            </details>
            <button className="text-button" type="button" onClick={() => onOpenLesson(lesson.id)}>
              Abrir lição
            </button>
          </article>
        ))}
      </div>
    </main>
  );
};
