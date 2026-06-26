import { useState } from "react";
import { AlgorithmComparison } from "../components/bigo/AlgorithmComparison";
import { ComplexityChart } from "../components/bigo/ComplexityChart";
import { ComplexityIntro } from "../components/bigo/ComplexityIntro";
import { SortExplanationPanel } from "../components/bigo/SortExplanationPanel";
import { SortQuizSection } from "../components/bigo/SortQuizSection";
import { SortVisualizer } from "../components/bigo/SortVisualizer";
import type { SortAlgorithmId } from "../data/sortingAlgorithms";

export const ComplexityPage = () => {
  const [algorithm, setAlgorithm] = useState<SortAlgorithmId>("bubble");

  return (
    <main className="study-page complexity-page bigo-page">
      <header className="page-intro bigo-hero">
        <span>Big O em laboratório</span>
        <h1>Complexidade que dá para ver.</h1>
        <p>Compare curvas, rode ordenações passo a passo e treine as pegadinhas de prova que misturam array, vector, sort, busca e análise de custo.</p>
      </header>

      <ComplexityIntro />
      <ComplexityChart />
      <SortVisualizer algorithmId={algorithm} onAlgorithmChange={setAlgorithm} />
      <SortExplanationPanel algorithmId={algorithm} />
      <SortQuizSection />
      <AlgorithmComparison />
    </main>
  );
};
