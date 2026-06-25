import type { SimulationReport } from "../types/study";

const score = (correct: number, total: number) => total ? Math.round((correct / total) * 100) : 0;

export const SimulationResult = ({ report, onRetryWrong, onNew }: { report: SimulationReport; onRetryWrong: () => void; onNew: () => void }) => {
  const percentage = score(report.correct, report.total);
  const detailRows = [
    ...(report.breakdown?.byTheme.slice(0, 5).map((item) => ({ group: "Tema", ...item })) ?? []),
    ...(report.breakdown?.byDifficulty.map((item) => ({ group: "Dificuldade", ...item })) ?? []),
    ...(report.breakdown?.byKind.slice(0, 4).map((item) => ({ group: "Tipo", ...item })) ?? []),
  ];

  return (
    <section className="simulation-result">
      <span className="result-overline">Resultado do simulado</span>
      <strong>{percentage}%</strong>
      <h2>{report.correct} de {report.total} acertos</h2>
      <p>{report.incorrectIds.length ? `Você errou ${report.incorrectIds.length}. Releia a explicação e refaça sem pressa.` : "Perfeito. Sua leitura de código está muito afiada."}</p>
      {report.weakThemes.length ? <div className="weak-themes"><b>Revisar agora:</b> {report.weakThemes.join(" · ")}</div> : null}
      {detailRows.length ? <div className="simulation-breakdown" aria-label="Análise detalhada do resultado">
        {detailRows.map((item) => (
          <article key={`${item.group}-${item.label}`}>
            <span>{item.group}</span>
            <strong>{item.label}</strong>
            <small>{item.correct}/{item.total} · {score(item.correct, item.total)}%</small>
            <i><b style={{ width: `${score(item.correct, item.total)}%` }} /></i>
          </article>
        ))}
      </div> : null}
      <div className="button-row"><button className="button button--primary" type="button" onClick={onRetryWrong} disabled={!report.incorrectIds.length}>Refazer erradas</button><button className="button button--quiet" type="button" onClick={onNew}>Novo simulado</button></div>
    </section>
  );
};
