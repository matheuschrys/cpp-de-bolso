import { ContentBlock } from "../components/ContentBlock";
import { StudyQuestionCard } from "../components/StudyQuestionCard";
import { questionBank } from "../data/questionBank";
import { sourceForChapter, studyChallenges } from "../data/studyChallenges";
import type { StudyChapter } from "../types/study";

const richText = (text: string) => text.split(/(`[^`]+`)/g).map((part, index) =>
  part.startsWith("`") && part.endsWith("`")
    ? <code className="inline-code" key={`${part}-${index}`}>{part.slice(1, -1)}</code>
    : part,
);

export const ChapterStudyPage = ({ chapter, onBack, completedChallenges, onToggleChallenge }: { chapter: StudyChapter; onBack: () => void; completedChallenges: string[]; onToggleChallenge: (id: string) => void }) => {
  const questions = questionBank.filter((question) => question.chapter === chapter.id);
  const challenges = studyChallenges[chapter.id];
  return <main className="study-page chapter-page">
    <button className="back-link" type="button" onClick={onBack}>← Todos os conteúdos</button>
    <header className="page-intro"><span>{chapter.subtitle}</span><h1>{chapter.shortTitle}</h1><p>{chapter.description}</p><div className="topic-tags">{chapter.themes.map((theme) => <span key={theme}>{theme}</span>)}</div><p className="content-source">{sourceForChapter(chapter.id)}</p></header>
    <section className="review-banner"><h2>Macetes de prova</h2><ul>{chapter.quickReview.map((item) => <li key={item}>{richText(item)}</li>)}</ul></section>
    <section className="content-stack"><h2>Entenda antes de decorar</h2>{chapter.topics.map((topic) => <ContentBlock key={topic.title} topic={topic} />)}</section>
    <section className="chapter-challenges"><div className="section-title"><h2>Desafios progressivos</h2><span>faça na ordem</span></div><p>O segundo desafio reaproveita o primeiro e adiciona um novo conceito. Não é só escrever código: explique suas decisões.</p><div className="challenge-grid">{challenges.map((challenge, index) => { const id = chapter.id + "-" + index; const previousDone = index === 0 || completedChallenges.includes(chapter.id + "-" + (index - 1)); const done = completedChallenges.includes(id); return <article key={challenge.title} className="challenge-card"><h3>{challenge.title}</h3><p>{challenge.goal}</p><small><strong>Pré-requisito:</strong> {challenge.requires}</small><ul>{challenge.deliverables.map((item) => <li key={item}>{item}</li>)}</ul><button className={done ? "button button--selected" : "button button--quiet"} type="button" disabled={!previousDone} onClick={() => onToggleChallenge(id)}>{done ? "Concluído" : previousDone ? "Marcar como concluído" : "Conclua o desafio anterior"}</button></article>; })}</div></section>
    <section className="chapter-questions"><div className="section-title"><h2>Questões difíceis do conteúdo</h2><span>{questions.length} no banco</span></div>{questions.slice(0, 3).map((question, index) => <StudyQuestionCard key={question.id} question={question} position={index + 1} />)}</section>
  </main>;
};
