import { useMemo } from "react";
import { BottomNavigation } from "../components/BottomNavigation";
import { ThemeToggle } from "../components/ThemeToggle";
import { getChapter, studyChapters } from "../data/studyChapters";
import { questionBank } from "../data/questionBank";
import { chapterIcon } from "../data/chapterIcons";
import { studyChallenges } from "../data/studyChallenges";
import { useFlashcardProgress } from "../hooks/useFlashcardProgress";
import { useProgress } from "../hooks/useProgress";
import { useStudyLocation } from "../hooks/useStudyLocation";
import { useTheme } from "../hooks/useTheme";
import { AlgorithmIdentifyPage } from "../pages/AlgorithmIdentifyPage";
import { ChapterStudyPage } from "../pages/ChapterStudyPage";
import { ComplexityPage } from "../pages/ComplexityPage";
import { FlashcardsPage } from "../pages/FlashcardsPage";
import { PracticeChallengePage } from "../pages/PracticeChallengePage";
import { QuestionBankPage } from "../pages/QuestionBankPage";
import { QuickReviewPage } from "../pages/QuickReviewPage";
import { SimulationPage } from "../pages/SimulationPage";
import { StudyHome } from "../pages/StudyHome";
import { StudyMorePage } from "../pages/StudyMorePage";
import { StructureVisualizerPage } from "../pages/StructureVisualizerPage";
import type { AppRoute } from "./routes";
import type { StudyQuestion } from "../types/study";

const navigationItems: { route: AppRoute; label: string }[] = [
  { route: "home", label: "Início" },
  { route: "chapters", label: "Conteúdos" },
  { route: "questions", label: "Questões" },
  { route: "simulation", label: "Simulado" },
  { route: "complexity", label: "Big O" },
  { route: "review", label: "Revisão" },
  { route: "flashcards", label: "Cards" },
];

const questionThemeById = new Map(questionBank.map((question) => [question.id, question.theme]));
const questionChapterById = new Map(questionBank.map((question) => [question.id, question.chapter]));
const questionCountByChapter = questionBank.reduce<Record<string, number>>((all, question) => {
  all[question.chapter] = (all[question.chapter] ?? 0) + 1;
  return all;
}, {});

export const App = () => {
  const { progress, setTheme, setLastChapter, markReviewed, recordQuestionAnswer, clearQuestionMistake, saveSimulation, toggleChallenge } = useProgress();
  const { dueToday } = useFlashcardProgress();
  const { location, navigate } = useStudyLocation();
  useTheme(progress.theme);

  const route = location.route;
  const chapter = location.chapterId ? getChapter(location.chapterId) : undefined;
  const openChapter = (id: string) => { setLastChapter(id); navigate({ route: "chapters", chapterId: id }); };
  const go = (next: AppRoute) => navigate({ route: next });
  const recordAnswer = (question: StudyQuestion, correct: boolean) => recordQuestionAnswer(question.id, correct);
  const removeMistake = (question: StudyQuestion) => clearQuestionMistake(question.id);
  const answeredByChapter = useMemo(() => progress.answeredQuestionIds.reduce<Record<string, number>>((all, id) => {
    const questionChapter = questionChapterById.get(id);
    if (questionChapter) {
      all[questionChapter] = (all[questionChapter] ?? 0) + 1;
    }
    return all;
  }, {}), [progress.answeredQuestionIds]);
  const challengeProgressByChapter = useMemo(() => studyChapters.reduce<Record<string, { done: number; total: number }>>((all, item) => {
    const total = studyChallenges[item.id].length;
    const done = progress.completedChallenges.filter((id) => id.startsWith(item.id + "-")).length;
    all[item.id] = { done, total };
    return all;
  }, {}), [progress.completedChallenges]);
  const chapterStats = useMemo(() => studyChapters.map((item) => {
    const totalQuestions = questionCountByChapter[item.id] ?? 0;
    const answeredQuestions = answeredByChapter[item.id] ?? 0;
    const challenges = challengeProgressByChapter[item.id] ?? { done: 0, total: studyChallenges[item.id].length };
    return { chapterId: item.id, answeredQuestions, totalQuestions, completedChallenges: challenges.done, totalChallenges: challenges.total };
  }), [answeredByChapter, challengeProgressByChapter]);
  const continueChapter = getChapter(progress.lastChapterId ?? "") ?? studyChapters.find((item) => {
    const stats = chapterStats.find((entry) => entry.chapterId === item.id);
    return stats ? stats.answeredQuestions < stats.totalQuestions || stats.completedChallenges < stats.totalChallenges : true;
  });
  const weakThemes = useMemo(() => {
    const totals = progress.incorrectQuestionIds.reduce<Record<string, number>>((all, id) => {
      const theme = questionThemeById.get(id);
      return theme ? { ...all, [theme]: (all[theme] ?? 0) + 1 } : all;
    }, {});

    return Object.entries(totals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([theme, count]) => ({ theme, count }));
  }, [progress.incorrectQuestionIds]);

  const page = chapter ? <ChapterStudyPage chapter={chapter} onBack={() => go("chapters")} completedChallenges={progress.completedChallenges} onToggleChallenge={toggleChallenge} /> : (() => {
    switch (route) {
      case "chapters":
        return <main className="study-page chapters-index"><header className="page-intro"><span>Mapa de estudo</span><h1>Conteúdos para a prova.</h1><p>Arquivos, EDB, análise de complexidade, ordenação, busca e OO no mesmo mapa de revisão.</p></header><div className="topic-rail">{studyChapters.map((item) => <button key={item.id} type="button" onClick={() => openChapter(item.id)}>{item.shortTitle}</button>)}</div><div className="chapters-index__list">{studyChapters.map((item) => { const stats = chapterStats.find((entry) => entry.chapterId === item.id); return <button key={item.id} type="button" className="chapter-index-card" onClick={() => openChapter(item.id)}><b className="chapter-index-card__icon" aria-hidden="true">{chapterIcon(item.id)}</b><span><strong>{item.shortTitle}</strong><small>{item.description}</small>{stats ? <small>{stats.answeredQuestions}/{stats.totalQuestions} questões · {stats.completedChallenges}/{stats.totalChallenges} desafios</small> : null}</span><i>→</i></button>; })}</div></main>;
      case "questions":
        return <QuestionBankPage key="all" onAnswered={recordAnswer} />;
      case "mistakes":
        return <QuestionBankPage key="mistakes" questionIds={progress.incorrectQuestionIds} onAnswered={recordAnswer} onRemoveMistake={removeMistake} />;
      case "simulation":
        return <SimulationPage onAnswered={recordAnswer} onComplete={saveSimulation} history={progress.simulationHistory} />;
      case "review":
        return <QuickReviewPage onComplete={markReviewed} />;
      case "flashcards":
        return <FlashcardsPage />;
      case "complexity":
        return <ComplexityPage />;
      case "algorithms":
        return <AlgorithmIdentifyPage onAnswered={recordAnswer} />;
      case "practice":
        return <PracticeChallengePage />;
      case "more":
        return <StudyMorePage onNavigate={go} mistakeCount={progress.incorrectQuestionIds.length} />;
      case "visualizer":
        return <StructureVisualizerPage />;
      default:
        return <StudyHome answered={progress.answeredQuestionIds.length} incorrect={progress.incorrectQuestionIds.length} weakThemes={weakThemes} simulations={progress.simulationHistory} continueChapter={continueChapter} chapterStats={chapterStats} dueFlashcards={dueToday.length} onChapter={openChapter} onNavigate={go} />;
    }
  })();

  return <div className="study-shell">
    <header className="study-header"><button type="button" className="brand" onClick={() => go("home")}><b>C++</b><span>de Bolso</span></button><nav className="desktop-nav" aria-label="Navegação principal">{navigationItems.map((item) => <button key={item.route} type="button" className={route === item.route && !chapter ? "is-active" : ""} onClick={() => go(item.route)}>{item.label}</button>)}</nav><ThemeToggle theme={progress.theme} onChange={setTheme} /></header>
    {page}
    <BottomNavigation route={route} onNavigate={go} />
  </div>;
};
