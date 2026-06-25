import { useMemo, useState } from "react";
import { complexityRows } from "../data/complexities";

type ComplexityTab = "growth" | "sorts" | "table";
type SortScenario = "random" | "sorted" | "reverse" | "small-range";

const growthCurves = [
  { label: "O(1)", hint: "acesso direto", value: () => 1 },
  { label: "O(log n)", hint: "divide pela metade", value: (n: number) => Math.log2(n) },
  { label: "O(n)", hint: "percorre uma vez", value: (n: number) => n },
  { label: "O(n log n)", hint: "divide e processa", value: (n: number) => n * Math.log2(n) },
  { label: "O(n²)", hint: "laço aninhado", value: (n: number) => n * n },
  { label: "O(2ⁿ)", hint: "explosão combinatória", value: (n: number) => 2 ** Math.min(n, 30) },
] as const;

const sortAlgorithms = [
  { name: "Bubble Sort", family: "comparação", stable: "estável", memory: "O(1)", best: "O(n)", average: "O(n²)", worst: "O(n²)", estimate: (n: number, scenario: SortScenario) => scenario === "sorted" ? n : n * n },
  { name: "Selection Sort", family: "comparação", stable: "geralmente não", memory: "O(1)", best: "O(n²)", average: "O(n²)", worst: "O(n²)", estimate: (n: number) => n * n },
  { name: "Insertion Sort", family: "comparação", stable: "estável", memory: "O(1)", best: "O(n)", average: "O(n²)", worst: "O(n²)", estimate: (n: number, scenario: SortScenario) => scenario === "sorted" ? n : scenario === "random" ? n * n * 0.55 : n * n },
  { name: "Merge Sort", family: "divisão e conquista", stable: "estável", memory: "O(n)", best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", estimate: (n: number) => n * Math.log2(n) },
  { name: "Quick Sort", family: "pivô", stable: "não garantido", memory: "O(log n)", best: "O(n log n)", average: "O(n log n)", worst: "O(n²)", estimate: (n: number, scenario: SortScenario) => scenario === "sorted" || scenario === "reverse" ? n * n : n * Math.log2(n) * 1.2 },
  { name: "Heap Sort", family: "heap", stable: "não", memory: "O(1)", best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", estimate: (n: number) => n * Math.log2(n) * 1.35 },
  { name: "Counting Sort", family: "contagem", stable: "pode ser", memory: "O(n + k)", best: "O(n + k)", average: "O(n + k)", worst: "O(n + k)", estimate: (n: number, scenario: SortScenario) => scenario === "small-range" ? n * 1.4 : n * 4 },
  { name: "Radix Sort", family: "dígitos", stable: "depende da subrotina", memory: "O(n + k)", best: "O(d(n + k))", average: "O(d(n + k))", worst: "O(d(n + k))", estimate: (n: number, scenario: SortScenario) => scenario === "small-range" ? n * 2 : n * 3.5 },
] as const;

const formatCost = (value: number) => value >= 1_000_000
  ? value.toExponential(2)
  : Math.round(value).toLocaleString("pt-BR");

const scenarioLabel = {
  random: "Aleatório",
  sorted: "Já ordenado",
  reverse: "Invertido",
  "small-range": "Intervalo pequeno",
} satisfies Record<SortScenario, string>;

export const ComplexityPage = () => {
  const [tab, setTab] = useState<ComplexityTab>("growth");
  const [n, setN] = useState(64);
  const [scenario, setScenario] = useState<SortScenario>("random");
  const growth = useMemo(() => {
    const rows = growthCurves.map((curve) => ({ ...curve, cost: curve.value(n) }));
    const max = Math.max(...rows.map((item) => item.cost));
    return rows.map((item) => ({ ...item, width: Math.max(4, (item.cost / max) * 100) }));
  }, [n]);
  const sortRows = useMemo(() => {
    const rows = sortAlgorithms.map((sort) => ({ ...sort, cost: sort.estimate(n, scenario) }));
    const max = Math.max(...rows.map((item) => item.cost));
    return rows.sort((a, b) => a.cost - b.cost).map((item) => ({ ...item, width: Math.max(5, (item.cost / max) * 100) }));
  }, [n, scenario]);

  return <main className="study-page complexity-page">
    <header className="page-intro"><span>Big O em laboratório</span><h1>Complexidade que dá para ver.</h1><p>Mude o tamanho da entrada, compare curvas e veja por que um algoritmo aparentemente aceitável desaba quando n cresce.</p></header>
    <section className="complexity-lab">
      <div className="complexity-tabs" role="tablist" aria-label="Modos de complexidade">
        <button className={tab === "growth" ? "is-active" : ""} type="button" onClick={() => setTab("growth")}>Crescimento</button>
        <button className={tab === "sorts" ? "is-active" : ""} type="button" onClick={() => setTab("sorts")}>Ordenações</button>
        <button className={tab === "table" ? "is-active" : ""} type="button" onClick={() => setTab("table")}>Tabela</button>
      </div>
      <label className="complexity-input">Tamanho da entrada: <strong>{n}</strong><input type="range" min={4} max={1024} step={4} value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
    </section>

    {tab === "growth" ? <section className="complexity-growth" aria-label="Visualizador de crescimento Big O">
      {growth.map((item) => <article key={item.label}><div><strong>{item.label}</strong><span>{item.hint}</span></div><i><b style={{ width: `${item.width}%` }} /></i><code>{formatCost(item.cost)}</code></article>)}
      <aside><h2>Leitura de prova</h2><p>Quando n dobra, O(n) dobra, O(n²) fica perto de quatro vezes maior e O(log n) quase não sente. O gráfico não mede segundos: ele compara crescimento.</p></aside>
    </section> : null}

    {tab === "sorts" ? <section className="sorting-lab" aria-label="Comparador de algoritmos de ordenação">
      <div className="sorting-controls">{(Object.keys(scenarioLabel) as SortScenario[]).map((item) => <button key={item} className={scenario === item ? "is-active" : ""} type="button" onClick={() => setScenario(item)}>{scenarioLabel[item]}</button>)}</div>
      <div className="sorting-list">{sortRows.map((sort, index) => <article key={sort.name}><span>#{index + 1}</span><div><strong>{sort.name}</strong><small>{sort.family} · estável: {sort.stable} · memória: {sort.memory}</small></div><i><b style={{ width: `${sort.width}%` }} /></i><code>{formatCost(sort.cost)}</code><em>melhor {sort.best} · médio {sort.average} · pior {sort.worst}</em></article>)}</div>
    </section> : null}

    {tab === "table" ? <><section className="complexity-metrics"><article><b>O(1)</b><span>acesso direto, topo, frente</span></article><article><b>O(log n)</b><span>divide o problema pela metade</span></article><article><b>O(n)</b><span>percorre proporcionalmente</span></article><article><b>O(n²)</b><span>laços aninhados por n</span></article></section><section className="complexity-table-wrap"><table className="complexity-table"><thead><tr><th>Estrutura</th><th>Operação</th><th>Complexidade</th><th>Observação</th></tr></thead><tbody>{complexityRows.map(([structure, operation, complexity, note]) => <tr key={`${structure}-${operation}`}><td>{structure}</td><td>{operation}</td><td><code>{complexity}</code></td><td>{note}</td></tr>)}</tbody></table></section></> : null}
  </main>;
};
