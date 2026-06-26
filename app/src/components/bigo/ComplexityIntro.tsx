import { complexityCards, complexityTableRows } from "../../data/complexityData";

export const ComplexityIntro = () => (
  <>
    <section className="bigo-plain">
      <div>
        <h2>Big O sem trauma</h2>
        <p>Big O mede como o custo cresce quando a entrada aumenta. Ele não promete segundos exatos; mostra tendência de crescimento.</p>
      </div>
      <ul>
        <li><strong>O(1)</strong> é tempo constante.</li>
        <li><strong>O(n)</strong> cresce junto com a entrada.</li>
        <li><strong>O(n²)</strong> acende alerta quando aparece laço dentro de laço.</li>
        <li><strong>O(log n)</strong> cresce devagar, comum em busca binária.</li>
        <li><strong>O(n log n)</strong> aparece em ordenações eficientes como Merge Sort e Quick Sort no caso médio.</li>
      </ul>
    </section>

    <section className="complexity-card-grid" aria-label="Cards de complexidade">
      {complexityCards.map((item) => (
        <article className={`complexity-card complexity-card--${item.colorClass}`} key={item.key}>
          <header>
            <strong>{item.label}</strong>
            <span>{item.name}</span>
          </header>
          <p>{item.description}</p>
          <dl>
            <div><dt>Analogia</dt><dd>{item.analogy}</dd></div>
            <div><dt>Exemplo</dt><dd>{item.example}</dd></div>
            <div><dt>Onde aparece</dt><dd>{item.appears}</dd></div>
          </dl>
          <pre className="complexity-card__code" aria-label={`${item.label} em código`}>
            <code>{item.code}</code>
          </pre>
        </article>
      ))}
    </section>

    <section className="complexity-table-wrap bigo-table">
      <table className="complexity-table">
        <thead>
          <tr><th>Complexidade</th><th>Nome comum</th><th>Exemplo típico</th><th>Crescimento</th></tr>
        </thead>
        <tbody>
          {complexityTableRows.map(([complexity, name, example, growth]) => (
            <tr key={complexity}><td><code>{complexity}</code></td><td>{name}</td><td>{example}</td><td>{growth}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  </>
);
