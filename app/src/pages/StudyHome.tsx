import { ChapterCard } from "../components/ChapterCard";
import { CodeBlock } from "../components/CodeBlock";
import { questionBank } from "../data/questionBank";
import { studyChapters } from "../data/studyChapters";
import type { SimulationHistoryEntry } from "../types/progress";
import type { StudyChapter } from "../types/study";

type WeakTheme = { theme: string; count: number };
export type ChapterStudyStats = { chapterId: string; answeredQuestions: number; totalQuestions: number; completedChallenges: number; totalChallenges: number };
type Props = {
  onChapter: (id: string) => void;
  onNavigate: (route: "questions" | "mistakes" | "simulation" | "review" | "practice" | "complexity" | "algorithms" | "flashcards") => void;
  answered: number;
  incorrect: number;
  weakThemes: WeakTheme[];
  simulations: SimulationHistoryEntry[];
  continueChapter?: StudyChapter;
  chapterStats: ChapterStudyStats[];
  dueFlashcards: number;
};

const percent = (done: number, total: number) => total ? Math.round((done / total) * 100) : 0;
const totalCompletedChallenges = (stats: ChapterStudyStats[]) => stats.reduce((total, item) => total + item.completedChallenges, 0);
const totalChallenges = (stats: ChapterStudyStats[]) => stats.reduce((total, item) => total + item.totalChallenges, 0);

export const StudyHome = ({ onChapter, onNavigate, answered, incorrect, weakThemes, simulations, continueChapter, chapterStats, dueFlashcards }: Props) => {
  const completedChallenges = totalCompletedChallenges(chapterStats);
  const challenges = totalChallenges(chapterStats);

  return (
    <main className="study-page home-page">
      <section className="study-hero">
        <div>
          <h1>Estude C++ para a prova com clareza.</h1>
          <p>Teoria direta, questões que exigem interpretação e revisão do que mais confunde em sala.</p>
          <div className="button-row">{continueChapter ? <button className="button button--primary" type="button" onClick={() => onChapter(continueChapter.id)}>Continuar em {continueChapter.shortTitle}</button> : <button className="button button--primary" type="button" onClick={() => onNavigate("simulation")}>Começar simulado</button>}<button className="button button--quiet" type="button" onClick={() => onNavigate("review")}>Revisar agora</button></div>
        </div>
        <aside className="study-progress">
          <h2>Seu progresso</h2>
          <p>{answered ? `${answered} questões respondidas no seu histórico.` : "Comece por uma questão difícil ou por uma revisão rápida."}</p>
          <div className="progress-track"><span style={{ width: `${Math.min(100, percent(answered, questionBank.length))}%` }} /></div>
          <small>{answered}/{questionBank.length} do banco inicial</small>
          {incorrect ? <button type="button" className="progress-link" onClick={() => onNavigate("mistakes")}>Revisar {incorrect} erro(s) pendente(s)</button> : null}
          {weakThemes.length ? <div className="recurring-errors" aria-label="Erros recorrentes por tema">
            <span className="recurring-errors__title">Pontos de atenção</span>
            <div className="recurring-errors__list">{weakThemes.map((item) => <button key={item.theme} type="button" className="recurring-errors__chip" onClick={() => onNavigate("mistakes")}><strong>{item.theme}</strong><span>{item.count} erro(s)</span></button>)}</div>
          </div> : null}
          {dueFlashcards ? <button type="button" className="progress-link" onClick={() => onNavigate("flashcards")}>Revisar {dueFlashcards} flashcard(s) vencido(s) hoje</button> : <small className="simulation-summary">Nenhum flashcard vencido hoje.</small>}
          {simulations[0] ? <small className="simulation-summary">Último simulado: {simulations[0].correct}/{simulations[0].total} acertos.</small> : null}
        </aside>
      </section>

      <section className="flow-dashboard" aria-label="Resumo do fluxo de estudo">
        <article><span>Questões treinadas</span><strong>{answered}/{questionBank.length}</strong><div className="progress-track"><span style={{ width: `${Math.min(100, percent(answered, questionBank.length))}%` }} /></div></article>
        <article><span>Desafios concluídos</span><strong>{completedChallenges}/{challenges}</strong><div className="progress-track"><span style={{ width: `${Math.min(100, percent(completedChallenges, challenges))}%` }} /></div></article>
        <article><span>Revisão ativa</span><strong>{dueFlashcards}</strong><small>flashcard(s) para hoje</small></article>
        <article><span>Erros pendentes</span><strong>{incorrect}</strong><small>{incorrect ? "vale revisar antes do próximo simulado" : "sem pendências registradas"}</small></article>
      </section>

      <section className="home-grid">
        <div className="chapter-list-panel"><div className="section-title"><h2>Conteúdos para a prova</h2><span>{studyChapters.length} frentes</span></div>{studyChapters.map((chapter) => <ChapterCard key={chapter.id} chapter={chapter} questionCount={questionBank.filter((q) => q.chapter === chapter.id).length} progress={chapterStats.find((item) => item.chapterId === chapter.id)} onOpen={() => onChapter(chapter.id)} />)}</div>
        <aside className="practice-preview"><h2>EDB para interpretar</h2><p>Treine leitura de código, estado final, ponteiros e análise de custo — o tipo de detalhe que separa decorar de entender.</p><CodeBlock compact title="Uma pista de Big O" code={`for (int i = 1; i < n; i *= 2) {\n  processar(i);\n} // O(log n)`} /><div className="button-row"><button className="button button--quiet" type="button" onClick={() => onNavigate("complexity")}>Tabela de Big O</button><button className="button button--quiet" type="button" onClick={() => onNavigate("algorithms")}>Identificar algoritmo</button></div></aside>
      </section>
      <section className="action-strip"><div><span>Desafio maior</span><h2>Implemente uma ContaBancaria completa.</h2><p>Construtor, validação, const, operator+= e operator&lt;&lt; no mesmo problema.</p></div><button className="button button--primary" type="button" onClick={() => onNavigate("practice")}>Abrir questão prática</button></section>
    </main>
  );
};
