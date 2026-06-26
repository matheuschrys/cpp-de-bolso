import { useMemo, useState } from "react";
import { generateSortSteps, sortingAlgorithms, type SortAlgorithmId } from "../../data/sortingAlgorithms";
import { SortBars } from "./SortBars";

const sampleArray = [8, 3, 7, 1, 6, 2, 5, 4];

export const AlgorithmComparison = () => {
  const [left, setLeft] = useState<SortAlgorithmId>("bubble");
  const [right, setRight] = useState<SortAlgorithmId>("merge");
  const leftSteps = useMemo(() => generateSortSteps(left, sampleArray), [left]);
  const rightSteps = useMemo(() => generateSortSteps(right, sampleArray), [right]);
  const leftFinal = leftSteps[leftSteps.length - 1];
  const rightFinal = rightSteps[rightSteps.length - 1];

  return (
    <section className="algorithm-comparison" aria-label="Comparar algoritmos">
      <div className="bigo-section-heading">
        <div>
          <h2>Comparar algoritmos</h2>
          <p>Mesma entrada, duas estratégias. A simulação mede passos didáticos, não tempo real de CPU.</p>
        </div>
      </div>
      <div className="comparison-grid">
        <ComparisonPane algorithm={left} onChange={setLeft} finalStep={leftFinal} totalSteps={leftSteps.length} />
        <ComparisonPane algorithm={right} onChange={setRight} finalStep={rightFinal} totalSteps={rightSteps.length} />
      </div>
    </section>
  );
};

type PaneProps = {
  algorithm: SortAlgorithmId;
  onChange: (algorithm: SortAlgorithmId) => void;
  finalStep: ReturnType<typeof generateSortSteps>[number];
  totalSteps: number;
};

const ComparisonPane = ({ algorithm, onChange, finalStep, totalSteps }: PaneProps) => {
  const info = sortingAlgorithms.find((item) => item.id === algorithm) ?? sortingAlgorithms[0];
  return (
    <article className="comparison-pane">
      <label>Algoritmo
        <select value={algorithm} onChange={(event) => onChange(event.target.value as SortAlgorithmId)}>
          {sortingAlgorithms.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </label>
      <SortBars step={finalStep} />
      <dl>
        <div><dt>Passos</dt><dd>{totalSteps}</dd></div>
        <div><dt>Comparações</dt><dd>{finalStep.comparisons}</dd></div>
        <div><dt>Movimentos</dt><dd>{finalStep.moves}</dd></div>
        <div><dt>Teoria</dt><dd>{info.complexity}</dd></div>
      </dl>
    </article>
  );
};
