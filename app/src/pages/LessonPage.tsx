import { CodeBlock } from "../components/CodeBlock";
import { Quiz } from "../components/Quiz";
import type { Lesson } from "../types/lesson";

type LessonPageProps = {
  lesson: Lesson;
  isCompleted: boolean;
  isFavorite: boolean;
  quizScore?: number;
  quizAttempts?: number;
  onBack: () => void;
  onComplete: () => void;
  onToggleFavorite: () => void;
  onSaveQuizScore: (score: number) => void;
};

export const LessonPage = ({
  lesson,
  isCompleted,
  isFavorite,
  quizScore,
  quizAttempts,
  onBack,
  onComplete,
  onToggleFavorite,
  onSaveQuizScore,
}: LessonPageProps) => (
  <main className="page lesson-page">
    <button className="text-button" type="button" onClick={onBack}>
      Voltar para trilha
    </button>

    <header className="page-header">
      <p className="quiet-label">{lesson.module}</p>
      <h1>{lesson.title}</h1>
      <p>{lesson.objective}</p>
      <div className="lesson-meta">
        <span>{lesson.estimatedMinutes} min</span>
        <span>{lesson.difficulty}</span>
        {lesson.chapterReference ? <span>{lesson.chapterReference}</span> : null}
      </div>
    </header>

    <div className="lesson-progress-card">
      <div>
        <span>Status</span>
        <strong>{isCompleted ? "Concluída" : "Em estudo"}</strong>
      </div>
      <div>
        <span>Quiz</span>
        <strong>{quizScore !== undefined ? `${quizScore}%` : "Pendente"}</strong>
      </div>
      <div>
        <span>Favorita</span>
        <strong>{isFavorite ? "Sim" : "Não"}</strong>
      </div>
    </div>

    <details className="lesson-section" open>
      <summary>Ideia central</summary>
      <div className="lesson-section__content">
        <p>{lesson.explanation.short}</p>
        <p>{lesson.explanation.detailed}</p>
      </div>
    </details>

    <details className="lesson-section" open>
      <summary>Exemplos de código</summary>
      <div className="lesson-section__content">
        {lesson.codeExamples.map((example) => (
          <article className="example-card" key={example.title}>
            <CodeBlock code={example.code} title={example.title} />
            <ol className="explanation-list">
              {example.explanation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </details>

    <details className="lesson-section">
      <summary>Macetes e erros comuns</summary>
      <div className="lesson-section__content split-list">
        <div>
          <h3>Macetes</h3>
          <ul>
            {lesson.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Erros comuns</h3>
          <ul>
            {lesson.commonMistakes.map((mistake) => (
              <li key={mistake}>{mistake}</li>
            ))}
          </ul>
        </div>
      </div>
    </details>

    <details className="lesson-section">
      <summary>Desafio: qual é a saída?</summary>
      <div className="lesson-section__content">
      {lesson.outputChallenges.map((challenge) => (
        <details className="challenge" key={challenge.question}>
          <summary>{challenge.question}</summary>
          <CodeBlock code={challenge.code} title="Desafio de saída" />
          <div className="answer-panel">
            <strong>Resposta: {challenge.answer}</strong>
            <p>{challenge.explanation}</p>
          </div>
        </details>
      ))}
      </div>
    </details>

    <Quiz
      attempts={quizAttempts}
      bestScore={quizScore}
      questions={lesson.quiz}
      onFinish={onSaveQuizScore}
    />

    <details className="lesson-section">
      <summary>Exercício prático</summary>
      <div className="lesson-section__content">
      {lesson.practiceExercises.map((exercise) => (
        <article className="practice-box" key={exercise.title}>
          <h3>{exercise.title}</h3>
          <p>{exercise.description}</p>
          <div className="tag-list">
            {exercise.expectedConcepts.map((concept) => (
              <span key={concept}>{concept}</span>
            ))}
          </div>
        </article>
      ))}
      </div>
    </details>

    <details className="lesson-section" open>
      <summary>Revisão rápida</summary>
      <div className="lesson-section__content">
      <ul className="review-list">
        {lesson.quickReview.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      </div>
    </details>

    <div className="sticky-actions">
      <button className="secondary-button" type="button" onClick={onToggleFavorite}>
        {isFavorite ? "Favorito salvo" : "Favoritar"}
      </button>
      <button className="primary-button" type="button" onClick={onComplete}>
        {isCompleted ? "Concluída" : "Marcar concluída"}
      </button>
    </div>
  </main>
);
