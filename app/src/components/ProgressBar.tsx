type ProgressBarProps = {
  value: number;
  label: string;
};

export const ProgressBar = ({ value, label }: ProgressBarProps) => (
  <div className="progress-block" aria-label={label}>
    <div className="progress-row">
      <span>{label}</span>
      <strong>{Math.round(value)}%</strong>
    </div>
    <div className="progress-track">
      <span className="progress-fill" style={{ width: `${value}%` }} />
    </div>
  </div>
);
