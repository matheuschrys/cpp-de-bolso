import { useMemo, useState } from "react";
import { LessonCard } from "../components/LessonCard";
import type { Lesson } from "../types/lesson";
import type { UserProgress } from "../types/progress";

type TrailProps = {
  lessons: Lesson[];
  progress: UserProgress;
  onOpenLesson: (lessonId: string) => void;
  onToggleFavorite: (lessonId: string) => void;
};

const ALL_MODULES = "Todos";

export const Trail = ({ lessons, progress, onOpenLesson, onToggleFavorite }: TrailProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModule, setSelectedModule] = useState(ALL_MODULES);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const completedLessons = useMemo(
    () => new Set(progress.completedLessons),
    [progress.completedLessons],
  );
  const favoriteLessons = useMemo(
    () => new Set(progress.favoriteLessons),
    [progress.favoriteLessons],
  );
  const modules = useMemo(
    () => [ALL_MODULES, ...Array.from(new Set(lessons.map((lesson) => lesson.module)))],
    [lessons],
  );
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredLessons = lessons.filter((lesson) => {
    const matchesModule =
      selectedModule === ALL_MODULES || lesson.module === selectedModule;
    const matchesFavorite = !showOnlyFavorites || favoriteLessons.has(lesson.id);
    const searchableText = [
      lesson.title,
      lesson.module,
      lesson.objective,
      lesson.chapterReference,
      ...lesson.tags,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const matchesSearch =
      normalizedSearch.length === 0 || searchableText.includes(normalizedSearch);

    return matchesModule && matchesFavorite && matchesSearch;
  });
  const groupedLessons = modules
    .filter((module) => module !== ALL_MODULES)
    .map((module) => ({
      module,
      lessons: filteredLessons.filter((lesson) => lesson.module === module),
    }))
    .filter((group) => group.lessons.length > 0);

  return (
    <main className="page">
      <header className="page-header">
        <p className="quiet-label">Trilha inicial</p>
        <h1>Fundamentos de C++</h1>
        <p>Comece pequeno, revise sempre e avance quando o exemplo fizer sentido.</p>
      </header>

      <section className="trail-tools" aria-label="Filtros da trilha">
        <label className="search-field">
          <span>Buscar lição</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Ex.: ponteiro, for, string"
          />
        </label>

        <div className="filter-strip" aria-label="Filtrar por módulo">
          {modules.map((module) => (
            <button
              className={selectedModule === module ? "filter-chip is-active" : "filter-chip"}
              key={module}
              type="button"
              onClick={() => setSelectedModule(module)}
            >
              {module}
            </button>
          ))}
        </div>

        <div className="trail-tools__footer">
          <button
            className={showOnlyFavorites ? "filter-chip is-active" : "filter-chip"}
            type="button"
            onClick={() => setShowOnlyFavorites((currentValue) => !currentValue)}
          >
            Favoritas
          </button>
          <span>
            {filteredLessons.length} de {lessons.length} lições
          </span>
        </div>
      </section>

      {groupedLessons.length > 0 ? (
        <div className="module-list">
          {groupedLessons.map((group) => (
            <section className="module-group" key={group.module}>
              <header className="module-heading">
                <div>
                  <span>{group.module}</span>
                  <h2>{group.lessons.length} lições</h2>
                </div>
                <strong>
                  {
                    group.lessons.filter((lesson) => completedLessons.has(lesson.id))
                      .length
                  }
                  /{group.lessons.length}
                </strong>
              </header>

              <div className="lesson-list">
                {group.lessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    isCompleted={completedLessons.has(lesson.id)}
                    isFavorite={favoriteLessons.has(lesson.id)}
                    quizScore={progress.quizScores[lesson.id]}
                    onOpen={() => onOpenLesson(lesson.id)}
                    onToggleFavorite={() => onToggleFavorite(lesson.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <section className="empty-state">
          <h2>Nenhuma lição encontrada</h2>
          <p>Limpe a busca ou troque o filtro de módulo para voltar à trilha.</p>
          <button
            className="secondary-button"
            type="button"
            onClick={() => {
              setSearchTerm("");
              setSelectedModule(ALL_MODULES);
              setShowOnlyFavorites(false);
            }}
          >
            Limpar filtros
          </button>
        </section>
      )}
    </main>
  );
};
