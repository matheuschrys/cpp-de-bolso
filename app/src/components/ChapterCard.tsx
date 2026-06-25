import type { StudyChapter } from "../types/study";
import { chapterIcon } from "../data/chapterIcons";

type Props = {
  chapter: StudyChapter;
  questionCount: number;
  progress?: { answeredQuestions: number; totalQuestions: number; completedChallenges: number; totalChallenges: number };
  onOpen: () => void;
};

const progressPercent = (done: number, total: number) => total ? Math.min(100, Math.round((done / total) * 100)) : 0;

export const ChapterCard = ({ chapter, questionCount, progress, onOpen }: Props) => (
  <button className="chapter-card" type="button" onClick={onOpen}>
    <span className="chapter-card__number" aria-hidden="true">{chapterIcon(chapter.id)}</span>
    <span className="chapter-card__content">
      <strong>{chapter.shortTitle}</strong>
      <small>{chapter.subtitle}</small>
      {progress ? <span className="chapter-card__progress" aria-label={`Progresso em ${chapter.shortTitle}`}>
        <i><b style={{ width: `${progressPercent(progress.answeredQuestions, progress.totalQuestions)}%` }} /></i>
        <small>{progress.answeredQuestions}/{progress.totalQuestions} questões · {progress.completedChallenges}/{progress.totalChallenges} desafios</small>
      </span> : null}
    </span>
    <span className="chapter-card__count">{questionCount} questões</span>
    <span className="chapter-card__arrow" aria-hidden="true">→</span>
  </button>
);
