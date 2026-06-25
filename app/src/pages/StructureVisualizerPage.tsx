import { useState } from "react";

export const StructureVisualizerPage = () => {
  const [list, setList] = useState([10, 20, 30]);
  const [queue, setQueue] = useState([4, 8]);
  return <main className="study-page visualizer-page">
    <header className="page-intro"><span>Execução visual</span><h1>Ponteiros em movimento.</h1><p>Veja o estado antes de memorizar as linhas: cabeça de lista, frente e trás da fila.</p></header>
    <section className="visualizer-grid">
      <article className="visualizer-card"><h2>Lista encadeada</h2><p>Inserir no início troca a cabeça; remover retira a cabeça atual.</p><div className="node-track">{list.length ? list.map((value, index) => <span key={value + "-" + index} className="node">{index === 0 ? "início · " : ""}{value}<i>→</i></span>) : <b>nullptr</b>}</div><div className="button-row"><button className="button button--primary" type="button" onClick={() => setList((items) => [99, ...items])}>Inserir 99 no início</button><button className="button button--quiet" type="button" onClick={() => setList((items) => items.slice(1))} disabled={!list.length}>Remover início</button></div></article>
      <article className="visualizer-card"><h2>Fila encadeada</h2><p>enqueue entra em trás; dequeue sai de frente.</p><div className="node-track">{queue.length ? queue.map((value, index) => <span key={value + "-" + index} className="node">{index === 0 ? "frente · " : ""}{value}{index === queue.length - 1 ? " · trás" : ""}<i>→</i></span>) : <b>frente = trás = nullptr</b>}</div><div className="button-row"><button className="button button--primary" type="button" onClick={() => setQueue((items) => [...items, items.length ? items[items.length - 1] + 2 : 4])}>enqueue</button><button className="button button--quiet" type="button" onClick={() => setQueue((items) => items.slice(1))} disabled={!queue.length}>dequeue</button></div></article>
    </section>
  </main>;
};
