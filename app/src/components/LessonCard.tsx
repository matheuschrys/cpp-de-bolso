import type { Lesson } from "../types/lesson";

type LessonCardProps = {
  lesson: Lesson;
  isCompleted: boolean;
  isFavorite: boolean;
  quizScore?: number;
  onOpen: () => void;
  onToggleFavorite: () => void;
};

export const LessonCard = ({
  lesson,
  isCompleted,
  isFavorite,
  quizScore,
  onOpen,
  onToggleFavorite,
}: LessonCardProps) => (
  <article className="lesson-card">
    <div className="lesson-card__topline">
      <span>{lesson.module}</span>
      <span>
        {lesson.estimatedMinutes} min · {lesson.difficulty}
      </span>
    </div>

    <h3>{lesson.title}</h3>
    <p>{lesson.objective}</p>

    {lesson.chapterReference ? (
      <span className="lesson-reference">{lesson.chapterReference}</span>
    ) : null}

    <div className="tag-list" aria-label="Tags da lição">
      {lesson.tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>

    <div className="lesson-card__footer">
      <span className={isCompleted ? "status status--done" : "status"}>
        {isCompleted ? "Concluída" : "Pendente"}
      </span>
      {quizScore !== undefined ? (
        <span className={quizScore >= 70 ? "status status--done" : "status status--warn"}>
          {quizScore}% quiz
        </span>
      ) : (
        <span className="status">Quiz pendente</span>
      )}
    </div>

    <div className="button-row">
      <button className="primary-button" type="button" onClick={onOpen}>
        Estudar
      </button>
      <button
        className="icon-button"
        type="button"
        onClick={onToggleFavorite}
        aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        <StarIcon filled={isFavorite} />
      </button>
    </div>
  </article>
);

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="button-icon">
    <path
      className={filled ? "icon-filled" : ""}
      d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"
    />
  </svg>
);
