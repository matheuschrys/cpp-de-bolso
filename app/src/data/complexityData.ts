export type ComplexityKey = "constant" | "log" | "linear" | "nlogn" | "quadratic" | "exponential" | "factorial";

export type ComplexityInfo = {
  key: ComplexityKey;
  label: string;
  name: string;
  description: string;
  analogy: string;
  example: string;
  code: string;
  appears: string;
  colorClass: string;
};

export const complexityCards: ComplexityInfo[] = [
  {
    key: "constant",
    label: "O(1)",
    name: "Constante",
    description: "O custo fica praticamente igual, mesmo se a entrada crescer.",
    analogy: "Pegar o primeiro livro da pilha.",
    example: "Acessar o primeiro elemento de um vector.",
    code: "int primeiro = v[0];",
    appears: "Acesso por índice, topo da pilha, frente da fila.",
    colorClass: "constant",
  },
  {
    key: "log",
    label: "O(log n)",
    name: "Logarítmica",
    description: "Cresce devagar porque o problema diminui muito a cada passo.",
    analogy: "Abrir um dicionário sempre pela metade.",
    example: "Busca binária em vetor ordenado.",
    code: "while (ini <= fim) meio = (ini + fim) / 2;",
    appears: "Busca binária, árvores balanceadas, divisão pela metade.",
    colorClass: "log",
  },
  {
    key: "linear",
    label: "O(n)",
    name: "Linear",
    description: "O custo cresce junto com a quantidade de elementos.",
    analogy: "Procurar livro por livro.",
    example: "Busca linear.",
    code: "for (int x : v) visitar(x);",
    appears: "Percorrer array, somar vector, validar todos os itens.",
    colorClass: "linear",
  },
  {
    key: "nlogn",
    label: "O(n log n)",
    name: "Linearítmica",
    description: "Mistura divisão do problema com processamento dos elementos.",
    analogy: "Dividir, resolver pedaços e juntar.",
    example: "Merge Sort e Quick Sort no caso médio.",
    code: "mergeSort(v, ini, fim);",
    appears: "Ordenações eficientes por comparação.",
    colorClass: "nlogn",
  },
  {
    key: "quadratic",
    label: "O(n²)",
    name: "Quadrática",
    description: "Cresce muito mais rápido, geralmente por causa de laços aninhados.",
    analogy: "Comparar cada livro com todos os outros.",
    example: "Bubble Sort simples.",
    code: "for (int i=0;i<n;i++)\n  for (int j=0;j<n;j++) comparar(i, j);",
    appears: "Bubble, Selection, Insertion no pior caso.",
    colorClass: "quadratic",
  },
  {
    key: "exponential",
    label: "O(2ⁿ)",
    name: "Exponencial",
    description: "Cada elemento costuma abrir duas possibilidades novas.",
    analogy: "Cada escolha cria dois caminhos.",
    example: "Gerar subconjuntos.",
    code: "total = 1 << n;",
    appears: "Backtracking e força bruta combinatória.",
    colorClass: "exponential",
  },
  {
    key: "factorial",
    label: "O(n!)",
    name: "Fatorial",
    description: "Testa permutações; fica inviável muito cedo.",
    analogy: "Testar todas as ordens possíveis dos livros.",
    example: "Permutar todos os elementos.",
    code: "do testar(v);\nwhile (next_permutation(v.begin(), v.end()));",
    appears: "Permutações e força bruta de rotas.",
    colorClass: "factorial",
  },
];

export const complexityTableRows = [
  ["O(1)", "constante", "acessar v[0]", "não depende de n"],
  ["O(log n)", "logarítmica", "busca binária", "cresce bem devagar"],
  ["O(n)", "linear", "busca linear", "cresce junto com n"],
  ["O(n log n)", "linearítmica", "merge sort", "comum em sorts eficientes"],
  ["O(n²)", "quadrática", "bubble sort", "cresce muito rápido"],
  ["O(2ⁿ)", "exponencial", "subconjuntos", "explode rápido"],
  ["O(n!)", "fatorial", "permutações", "explode muito rápido"],
] as const;

export const complexityValue = (key: ComplexityKey, n: number) => {
  const safeN = Math.max(1, n);
  if (key === "constant") return 1;
  if (key === "log") return Math.log2(safeN);
  if (key === "linear") return safeN;
  if (key === "nlogn") return safeN * Math.log2(safeN);
  if (key === "quadratic") return safeN * safeN;
  if (key === "exponential") return 2 ** Math.min(safeN, 18);
  return factorial(Math.min(safeN, 10));
};

const factorial = (n: number) => {
  let total = 1;
  for (let value = 2; value <= n; value += 1) total *= value;
  return total;
};
