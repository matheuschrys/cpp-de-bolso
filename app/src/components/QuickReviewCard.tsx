export const QuickReviewCard = ({ title, text, index }: { title: string; text: string; index: number }) => (
  <article className="quick-review-card">
    <span>{String(index + 1).padStart(2, "0")}</span>
    <h3>{title}</h3>
    <p>{text}</p>
    <small>Cuidado com isso na prova.</small>
  </article>
);
