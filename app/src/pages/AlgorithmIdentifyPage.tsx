import { useState } from "react";
import { StudyQuestionCard } from "../components/StudyQuestionCard";
import { questionBank } from "../data/questionBank";
import type { StudyQuestion } from "../types/study";

export const AlgorithmIdentifyPage = ({ onAnswered }: { onAnswered: (question: StudyQuestion, correct: boolean) => void }) => {
  const cards = questionBank.filter((question) => question.tags.includes("identifique o algoritmo"));
  const [index, setIndex] = useState(0);
  const card = cards[index];
  return <main className="study-page algorithm-page"><header className="page-intro"><span>Modo de reconhecimento</span><h1>Identifique o algoritmo.</h1><p>Leia o movimento do código, não apenas o nome das variáveis: vizinhos, menor, chave, divisão, pivô, heap, pilha ou fila.</p></header>{card ? <><StudyQuestionCard question={card} position={index + 1} onAnswered={onAnswered} /><div className="button-row algorithm-nav"><button className="button button--quiet" type="button" onClick={() => setIndex((current) => (current + cards.length - 1) % cards.length)}>← Anterior</button><span>{index + 1}/{cards.length}</span><button className="button button--primary" type="button" onClick={() => setIndex((current) => (current + 1) % cards.length)}>Próximo →</button></div></> : null}</main>;
};
