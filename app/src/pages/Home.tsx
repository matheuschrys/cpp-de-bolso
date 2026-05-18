import { ProgressBar } from "../components/ProgressBar";
import type { Lesson } from "../types/lesson";
import type { UserProgress } from "../types/progress";

type HomeProps = {
  lessons: Lesson[];
  progress: UserProgress;
  onOpenLesson: (lessonId: string) => void;
  onOpenTrail: () => void;
  onOpenReview: () => void;
  onOpenRandomQuiz: () => void;
};

export const Home = ({
  lessons,
  progress,
  onOpenLesson,
  onOpenTrail,
  onOpenReview,
  onOpenRandomQuiz,
}: HomeProps) => {
  const completedCount = progress.completedLessons.length;
  const progressValue = lessons.length === 0 ? 0 : (completedCount / lessons.length) * 100;
  const lastLesson =
    lessons.find((lesson) => lesson.id === progress.lastLessonId) ?? lessons[0];
  const nextLesson =
    lessons.find((lesson) => !progress.completedLessons.includes(lesson.id)) ?? lessons[0];
  const modules = Array.from(new Set(lessons.map((lesson) => lesson.module)));
  const favoriteLessons = lessons.filter((lesson) =>
    progress.favoriteLessons.includes(lesson.id),
  );
  const difficultLessons = lessons
    .filter((lesson) => (progress.quizScores[lesson.id] ?? 100) < 70)
    .slice(0, 3);
  const focusLessons = favoriteLessons.length > 0 ? favoriteLessons.slice(0, 3) : difficultLessons;

  return (
    <main className="page page--home">
      <section className="hero-panel" aria-labelledby="home-title">
        <div>
          <p className="quiet-label">Bom estudo</p>
          <h1 id="home-title">Estudo curto, código claro, progresso salvo.</h1>
          <p>
            Uma trilha mobile-first para revisar fundamentos de C++ com exemplos,
            quizzes e desafios de saída.
          </p>
        </div>
        <button
          className="primary-button primary-button--wide"
          type="button"
          onClick={() => onOpenLesson(progress.lastLessonId ?? nextLesson.id)}
        >
          Continuar estudando
        </button>
      </section>

      <section className="study-dashboard" aria-label="Painel de estudos">
        <ProgressBar value={progressValue} label="Progresso geral da trilha" />
        <div className="stats-grid">
          <div>
            <span>Concluídas</span>
            <strong>
              {completedCount}/{lessons.length}
            </strong>
          </div>
          <div>
            <span>Favoritas</span>
            <strong>{progress.favoriteLessons.length}</strong>
          </div>
          <div>
            <span>Última revisão</span>
            <strong>
              {progress.lastReviewDate
                ? new Date(progress.lastReviewDate).toLocaleDateString("pt-BR")
                : "Ainda não"}
            </strong>
          </div>
        </div>
      </section>

      <section className="quick-grid" aria-label="Ações rápidas">
        <button className="action-panel action-panel--featured" type="button" onClick={() => onOpenLesson(nextLesson.id)}>
          <span>Próxima lição</span>
          <strong>{nextLesson.title}</strong>
        </button>
        <button className="action-panel" type="button" onClick={() => onOpenLesson(lastLesson.id)}>
          <span>Continuar de onde parou</span>
          <strong>{lastLesson.title}</strong>
        </button>
        <button className="action-panel" type="button" onClick={onOpenReview}>
          <span>Revisão rápida</span>
          <strong>Antes da prova</strong>
        </button>
        <button className="action-panel" type="button" onClick={onOpenRandomQuiz}>
          <span>Quiz aleatório</span>
          <strong>Treinar agora</strong>
        </button>
        <button className="action-panel" type="button" onClick={onOpenTrail}>
          <span>Trilha</span>
          <strong>{lessons.length} lições iniciais</strong>
        </button>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>Módulos principais</h2>
          <span>{modules.length}</span>
        </div>
        <div className="module-pill-grid">
          {modules.map((module) => (
            <button className="module-pill" key={module} type="button" onClick={onOpenTrail}>
              <span>{module}</span>
              <strong>{lessons.filter((lesson) => lesson.module === module).length}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>{favoriteLessons.length > 0 ? "Favoritas" : "Pontos para reforçar"}</h2>
          <span>{focusLessons.length}</span>
        </div>
        {focusLessons.length > 0 ? (
          <div className="focus-list">
            {focusLessons.map((lesson) => (
              <button className="focus-item" key={lesson.id} type="button" onClick={() => onOpenLesson(lesson.id)}>
                <span>{lesson.module}</span>
                <strong>{lesson.title}</strong>
              </button>
            ))}
          </div>
        ) : (
          <p className="muted-text">Favorite lições ou faça quizzes para montar sua lista de revisão.</p>
        )}
      </section>
    </main>
  );
};
