import type { ChapterId } from "../types/study";

export type StudyChallenge = { title: string; goal: string; requires: string; deliverables: string[] };

export const sourceForChapter = (id: ChapterId) => ({
  "17": "Referência conceitual: material de C++ — Arquivos (capítulo 17).",
  "18": "Referência conceitual: material de C++ — Strings e streams (capítulo 18).",
  "20": "Referência conceitual: material de C++ — Classes e objetos (capítulo 20).",
  "21": "Referência conceitual: material de C++ — Sobrecarga e OO avançado (capítulo 21).",
  listas: "Referência conceitual: material de Estruturas de Dados Básicas — Listas.",
  pilhas: "Referência conceitual: material de Estruturas de Dados Básicas — Pilhas.",
  filas: "Referência conceitual: material de Estruturas de Dados Básicas — Filas.",
  "big-o": "Referência conceitual: material de Estruturas de Dados Básicas — Análise de complexidade.",
  ordenacao: "Referência conceitual: material de Estruturas de Dados Básicas — Ordenação.",
  busca: "Referência conceitual: material de Estruturas de Dados Básicas — Busca.",
  ponteiros: "Referência conceitual: material de C++ e Estruturas de Dados Básicas — Ponteiros e alocação dinâmica.",
}[id]);

export const studyChallenges: Record<ChapterId, StudyChallenge[]> = {
  "17": [
    { title: "1. Diário de estudo", goal: "Grave e leia linhas de uma sessão de estudo.", requires: "Use strings, getline e validação de entrada.", deliverables: ["Abrir e testar is_open.", "Salvar uma linha por sessão.", "Ler sem usar while eof."] },
    { title: "2. Cadastro binário", goal: "Atualize um registro fixo por índice.", requires: "Amplia o Diário com struct, ios binary, seekp e read/write.", deliverables: ["Struct Registro.", "Offset por sizeof.", "Tratamento de flags e fechamento."] },
  ],
  "18": [
    { title: "1. Leitor de perfil", goal: "Leia idade e nome completo sem perder o buffer.", requires: "Use cin, getline e std ws.", deliverables: ["Validar idade.", "Aceitar nome com espaços.", "Exibir perfil formatado."] },
    { title: "2. Parser de notas", goal: "Converta uma linha textual em campos tipados.", requires: "Amplia o Leitor com stringstream, find e stoi.", deliverables: ["Separar campos.", "Rejeitar texto inválido.", "Calcular média."] },
  ],
  "20": [
    { title: "1. Produto encapsulado", goal: "Modele um produto com preço sempre válido.", requires: "Use strings e validação do conteúdo anterior.", deliverables: ["Atributos privados.", "Construtor.", "Getters const e método de desconto."] },
    { title: "2. Conta com regras", goal: "Crie uma conta que preserve saldo e titular.", requires: "Amplia Produto com lista de inicialização, membros const e referência.", deliverables: ["Número const.", "Depositar e sacar.", "Métodos const e invariantes."] },
  ],
  "21": [
    { title: "1. Vetor de pontos", goal: "Some pontos 2D sem expor atributos.", requires: "Use a classe encapsulada do conteúdo anterior.", deliverables: ["operator+.", "operator+= retornando referência.", "Comparação de igualdade."] },
    { title: "2. Extrato de conta", goal: "Imprima uma ContaBancaria com sintaxe natural.", requires: "Amplia a conta anterior com friend, const correctness e streams.", deliverables: ["operator<< friend.", "Encadeamento.", "Main demonstrativa."] },
  ],
  listas: [
    { title: "1. Inserções fundamentais", goal: "Implemente inserir no início, fim e após um nó conhecido.", requires: "Use ponteiros, new, delete e os casos vazio/um nó.", deliverables: ["Struct No.", "No*& apenas quando início muda.", "Teste lista vazia e um elemento."] },
    { title: "2. Editor de lista", goal: "Insira por posição, antes de um alvo e compare com lista dupla.", requires: "Amplia Inserções fundamentais com busca do anterior e ant/prox.", deliverables: ["Posição zero e inválida.", "Inserção antes do alvo.", "Verificação dos dois sentidos na lista dupla."] },
  ],
  pilhas: [
    { title: "1. Desfazer comandos", goal: "Implemente histórico LIFO de comandos curtos.", requires: "Use strings e operações de lista/vector.", deliverables: ["push, top e pop.", "Checar pilha vazia.", "Mostrar último comando."] },
    { title: "2. Validador de parênteses", goal: "Valide expressões com parênteses e colchetes.", requires: "Amplia Desfazer com leitura de string e std stack.", deliverables: ["Empilhar aberturas.", "Comparar fechamentos.", "Relatar posição do erro."] },
  ],
  filas: [
    { title: "1. Fila Encadeada", goal: "Implemente enqueue no fim e dequeue no início com nós.", requires: "Use ponteiros, lista simples e encapsulamento.", deliverables: ["frente e tras.", "vazia e front.", "Caso de remover o último nó."] },
    { title: "2. Central de impressão", goal: "Amplie a fila encadeada com exibição, destrutor e comparação com priority queue.", requires: "Reutilize Fila Encadeada, strings e regras de propriedade.", deliverables: ["Destrutor sem vazamento.", "exibir em ordem FIFO.", "Comparar fila normal e prioridade."] },
  ],
  "big-o": [
    { title: "1. Contador de operações", goal: "Compare laço linear, aninhado e logarítmico.", requires: "Use for e funções.", deliverables: ["Contar execuções.", "Registrar n escolhido.", "Classificar cada custo."] },
    { title: "2. Comparador de estruturas", goal: "Meça buscas em vector e lista.", requires: "Amplia o contador com listas e busca linear.", deliverables: ["Mesmo conjunto de dados.", "Número de comparações.", "Conclusão sobre acesso e busca."] },
  ],
  ordenacao: [
    { title: "1. Ordenador de notas", goal: "Implemente Bubble ou Insertion Sort e mostre cada passada.", requires: "Use vector e complexidade básica.", deliverables: ["Trocas ou deslocamentos.", "Vetor antes/depois.", "Contador de comparações."] },
    { title: "2. Ranking de alunos", goal: "Ordene structs por nota com algoritmo da STL.", requires: "Amplia o Ordenador com classes/structs e lambda.", deliverables: ["std sort.", "Critério decrescente.", "Empate preservado com stable sort."] },
  ],
  busca: [
    { title: "1. Catálogo pesquisável", goal: "Encontre um código com busca linear.", requires: "Use vector e leitura segura.", deliverables: ["Retornar índice.", "Caso não encontrado.", "Número de comparações."] },
    { title: "2. Catálogo ordenado", goal: "Acelere a busca com binary search e limites.", requires: "Amplia o Catálogo com ordenação e Big O.", deliverables: ["Ordenar antes de buscar.", "binary search.", "lower e upper bound para repetidos."] },
  ],
  ponteiros: [
    { title: "1. Nó seguro", goal: "Crie e destrua uma cadeia curta de nós.", requires: "Use structs e regras de lista.", deliverables: ["nullptr.", "Acesso com seta.", "Delete sem dangling pointer."] },
    { title: "2. Inventário dinâmico", goal: "Gerencie objetos alocados e exibidos por referência.", requires: "Amplia Nó seguro com classes, destrutores e listas.", deliverables: ["Propriedade explícita.", "Remoção segura.", "Sem uso após delete."] },
  ],
};
