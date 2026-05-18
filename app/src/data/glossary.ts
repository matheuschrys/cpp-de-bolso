export type GlossaryTerm = {
  term: string;
  definition: string;
  example: string;
  related: string[];
};

export const glossary: GlossaryTerm[] = [
  {
    term: "main",
    definition: "Função onde a execução de um programa C++ começa.",
    example: "int main() { return 0; }",
    related: ["função", "return", "bloco"],
  },
  {
    term: "cout",
    definition: "Objeto usado para mostrar dados na saída padrão.",
    example: "std::cout << \"Oi\\n\";",
    related: ["iostream", "saída", "operador <<"],
  },
  {
    term: "cin",
    definition: "Objeto usado para ler dados da entrada padrão.",
    example: "std::cin >> idade;",
    related: ["entrada", "operador >>", "variável"],
  },
  {
    term: "variável",
    definition: "Nome usado para guardar e acessar um valor na memória.",
    example: "int idade = 20;",
    related: ["tipo", "memória", "atribuição"],
  },
  {
    term: "tipo",
    definition: "Regra que define quais valores uma variável pode guardar.",
    example: "double media = 8.5;",
    related: ["int", "double", "char", "bool"],
  },
  {
    term: "memória",
    definition: "Área onde valores e instruções ficam armazenados enquanto o programa roda.",
    example: "int x = 10; // x ocupa um espaço de memória",
    related: ["variável", "endereço", "ponteiro"],
  },
  {
    term: "operador",
    definition: "Símbolo que executa uma operação sobre valores.",
    example: "x + y",
    related: ["aritmética", "comparação", "atribuição"],
  },
  {
    term: "if",
    definition: "Comando que executa um bloco somente se uma condição for verdadeira.",
    example: "if (idade >= 18) { std::cout << \"ok\"; }",
    related: ["condição", "else", "operador relacional"],
  },
  {
    term: "while",
    definition: "Laço que repete um bloco enquanto a condição continuar verdadeira.",
    example: "while (contador <= 5) { contador++; }",
    related: ["loop", "condição", "contador"],
  },
  {
    term: "for",
    definition: "Laço que reúne inicialização, condição e atualização do contador.",
    example: "for (int i = 0; i < 3; i++) { }",
    related: ["loop", "contador", "array"],
  },
  {
    term: "função",
    definition: "Bloco de código com nome, criado para realizar uma tarefa.",
    example: "int somar(int a, int b) { return a + b; }",
    related: ["parâmetro", "argumento", "retorno"],
  },
  {
    term: "parâmetro",
    definition: "Nome recebido pela função para trabalhar com um valor enviado.",
    example: "int dobrar(int x) { return x * 2; }",
    related: ["função", "argumento", "passagem por valor"],
  },
  {
    term: "argumento",
    definition: "Valor enviado na chamada de uma função.",
    example: "dobrar(5);",
    related: ["função", "parâmetro", "chamada"],
  },
  {
    term: "retorno",
    definition: "Valor que uma função devolve para quem a chamou.",
    example: "return a + b;",
    related: ["função", "return", "tipo"],
  },
  {
    term: "escopo",
    definition: "Região do código onde uma variável ou nome pode ser usado.",
    example: "{ int local = 1; }",
    related: ["bloco", "variável local", "função"],
  },
  {
    term: "pilha de chamadas",
    definition: "Estrutura que acompanha quais funções estão em execução.",
    example: "main() -> calcular() -> quadrado()",
    related: ["função", "chamada", "variável local"],
  },
  {
    term: "ponteiro",
    definition: "Variável que guarda o endereço de outra variável.",
    example: "int* p = &idade;",
    related: ["endereço", "memória", "nullptr"],
  },
  {
    term: "endereço",
    definition: "Localização de uma variável na memória.",
    example: "&idade",
    related: ["ponteiro", "memória", "referência"],
  },
  {
    term: "referência",
    definition: "Apelido para uma variável existente.",
    example: "void alterar(int& x) { x = 10; }",
    related: ["parâmetro", "função", "ponteiro"],
  },
  {
    term: "array",
    definition: "Coleção de tamanho fixo com elementos do mesmo tipo.",
    example: "int notas[3] = {8, 9, 10};",
    related: ["índice", "for", "ponteiro"],
  },
  {
    term: "string",
    definition: "Tipo da biblioteca padrão usado para guardar texto.",
    example: "std::string nome = \"Ana\";",
    related: ["texto", "getline", "índice"],
  },
  {
    term: "vector",
    definition: "Coleção dinâmica da biblioteca padrão que pode crescer.",
    example: "std::vector<int> numeros;",
    related: ["STL", "push_back", "size"],
  },
  {
    term: "STL",
    definition: "Parte da biblioteca padrão com contêineres, algoritmos e iteradores.",
    example: "std::vector<int> valores = {1, 2, 3};",
    related: ["vector", "algoritmo", "iterador"],
  },
];
