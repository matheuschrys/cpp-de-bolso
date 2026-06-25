import type { SimulationReport } from "../types/study";

export const SimulationResult = ({ report, onRetryWrong, onNew }: { report: SimulationReport; onRetryWrong: () => void; onNew: () => void }) => {
  const percentage = Math.round((report.correct / report.total) * 100);
  return (
    <section className="simulation-result">
      <span className="result-overline">Resultado do simulado</span>
      <strong>{percentage}%</strong>
      <h2>{report.correct} de {report.total} acertos</h2>
      <p>{report.incorrectIds.length ? `Você errou ${report.incorrectIds.length}. Releia a explicação e refaça sem pressa.` : "Perfeito. Sua leitura de código está muito afiada."}</p>
      {report.weakThemes.length ? <div className="weak-themes"><b>Revisar agora:</b> {report.weakThemes.join(" · ")}</div> : null}
      <div className="button-row"><button className="button button--primary" type="button" onClick={onRetryWrong} disabled={!report.incorrectIds.length}>Refazer erradas</button><button className="button button--quiet" type="button" onClick={onNew}>Novo simulado</button></div>
    </section>
  );
};
