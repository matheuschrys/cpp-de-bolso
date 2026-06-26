export type SortAlgorithmId = "bubble" | "selection" | "insertion" | "merge" | "quick";

export type SortStep = {
  array: number[];
  comparing?: number[];
  swapping?: number[];
  sortedIndices?: number[];
  pivotIndex?: number | null;
  activeIndices?: number[];
  range?: [number, number] | null;
  message: string;
  explanation: string;
  comparisons: number;
  moves: number;
};

export type SortAlgorithmInfo = {
  id: SortAlgorithmId;
  name: string;
  idea: string;
  useWhen: string;
  avoidWhen: string;
  best: string;
  average: string;
  worst: string;
  space: string;
  stable: string;
  inPlace: string;
  examTrap: string;
  recognize: string;
  pseudocode: string;
  cppCode: string;
  codeExplanation: string[];
  complexity: string;
};

const bubbleCode = `void bubbleSort(std::vector<int>& v) {
  int n = static_cast<int>(v.size());
  bool trocou = true;

  for (int fim = n - 1; fim > 0 && trocou; --fim) {
    trocou = false;
    for (int j = 0; j < fim; ++j) {
      if (v[j] > v[j + 1]) {
        std::swap(v[j], v[j + 1]);
        trocou = true;
      }
    }
  }
}`;

const selectionCode = `void selectionSort(std::vector<int>& v) {
  int n = static_cast<int>(v.size());

  for (int i = 0; i < n - 1; ++i) {
    int menor = i;
    for (int j = i + 1; j < n; ++j) {
      if (v[j] < v[menor]) menor = j;
    }
    std::swap(v[i], v[menor]);
  }
}`;

const insertionCode = `void insertionSort(std::vector<int>& v) {
  for (int i = 1; i < static_cast<int>(v.size()); ++i) {
    int chave = v[i];
    int j = i - 1;

    while (j >= 0 && v[j] > chave) {
      v[j + 1] = v[j];
      --j;
    }
    v[j + 1] = chave;
  }
}`;

const mergeCode = `void mergeSort(std::vector<int>& v, int ini, int fim) {
  if (ini >= fim) return;

  int meio = ini + (fim - ini) / 2;
  mergeSort(v, ini, meio);
  mergeSort(v, meio + 1, fim);
  intercalar(v, ini, meio, fim);
}`;

const quickCode = `int particionar(std::vector<int>& v, int ini, int fim) {
  int pivo = v[fim];
  int i = ini;

  for (int j = ini; j < fim; ++j) {
    if (v[j] <= pivo) {
      std::swap(v[i], v[j]);
      ++i;
    }
  }
  std::swap(v[i], v[fim]);
  return i;
}`;

export const stdSortCode = `std::vector<int> v = {4, 2, 5, 1};
std::sort(v.begin(), v.end());`;

export const lambdaSortCode = `std::sort(alunos.begin(), alunos.end(), [](const Aluno& a, const Aluno& b) {
  return a.nota > b.nota;
});`;

export const stableSortCode = `std::stable_sort(alunos.begin(), alunos.end(), [](const Aluno& a, const Aluno& b) {
  return a.turma < b.turma;
});`;

export const sortingAlgorithms: SortAlgorithmInfo[] = [
  {
    id: "bubble",
    name: "Bubble Sort",
    idea: "Compara vizinhos e empurra os maiores para o final a cada passada.",
    useWhen: "Para estudar laços aninhados, trocas e estabilidade; raramente para produção.",
    avoidWhen: "Quando o vetor é grande ou desempenho importa.",
    best: "O(n), se tiver flag de troca e o vetor já estiver ordenado.",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: "Sim",
    inPlace: "Sim",
    examTrap: "Bubble Sort sem flag de troca continua O(n²) mesmo se o vetor já estiver ordenado.",
    recognize: "Procure comparação entre v[j] e v[j + 1] seguida de swap de vizinhos.",
    pseudocode: "para fim de n-1 até 1\n  trocou = falso\n  para j de 0 até fim-1\n    se v[j] > v[j+1]\n      troque vizinhos\n      trocou = verdadeiro\n  se não trocou, pare",
    cppCode: bubbleCode,
    codeExplanation: ["O laço externo controla quantas posições finais já estão corretas.", "A flag `trocou` permite parar cedo.", "O laço interno compara vizinhos.", "Se estiverem invertidos, troca e marca que houve movimento."],
    complexity: "O(n²)",
  },
  {
    id: "selection",
    name: "Selection Sort",
    idea: "Encontra o menor elemento da parte não ordenada e coloca na posição correta.",
    useWhen: "Quando você quer poucas trocas e o tamanho é pequeno.",
    avoidWhen: "Quando o custo de comparações O(n²) é caro.",
    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: "Geralmente não",
    inPlace: "Sim",
    examTrap: "Faz poucas trocas, mas continua fazendo muitas comparações.",
    recognize: "Procure uma variável `menor` ou `minIndex` atualizada dentro do laço interno.",
    pseudocode: "para i de 0 até n-2\n  menor = i\n  para j de i+1 até n-1\n    se v[j] < v[menor]\n      menor = j\n  troque v[i] com v[menor]",
    cppCode: selectionCode,
    codeExplanation: ["A posição `i` separa parte ordenada e não ordenada.", "`menor` guarda o índice do menor visto até agora.", "O laço interno procura o menor restante.", "No fim, uma troca coloca o menor na posição certa."],
    complexity: "O(n²)",
  },
  {
    id: "insertion",
    name: "Insertion Sort",
    idea: "Constrói a parte ordenada aos poucos, inserindo a chave no lugar correto.",
    useWhen: "Vetores pequenos ou quase ordenados.",
    avoidWhen: "Vetores grandes e muito embaralhados.",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: "Sim",
    inPlace: "Sim",
    examTrap: "É ótimo para dados quase ordenados, mas ainda pode virar O(n²).",
    recognize: "Procure uma `chave` e deslocamentos para a direita enquanto elementos são maiores.",
    pseudocode: "para i de 1 até n-1\n  chave = v[i]\n  j = i - 1\n  enquanto j >= 0 e v[j] > chave\n    v[j+1] = v[j]\n    j--\n  v[j+1] = chave",
    cppCode: insertionCode,
    codeExplanation: ["A parte antes de `i` é tratada como ordenada.", "`chave` é o valor que será inserido.", "Valores maiores são deslocados para a direita.", "A chave entra no espaço aberto."],
    complexity: "O(n²)",
  },
  {
    id: "merge",
    name: "Merge Sort",
    idea: "Divide o vetor ao meio, ordena as partes e intercala tudo em ordem.",
    useWhen: "Quando você quer garantia O(n log n) e estabilidade.",
    avoidWhen: "Quando memória auxiliar O(n) é um problema.",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
    stable: "Sim",
    inPlace: "Não na versão clássica",
    examTrap: "A garantia de tempo vem com custo de memória auxiliar.",
    recognize: "Procure chamadas recursivas para esquerda/direita e uma função de intercalação.",
    pseudocode: "se ini >= fim, pare\nmeio = metade\nmergeSort(esquerda)\nmergeSort(direita)\nintercale as duas partes ordenadas",
    cppCode: mergeCode,
    codeExplanation: ["O caso base evita dividir um intervalo de tamanho 1.", "O meio separa o problema em duas metades.", "As chamadas recursivas ordenam cada metade.", "A intercalação junta duas sequências já ordenadas."],
    complexity: "O(n log n)",
  },
  {
    id: "quick",
    name: "Quick Sort",
    idea: "Escolhe um pivô, particiona menores antes dele e maiores depois.",
    useWhen: "Ordenação prática rápida, quando estabilidade não é obrigatória.",
    avoidWhen: "Quando pivôs ruins são prováveis e não há estratégia para evitar pior caso.",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n) em média por causa da recursão",
    stable: "Geralmente não",
    inPlace: "Sim na versão clássica",
    examTrap: "É rápido na prática, mas pivô ruim pode degradar para O(n²).",
    recognize: "Procure `pivo`, uma partição e chamadas recursivas nos dois lados.",
    pseudocode: "escolha o pivô\nparticione menores antes do pivô\ncoloque o pivô na posição final\nordene esquerda e direita recursivamente",
    cppCode: quickCode,
    codeExplanation: ["O pivô guia a separação.", "`i` marca onde o próximo menor deve entrar.", "Ao encontrar valor menor ou igual ao pivô, ele é movido para a esquerda.", "No fim, o pivô vai para sua posição definitiva."],
    complexity: "O(n log n) médio",
  },
];

export const getSortingAlgorithm = (id: SortAlgorithmId) =>
  sortingAlgorithms.find((algorithm) => algorithm.id === id) ?? sortingAlgorithms[0];

const step = (
  array: number[],
  message: string,
  explanation: string,
  comparisons: number,
  moves: number,
  extra: Partial<SortStep> = {},
): SortStep => ({ array: [...array], message, explanation, comparisons, moves, sortedIndices: [], pivotIndex: null, ...extra });

export const generateBubbleSortSteps = (input: number[]) => {
  const array = [...input];
  const steps: SortStep[] = [step(array, "Array inicial.", "O Bubble Sort vai comparar elementos vizinhos.", 0, 0)];
  let comparisons = 0;
  let moves = 0;
  for (let end = array.length - 1; end > 0; end -= 1) {
    let swapped = false;
    for (let j = 0; j < end; j += 1) {
      comparisons += 1;
      steps.push(step(array, `Comparando ${array[j]} e ${array[j + 1]}.`, "Se o vizinho da esquerda for maior, os dois trocam de lugar.", comparisons, moves, { comparing: [j, j + 1], sortedIndices: range(end + 1, array.length - 1) }));
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        moves += 1;
        swapped = true;
        steps.push(step(array, `Trocando: ${array[j]} ficou antes de ${array[j + 1]}.`, "A troca empurra o maior valor para a direita.", comparisons, moves, { swapping: [j, j + 1], sortedIndices: range(end + 1, array.length - 1) }));
      }
    }
    steps.push(step(array, `Posição ${end} já está ordenada.`, "Ao fim da passada, o maior restante chegou ao final.", comparisons, moves, { sortedIndices: range(end, array.length - 1) }));
    if (!swapped) break;
  }
  steps.push(step(array, "Array ordenado.", "Nenhuma inversão relevante resta.", comparisons, moves, { sortedIndices: range(0, array.length - 1) }));
  return steps;
};

export const generateSelectionSortSteps = (input: number[]) => {
  const array = [...input];
  const steps: SortStep[] = [step(array, "Array inicial.", "O Selection Sort vai procurar o menor restante.", 0, 0)];
  let comparisons = 0;
  let moves = 0;
  for (let i = 0; i < array.length - 1; i += 1) {
    let min = i;
    steps.push(step(array, `Começando a posição ${i}. Menor provisório: ${array[min]}.`, "A parte à esquerda já está ordenada.", comparisons, moves, { activeIndices: [min], sortedIndices: range(0, i - 1) }));
    for (let j = i + 1; j < array.length; j += 1) {
      comparisons += 1;
      steps.push(step(array, `Comparando ${array[j]} com menor atual ${array[min]}.`, "Se achar valor menor, atualiza o índice do menor.", comparisons, moves, { comparing: [j, min], activeIndices: [min], sortedIndices: range(0, i - 1) }));
      if (array[j] < array[min]) {
        min = j;
        steps.push(step(array, `Novo menor encontrado: ${array[min]}.`, "O Selection guarda o índice, não troca imediatamente.", comparisons, moves, { activeIndices: [min], sortedIndices: range(0, i - 1) }));
      }
    }
    if (min !== i) {
      [array[i], array[min]] = [array[min], array[i]];
      moves += 1;
      steps.push(step(array, `Trocando menor com a posição ${i}.`, "Agora a posição atual recebe o menor valor restante.", comparisons, moves, { swapping: [i, min], sortedIndices: range(0, i) }));
    } else {
      steps.push(step(array, `A posição ${i} já tinha o menor valor.`, "Nenhuma troca foi necessária nesta passada.", comparisons, moves, { sortedIndices: range(0, i) }));
    }
  }
  steps.push(step(array, "Array ordenado.", "Todas as posições foram fixadas.", comparisons, moves, { sortedIndices: range(0, array.length - 1) }));
  return steps;
};

export const generateInsertionSortSteps = (input: number[]) => {
  const array = [...input];
  const steps: SortStep[] = [step(array, "Array inicial.", "O Insertion Sort mantém uma parte ordenada à esquerda.", 0, 0, { sortedIndices: [0] })];
  let comparisons = 0;
  let moves = 0;
  for (let i = 1; i < array.length; i += 1) {
    const key = array[i];
    let j = i - 1;
    steps.push(step(array, `Chave atual: ${key}.`, "A chave será inserida na parte ordenada.", comparisons, moves, { activeIndices: [i], sortedIndices: range(0, i - 1) }));
    while (j >= 0) {
      comparisons += 1;
      steps.push(step(array, `Comparando ${array[j]} com a chave ${key}.`, "Enquanto o valor for maior que a chave, ele anda para a direita.", comparisons, moves, { comparing: [j, j + 1], activeIndices: [i], sortedIndices: range(0, i - 1) }));
      if (array[j] <= key) break;
      array[j + 1] = array[j];
      moves += 1;
      steps.push(step(array, `Deslocando ${array[j]} para a direita.`, "Esse deslocamento abre espaço para a chave.", comparisons, moves, { swapping: [j, j + 1], sortedIndices: range(0, i) }));
      j -= 1;
    }
    array[j + 1] = key;
    moves += 1;
    steps.push(step(array, `Inserindo ${key} na posição ${j + 1}.`, "A parte ordenada cresceu uma posição.", comparisons, moves, { activeIndices: [j + 1], sortedIndices: range(0, i) }));
  }
  steps.push(step(array, "Array ordenado.", "Cada chave foi inserida no lugar certo.", comparisons, moves, { sortedIndices: range(0, array.length - 1) }));
  return steps;
};

export const generateMergeSortSteps = (input: number[]) => {
  const array = [...input];
  const steps: SortStep[] = [step(array, "Array inicial.", "O Merge Sort divide e depois intercala.", 0, 0)];
  let comparisons = 0;
  let moves = 0;

  const merge = (left: number, mid: number, right: number) => {
    const temp: number[] = [];
    let i = left;
    let j = mid + 1;
    steps.push(step(array, `Intercalando [${left}..${mid}] com [${mid + 1}..${right}].`, "As duas metades já foram ordenadas recursivamente.", comparisons, moves, { range: [left, right], activeIndices: range(left, right) }));
    while (i <= mid && j <= right) {
      comparisons += 1;
      steps.push(step(array, `Comparando ${array[i]} e ${array[j]}.`, "O menor entre as frentes vai para o vetor auxiliar.", comparisons, moves, { comparing: [i, j], range: [left, right] }));
      if (array[i] <= array[j]) {
        temp.push(array[i]);
        i += 1;
      } else {
        temp.push(array[j]);
        j += 1;
      }
      moves += 1;
    }
    while (i <= mid) {
      temp.push(array[i]);
      i += 1;
      moves += 1;
    }
    while (j <= right) {
      temp.push(array[j]);
      j += 1;
      moves += 1;
    }
    temp.forEach((value, index) => {
      array[left + index] = value;
      steps.push(step(array, `Copiando ${value} para a posição ${left + index}.`, "A intercalação escreve a sequência ordenada de volta.", comparisons, moves, { activeIndices: [left + index], range: [left, right] }));
    });
  };

  const sort = (left: number, right: number) => {
    if (left >= right) {
      steps.push(step(array, `Intervalo [${left}..${right}] já é caso base.`, "Um elemento sozinho já está ordenado.", comparisons, moves, { range: [left, right], activeIndices: [left] }));
      return;
    }
    const mid = Math.floor((left + right) / 2);
    steps.push(step(array, `Dividindo [${left}..${right}] em duas metades.`, "A profundidade de divisões aponta para log n.", comparisons, moves, { range: [left, right] }));
    sort(left, mid);
    sort(mid + 1, right);
    merge(left, mid, right);
  };

  sort(0, array.length - 1);
  steps.push(step(array, "Array ordenado.", "Todas as metades foram intercaladas.", comparisons, moves, { sortedIndices: range(0, array.length - 1) }));
  return steps;
};

export const generateQuickSortSteps = (input: number[]) => {
  const array = [...input];
  const steps: SortStep[] = [step(array, "Array inicial.", "O Quick Sort particiona pelo pivô.", 0, 0)];
  let comparisons = 0;
  let moves = 0;
  const sorted = new Set<number>();

  const partition = (left: number, right: number) => {
    const pivotValue = array[right];
    let i = left;
    steps.push(step(array, `Pivô escolhido: ${pivotValue}.`, "Valores menores ou iguais serão movidos para a esquerda.", comparisons, moves, { pivotIndex: right, range: [left, right] }));
    for (let j = left; j < right; j += 1) {
      comparisons += 1;
      steps.push(step(array, `Comparando ${array[j]} com pivô ${pivotValue}.`, "Se for menor ou igual ao pivô, troca com a fronteira `i`.", comparisons, moves, { comparing: [j, right], pivotIndex: right, range: [left, right] }));
      if (array[j] <= pivotValue) {
        [array[i], array[j]] = [array[j], array[i]];
        moves += 1;
        steps.push(step(array, `Movendo ${array[i]} para o lado esquerdo do pivô.`, "A fronteira dos menores avança.", comparisons, moves, { swapping: [i, j], pivotIndex: right, range: [left, right] }));
        i += 1;
      }
    }
    [array[i], array[right]] = [array[right], array[i]];
    moves += 1;
    sorted.add(i);
    steps.push(step(array, `Pivô ${array[i]} ficou na posição final ${i}.`, "O pivô não precisa mais mudar de lado.", comparisons, moves, { swapping: [i, right], pivotIndex: i, sortedIndices: [...sorted], range: [left, right] }));
    return i;
  };

  const sort = (left: number, right: number) => {
    if (left > right) return;
    if (left === right) {
      sorted.add(left);
      steps.push(step(array, `Posição ${left} é caso base.`, "Um único elemento já está no lugar dentro do intervalo.", comparisons, moves, { activeIndices: [left], sortedIndices: [...sorted] }));
      return;
    }
    const pivot = partition(left, right);
    sort(left, pivot - 1);
    sort(pivot + 1, right);
  };

  sort(0, array.length - 1);
  steps.push(step(array, "Array ordenado.", "Todas as partições foram resolvidas.", comparisons, moves, { sortedIndices: range(0, array.length - 1) }));
  return steps;
};

export const generateSortSteps = (algorithm: SortAlgorithmId, array: number[]) => {
  if (algorithm === "selection") return generateSelectionSortSteps(array);
  if (algorithm === "insertion") return generateInsertionSortSteps(array);
  if (algorithm === "merge") return generateMergeSortSteps(array);
  if (algorithm === "quick") return generateQuickSortSteps(array);
  return generateBubbleSortSteps(array);
};

export const range = (start: number, end: number) => {
  if (end < start) return [];
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};
