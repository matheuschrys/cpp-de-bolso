import { useEffect, useMemo, useRef, useState } from "react";
import { SimulationResult } from "../components/SimulationResult";
import { StudyQuestionCard } from "../components/StudyQuestionCard";
import { questionBank } from "../data/questionBank";
import { studyChapters } from "../data/studyChapters";
import type { SimulationReport, StudyQuestion } from "../types/study";

const shuffle = <T,>(items: T[]) => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled;
};

type Props = { onAnswered: (question: StudyQuestion, correct: boolean) => void; onComplete: (report: SimulationReport) => void };

export const SimulationPage = ({ onAnswered, onComplete }: Props) => {
  const [count, setCount] = useState(10);
  const [included, setIncluded] = useState<string[]>([]);
  const [questions, setQuestions] = useState<StudyQuestion[]>(() => shuffle(questionBank).slice(0, 10));
  const [results, setResults] = useState<Record<string, boolean>>({});
  const done = questions.length > 0 && Object.keys(results).length === questions.length;
  const report = useMemo<SimulationReport | undefined>(() => {
    if (!done) return undefined;
    const wrong = questions.filter((question) => !results[question.id]);
    const themeCount = wrong.reduce<Record<string, number>>((all, question) => ({ ...all, [question.theme]: (all[question.theme] ?? 0) + 1 }), {});
    return { total: questions.length, correct: questions.length - wrong.length, incorrectIds: wrong.map((q) => q.id), weakThemes: Object.entries(themeCount).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([theme]) => theme) };
  }, [done, questions, results]);
  const savedReport = useRef<SimulationReport | undefined>(undefined);
  useEffect(() => {
    if (report && report !== savedReport.current) {
      savedReport.current = report;
      onComplete(report);
    }
  }, [onComplete, report]);
  const pool = included.length ? questionBank.filter((question) => included.includes(question.chapter)) : questionBank;
  const start = (nextQuestions = shuffle(pool).slice(0, count)) => { savedReport.current = undefined; setQuestions(nextQuestions); setResults({}); };
  const toggleChapter = (id: string) => setIncluded((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  return <main className="study-page simulation-page"><header className="page-intro"><span>Modo simulado</span><h1>Prova sem padrão previsível.</h1><p>Escolha os assuntos para incluir ou deixe tudo vazio para misturar o banco completo.</p></header>{!done ? <><section className="simulation-controls simulation-controls--topics"><label>Questões<select value={count} onChange={(event) => { const next = Number(event.target.value); setCount(next); }}><option value={5}>5</option><option value={10}>10</option><option value={15}>15</option><option value={20}>20</option></select></label><div className="simulation-topic-list">{studyChapters.map((chapter) => <label key={chapter.id}><input type="checkbox" checked={included.includes(chapter.id)} onChange={() => toggleChapter(chapter.id)} />{chapter.shortTitle}</label>)}</div><button className="button button--primary" type="button" onClick={() => start()}>Gerar simulado</button><span>{Object.keys(results).length}/{questions.length} respondidas</span></section><section className="question-list">{questions.map((question, index) => <StudyQuestionCard key={question.id} question={question} position={index + 1} shuffleOptions onAnswered={(item, correct) => { setResults((current) => ({ ...current, [item.id]: correct })); onAnswered(item, correct); }} />)}</section></> : report ? <SimulationResult report={report} onNew={() => start()} onRetryWrong={() => start(questions.filter((question) => !results[question.id]))} /> : null}</main>;
};
