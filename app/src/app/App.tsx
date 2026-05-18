import { useState } from "react";
import { BottomNavigation } from "../components/BottomNavigation";
import { ThemeToggle } from "../components/ThemeToggle";
import { lessons, findLessonById } from "../data/lessons/fundamentals";
import { useProgress } from "../hooks/useProgress";
import { useTheme } from "../hooks/useTheme";
import { Glossary } from "../pages/Glossary";
import { Home } from "../pages/Home";
import { LessonPage } from "../pages/LessonPage";
import { Review } from "../pages/Review";
import { Settings } from "../pages/Settings";
import { Trail } from "../pages/Trail";

export type AppRoute = "home" | "trail" | "review" | "glossary" | "settings";

export const App = () => {
  const {
    progress,
    completeLesson,
    toggleFavorite,
    saveQuizScore,
    setLastLesson,
    setTheme,
    markReviewed,
    resetProgress,
  } = useProgress();
  const [currentRoute, setCurrentRoute] = useState<AppRoute>("home");
  const [selectedLessonId, setSelectedLessonId] = useState<string>();

  useTheme(progress.theme);

  const openLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setLastLesson(lessonId);
  };

  const closeLesson = () => {
    setSelectedLessonId(undefined);
    setCurrentRoute("trail");
  };

  const openRandomQuiz = () => {
    const lessonsWithQuiz = lessons.filter((lesson) => lesson.quiz.length > 0);
    const randomLesson =
      lessonsWithQuiz[Math.floor(Math.random() * lessonsWithQuiz.length)] ?? lessons[0];

    openLesson(randomLesson.id);
  };

  const renderPage = () => {
    const selectedLesson = selectedLessonId ? findLessonById(selectedLessonId) : undefined;

    if (selectedLesson) {
      return (
        <LessonPage
          lesson={selectedLesson}
          isCompleted={progress.completedLessons.includes(selectedLesson.id)}
          isFavorite={progress.favoriteLessons.includes(selectedLesson.id)}
          quizAttempts={progress.quizAttempts[selectedLesson.id]}
          quizScore={progress.quizScores[selectedLesson.id]}
          onBack={closeLesson}
          onComplete={() => completeLesson(selectedLesson.id)}
          onToggleFavorite={() => toggleFavorite(selectedLesson.id)}
          onSaveQuizScore={(score) => saveQuizScore(selectedLesson.id, score)}
        />
      );
    }

    switch (currentRoute) {
      case "trail":
        return (
          <Trail
            lessons={lessons}
            progress={progress}
            onOpenLesson={openLesson}
            onToggleFavorite={toggleFavorite}
          />
        );
      case "review":
        return (
          <Review
            lessons={lessons}
            progress={progress}
            onMarkReviewed={markReviewed}
            onOpenLesson={openLesson}
          />
        );
      case "glossary":
        return <Glossary />;
      case "settings":
        return (
          <Settings
            progress={progress}
            onThemeChange={setTheme}
            onResetProgress={resetProgress}
          />
        );
      case "home":
      default:
        return (
          <Home
            lessons={lessons}
            progress={progress}
            onOpenLesson={openLesson}
            onOpenRandomQuiz={openRandomQuiz}
            onOpenReview={() => setCurrentRoute("review")}
            onOpenTrail={() => setCurrentRoute("trail")}
          />
        );
    }
  };

  return (
    <div className="app-shell">
      <header className="top-bar">
        <button className="brand-button" type="button" onClick={() => setCurrentRoute("home")}>
          <span aria-hidden="true">C++</span>
          <strong>de Bolso</strong>
        </button>
        <ThemeToggle theme={progress.theme} onChange={setTheme} />
      </header>

      {renderPage()}

      {!selectedLessonId ? (
        <BottomNavigation route={currentRoute} onNavigate={setCurrentRoute} />
      ) : null}
    </div>
  );
};
