import { useEffect, useMemo, useState } from "react";
import { CodeBlock } from "../components/CodeBlock";
import { flashcards, flashcardThemes } from "../data/flashcards";
import { getChapter, studyChapters } from "../data/studyChapters";
import { type FlashcardRating, useFlashcardProgress } from "../hooks/useFlashcardProgress";

type DeckMode = "all" | "unmastered" | "revisit" | "due" | "code";

const ratingCopy: Record<FlashcardRating, { label: string; helper: string }> = {
  hard: { label: "Difícil", helper: "volta amanhã" },
  medium: { label: "Médio", helper: "volta em alguns dias" },
  easy: { label: "Fácil", helper: "espaça mais" },
};

const formatReviewDate = (date?: string) => {
  if (!date) return "ainda não agendado";
  const parsed = new Date(date);
  const today = new Date();
  if (parsed <= today) return "revisar hoje";
  return parsed.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
};

const inlineCode = (text: string) => text.split(/(`[^`]+`)/g).map((part, index) =>
  part.startsWith("`") && part.endsWith("`")
    ? <code className="inline-code" key={`${part}-${index}`}>{part.slice(1, -1)}</code>
    : part,
);

export const FlashcardsPage = () => {
  const { mastered, revisit, dueToday, nextReview, rateCard, schedule, toggleMastered, toggleRevisit } = useFlashcardProgress();
  const [chapter, setChapter] = useState("");
  const [theme, setTheme] = useState("");
  const [mode, setMode] = useState<DeckMode>("all");
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const deck = useMemo(() => flashcards.filter((card) =>
    (!chapter || card.chapter === chapter) &&
    (!theme || card.theme === theme) &&
    (mode !== "unmastered" || !mastered.includes(card.id)) &&
    (mode !== "revisit" || revisit.includes(card.id)) &&
    (mode !== "due" || dueToday.includes(card.id)) &&
    (mode !== "code" || Boolean(card.code)),
  ), [chapter, theme, mode, mastered, revisit, dueToday]);

  useEffect(() => { setCurrent(0); setFlipped(false); }, [chapter, theme, mode, dueToday.length]);
  useEffect(() => { if (current >= deck.length) setCurrent(0); }, [current, deck.length]);

  const card = deck[current];
  const contentName = card ? getChapter(card.chapter)?.shortTitle ?? "Conteúdo" : "Conteúdo";
  const percentage = Math.round((mastered.length / flashcards.length) * 100);
  const move = (direction: number) => {
    if (!deck.length) return;
    setFlipped(false);
    setCurrent((index) => (index + direction + deck.length) % deck.length);
  };
  const shuffle = () => {
    if (deck.length < 2) return;
    const next = Math.floor(Math.random() * deck.length);
    setFlipped(false);
    setCurrent(next === current ? (next + 1) % deck.length : next);
  };
  const master = () => { if (card) { toggleMastered(card.id); move(1); } };
  const later = () => { if (card) { toggleRevisit(card.id); move(1); } };
  const rate = (rating: FlashcardRating) => { if (card) { rateCard(card.id, rating); move(1); } };
  const cardSchedule = card ? schedule[card.id] : undefined;
  const cardNextReview = card ? nextReview[card.id] : undefined;

  return <main className="study-page flashcards-page">
    <header className="flashcards-hero">
      <div><span>Repetição ativa</span><h1>Flashcards para lembrar sem decorar.</h1><p>Vire o card, explique para si mesmo e marque o que já está firme — ou o que merece voltar depois.</p></div>
      <aside className="flashcard-progress"><strong>{mastered.length}</strong><span>de {flashcards.length} dominados</span><div className="progress-track"><i style={{ width: `${percentage}%` }} /></div><small>{percentage}% do baralho dominado</small></aside>
    </header>
    <section className="flashcard-filters" aria-label="Filtros do baralho">
      <label>Conteúdo<select value={chapter} onChange={(event) => setChapter(event.target.value)}><option value="">Todos os conteúdos</option>{studyChapters.map((item) => <option key={item.id} value={item.id}>{item.shortTitle}</option>)}</select></label>
      <label>Tema<select value={theme} onChange={(event) => setTheme(event.target.value)}><option value="">Todos os temas</option>{flashcardThemes.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label>Prioridade<select value={mode} onChange={(event) => setMode(event.target.value as DeckMode)}><option value="all">Todo o baralho</option><option value="due">Revisar hoje ({dueToday.length})</option><option value="unmastered">Ainda não dominados</option><option value="revisit">Marcados para revisar</option><option value="code">Só cards com código</option></select></label>
      <button className="button button--quiet" type="button" onClick={() => { setChapter(""); setTheme(""); setMode("all"); }}>Limpar filtros</button>
    </section>
    {card ? <section className="deck-layout">
      <article className={`flashcard ${flipped ? "is-flipped" : ""}`}>
        <div className="flashcard__surface" role="button" tabIndex={0} onClick={() => setFlipped((value) => !value)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setFlipped((value) => !value); } }} aria-pressed={flipped} aria-label={flipped ? "Mostrar pergunta" : "Mostrar resposta"}>
          {!flipped ? <div className="flashcard__front"><span>{contentName} · {card.theme}</span><h2>{inlineCode(card.front)}</h2>{card.hint ? <p><strong>Pista:</strong> {inlineCode(card.hint)}</p> : null}<b>Toque para virar</b></div> : <div className="flashcard__back"><span>Resposta</span><h2>{inlineCode(card.back)}</h2>{card.code ? <CodeBlock compact title="Exemplo para fixar" code={card.code} /> : null}<b>Toque para voltar à pergunta</b></div>}
        </div>
        <div className="deck-controls"><button className="button button--quiet" type="button" onClick={() => move(-1)}>← Anterior</button><span>{current + 1} / {deck.length}</span><button className="button button--quiet" type="button" onClick={() => move(1)}>Próximo →</button></div>
      </article>
      <aside className="flashcard-aside"><div><span className="aside-label">Agenda</span><h2>{formatReviewDate(cardNextReview)}</h2><p>{cardSchedule ? `${cardSchedule.reviews} revisão(ões), intervalo atual de ${cardSchedule.intervalDays} dia(s).` : "Este card ainda não entrou na repetição espaçada."}</p></div><div className="flashcard-rating" aria-label="Avaliar lembrança">{(["hard", "medium", "easy"] as FlashcardRating[]).map((rating) => <button key={rating} className={cardSchedule?.rating === rating ? "button button--selected" : "button button--quiet"} type="button" onClick={() => rate(rating)}><strong>{ratingCopy[rating].label}</strong><small>{ratingCopy[rating].helper}</small></button>)}</div><div className="flashcard-actions"><button className={revisit.includes(card.id) ? "button button--selected" : "button button--quiet"} type="button" onClick={later}>{revisit.includes(card.id) ? "Marcado para revisar" : "Revisar depois"}</button><button className={mastered.includes(card.id) ? "button button--selected" : "button button--primary"} type="button" onClick={master}>{mastered.includes(card.id) ? "Já domino" : "Dominei"}</button></div><button className="shuffle-button" type="button" onClick={shuffle}>↻ Sortear outro card</button><div className="tag-list">{card.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></aside>
    </section> : <section className="flashcard-empty"><h2>Nenhum card neste recorte.</h2><p>Altere a prioridade ou limpe os filtros para voltar ao baralho completo.</p><button className="button button--primary" type="button" onClick={() => { setChapter(""); setTheme(""); setMode("all"); }}>Ver todos os flashcards</button></section>}
  </main>;
};
