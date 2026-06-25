import { CodeBlock } from "../components/CodeBlock";

const starter = [
  "#include <iostream>",
  "#include <string>",
  "#include <utility>",
  "",
  "class ContaBancaria {",
  "private:",
  "    const int numero_;",
  "    std::string titular_;",
  "    double saldo_;",
  "",
  "public:",
  "    ContaBancaria(int numero, std::string titular, double saldoInicial)",
  "        : numero_(numero), titular_(std::move(titular)), saldo_(saldoInicial) {}",
  "",
  "    double saldo() const { return saldo_; }",
  "",
  "    bool sacar(double valor) {",
  "        // implemente a validação",
  "        return false;",
  "    }",
  "",
  "    ContaBancaria& operator+=(double valor) {",
  "        // implemente depósito com validação",
  "        return *this;",
  "    }",
  "",
  "    friend std::ostream& operator<<(std::ostream& out, const ContaBancaria& conta);",
  "};",
].join("\n");

export const PracticeChallengePage = () => (
  <main className="study-page practice-page">
    <header className="page-intro">
      <span>Questão prática · 5 pontos</span>
      <h1>ContaBancaria: contrato completo</h1>
      <p>Uma questão maior, no clima da questão 11: você precisa fazer os recursos trabalharem juntos, não apenas lembrar definições.</p>
    </header>
    <section className="challenge-layout">
      <div>
        <h2>Seu objetivo</h2>
        <ol>
          <li>Construa a conta com lista de inicialização e saldo inicial válido.</li>
          <li>Implemente getters const para número, titular e saldo.</li>
          <li>Crie depositar e sacar com validação e retorno claro.</li>
          <li>Implemente operator+= para depósito encadeável.</li>
          <li>Crie operator&lt;&lt; como friend e uma main demonstrativa.</li>
          <li>Explique onde o destrutor apareceria e por que, neste caso, o compilador já resolve a liberação dos membros RAII.</li>
        </ol>
        <div className="study-callouts">
          <p><strong>Critério de prova:</strong> não exponha saldo_; mostre que o objeto conserva seus próprios invariantes.</p>
          <p><strong>Macete:</strong> se um método altera a conta e deve encadear, o retorno tende a ser ContaBancaria&amp; com return *this.</p>
        </div>
      </div>
      <CodeBlock code={starter} title="Esqueleto para completar" />
    </section>
  </main>
);
