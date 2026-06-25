import type { AppRoute } from "../app/routes";

type Props = { onNavigate: (route: AppRoute) => void; mistakeCount: number };

const destinations: { route: AppRoute; title: string; description: string }[] = [
  { route: "questions", title: "Banco de questões", description: "Filtre por assunto, dificuldade e tipo de questão." },
  { route: "complexity", title: "Tabela de Big O", description: "Compare operações, buscas e ordenações." },
  { route: "flashcards", title: "Flashcards", description: "Pratique recuperação ativa de todos os assuntos." },
  { route: "practice", title: "Questão prática", description: "Resolva a ContaBancaria no estilo de prova." },
 { route: "algorithms", title: "Identifique o algoritmo", description: "Reconheça padrões de ordenação, busca, DFS e BFS." },
  { route: "visualizer", title: "Visualizar estruturas", description: "Acompanhe cabeça, frente e trás em movimento." },
];

export const StudyMorePage = ({ onNavigate, mistakeCount }: Props) => (
  <main className="study-page more-page">
    <header className="page-intro">
      <span>Atalhos de estudo</span>
      <h1>Escolha seu próximo treino.</h1>
      <p>Deixe a barra inferior compacta sem esconder as partes importantes da revisão.</p>
    </header>
    <section className="more-grid">
      {destinations.map((destination) => (
        <button key={destination.route} type="button" className="more-card" onClick={() => onNavigate(destination.route)}>
          <strong>{destination.title}</strong><span>{destination.description}</span><i>→</i>
        </button>
      ))}
      <button type="button" className="more-card more-card--mistakes" onClick={() => onNavigate("mistakes")}>
        <strong>{mistakeCount ? "Revisar erros (" + mistakeCount + ")" : "Revisar erros"}</strong>
        <span>{mistakeCount ? "Refaça apenas as questões ainda pendentes." : "Você não tem erros pendentes no momento."}</span><i>→</i>
      </button>
    </section>
  </main>
);
