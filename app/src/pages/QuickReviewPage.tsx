import { QuickReviewCard } from "../components/QuickReviewCard";
import { studyChapters } from "../data/studyChapters";

export const QuickReviewPage = ({ onComplete }: { onComplete: () => void }) => (
  <main className="study-page review-page">
    <header className="page-intro">
      <span>Revisão rápida</span>
      <h1>O que lembrar na véspera.</h1>
      <p>Cards curtos para recuperar o raciocínio certo antes de cair em uma pegadinha.</p>
      <button className="button button--quiet" type="button" onClick={onComplete}>Marcar revisão de hoje</button>
    </header>
    {studyChapters.map((chapter) => (
      <section className="review-section" key={chapter.id}>
        <div className="section-title"><h2>{chapter.shortTitle}</h2><span>{chapter.quickReview.length} alertas</span></div>
        <div className="review-grid">{chapter.quickReview.map((item, index) => <QuickReviewCard key={item} title={chapter.themes[index] ?? chapter.shortTitle} text={item} index={index} />)}</div>
      </section>
    ))}
  </main>
);
