import { useMemo, useState } from "react";
import { QuestionFilters, type QuestionFilterState } from "../components/QuestionFilters";
import { StudyQuestionCard } from "../components/StudyQuestionCard";
import { questionBank } from "../data/questionBank";
import { studyChapters } from "../data/studyChapters";
import type { StudyQuestion } from "../types/study";

type Props = {
  onAnswered: (question: StudyQuestion, correct: boolean) => void;
  onRemoveMistake?: (question: StudyQuestion) => void;
  questionIds?: string[];
};

const recentMistakeLimit = 10;

export const QuestionBankPage = ({ onAnswered, onRemoveMistake, questionIds }: Props) => {
  const [filters, setFilters] = useState<QuestionFilterState>({ chapter: "", theme: "", difficulty: "", kind: "", search: "" });
  const [visible, setVisible] = useState(8);
  const [recentOnly, setRecentOnly] = useState(false);
  const reviewIds = useMemo(() => {
    if (!questionIds) return undefined;
    return recentOnly ? questionIds.slice(-recentMistakeLimit) : questionIds;
  }, [questionIds, recentOnly]);
  const themes = useMemo(() => [...new Set(questionBank.map((question) => question.theme))].sort(), []);
  const mistakeQuestions = useMemo(() => questionIds ? questionBank.filter((question) => questionIds.includes(question.id)) : [], [questionIds]);
  const mistakesByTheme = useMemo(() => mistakeQuestions.reduce<Record<string, number>>((all, question) => {
    all[question.theme] = (all[question.theme] ?? 0) + 1;
    return all;
  }, {}), [mistakeQuestions]);
  const filtered = useMemo(() => questionBank.filter((question) => {
    const haystack = `${question.prompt} ${question.theme} ${question.tags.join(" ")}`.toLowerCase();
    return (!reviewIds || reviewIds.includes(question.id)) && (!filters.chapter || question.chapter === filters.chapter) && (!filters.theme || question.theme === filters.theme) && (!filters.difficulty || question.difficulty === filters.difficulty) && (!filters.kind || question.kind === filters.kind) && (!filters.search || haystack.includes(filters.search.toLowerCase()));
  }), [filters, reviewIds]);
  const chapters = studyChapters.map((chapter) => ({ id: chapter.id, label: chapter.shortTitle }));
  const mistakeMode = Boolean(questionIds);
  const clearFilters = () => {
    setFilters({ chapter: "", theme: "", difficulty: "", kind: "", search: "" });
    setVisible(8);
  };

  return <main className="study-page questions-page">
    <header className="page-intro"><span>{mistakeMode ? "Revisão de erros" : "Banco objetivo"}</span><h1>{mistakeMode ? "Refaça o que ainda confunde." : "Questões com gabarito comentado"}</h1><p>{mistakeMode ? "Agrupe por tema, treine os erros mais recentes ou remova manualmente uma questão quando já dominar a pegadinha." : "Arquivos, EDB, Big O e OO: o gabarito aparece apenas depois da sua escolha."}</p></header>
    {mistakeMode ? <section className="mistake-review-panel" aria-label="Resumo dos erros pendentes">
      <article>
        <span>Total pendente</span>
        <strong>{questionIds?.length ?? 0}</strong>
        <small>{recentOnly ? `Mostrando até ${recentMistakeLimit} erros mais recentes.` : "Mostrando todos os erros pendentes."}</small>
      </article>
      <article className="mistake-review-panel__wide">
        <span>Erros por tema</span>
        <div className="mistake-theme-list">
          {Object.entries(mistakesByTheme).sort((a, b) => b[1] - a[1]).map(([theme, count]) => (
            <button key={theme} type="button" className={filters.theme === theme ? "is-active" : ""} onClick={() => { setFilters((current) => ({ ...current, theme })); setVisible(8); }}>
              <strong>{theme}</strong><small>{count}</small>
            </button>
          ))}
          {!mistakeQuestions.length ? <small>Nenhum erro pendente. Bonito de ver.</small> : null}
        </div>
      </article>
      <article>
        <span>Treino focado</span>
        <button type="button" className="button button--quiet" onClick={() => { setRecentOnly((current) => !current); setVisible(8); }}>{recentOnly ? "Ver todos os erros" : "Refazer recentes"}</button>
        <button type="button" className="progress-link" onClick={clearFilters}>Limpar filtros</button>
      </article>
    </section> : null}
    <QuestionFilters value={filters} themes={themes} chapters={chapters} onChange={(next) => { setFilters(next); setVisible(8); }} />
    <p className="result-count">{filtered.length} questões encontradas</p>
    {mistakeMode && !filtered.length ? <section className="empty-state"><h2>Nenhum erro encontrado com esses filtros.</h2><p>Limpe os filtros ou volte para o banco geral para continuar treinando.</p><button type="button" className="button button--primary" onClick={clearFilters}>Limpar filtros</button></section> : null}
    <section className="question-list">{filtered.slice(0, visible).map((question, index) => <StudyQuestionCard key={question.id} question={question} position={index + 1} onAnswered={onAnswered} onDismiss={mistakeMode ? onRemoveMistake : undefined} />)}</section>
    {visible < filtered.length ? <button type="button" className="button button--quiet load-more" onClick={() => setVisible((current) => current + 8)}>Carregar mais questões</button> : null}
  </main>;
};
