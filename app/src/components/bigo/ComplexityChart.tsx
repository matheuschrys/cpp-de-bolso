import { useMemo, useState } from "react";
import { complexityCards, complexityValue, type ComplexityKey } from "../../data/complexityData";

const formatCost = (value: number) => value >= 100_000 ? value.toExponential(1) : Math.round(value).toLocaleString("pt-BR");

export const ComplexityChart = () => {
  const [maxN, setMaxN] = useState(64);
  const [active, setActive] = useState<ComplexityKey[]>(["constant", "log", "linear", "nlogn", "quadratic"]);
  const [selected, setSelected] = useState<ComplexityKey>("quadratic");

  const points = useMemo(() => {
    const xValues = Array.from({ length: maxN }, (_, index) => index + 1);
    const visibleKeys = active.length ? active : ["constant" as const];
    const maxValue = Math.max(...visibleKeys.flatMap((key) => xValues.map((n) => Math.min(complexityValue(key, n), 100_000))));
    return complexityCards.map((curve) => ({
      ...curve,
      visible: active.includes(curve.key),
      valueAtMax: complexityValue(curve.key, maxN),
      path: xValues.map((n, index) => {
        const x = 32 + (index / Math.max(1, maxN - 1)) * 606;
        const capped = Math.min(complexityValue(curve.key, n), 100_000);
        const y = 278 - (capped / maxValue) * 236;
        return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
      }).join(" "),
    }));
  }, [active, maxN]);

  const selectedCurve = points.find((curve) => curve.key === selected) ?? points[0];

  const toggle = (key: ComplexityKey) => {
    setActive((current) => {
      if (current.includes(key)) {
        return current.length === 1 ? current : current.filter((item) => item !== key);
      }
      return [...current, key];
    });
    setSelected(key);
  };

  return (
    <section className="complexity-chart-panel" aria-label="Gráfico comparativo de complexidades">
      <div className="bigo-section-heading">
        <div>
          <h2>Gráfico comparativo de complexidades</h2>
          <p>Valores ilustrativos. Use o controle para sentir como as curvas reagem quando n cresce.</p>
        </div>
        <label className="chart-range">
          <span>n máximo: <strong>{maxN}</strong></span>
          <input type="range" min={8} max={128} step={4} value={maxN} onChange={(event) => setMaxN(Number(event.target.value))} />
        </label>
      </div>

      <div className="curve-toggles" aria-label="Selecionar curvas">
        {complexityCards.map((curve) => (
          <button key={curve.key} type="button" className={active.includes(curve.key) ? "is-active" : ""} aria-pressed={active.includes(curve.key)} onClick={() => toggle(curve.key)}>
            <span className={`curve-dot curve-dot--${curve.colorClass}`} />{curve.label}
          </button>
        ))}
      </div>

      <div className="chart-shell">
        <svg viewBox="0 0 680 320" role="img" aria-label="Curvas de Big O">
          <g className="chart-grid">
            {[0, 1, 2, 3, 4].map((line) => <line key={line} x1="32" x2="638" y1={42 + line * 59} y2={42 + line * 59} />)}
            {[0, 1, 2, 3, 4].map((line) => <line key={line} y1="42" y2="278" x1={32 + line * 151.5} x2={32 + line * 151.5} />)}
          </g>
          <line className="chart-axis" x1="32" x2="638" y1="278" y2="278" />
          <line className="chart-axis" x1="32" x2="32" y1="42" y2="278" />
          {points.filter((curve) => curve.visible).map((curve) => (
            <path key={curve.key} className={`curve-line curve-line--${curve.colorClass} ${selected === curve.key ? "is-selected" : ""}`} d={curve.path} onClick={() => setSelected(curve.key)} />
          ))}
          <text x="34" y="304">entrada n</text>
          <text x="42" y="34">custo relativo</text>
        </svg>
        <aside className={`chart-tooltip chart-tooltip--${selectedCurve.colorClass}`}>
          <span>Curva selecionada</span>
          <strong>{selectedCurve.label}</strong>
          <p>{selectedCurve.description}</p>
          <code>custo em n={maxN}: {formatCost(selectedCurve.valueAtMax)}</code>
        </aside>
      </div>

      <p className="bigo-alert">Observe que O(n²), O(2ⁿ) e O(n!) crescem muito rápido. Em provas, quando aparecer laço dentro de laço, acenda o alerta vermelho.</p>
    </section>
  );
};
