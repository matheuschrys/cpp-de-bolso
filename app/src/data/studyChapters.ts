import { expandedChapters } from "./expandedChapters";
import { linkedStructuresContent } from "./linkedStructuresContent";
import type { StudyChapter } from "../types/study";

const coreStudyChapters: StudyChapter[] = [
  {
    id: "17",
    title: "Arquivos",
    shortTitle: "Arquivos",
    subtitle: "Persistência, fluxos e ponteiros de arquivo",
    description:
      "Aprenda a raciocinar sobre abertura, leitura, escrita, posição do cursor e falhas de E/S — exatamente onde a prova costuma esconder detalhes.",
    themes: ["Arquivos", "ifstream", "ofstream", "fstream", "ios::app", "ios::ate", "ios::trunc", "ios::binary"],
    quickReview: [
      "`ofstream` escreve; `ifstream` lê; `fstream` pode fazer ambos, dependendo do modo.",
      "`ios::app` posiciona cada escrita no fim; não é o mesmo que abrir e depois usar `seekp`.",
      "Depois de uma leitura que chega ao fim, limpe as flags com `clear()` antes de reposicionar o fluxo.",
      "Texto serializa representação legível; binário grava bytes. Um não é automaticamente intercambiável com o outro.",
      "`ios::ate` começa no fim, mas permite reposicionamento; `ios::app` força cada escrita para o fim. `ios::trunc` limpa conteúdo existente.",
      "Use `is_open`, `fail`, `eof`, `good` e `bad` para distinguir abertura, fim normal e erros de E/S.",
    ],
    topics: [
      {
        title: "Fluxos e modos de abertura",
        what: "Um fluxo é a ponte entre o programa e o arquivo. O modo define o que esse fluxo pode fazer e como a posição inicial é tratada.",
        purpose: "Controlar leitura, escrita, acréscimo, truncamento e dados binários sem depender de comportamento implícito.",
        analogy: "Pense no arquivo como um caderno e no fluxo como sua mão: a mão pode só ler, só escrever ou fazer ambos; `app` obriga a escrever sempre na última página.",
        trap: "Abrir com `ios::out` pode truncar o arquivo. Para acrescentar conteúdo, escolha `ios::app` quando essa for a intenção.",
        shortcut: "Antes de prever a saída, escreva mentalmente: modo, posição inicial, operação e flags finais.",
        code: `#include <fstream>\n\nstd::ofstream log("notas.txt", std::ios::app);\nif (!log) return 1;\nlog << "Aprovado\\n"; // sempre no final\nlog.close();`,
      },
      {
        title: "Acesso aleatório e posições",
        what: "`seekg` move a posição de leitura; `seekp` move a de escrita. `tellg` e `tellp` informam as posições atuais.",
        purpose: "Ler ou atualizar um registro específico sem percorrer todo o arquivo sequencialmente.",
        trap: "Em um `fstream`, os cursores de leitura e escrita são conceitualmente distintos. Usar `seekg` antes de `write` é a pegadinha clássica.",
        shortcut: "g = get = leitura; p = put = escrita.",
        code: `struct Registro { int id; double saldo; };\nstd::fstream arq("contas.dat", std::ios::in | std::ios::out | std::ios::binary);\narq.seekp(2 * sizeof(Registro));\nRegistro r{3, 120.0};\narq.write(reinterpret_cast<const char*>(&r), sizeof r);`,
      },
    ],
  },
  {
    id: "18",
    title: "Strings e streams",
    shortTitle: "Strings e streams",
    subtitle: "Texto, buffer e conversões",
    description:
      "Domine as diferenças entre extração por token e linha inteira, além de busca, recorte e conversão segura de texto.",
    themes: ["Strings", "getline", "stringstream", "substr", "find", "cin"],
    quickReview: [
      "`cin >> texto` para no espaço; `getline` lê até a quebra de linha.",
      "Após `cin >> numero`, normalmente sobra `\\n`; `std::ws` o consome antes de `getline`.",
      "`find` retorna `std::string::npos` quando não encontra; compare com ele, não com `-1` por hábito.",
      "`substr(pos, quantidade)` recebe quantidade, não índice final.",
    ],
    topics: [
      {
        title: "getline e o buffer",
        what: "A extração com `>>` deixa o delimitador no fluxo. `getline` vê esse delimitador e pode devolver uma string vazia.",
        purpose: "Ler nomes, frases e campos com espaços sem perder a primeira linha.",
        analogy: "`cin >>` pega uma palavra e deixa o Enter na mesa; `getline` chega depois, encontra esse Enter e entende que a linha acabou.",
        trap: "`cin.ignore()` sem argumentos pode resolver um caso simples, mas `std::ws` é mais explícito quando a intenção é pular espaços em branco antes da linha.",
        shortcut: "Número e depois frase? Grave: `std::getline(std::cin >> std::ws, frase)`.",
        code: `int idade{};\nstd::string nome;\nstd::cin >> idade;\nstd::getline(std::cin >> std::ws, nome);\n// nome pode conter espaços`,
      },
      {
        title: "string streams",
        what: "`std::istringstream` lê valores de uma string; `std::ostringstream` monta texto com o mesmo estilo de `cout`.",
        purpose: "Converter, validar e quebrar dados textuais em valores tipados.",
        trap: "Uma extração bem-sucedida não garante que toda a string foi consumida. Verifique sobras se a validação for importante.",
        shortcut: "Texto para número simples: `std::stoi`; vários campos: `istringstream`.",
        code: `#include <sstream>\nstd::istringstream entrada("12 4.5");\nint quantidade{}; double preco{};\nentrada >> quantidade >> preco;`,
      },
    ],
  },
  {
    id: "20",
    title: "Classes e objetos",
    shortTitle: "Classes e objetos",
    subtitle: "Encapsulamento, invariantes e tempo de vida",
    description:
      "Leia classes como contratos: a interface pública diz o que é permitido; a implementação privada protege o estado.",
    themes: ["Classes", "Construtores", "Destrutores", "const", "this", "Encapsulamento"],
    quickReview: [
      "Construtores inicializam; destrutores encerram o tempo de vida. A ordem segue a construção real, não o texto no corpo.",
      "Membro `const` ou referência precisa nascer na lista de inicialização.",
      "Método `const` recebe um `this` que não pode alterar o objeto, salvo membros `mutable`.",
      "A interface é o painel da máquina: cliente usa operações públicas, não mexe diretamente nas engrenagens privadas.",
    ],
    topics: [
      {
        title: "Encapsulamento e invariantes",
        what: "Encapsular é manter estado e regras dentro da classe, expondo apenas operações coerentes.",
        purpose: "Impedir que um objeto fique inválido, como uma conta com saldo alterado por qualquer parte do programa.",
        analogy: "Uma máquina de venda oferece botões públicos; ninguém abre a máquina para girar o motor diretamente.",
        trap: "Ter getters e setters para tudo não é automaticamente bom encapsulamento. Um setter que aceita qualquer saldo pode quebrar a regra que a classe deveria proteger.",
        shortcut: "Na prova, procure a regra do objeto e pergunte: qual método pode quebrá-la?",
        code: `class Conta {\n  double saldo_{};\npublic:\n  bool depositar(double valor) {\n    if (valor <= 0) return false;\n    saldo_ += valor;\n    return true;\n  }\n  double saldo() const { return saldo_; }\n};`,
      },
      {
        title: "Lista de inicialização e const",
        what: "A lista depois de `:` constrói os membros antes de entrar no corpo do construtor.",
        purpose: "Inicializar corretamente `const`, referências e objetos sem construtor padrão, além de evitar uma construção seguida de atribuição.",
        trap: "A ordem efetiva é a ordem de declaração dos membros, não a ordem escrita na lista.",
        shortcut: "`const`, `&` e classe sem construtor padrão: pense imediatamente em lista de inicialização.",
        code: `class Medida {\n  const int escala_;\n  std::string& unidade_;\npublic:\n  Medida(int escala, std::string& unidade)\n      : escala_(escala), unidade_(unidade) {}\n};`,
      },
    ],
  },
  {
    id: "21",
    title: "Operadores e OO",
    shortTitle: "Operadores e OO",
    subtitle: "Expressividade, referências e composição",
    description:
      "Faça o operador parecer nativo sem esconder efeitos surpreendentes: retorno, const e papel de `friend` são o coração das questões difíceis.",
    themes: ["Sobrecarga", "operator+", "operator+=", "friend", "Composição", "Referência"],
    quickReview: [
      "`operator+=` normalmente altera e retorna `T&` para permitir encadeamento.",
      "`operator+` normalmente recebe/usa valores sem alterar os operandos e retorna um novo objeto por valor.",
      "`operator<<` costuma ser função não membro `friend` porque o operando esquerdo é `std::ostream`.",
      "Retornar referência para objeto local cria referência pendente; a vida útil terminou ao sair da função.",
    ],
    topics: [
      {
        title: "Retornos e encadeamento",
        what: "O tipo de retorno determina se a expressão entrega uma cópia, um alias para um objeto existente ou um endereço.",
        purpose: "Preservar semântica natural, eficiência razoável e operações como `a += b += c`.",
        trap: "Retornar `T&` é certo quando a referência aponta para um objeto que continuará vivo; não é uma otimização universal.",
        shortcut: "Pergunta de retorno: quem é dono do objeto depois do `return`? Se foi local, não devolva referência/ponteiro para ele.",
        code: `class Vetor {\n  int x_{};\npublic:\n  Vetor& operator+=(const Vetor& outro) {\n    x_ += outro.x_;\n    return *this;\n  }\n  friend Vetor operator+(Vetor a, const Vetor& b) {\n    a += b;\n    return a;\n  }\n};`,
      },
      {
        title: "friend e operadores de fluxo",
        what: "Uma função `friend` não é método, mas recebe permissão de acessar a parte privada da classe.",
        purpose: "Permitir operações simétricas ou com um tipo externo à esquerda, como `std::cout << conta`.",
        trap: "`friend` não torna a função membro e não muda a visibilidade geral dos dados privados.",
        shortcut: "Se o lado esquerdo precisa ser `ostream`, o `operator<<` não pode ser método de `Conta` com essa sintaxe.",
        code: `class Conta {\n  double saldo_{};\npublic:\n  friend std::ostream& operator<<(std::ostream& out, const Conta& c) {\n    return out << c.saldo_;\n  }\n};`,
      },
    ],
  },
];

const applyLinkedStructureContent = (chapter: StudyChapter): StudyChapter => {
  const addition = chapter.id === "listas" || chapter.id === "filas" ? linkedStructuresContent[chapter.id] : undefined;
  return addition ? { ...chapter, themes: [...chapter.themes, ...addition.themes], quickReview: [...chapter.quickReview, ...addition.quickReview], topics: [...chapter.topics, ...addition.topics] } : chapter;
};

export const studyChapters: StudyChapter[] = [...coreStudyChapters, ...expandedChapters].map(applyLinkedStructureContent);

export const getChapter = (id: string) => studyChapters.find((chapter) => chapter.id === id);
