import { CodeBlock } from "./CodeBlock";
import type { TopicBlock } from "../types/study";

const richText = (text: string) => text.split(/(`[^`]+`)/g).map((part, index) =>
  part.startsWith("`") && part.endsWith("`")
    ? <code className="inline-code" key={`${part}-${index}`}>{part.slice(1, -1)}</code>
    : part,
);

const ExplanationRow = ({ label, text, kind }: { label: string; text: string; kind?: "trap" | "shortcut" | "analogy" }) => (
  <div className={`explanation-row${kind ? ` explanation-row--${kind}` : ""}`}>
    <span>{label}</span>
    <p>{richText(text)}</p>
  </div>
);

export const ContentBlock = ({ topic }: { topic: TopicBlock }) => (
  <article className="content-block">
    <div className="content-block__copy">
      <header className="content-block__header">
        <span>Conceito guiado</span>
        <h3>{topic.title}</h3>
      </header>
      <div className="explanation-list">
        <ExplanationRow label="O que é" text={topic.what} />
        <ExplanationRow label="Para que serve" text={topic.purpose} />
        {topic.analogy ? <ExplanationRow label="Analogia" text={topic.analogy} kind="analogy" /> : null}
      </div>
      <div className="study-callouts">
        <ExplanationRow label="Pegadinha" text={topic.trap} kind="trap" />
        <ExplanationRow label="Macete" text={topic.shortcut} kind="shortcut" />
      </div>
    </div>
    <div className="content-block__code">
      <span>Exemplo em C++</span>
      <CodeBlock code={topic.code} title="Leia com calma" compact />
    </div>
  </article>
);
