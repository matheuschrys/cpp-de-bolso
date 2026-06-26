import { useEffect, useMemo, useState } from "react";
import { generateSortSteps, sortingAlgorithms, type SortAlgorithmId } from "../../data/sortingAlgorithms";
import { SortBars } from "./SortBars";

const defaultArray = [7, 5, 9, 4, 2, 8, 1, 6];
const speedToDelay = (speed: number) => 900 - speed * 70;

const parseManualArray = (value: string) => value
  .split(",")
  .map((item) => Number(item.trim()))
  .filter((item) => Number.isFinite(item) && item > 0)
  .slice(0, 16);

type Props = {
  algorithmId: SortAlgorithmId;
  onAlgorithmChange: (algorithm: SortAlgorithmId) => void;
};

export const SortVisualizer = ({ algorithmId, onAlgorithmChange }: Props) => {
  const [array, setArray] = useState(defaultArray);
  const [manualArray, setManualArray] = useState(defaultArray.join(", "));
  const [size, setSize] = useState(defaultArray.length);
  const [speed, setSpeed] = useState(6);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = useMemo(() => generateSortSteps(algorithmId, array), [algorithmId, array]);
  const currentStep = steps[Math.min(stepIndex, steps.length - 1)];

  useEffect(() => {
    setStepIndex(0);
    setIsPlaying(false);
  }, [algorithmId, array]);

  useEffect(() => {
    if (!isPlaying) return undefined;
    if (stepIndex >= steps.length - 1) {
      setIsPlaying(false);
      return undefined;
    }
    const timer = window.setTimeout(() => setStepIndex((current) => Math.min(current + 1, steps.length - 1)), speedToDelay(speed));
    return () => window.clearTimeout(timer);
  }, [isPlaying, speed, stepIndex, steps.length]);

  const generateArray = (nextSize = size) => {
    const values = Array.from({ length: nextSize }, () => Math.floor(Math.random() * 19) + 1);
    setArray(values);
    setManualArray(values.join(", "));
  };

  const shuffleArray = () => {
    const values = [...array];
    for (let index = values.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [values[index], values[target]] = [values[target], values[index]];
    }
    setArray(values);
    setManualArray(values.join(", "));
  };

  const applyManualArray = () => {
    const values = parseManualArray(manualArray);
    if (values.length >= 2) {
      setArray(values);
      setSize(values.length);
      setManualArray(values.join(", "));
    }
  };

  const changeSize = (nextSize: number) => {
    setSize(nextSize);
    generateArray(nextSize);
  };

  return (
    <section className="sort-visualizer" aria-label="Simulador visual de ordenação">
      <div className="bigo-section-heading">
        <div>
          <h2>Simulador de Ordenação</h2>
          <p>Escolha um algoritmo e acompanhe comparações, trocas, pivô e partes ordenadas passo a passo.</p>
        </div>
        <div className="sort-counters" aria-label="Contadores">
          <span><strong>{currentStep.comparisons}</strong> comparações</span>
          <span><strong>{currentStep.moves}</strong> trocas/movimentos</span>
          <span><strong>{stepIndex + 1}</strong> de {steps.length} passos</span>
        </div>
      </div>

      <div className="sort-layout">
        <div className="sort-stage">
          <SortBars step={currentStep} />
          <div className="step-explanation">
            <span>Status atual</span>
            <strong>{currentStep.message}</strong>
            <p>{currentStep.explanation}</p>
            <div className="state-legend">
              <span><i className="legend-compare" />comparando</span>
              <span><i className="legend-swap" />trocando/movendo</span>
              <span><i className="legend-pivot" />pivô/menor/chave</span>
              <span><i className="legend-sorted" />ordenado</span>
            </div>
          </div>
        </div>

        <aside className="sort-controls" aria-label="Controles do simulador">
          <label>Algoritmo
            <select value={algorithmId} onChange={(event) => onAlgorithmChange(event.target.value as SortAlgorithmId)}>
              {sortingAlgorithms.map((algorithm) => <option key={algorithm.id} value={algorithm.id}>{algorithm.name}</option>)}
            </select>
          </label>
          <label>Tamanho do array: <strong>{size}</strong>
            <input type="range" min={5} max={16} value={size} onChange={(event) => changeSize(Number(event.target.value))} />
          </label>
          <label>Velocidade: <strong>{speed}</strong>
            <input type="range" min={1} max={10} value={speed} onChange={(event) => setSpeed(Number(event.target.value))} />
          </label>
          <label>Array manual
            <input value={manualArray} onChange={(event) => setManualArray(event.target.value)} onBlur={applyManualArray} placeholder="7, 5, 9, 4, 2" />
          </label>
          <button className="button button--quiet sort-apply-array" type="button" onClick={applyManualArray}>Aplicar array manual</button>
          <div className="sort-button-grid">
            <button className="button button--quiet" type="button" onClick={() => generateArray()}>Gerar novo array</button>
            <button className="button button--quiet" type="button" onClick={shuffleArray}>Embaralhar</button>
            <button className="button button--primary" type="button" onClick={() => setIsPlaying(true)} disabled={stepIndex >= steps.length - 1}>Ordenar</button>
            <button className="button button--quiet" type="button" onClick={() => setIsPlaying(false)} disabled={!isPlaying}>Pausar</button>
            <button className="button button--quiet" type="button" onClick={() => setStepIndex((current) => Math.min(current + 1, steps.length - 1))} disabled={stepIndex >= steps.length - 1}>Próximo passo</button>
            <button className="button button--quiet" type="button" onClick={() => { setStepIndex(0); setIsPlaying(false); }}>Resetar</button>
          </div>
        </aside>
      </div>
    </section>
  );
};
