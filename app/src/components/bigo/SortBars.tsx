import type { SortStep } from "../../data/sortingAlgorithms";

type Props = {
  step: SortStep;
};

export const SortBars = ({ step }: Props) => {
  const max = Math.max(...step.array, 1);
  const comparing = new Set(step.comparing ?? []);
  const swapping = new Set(step.swapping ?? []);
  const sorted = new Set(step.sortedIndices ?? []);
  const active = new Set(step.activeIndices ?? []);

  return (
    <div className="sort-bars" aria-label={`Array atual: ${step.array.join(", ")}`}>
      {step.array.map((value, index) => {
        const state = [
          comparing.has(index) ? "is-comparing" : "",
          swapping.has(index) ? "is-swapping" : "",
          sorted.has(index) ? "is-sorted" : "",
          active.has(index) ? "is-active" : "",
          step.pivotIndex === index ? "is-pivot" : "",
        ].filter(Boolean).join(" ");
        return (
          <div className={`sort-bar ${state}`} key={`${index}-${value}`}>
            <span style={{ height: `${Math.max(16, (value / max) * 100)}%` }} />
            <b>{value}</b>
            <small>{index}</small>
          </div>
        );
      })}
    </div>
  );
};
