import { useEffect, useMemo, useRef, useState } from "react";
import { SimulationResult } from "../components/SimulationResult";
import { StudyQuestionCard } from "../components/StudyQuestionCard";
import { questionBank } from "../data/questionBank";
import { studyChapters } from "../data/studyChapters";
import type { ChapterId, Difficulty, QuestionKind, SimulationReport, StudyQuestion } from "../types/study";
import type { SimulationHistoryEntry } from "../types/progress";

const shuffle = <T,>(items: T[]) => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled;
};

type Props = {
  onAnswered: (question: StudyQuestion, correct: boolean) => void;
  onComplete: (report: SimulationReport) => void;
  history: SimulationHistoryEntry[];
};

const difficulties: Difficulty[] = ["Média", "Difícil", "Muito difícil"];
const kinds: QuestionKind[] = ["conceito", "interpretação de código", "saída do programa", "complexidade", "erro de compilação", "estado final", "implementação"];
const accuracy = (correct: number, total: number) => total ? Math.round((correct / total) * 100) : 0;

const summarize = <T extends string>(questions: StudyQuestion[], results: Record<string, boolean>, getLabel: (question: StudyQuestion) => T) =>
  Object.values(questions.reduce<Record<string, { label: T; total: number; correct: number }>>((all, question) => {
    const label = getLabel(question);
    const current = all[label] ?? { label, total: 0, correct: 0 };
    all[label] = {
      ...current,
      total: current.total + 1,
      correct: current.correct + (results[question.id] ? 1 : 0),
    };
    return all;
  }, {})).sort((a, b) => (b.total - b.correct) - (a.total - a.correct));

export const SimulationPage = ({ onAnswered, onComplete, history }: Props) => {
  const [count, setCount] = useState(10);
  const [included, setIncluded] = useState<ChapterId[]>([]);
  const [difficulty, setDifficulty] = useState<"" | Difficulty>("");
  const [kind, setKind] = useState<"" | QuestionKind>("");
  const [questions, setQuestions] = useState<StudyQuestion[]>(() => shuffle(questionBank).slice(0, 10));
  const [results, setResults] = useState<Record<string, boolean>>({});
  const done = questions.length > 0 && Object.keys(results).length === questions.length;
  const report = useMemo<SimulationReport | undefined>(() => {
    if (!done) return undefined;
    const wrong = questions.filter((question) => !results[question.id]);
    const themeCount = wrong.reduce<Record<string, number>>((all, question) => ({ ...all, [question.theme]: (all[question.theme] ?? 0) + 1 }), {});
    return {
      total: questions.length,
      correct: questions.length - wrong.length,
      incorrectIds: wrong.map((q) => q.id),
      weakThemes: Object.entries(themeCount).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([theme]) => theme),
      filters: { chapters: included, difficulty: difficulty || undefined, kind: kind || undefined },
      breakdown: {
        byTheme: summarize(questions, results, (question) => question.theme),
        byDifficulty: summarize(questions, results, (question) => question.difficulty),
        byKind: summarize(questions, results, (question) => question.kind ?? "conceito"),
      },
    };
  }, [difficulty, done, included, kind, questions, results]);
  const savedReport = useRef<SimulationReport | undefined>(undefined);
  useEffect(() => {
    if (report && report !== savedReport.current) {
      savedReport.current = report;
      onComplete(report);
    }
  }, [onComplete, report]);
  const pool = questionBank.filter((question) => (!included.length || included.includes(question.chapter)) && (!difficulty || question.difficulty === difficulty) && (!kind || question.kind === kind));
  const start = (nextQuestions = shuffle(pool).slice(0, count)) => { savedReport.current = undefined; setQuestions(nextQuestions); setResults({}); };
  const toggleChapter = (id: ChapterId) => setIncluded((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const canStart = pool.length > 0;

  return <main className="study-page simulation-page">
    <header className="page-intro"><span>Modo simulado</span><h1>Prova sem padrão previsível.</h1><p>Escolha assuntos, dificuldade e tipo de questão para treinar com cara de prova.</p></header>
    {!done ? <>
      <section className="simulation-controls simulation-controls--topics">
        <label>Questões<select value={count} onChange={(event) => { const next = Number(event.target.value); setCount(next); }}><option value={5}>5</option><option value={10}>10</option><option value={15}>15</option><option value={20}>20</option></select></label>
        <label>Dificuldade<select value={difficulty} onChange={(event) => setDifficulty(event.target.value as "" | Difficulty)}><option value="">Todas</option>{difficulties.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label>Tipo<select value={kind} onChange={(event) => setKind(event.target.value as "" | QuestionKind)}><option value="">Todos</option>{kinds.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <div className="simulation-topic-list">{studyChapters.map((chapter) => <label key={chapter.id}><input type="checkbox" checked={included.includes(chapter.id)} onChange={() => toggleChapter(chapter.id)} />{chapter.shortTitle}</label>)}</div>
        <button className="button button--primary" type="button" onClick={() => start()} disabled={!canStart}>Gerar simulado</button>
        <span>{Object.keys(results).length}/{questions.length} respondidas · {pool.length} disponíveis</span>
      </section>
      {!canStart ? <section className="empty-state"><h2>Nenhuma questão nesse recorte.</h2><p>Abra um pouco os filtros para montar um simulado com mais variedade.</p></section> : null}
      <SimulationHistory history={history} />
      <section className="question-list">{questions.map((question, index) => <StudyQuestionCard key={question.id} question={question} position={index + 1} shuffleOptions onAnswered={(item, correct) => { setResults((current) => ({ ...current, [item.id]: correct })); onAnswered(item, correct); }} />)}</section>
    </> : report ? <SimulationResult report={report} onNew={() => start()} onRetryWrong={() => start(questions.filter((question) => !results[question.id]))} /> : null}
  </main>;
};

const SimulationHistory = ({ history }: { history: SimulationHistoryEntry[] }) => {
  if (!history.length) return null;

  return (
    <section className="simulation-history" aria-label="Histórico de simulados">
      <div className="section-title"><h2>Histórico recente</h2><span>{history.length} registros</span></div>
      <div className="simulation-history__grid">
        {history.slice(0, 4).map((item) => (
          <article key={item.date}>
            <span>{new Date(item.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}</span>
            <strong>{accuracy(item.correct, item.total)}%</strong>
            <small>{item.correct}/{item.total} acertos</small>
            {item.weakThemes.length ? <em>{item.weakThemes.slice(0, 2).join(" · ")}</em> : <em>sem tema fraco</em>}
          </article>
        ))}
      </div>
    </section>
  );
};
