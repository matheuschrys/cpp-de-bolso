import { getSortingAlgorithm, lambdaSortCode, stableSortCode, stdSortCode, type SortAlgorithmId } from "../../data/sortingAlgorithms";
import { CodeBlock } from "../CodeBlock";

type Props = {
  algorithmId: SortAlgorithmId;
};

export const SortExplanationPanel = ({ algorithmId }: Props) => {
  const algorithm = getSortingAlgorithm(algorithmId);

  return (
    <section className="sort-learning-panel" aria-label="Explicação do algoritmo escolhido">
      <article className="sort-facts">
        <header>
          <span>Algoritmo escolhido</span>
          <h2>{algorithm.name}</h2>
          <p>{algorithm.idea}</p>
        </header>
        <dl>
          <div><dt>Quando usar</dt><dd>{algorithm.useWhen}</dd></div>
          <div><dt>Quando evitar</dt><dd>{algorithm.avoidWhen}</dd></div>
          <div><dt>Melhor caso</dt><dd>{algorithm.best}</dd></div>
          <div><dt>Caso médio</dt><dd>{algorithm.average}</dd></div>
          <div><dt>Pior caso</dt><dd>{algorithm.worst}</dd></div>
          <div><dt>Espaço</dt><dd>{algorithm.space}</dd></div>
          <div><dt>Estável?</dt><dd>{algorithm.stable}</dd></div>
          <div><dt>In-place?</dt><dd>{algorithm.inPlace}</dd></div>
        </dl>
        <div className="exam-trap">
          <strong>Pegadinha de prova</strong>
          <p>{algorithm.examTrap}</p>
          <strong>Como reconhecer pelo código</strong>
          <p>{algorithm.recognize}</p>
        </div>
      </article>

      <article className="sort-code-panel">
        <div className="code-columns">
          <CodeBlock code={algorithm.pseudocode} title={`Pseudocódigo · ${algorithm.name}`} language="pseudocódigo" compact />
          <CodeBlock code={algorithm.cppCode} title={`C++ · ${algorithm.name}`} compact />
        </div>
        <div className="line-explanation">
          <h3>Leitura por blocos</h3>
          <ol>
            {algorithm.codeExplanation.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </div>
        <div className="stl-code-grid">
          <CodeBlock code={stdSortCode} title="std::sort básico" compact />
          <CodeBlock code={lambdaSortCode} title="sort com lambda" compact />
          <CodeBlock code={stableSortCode} title="stable_sort" compact />
        </div>
        <div className="stl-notes">
          <p><strong>std::sort</strong> ordena por padrão em ordem crescente e não garante estabilidade.</p>
          <p><strong>Comparator</strong> retorna true quando o primeiro elemento deve vir antes do segundo.</p>
          <p><strong>binary_search</strong> exige vetor ordenado pela mesma regra de comparação.</p>
          <p><strong>stable_sort</strong> preserva a ordem relativa de elementos equivalentes.</p>
        </div>
      </article>
    </section>
  );
};
