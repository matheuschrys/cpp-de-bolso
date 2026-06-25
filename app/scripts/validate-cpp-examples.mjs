import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const samples = [
  ["arquivo", [
    "#include <fstream>",
    "struct Registro { int id; double saldo; };",
    "int main() {",
    "  std::fstream arq(\"contas.dat\", std::ios::in | std::ios::out | std::ios::binary);",
    "  Registro r{3, 120.0};",
    "  if (arq) { arq.seekp(2 * sizeof(Registro)); arq.write(reinterpret_cast<const char*>(&r), sizeof r); }",
    "}",
  ].join("\n")],
  ["strings", [
    "#include <iostream>",
    "#include <string>",
    "int main() { int idade{}; std::string nome; std::cin >> idade; std::getline(std::cin >> std::ws, nome); }",
  ].join("\n")],
 ["classe", [
   "#include <string>",
    "#include <utility>",
   "class Conta { const int id_; std::string titular_; public: Conta(int id, std::string titular) : id_(id), titular_(std::move(titular)) {} int id() const { return id_; } };",
    "int main() { Conta conta(1, \"Ana\"); return conta.id() == 1 ? 0 : 1; }",
  ].join("\n")],
  ["operadores", [
    "#include <ostream>",
    "class Vetor { int x_{}; public: explicit Vetor(int x) : x_(x) {} Vetor& operator+=(const Vetor& outro) { x_ += outro.x_; return *this; } friend Vetor operator+(Vetor a, const Vetor& b) { return a += b; } friend std::ostream& operator<<(std::ostream& out, const Vetor& v) { return out << v.x_; } };",
    "int main() { Vetor a(1), b(2); Vetor c = a + b; (void)c; }",
  ].join("\n")],
  ["estruturas", [
    "#include <queue>",
    "#include <stack>",
    "struct No { int valor; No* prox; };",
    "int main() { No* inicio = new No{10, new No{20, nullptr}}; No* removido = inicio; inicio = inicio->prox; delete removido; delete inicio; std::stack<int> p; p.push(1); p.pop(); std::queue<int> f; f.push(2); f.pop(); }",
  ].join("\n")],
  ["algoritmos", [
    "#include <algorithm>",
    "#include <vector>",
    "int busca(const std::vector<int>& v, int alvo, int inicio, int fim) { if (inicio > fim) return -1; int meio = inicio + (fim - inicio) / 2; if (v[meio] == alvo) return meio; return alvo < v[meio] ? busca(v, alvo, inicio, meio - 1) : busca(v, alvo, meio + 1, fim); }",
    "int main() { std::vector<int> v{4, 2, 1}; std::sort(v.begin(), v.end()); return busca(v, 2, 0, static_cast<int>(v.size()) - 1) < 0; }",
  ].join("\n")],
  ["serializacao", [
    "#include <cstdint>",
    "#include <fstream>",
    "#include <string>",
    "void gravar(std::ofstream& arq, const std::string& texto) { std::uint32_t tamanho = static_cast<std::uint32_t>(texto.size()); arq.write(reinterpret_cast<const char*>(&tamanho), sizeof tamanho); arq.write(texto.data(), tamanho); }",
    "int main() { std::ofstream arq(\"texto.dat\", std::ios::binary); if (arq) gravar(arq, \"Ana\"); }",
  ].join("\n")],
  ["referencia_const", [
    "#include <string>",
    "class Medida { const int escala_; std::string& unidade_; public: Medida(int escala, std::string& unidade) : escala_(escala), unidade_(unidade) {} int escala() const { return escala_; } };",
    "int main() { std::string unidade = \"cm\"; Medida medida(10, unidade); return medida.escala() == 10 ? 0 : 1; }",
  ].join("\n")],
  ["ordenacao_estavel", [
    "#include <algorithm>",
    "#include <string>",
    "#include <vector>",
    "struct Aluno { std::string nome; double nota; };",
    "int main() { std::vector<Aluno> alunos{{\"Ana\", 8.0}, {\"Bia\", 9.0}}; std::stable_sort(alunos.begin(), alunos.end(), [](const Aluno& a, const Aluno& b) { return a.nota > b.nota; }); return alunos.front().nome == \"Bia\" ? 0 : 1; }",
  ].join("\n")],
  ["limites_busca", [
    "#include <algorithm>",
    "#include <vector>",
    "int main() { std::vector<int> v{1, 2, 2, 5}; auto primeiro = std::lower_bound(v.begin(), v.end(), 2); auto depois = std::upper_bound(v.begin(), v.end(), 2); return (depois - primeiro) == 2 ? 0 : 1; }",
  ].join("\n")],
];

const directory = mkdtempSync(join(tmpdir(), "cpp-de-bolso-examples-"));
let failures = 0;

try {
  for (const [name, source] of samples) {
    const file = join(directory, name + ".cpp");
    writeFileSync(file, source);
    try {
      execFileSync("g++", ["-std=c++17", "-Wall", "-Wextra", "-pedantic", "-fsyntax-only", file], { stdio: "pipe" });
      console.log("C++ válido:", name);
    } catch (error) {
      failures += 1;
      console.error("Falha C++ em " + name + ":\n" + error.stderr.toString());
    }
  }
} finally {
  rmSync(directory, { recursive: true, force: true });
}

if (failures) process.exitCode = 1;
