import type { Lesson } from "../../types/lesson";

export const lessons: Lesson[] = [
  {
    id: "primeiro-programa-cout",
    title: "Primeiro programa com cout",
    module: "Primeiro contato",
    chapterReference: "Deitel, Cap. 2, p. 27-31",
    difficulty: "iniciante",
    estimatedMinutes: 8,
    tags: ["main", "cout", "iostream"],
    objective:
      "Entender a estrutura mínima de um programa em C++ e como mostrar uma mensagem na tela.",
    explanation: {
      short:
        "`std::cout` mostra informações na saída padrão, que normalmente é o terminal.",
      detailed:
        "Um programa C++ começa pela função `main`. Para escrever mensagens, incluímos a biblioteca `iostream` e usamos `std::cout` com o operador `<<`. O comando `return 0` indica que o programa terminou corretamente.",
    },
    codeExamples: [
      {
        title: "O menor programa útil",
        code: `#include <iostream>

int main() {
    std::cout << "Ola, C++!\\n";
    return 0;
}`,
        explanation: [
          "`#include <iostream>` habilita recursos de entrada e saída.",
          "`int main()` é o ponto de partida do programa.",
          "`std::cout` envia texto para a tela.",
          "`<<` empurra o texto para o `cout`.",
          "`return 0` sinaliza encerramento correto.",
        ],
      },
    ],
    tips: [
      "Quase todo comando em C++ termina com ponto e vírgula.",
      "Use `std::` no começo para entender de onde vem cada recurso.",
      "Use `\\n` para quebrar linha sem forçar uma descarga do buffer.",
    ],
    commonMistakes: [
      "Esquecer o ponto e vírgula depois do `cout`.",
      "Escrever `cout` sem `std::` e sem explicar `using namespace std`.",
      "Abrir aspas e esquecer de fechar.",
      "Trocar `{}` por `()` no corpo da função.",
    ],
    quiz: [
      {
        type: "multiple-choice",
        question: "Qual é o papel do `std::cout`?",
        options: [
          "Ler dados do teclado",
          "Mostrar dados na tela",
          "Criar uma variável",
          "Repetir comandos",
        ],
        correctAnswer: 1,
        explanation:
          "`std::cout` envia informações para a saída padrão, geralmente o terminal.",
      },
      {
        question: "Onde a execução de um programa C++ começa?",
        options: ["Na função `start`", "No `#include`", "Na função `main`", "No primeiro `cout`"],
        correctAnswer: 2,
        explanation:
          "A função `main` é o ponto de entrada padrão de um programa C++.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>

int main() {
    std::cout << "C++";
    std::cout << " de bolso";
    return 0;
}`,
        answer: "C++ de bolso",
        explanation:
          "Os dois comandos escrevem na mesma linha porque não há `\\n` entre eles.",
      },
    ],
    practiceExercises: [
      {
        title: "Apresentação rápida",
        description:
          "Crie um programa que mostre seu nome, seu curso e uma frase dizendo que voce esta aprendendo C++.",
        expectedConcepts: ["main", "cout", "quebra de linha"],
      },
    ],
    quickReview: [
      "Todo programa C++ precisa de uma função `main`.",
      "`std::cout` mostra dados na tela.",
      "`<<` envia dados para o `cout`.",
      "`;` finaliza a maioria dos comandos.",
    ],
  },
  {
    id: "entrada-com-cin",
    title: "Entrada com cin",
    module: "Primeiro contato",
    chapterReference: "Deitel, Cap. 2, p. 31-34",
    difficulty: "iniciante",
    estimatedMinutes: 9,
    tags: ["cin", "entrada", "soma"],
    objective:
      "Ler valores digitados pelo usuário e usar esses valores em uma conta simples.",
    explanation: {
      short:
        "`std::cin` lê dados da entrada padrão e guarda esses dados em variáveis.",
      detailed:
        "Para receber um valor digitado, usamos `std::cin` com o operador `>>`. O valor lido precisa combinar com o tipo da variável. Se a variável é `int`, o programa espera um número inteiro.",
    },
    codeExamples: [
      {
        title: "Somando dois inteiros",
        code: `#include <iostream>

int main() {
    int a;
    int b;

    std::cout << "Digite dois numeros: ";
    std::cin >> a >> b;

    int soma = a + b;
    std::cout << "Soma: " << soma << '\\n';

    return 0;
}`,
        explanation: [
          "`int a;` e `int b;` declaram duas variáveis inteiras.",
          "`std::cin >> a >> b;` lê dois valores digitados.",
          "`int soma = a + b;` calcula e guarda o resultado.",
          "O último `cout` mistura texto e valor de variável na mesma saída.",
        ],
      },
    ],
    tips: [
      "Leia `>>` como 'jogue o valor digitado para dentro da variável'.",
      "Quando ler vários valores, separe-os por espaço ou Enter.",
      "Se digitar texto onde o programa espera número, a leitura falha.",
    ],
    commonMistakes: [
      "Usar `<<` com `cin`; para entrada, o operador é `>>`.",
      "Ler uma variável antes de declará-la.",
      "Achar que `cin` mostra pergunta na tela. Quem mostra é o `cout`.",
    ],
    quiz: [
      {
        type: "true-false",
        question: "`std::cin` lê valores digitados e guarda em variáveis.",
        options: ["Verdadeiro", "Falso"],
        correctAnswer: 0,
        explanation:
          "Verdadeiro. O `cin` tenta converter o que foi digitado para o tipo da variável.",
      },
      {
        question: "Qual operador é usado com `std::cin`?",
        options: ["`<<`", "`>>`", "`==`", "`&&`"],
        correctAnswer: 1,
        explanation:
          "`std::cin >> variavel` lê um valor e armazena na variável indicada.",
      },
      {
        question: "O que acontece em `std::cin >> idade;`?",
        options: [
          "O programa imprime a idade",
          "O programa cria a variável idade",
          "O programa tenta ler um valor para idade",
          "O programa soma idade com 1",
        ],
        correctAnswer: 2,
        explanation:
          "A variável já deve existir; o `cin` apenas tenta preencher seu valor.",
      },
    ],
    outputChallenges: [
      {
        question: "Se o usuário digitar `4 7`, qual será a saída final?",
        code: `#include <iostream>

int main() {
    int x;
    int y;
    std::cin >> x >> y;
    std::cout << x + y << '\\n';
    return 0;
}`,
        answer: "11",
        explanation: "O programa lê 4 e 7, soma os dois inteiros e imprime 11.",
      },
    ],
    practiceExercises: [
      {
        title: "Dobro do número",
        description:
          "Leia um número inteiro e mostre o dobro dele usando `std::cin` e `std::cout`.",
        expectedConcepts: ["cin", "variável", "aritmética", "cout"],
      },
    ],
    quickReview: [
      "`std::cin` lê valores digitados.",
      "`>>` envia o valor para dentro da variável.",
      "O tipo da variável controla o tipo esperado na entrada.",
      "`cout` pergunta; `cin` escuta.",
    ],
  },
  {
    id: "variaveis-e-tipos",
    title: "Variáveis e tipos fundamentais",
    module: "Dados e memória",
    chapterReference: "Deitel, Cap. 2, p. 31-35 e Apêndice C, p. 989",
    difficulty: "iniciante",
    estimatedMinutes: 10,
    tags: ["variáveis", "memória", "tipos"],
    objective:
      "Entender variável como um nome para um espaço de memória e escolher tipos básicos de C++.",
    explanation: {
      short:
        "Variável é um nome que usamos para guardar, ler e alterar um valor durante o programa.",
      detailed:
        "Toda variável tem um tipo. O tipo diz quais valores podem ser guardados e quais operações fazem sentido. Um `int` guarda inteiros, um `double` guarda números com casas decimais, um `char` guarda um caractere e um `bool` guarda verdadeiro ou falso.",
    },
    codeExamples: [
      {
        title: "Declarando e usando tipos",
        code: `#include <iostream>

int main() {
    int idade = 20;
    double media = 8.5;
    char conceito = 'A';
    bool aprovado = true;

    std::cout << idade << '\\n';
    std::cout << media << '\\n';
    std::cout << conceito << '\\n';
    std::cout << aprovado << '\\n';

    return 0;
}`,
        explanation: [
          "`int idade = 20;` cria uma variável inteira já inicializada.",
          "`double media = 8.5;` guarda um número com casas decimais.",
          "`char conceito = 'A';` guarda um único caractere.",
          "`bool aprovado = true;` guarda um valor lógico.",
          "Ao imprimir um `bool`, C++ costuma mostrar `1` para verdadeiro e `0` para falso.",
        ],
      },
    ],
    tips: [
      "Pense no tipo como o formato da caixa onde o valor será guardado.",
      "Inicialize variáveis assim que possível.",
      "Use `double` para médias e medidas com casas decimais.",
    ],
    commonMistakes: [
      "Declarar uma variável e usar antes de dar valor.",
      "Guardar número decimal em `int` e perder a parte quebrada.",
      "Usar aspas duplas para `char`; caractere usa aspas simples.",
      "Confundir atribuição `=` com comparação `==`.",
    ],
    quiz: [
      {
        type: "complete-code",
        question: "Complete a declaração de uma variável inteira chamada `pontos`.",
        options: ["`int pontos;`", "`pontos int;`", "`double pontos int;`", "`var pontos;`"],
        correctAnswer: 0,
        explanation:
          "Em C++, a declaração comum vem na ordem: tipo e depois nome.",
      },
      {
        question: "Qual tipo é mais adequado para guardar `8.75`?",
        options: ["`int`", "`double`", "`char`", "`bool`"],
        correctAnswer: 1,
        explanation:
          "`double` guarda números com casas decimais com boa precisão para estudos iniciais.",
      },
      {
        question: "Qual declaração cria uma variável inteira chamada `pontos`?",
        options: ["`pontos int;`", "`int pontos;`", "`double int pontos;`", "`var pontos;`"],
        correctAnswer: 1,
        explanation:
          "Em C++, a forma comum é escrever primeiro o tipo e depois o nome da variável.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>

int main() {
    int pontos = 10;
    pontos = pontos + 5;
    std::cout << pontos << '\\n';
    return 0;
}`,
        answer: "15",
        explanation:
          "A variável começa com 10. Depois recebe seu valor atual mais 5, ficando 15.",
      },
    ],
    practiceExercises: [
      {
        title: "Ficha simples",
        description:
          "Crie variáveis para idade, nota, primeira letra do nome e aprovação. Depois mostre cada uma na tela.",
        expectedConcepts: ["int", "double", "char", "bool", "cout"],
      },
    ],
    quickReview: [
      "Variável guarda um valor que pode ser usado pelo programa.",
      "O tipo define o formato e as operações possíveis.",
      "`int` é para inteiros; `double` é para decimais.",
      "Inicializar cedo evita lixo de memória e confusão.",
    ],
  },
  {
    id: "aritmetica-e-precedencia",
    title: "Aritmética e precedência",
    module: "Dados e memória",
    chapterReference: "Deitel, Cap. 2, p. 35-37",
    difficulty: "iniciante",
    estimatedMinutes: 9,
    tags: ["aritmética", "operadores", "precedência"],
    objective:
      "Usar operadores aritméticos e entender a ordem em que as expressões são calculadas.",
    explanation: {
      short:
        "Operadores aritméticos fazem contas com valores e variáveis, como soma, subtração, multiplicação, divisão e resto.",
      detailed:
        "Em C++, expressões seguem uma ordem de precedência. Multiplicação, divisão e resto são calculados antes de soma e subtração. Parênteses deixam a intenção explícita e evitam leituras erradas.",
    },
    codeExamples: [
      {
        title: "Calculando média simples",
        code: `#include <iostream>

int main() {
    int nota1 = 8;
    int nota2 = 7;
    int nota3 = 9;

    double media = (nota1 + nota2 + nota3) / 3.0;

    std::cout << "Media: " << media << '\\n';

    return 0;
}`,
        explanation: [
          "`nota1`, `nota2` e `nota3` guardam valores inteiros.",
          "Os parênteses fazem a soma acontecer antes da divisão.",
          "`3.0` força uma divisão com resultado decimal.",
          "`media` usa `double` porque a média pode ter casas decimais.",
        ],
      },
      {
        title: "Resto da divisão",
        code: `#include <iostream>

int main() {
    int numero = 17;

    std::cout << numero % 5 << '\\n';

    return 0;
}`,
        explanation: [
          "`%` calcula o resto da divisão inteira.",
          "`17 / 5` dá 3 com resto 2.",
          "Por isso a saída do programa é 2.",
        ],
      },
    ],
    tips: [
      "Use parênteses quando a expressão puder gerar dúvida.",
      "Divisão entre dois `int` gera divisão inteira.",
      "`%` é útil para descobrir par, ímpar e ciclos.",
    ],
    commonMistakes: [
      "Esperar `5 / 2` virar `2.5`; com inteiros, o resultado é `2`.",
      "Esquecer que `*`, `/` e `%` vêm antes de `+` e `-`.",
      "Usar `%` com a ideia de porcentagem; em C++, ele significa resto.",
    ],
    quiz: [
      {
        type: "output",
        question: "Qual é o resultado de `10 / 4` usando dois inteiros?",
        options: ["`2`", "`2.5`", "`3`", "`0.25`"],
        correctAnswer: 0,
        explanation:
          "Na divisão inteira, a parte decimal é descartada. Por isso `10 / 4` resulta em `2`.",
      },
      {
        question: "Qual operador calcula o resto da divisão?",
        options: ["`/`", "`%`", "`*`", "`+`"],
        correctAnswer: 1,
        explanation: "`%` retorna o resto de uma divisão inteira.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>

int main() {
    int x = 2 + 3 * 4;
    std::cout << x << '\\n';
    return 0;
}`,
        answer: "14",
        explanation:
          "A multiplicação vem antes da soma. Primeiro `3 * 4` vira 12, depois `2 + 12` vira 14.",
      },
    ],
    practiceExercises: [
      {
        title: "Preço com desconto",
        description:
          "Crie um programa que guarde um preço, um valor de desconto e mostre o preço final.",
        expectedConcepts: ["double", "subtração", "cout"],
      },
    ],
    quickReview: [
      "`+`, `-`, `*`, `/` e `%` são operadores aritméticos.",
      "`*`, `/` e `%` têm prioridade sobre `+` e `-`.",
      "Parênteses deixam a ordem da conta explícita.",
      "Divisão entre inteiros descarta a parte decimal.",
    ],
  },
  {
    id: "if-e-operadores-relacionais",
    title: "if e operadores relacionais",
    module: "Decisões",
    chapterReference: "Deitel, Cap. 2, p. 37-40 e Cap. 4, p. 98-103",
    difficulty: "iniciante",
    estimatedMinutes: 10,
    tags: ["if", "else", "comparação"],
    objective:
      "Tomar decisões no programa usando `if`, `else` e operadores de comparação.",
    explanation: {
      short:
        "`if` executa um bloco de código somente quando uma condição é verdadeira.",
      detailed:
        "Operadores relacionais comparam valores e produzem um resultado lógico: verdadeiro ou falso. Com esse resultado, o `if` decide qual caminho o programa deve seguir.",
    },
    codeExamples: [
      {
        title: "Maioridade",
        code: `#include <iostream>

int main() {
    int idade = 19;

    if (idade >= 18) {
        std::cout << "Maior de idade\\n";
    } else {
        std::cout << "Menor de idade\\n";
    }

    return 0;
}`,
        explanation: [
          "`idade >= 18` verifica se a idade é maior ou igual a 18.",
          "Se a condição for verdadeira, o primeiro bloco executa.",
          "Se for falsa, o bloco do `else` executa.",
          "As chaves delimitam o que pertence a cada caminho.",
        ],
      },
    ],
    tips: [
      "Leia `if` como 'se isso for verdade, faça isto'.",
      "Use `==` para comparar igualdade.",
      "Use `=` apenas para atribuir valor.",
    ],
    commonMistakes: [
      "Escrever `if (x = 10)` quando queria comparar com `if (x == 10)`.",
      "Esquecer chaves quando o bloco tem mais de uma linha.",
      "Achar que `else` tem condição; quem tem condição é `if` ou `else if`.",
    ],
    quiz: [
      {
        type: "find-error",
        question: "Qual operador verifica igualdade?",
        options: ["`=`", "`==`", "`!=`", "`>=`"],
        correctAnswer: 1,
        explanation:
          "`==` compara dois valores. `=` atribui um valor a uma variável.",
      },
      {
        question: "Qual expressão verifica se `nota` é menor que 6?",
        options: ["`nota > 6`", "`nota == 6`", "`nota < 6`", "`nota = 6`"],
        correctAnswer: 2,
        explanation: "`<` significa menor que.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>

int main() {
    int pontos = 12;

    if (pontos >= 10) {
        std::cout << "Aprovado\\n";
    } else {
        std::cout << "Revisar\\n";
    }

    return 0;
}`,
        answer: "Aprovado",
        explanation:
          "`12 >= 10` é verdadeiro, então o bloco do `if` é executado.",
      },
    ],
    practiceExercises: [
      {
        title: "Par ou ímpar",
        description:
          "Leia um número inteiro e use `if` para mostrar se ele é par ou ímpar.",
        expectedConcepts: ["cin", "if", "%", "=="],
      },
    ],
    quickReview: [
      "`if` toma decisões com base em uma condição.",
      "`else` cobre o caso contrário.",
      "`==` compara igualdade; `=` atribui.",
      "Comparações produzem verdadeiro ou falso.",
    ],
  },
  {
    id: "operadores-logicos",
    title: "Operadores lógicos",
    module: "Decisões",
    chapterReference: "Deitel, Cap. 5, p. 161-164",
    difficulty: "iniciante",
    estimatedMinutes: 10,
    tags: ["&&", "||", "!", "bool"],
    objective:
      "Combinar condições usando `&&`, `||` e `!` para criar decisões mais específicas.",
    explanation: {
      short:
        "Operadores lógicos juntam ou invertem condições que produzem verdadeiro ou falso.",
      detailed:
        "`&&` significa 'e': as duas condições precisam ser verdadeiras. `||` significa 'ou': pelo menos uma condição precisa ser verdadeira. `!` inverte o resultado lógico.",
    },
    codeExamples: [
      {
        title: "Intervalo de notas",
        code: `#include <iostream>

int main() {
    int nota = 8;

    if (nota >= 0 && nota <= 10) {
        std::cout << "Nota valida\\n";
    } else {
        std::cout << "Nota invalida\\n";
    }

    return 0;
}`,
        explanation: [
          "`nota >= 0` verifica o limite inferior.",
          "`nota <= 10` verifica o limite superior.",
          "`&&` exige que as duas comparações sejam verdadeiras.",
          "Como 8 está entre 0 e 10, a nota é válida.",
        ],
      },
      {
        title: "Negando uma condição",
        code: `#include <iostream>

int main() {
    bool logado = false;

    if (!logado) {
        std::cout << "Faça login\\n";
    }

    return 0;
}`,
        explanation: [
          "`logado` começa como falso.",
          "`!logado` inverte falso para verdadeiro.",
          "Por isso o programa mostra a mensagem de login.",
        ],
      },
    ],
    tips: [
      "Para verificar intervalo, normalmente use `&&`.",
      "Para aceitar uma entre várias opções, normalmente use `||`.",
      "Use parênteses quando misturar muitas condições.",
    ],
    commonMistakes: [
      "Escrever `10 <= x <= 20`; em C++, use `x >= 10 && x <= 20`.",
      "Trocar `&&` por `||` em testes de intervalo.",
      "Usar `!` sem perceber que ele inverte toda a condição logo depois dele.",
    ],
    quiz: [
      {
        question: "Qual expressão verifica se `x` está entre 10 e 20?",
        options: [
          "`x >= 10 || x <= 20`",
          "`x >= 10 && x <= 20`",
          "`x = 10 && 20`",
          "`10 <= x <= 20`",
        ],
        correctAnswer: 1,
        explanation:
          "Para estar no intervalo, `x` precisa passar pelos dois limites ao mesmo tempo.",
      },
      {
        question: "Quando `a || b` é verdadeiro?",
        options: [
          "Somente quando os dois são falsos",
          "Somente quando os dois são verdadeiros",
          "Quando pelo menos um deles é verdadeiro",
          "Nunca é verdadeiro",
        ],
        correctAnswer: 2,
        explanation:
          "`||` é o operador 'ou': basta uma condição verdadeira para o resultado ser verdadeiro.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>

int main() {
    int idade = 20;
    bool temCarteira = false;

    if (idade >= 18 && temCarteira) {
        std::cout << "Pode dirigir\\n";
    } else {
        std::cout << "Nao pode dirigir\\n";
    }

    return 0;
}`,
        answer: "Nao pode dirigir",
        explanation:
          "A idade passa no teste, mas `temCarteira` é falso. Com `&&`, as duas condições precisam ser verdadeiras.",
      },
    ],
    practiceExercises: [
      {
        title: "Login simples",
        description:
          "Crie duas variáveis booleanas, `usuarioCorreto` e `senhaCorreta`, e mostre uma mensagem de acesso liberado somente se as duas forem verdadeiras.",
        expectedConcepts: ["bool", "if", "&&"],
      },
    ],
    quickReview: [
      "`&&` exige duas condições verdadeiras.",
      "`||` exige pelo menos uma condição verdadeira.",
      "`!` inverte verdadeiro para falso e falso para verdadeiro.",
      "Intervalos em C++ costumam usar duas comparações com `&&`.",
    ],
  },
  {
    id: "while-repeticao",
    title: "Repetição com while",
    module: "Repetições",
    chapterReference: "Deitel, Cap. 4, p. 103-116",
    difficulty: "iniciante",
    estimatedMinutes: 10,
    tags: ["while", "loop", "contador"],
    objective:
      "Repetir comandos enquanto uma condição continuar verdadeira.",
    explanation: {
      short:
        "`while` repete um bloco de código enquanto a condição entre parênteses for verdadeira.",
      detailed:
        "Laços são usados quando o programa precisa fazer a mesma ação várias vezes. No `while`, a condição é testada antes de cada repetição. Se a condição nunca ficar falsa, o programa entra em loop infinito.",
    },
    codeExamples: [
      {
        title: "Contando de 1 a 5",
        code: `#include <iostream>

int main() {
    int contador = 1;

    while (contador <= 5) {
        std::cout << contador << '\\n';
        contador++;
    }

    return 0;
}`,
        explanation: [
          "`contador` começa valendo 1.",
          "`contador <= 5` é a condição do laço.",
          "Enquanto a condição for verdadeira, o bloco executa.",
          "`contador++` aumenta o contador e ajuda o laço a terminar.",
        ],
      },
    ],
    tips: [
      "Todo `while` precisa de alguma mudança que aproxime o fim do laço.",
      "Use contador quando souber controlar quantas vezes quer repetir.",
      "Teste mentalmente a primeira e a última repetição.",
    ],
    commonMistakes: [
      "Esquecer de atualizar o contador e criar loop infinito.",
      "Colocar ponto e vírgula logo depois do `while (condição)` sem querer.",
      "Usar uma condição que já começa falsa e o bloco nunca executa.",
    ],
    quiz: [
      {
        question: "Quando o bloco de um `while` executa?",
        options: [
          "Sempre uma única vez",
          "Enquanto a condição for verdadeira",
          "Somente quando a condição for falsa",
          "Apenas no final do programa",
        ],
        correctAnswer: 1,
        explanation:
          "O `while` testa a condição antes de cada repetição e executa enquanto ela for verdadeira.",
      },
      {
        question: "Qual linha ajuda a evitar loop infinito no exemplo do contador?",
        options: ["`int contador = 1;`", "`while (contador <= 5)`", "`contador++;`", "`return 0;`"],
        correctAnswer: 2,
        explanation:
          "`contador++` muda o valor do contador, permitindo que a condição fique falsa depois.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>

int main() {
    int x = 3;

    while (x > 0) {
        std::cout << x << ' ';
        x--;
    }

    return 0;
}`,
        answer: "3 2 1",
        explanation:
          "`x` começa em 3. A cada repetição, o programa imprime `x` e depois decrementa com `x--`.",
      },
    ],
    practiceExercises: [
      {
        title: "Contagem regressiva",
        description:
          "Crie um programa que mostre uma contagem regressiva de 10 até 1 usando `while`.",
        expectedConcepts: ["while", "contador", "decremento", "cout"],
      },
    ],
    quickReview: [
      "`while` repete enquanto a condição for verdadeira.",
      "A condição é testada antes de cada repetição.",
      "Sem atualização adequada, o laço pode nunca terminar.",
      "Contadores ajudam a controlar repetições simples.",
    ],
  },
  {
    id: "for-repeticao",
    title: "Repetição com for",
    module: "Repetições",
    chapterReference: "Deitel, Cap. 5, p. 141-146",
    difficulty: "iniciante",
    estimatedMinutes: 10,
    tags: ["for", "loop", "contador"],
    objective:
      "Usar `for` para repetir comandos quando a estrutura do contador já é conhecida.",
    explanation: {
      short:
        "`for` é um laço muito usado quando sabemos como iniciar, testar e atualizar um contador.",
      detailed:
        "O `for` concentra três partes em uma linha: inicialização, condição e atualização. Isso deixa laços com contador mais compactos que muitos `while`, especialmente em contagens simples.",
    },
    codeExamples: [
      {
        title: "Contando com for",
        code: `#include <iostream>

int main() {
    for (int i = 1; i <= 5; i++) {
        std::cout << i << '\\n';
    }

    return 0;
}`,
        explanation: [
          "`int i = 1` cria e inicializa o contador.",
          "`i <= 5` é a condição testada antes de cada repetição.",
          "`i++` aumenta o contador ao final de cada volta.",
          "O bloco imprime o valor atual de `i`.",
        ],
      },
      {
        title: "Somando valores",
        code: `#include <iostream>

int main() {
    int soma = 0;

    for (int i = 1; i <= 4; i++) {
        soma = soma + i;
    }

    std::cout << soma << '\\n';

    return 0;
}`,
        explanation: [
          "`soma` começa em zero para acumular valores.",
          "O `for` faz `i` passar por 1, 2, 3 e 4.",
          "A cada volta, o valor de `i` é adicionado em `soma`.",
          "No fim, o programa imprime 10.",
        ],
      },
    ],
    tips: [
      "Leia o cabeçalho do `for` como: começo; enquanto; depois de cada volta.",
      "Use `for` quando a contagem é clara.",
      "Prefira nomes como `i`, `j` e `k` apenas para contadores curtos.",
    ],
    commonMistakes: [
      "Esquecer um dos dois pontos e vírgulas dentro do cabeçalho do `for`.",
      "Atualizar o contador no sentido errado e criar loop infinito.",
      "Usar `i <= tamanho` quando o índice válido vai só até `tamanho - 1`.",
    ],
    quiz: [
      {
        question: "Quais são as três partes comuns no cabeçalho de um `for`?",
        options: [
          "Tipo, nome e valor",
          "Inicialização, condição e atualização",
          "Entrada, processamento e saída",
          "Função, parâmetro e retorno",
        ],
        correctAnswer: 1,
        explanation:
          "Um `for` típico organiza inicialização, condição e atualização no cabeçalho.",
      },
      {
        question: "Quantas vezes este laço roda: `for (int i = 0; i < 3; i++)`?",
        options: ["2 vezes", "3 vezes", "4 vezes", "Nunca"],
        correctAnswer: 1,
        explanation:
          "`i` assume 0, 1 e 2. Quando chega a 3, a condição `i < 3` fica falsa.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>

int main() {
    for (int i = 2; i <= 6; i = i + 2) {
        std::cout << i << ' ';
    }

    return 0;
}`,
        answer: "2 4 6",
        explanation:
          "`i` começa em 2 e aumenta de 2 em 2 enquanto for menor ou igual a 6.",
      },
    ],
    practiceExercises: [
      {
        title: "Tabuada curta",
        description:
          "Leia um número inteiro e mostre a tabuada dele de 1 até 10 usando `for`.",
        expectedConcepts: ["for", "cin", "multiplicação", "cout"],
      },
    ],
    quickReview: [
      "`for` é ótimo para laços com contador.",
      "O cabeçalho traz inicialização, condição e atualização.",
      "A condição é testada antes de cada repetição.",
      "`i++` aumenta o contador em 1.",
    ],
  },
  {
    id: "break-e-continue",
    title: "break e continue",
    module: "Repetições",
    chapterReference: "Deitel, Cap. 5, p. 159-161",
    difficulty: "iniciante",
    estimatedMinutes: 9,
    tags: ["break", "continue", "controle de fluxo"],
    objective:
      "Controlar o fluxo de um laço interrompendo a repetição ou pulando uma volta específica.",
    explanation: {
      short:
        "`break` encerra o laço imediatamente. `continue` pula o restante da volta atual e segue para a próxima repetição.",
      detailed:
        "Esses comandos alteram o caminho normal de um laço. Use com cuidado: eles podem deixar a intenção mais clara em alguns casos, mas também podem dificultar a leitura se aparecerem demais.",
    },
    codeExamples: [
      {
        title: "Parando com break",
        code: `#include <iostream>

int main() {
    for (int i = 1; i <= 10; i++) {
        if (i == 6) {
            break;
        }

        std::cout << i << ' ';
    }

    return 0;
}`,
        explanation: [
          "O `for` poderia contar de 1 até 10.",
          "Quando `i` chega a 6, o `break` encerra o laço.",
          "Por isso apenas 1, 2, 3, 4 e 5 são impressos.",
        ],
      },
      {
        title: "Pulando com continue",
        code: `#include <iostream>

int main() {
    for (int i = 1; i <= 5; i++) {
        if (i == 3) {
            continue;
        }

        std::cout << i << ' ';
    }

    return 0;
}`,
        explanation: [
          "Quando `i` vale 3, o `continue` pula o restante daquela volta.",
          "O `cout` não executa para o valor 3.",
          "Depois disso, o laço continua normalmente com 4 e 5.",
        ],
      },
    ],
    tips: [
      "`break` combina com a ideia de 'já encontrei o que precisava'.",
      "`continue` combina com 'este caso eu quero ignorar'.",
      "Se muitos `break` e `continue` aparecerem juntos, revise a lógica.",
    ],
    commonMistakes: [
      "Achar que `continue` encerra o laço inteiro; ele só pula a volta atual.",
      "Usar `break` cedo demais e impedir que casos importantes sejam processados.",
      "Colocar código depois de `break` no mesmo bloco esperando que ele execute.",
    ],
    quiz: [
      {
        question: "O que `break` faz dentro de um laço?",
        options: [
          "Pula apenas a volta atual",
          "Encerra o laço imediatamente",
          "Reinicia o programa",
          "Cria uma variável",
        ],
        correctAnswer: 1,
        explanation:
          "`break` sai do laço onde ele está sendo executado.",
      },
      {
        question: "O que `continue` faz?",
        options: [
          "Pula o restante da volta atual",
          "Encerra todos os laços do programa",
          "Volta para a função `main`",
          "Compara dois valores",
        ],
        correctAnswer: 0,
        explanation:
          "`continue` ignora o restante da iteração atual e passa para a próxima.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>

int main() {
    for (int i = 1; i <= 5; i++) {
        if (i == 2) {
            continue;
        }

        if (i == 5) {
            break;
        }

        std::cout << i << ' ';
    }

    return 0;
}`,
        answer: "1 3 4",
        explanation:
          "`2` é pulado pelo `continue`. Quando `i` chega a 5, o `break` encerra o laço antes do `cout`.",
      },
    ],
    practiceExercises: [
      {
        title: "Ignorar negativos",
        description:
          "Use um laço para percorrer números de -3 até 3 e imprimir apenas os valores maiores ou iguais a zero usando `continue`.",
        expectedConcepts: ["for", "if", "continue", "comparação"],
      },
    ],
    quickReview: [
      "`break` encerra o laço.",
      "`continue` pula a volta atual.",
      "Os dois devem ser usados com intenção clara.",
      "Código depois de `break` no mesmo bloco não executa.",
    ],
  },
  {
    id: "funcoes",
    title: "Funções",
    module: "Funções",
    chapterReference: "Deitel, Cap. 6, p. 182-190",
    difficulty: "iniciante",
    estimatedMinutes: 11,
    tags: ["função", "parâmetro", "retorno"],
    objective:
      "Entender como funções dividem um programa em partes menores, reutilizáveis e mais fáceis de testar.",
    explanation: {
      short:
        "Função é um bloco de código com nome, criado para executar uma tarefa específica.",
      detailed:
        "Uma função pode receber valores, chamados parâmetros, executar comandos e devolver um resultado com `return`. Usar funções evita repetição e ajuda a organizar programas maiores.",
    },
    codeExamples: [
      {
        title: "Função que soma dois inteiros",
        code: `#include <iostream>

int somar(int a, int b) {
    return a + b;
}

int main() {
    int resultado = somar(3, 4);

    std::cout << resultado << '\\n';

    return 0;
}`,
        explanation: [
          "`int somar(int a, int b)` declara uma função que retorna inteiro.",
          "`a` e `b` são parâmetros da função.",
          "`return a + b;` devolve o resultado para quem chamou.",
          "`somar(3, 4)` chama a função passando dois argumentos.",
          "`resultado` guarda o valor retornado pela função.",
        ],
      },
      {
        title: "Função sem retorno",
        code: `#include <iostream>

void mostrarLinha() {
    std::cout << "----------\\n";
}

int main() {
    mostrarLinha();
    std::cout << "Relatorio\\n";
    mostrarLinha();

    return 0;
}`,
        explanation: [
          "`void` indica que a função não devolve valor.",
          "`mostrarLinha()` imprime uma linha simples.",
          "A mesma função é chamada duas vezes dentro do `main`.",
          "Isso evita repetir o mesmo `cout` em vários lugares.",
        ],
      },
    ],
    tips: [
      "Dê nomes de função que digam a ação: `somar`, `calcularMedia`, `mostrarMenu`.",
      "Comece com funções pequenas e fáceis de ler.",
      "`return` encerra a função e devolve um valor quando o tipo não é `void`.",
    ],
    commonMistakes: [
      "Esquecer o tipo de retorno antes do nome da função.",
      "Declarar que a função retorna `int` e esquecer o `return`.",
      "Confundir parâmetro com argumento: parâmetro está na definição, argumento está na chamada.",
      "Criar uma função que faz coisas demais ao mesmo tempo.",
    ],
    quiz: [
      {
        question: "O que significa `void` no tipo de retorno de uma função?",
        options: [
          "A função retorna um inteiro",
          "A função não retorna valor",
          "A função recebe dois parâmetros",
          "A função só pode ser chamada uma vez",
        ],
        correctAnswer: 1,
        explanation:
          "`void` indica que a função executa comandos, mas não devolve um valor para quem chamou.",
      },
      {
        question: "Em `somar(3, 4)`, os valores `3` e `4` são chamados de quê?",
        options: ["Parâmetros", "Argumentos", "Tipos", "Namespaces"],
        correctAnswer: 1,
        explanation:
          "Na chamada da função, os valores enviados são argumentos. Na definição, os nomes recebidos são parâmetros.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>

int triplo(int x) {
    return x * 3;
}

int main() {
    std::cout << triplo(5) << '\\n';
    return 0;
}`,
        answer: "15",
        explanation:
          "A função recebe 5 em `x`, calcula `5 * 3` e retorna 15 para o `cout`.",
      },
    ],
    practiceExercises: [
      {
        title: "Função de média",
        description:
          "Crie uma função `calcularMedia` que receba duas notas `double` e retorne a média.",
        expectedConcepts: ["função", "double", "parâmetro", "return"],
      },
    ],
    quickReview: [
      "Funções organizam o programa em tarefas menores.",
      "Parâmetros são valores recebidos pela função.",
      "Argumentos são valores enviados na chamada.",
      "`return` devolve um resultado para quem chamou.",
    ],
  },
  {
    id: "passagem-por-valor",
    title: "Passagem por valor",
    module: "Funções",
    chapterReference: "Deitel, Cap. 6, p. 185-189",
    difficulty: "iniciante",
    estimatedMinutes: 10,
    tags: ["função", "cópia", "valor"],
    objective:
      "Entender que, na passagem por valor, a função recebe uma cópia do argumento.",
    explanation: {
      short:
        "Passagem por valor significa que a função trabalha com uma cópia do valor enviado.",
      detailed:
        "Quando um parâmetro é passado por valor, alterações feitas dentro da função não mudam a variável original. Isso é seguro e comum para tipos pequenos como `int`, `double`, `char` e `bool`.",
    },
    codeExamples: [
      {
        title: "Tentando dobrar um número",
        code: `#include <iostream>

void dobrar(int x) {
    x = x * 2;
}

int main() {
    int numero = 10;

    dobrar(numero);

    std::cout << numero << '\\n';

    return 0;
}`,
        explanation: [
          "`numero` começa valendo 10.",
          "A chamada `dobrar(numero)` envia uma cópia do valor para `x`.",
          "Dentro da função, apenas a cópia `x` é alterada.",
          "`numero` continua valendo 10 no `main`.",
        ],
      },
      {
        title: "Retornando o novo valor",
        code: `#include <iostream>

int dobrado(int x) {
    return x * 2;
}

int main() {
    int numero = 10;
    numero = dobrado(numero);

    std::cout << numero << '\\n';

    return 0;
}`,
        explanation: [
          "A função ainda recebe uma cópia.",
          "Em vez de tentar alterar o original, ela retorna o valor calculado.",
          "`numero = dobrado(numero);` atualiza a variável com o retorno.",
          "Agora a saída é 20.",
        ],
      },
    ],
    tips: [
      "Use passagem por valor quando a função não precisa alterar o original.",
      "Pense em passagem por valor como entregar uma xerox para a função.",
      "Para tipos pequenos, passagem por valor é simples e suficiente.",
    ],
    commonMistakes: [
      "Esperar que a variável original mude quando o parâmetro foi passado por valor.",
      "Esquecer de usar o retorno da função.",
      "Confundir alterar a cópia com alterar o argumento original.",
    ],
    quiz: [
      {
        question: "Na passagem por valor, o parâmetro recebe o quê?",
        options: [
          "O endereço da variável original",
          "Uma cópia do valor",
          "Uma referência obrigatória",
          "Um array escondido",
        ],
        correctAnswer: 1,
        explanation:
          "A função recebe uma cópia. Por isso mudanças no parâmetro não afetam a variável original.",
      },
      {
        question: "Qual é uma boa forma de devolver um cálculo feito pela função?",
        options: ["`return`", "`continue`", "`break`", "`#include`"],
        correctAnswer: 0,
        explanation:
          "`return` devolve um valor para o ponto onde a função foi chamada.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>

void alterar(int x) {
    x = 99;
}

int main() {
    int valor = 5;
    alterar(valor);
    std::cout << valor << '\\n';
    return 0;
}`,
        answer: "5",
        explanation:
          "`alterar` muda apenas a cópia `x`. A variável `valor` do `main` continua valendo 5.",
      },
    ],
    practiceExercises: [
      {
        title: "Quadrado com retorno",
        description:
          "Crie uma função que receba um inteiro por valor e retorne o quadrado dele.",
        expectedConcepts: ["passagem por valor", "return", "multiplicação"],
      },
    ],
    quickReview: [
      "Passagem por valor entrega uma cópia para a função.",
      "Alterar o parâmetro não altera a variável original.",
      "Para mudar o resultado no `main`, use o valor retornado.",
      "É uma forma simples e segura para tipos pequenos.",
    ],
  },
  {
    id: "referencias-parametros",
    title: "Referências e parâmetros por referência",
    module: "Funções",
    chapterReference: "Deitel, Cap. 6, p. 209-213",
    difficulty: "iniciante",
    estimatedMinutes: 11,
    tags: ["referência", "int&", "parâmetro"],
    objective:
      "Usar referências para permitir que uma função trabalhe diretamente com a variável original.",
    explanation: {
      short:
        "Uma referência é um apelido para uma variável existente. Em parâmetros, ela permite alterar o argumento original.",
      detailed:
        "Quando uma função recebe `int& x`, `x` não é uma cópia: é outro nome para a variável enviada. Isso é útil quando a função precisa modificar o valor original ou devolver mais de um resultado.",
    },
    codeExamples: [
      {
        title: "Dobrando por referência",
        code: `#include <iostream>

void dobrar(int& x) {
    x = x * 2;
}

int main() {
    int numero = 10;

    dobrar(numero);

    std::cout << numero << '\\n';

    return 0;
}`,
        explanation: [
          "`int& x` declara um parâmetro por referência.",
          "`x` passa a ser um apelido para `numero`.",
          "Quando a função altera `x`, ela altera `numero` diretamente.",
          "Por isso a saída é 20.",
        ],
      },
      {
        title: "Trocando dois valores",
        code: `#include <iostream>

void trocar(int& a, int& b) {
    int temporario = a;
    a = b;
    b = temporario;
}

int main() {
    int x = 3;
    int y = 7;

    trocar(x, y);

    std::cout << x << ' ' << y << '\\n';

    return 0;
}`,
        explanation: [
          "`a` é referência para `x` e `b` é referência para `y`.",
          "`temporario` guarda o valor antigo de `a` para não perdê-lo.",
          "Depois das atribuições, os valores originais foram trocados.",
          "A saída é `7 3`.",
        ],
      },
    ],
    tips: [
      "Use `&` no parâmetro quando a função precisa alterar o original.",
      "Deixe claro pelo nome da função que ela modifica algo.",
      "Quando não quiser permitir alteração, mais tarde você pode usar referência constante.",
    ],
    commonMistakes: [
      "Achar que `int x` e `int& x` têm o mesmo efeito em parâmetros.",
      "Usar referência quando só precisava calcular e retornar um valor.",
      "Modificar o argumento original sem deixar isso claro para quem chama a função.",
    ],
    quiz: [
      {
        question: "O que significa `int& x` em um parâmetro?",
        options: [
          "`x` é uma cópia do argumento",
          "`x` é um apelido para a variável original",
          "`x` é sempre um array",
          "`x` é uma constante",
        ],
        correctAnswer: 1,
        explanation:
          "O `&` no parâmetro cria uma referência, permitindo acessar a variável original.",
      },
      {
        question: "Qual efeito uma função pode ter ao receber parâmetro por referência?",
        options: [
          "Alterar a variável original",
          "Impedir qualquer modificação",
          "Apagar o programa",
          "Criar automaticamente um ponteiro nulo",
        ],
        correctAnswer: 0,
        explanation:
          "Como a referência é um apelido para o original, alterações nela afetam o argumento enviado.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>

void somarCinco(int& n) {
    n = n + 5;
}

int main() {
    int valor = 8;
    somarCinco(valor);
    std::cout << valor << '\\n';
    return 0;
}`,
        answer: "13",
        explanation:
          "`n` é referência para `valor`. Ao somar 5 em `n`, o valor original muda de 8 para 13.",
      },
    ],
    practiceExercises: [
      {
        title: "Zerar por referência",
        description:
          "Crie uma função `zerar` que receba um `int&` e altere a variável original para 0.",
        expectedConcepts: ["referência", "int&", "atribuição", "função"],
      },
    ],
    quickReview: [
      "Referência é um apelido para uma variável existente.",
      "`int& x` permite alterar o argumento original.",
      "Passagem por valor altera só a cópia; referência pode alterar o original.",
      "Use referência com cuidado e intenção clara.",
    ],
  },
  {
    id: "escopo-de-variaveis",
    title: "Escopo de variáveis",
    module: "Funções",
    chapterReference: "Deitel, Cap. 6, p. 202-204",
    difficulty: "iniciante",
    estimatedMinutes: 10,
    tags: ["escopo", "variável local", "bloco"],
    objective:
      "Entender onde uma variável existe, onde ela pode ser usada e por que isso evita confusão no programa.",
    explanation: {
      short:
        "Escopo é a região do código onde um nome, como uma variável, pode ser acessado.",
      detailed:
        "Variáveis criadas dentro de uma função ou bloco pertencem àquela região. Quando o bloco termina, a variável local deixa de existir. Isso permite usar nomes parecidos em partes diferentes sem que uma parte bagunce a outra.",
    },
    codeExamples: [
      {
        title: "Variável local dentro de função",
        code: `#include <iostream>

void mostrarNumero() {
    int numero = 10;
    std::cout << numero << '\\n';
}

int main() {
    mostrarNumero();

    return 0;
}`,
        explanation: [
          "`numero` foi criada dentro de `mostrarNumero`.",
          "Ela só pode ser usada dentro dessa função.",
          "`main` chama a função, mas não acessa `numero` diretamente.",
          "Quando a função termina, a variável local deixa de existir.",
        ],
      },
      {
        title: "Escopo de bloco",
        code: `#include <iostream>

int main() {
    int x = 5;

    if (x > 0) {
        int dobro = x * 2;
        std::cout << dobro << '\\n';
    }

    std::cout << x << '\\n';

    return 0;
}`,
        explanation: [
          "`x` foi criada dentro do `main`, então pode ser usada no bloco do `if`.",
          "`dobro` foi criada dentro das chaves do `if`.",
          "Fora do bloco do `if`, `dobro` não existe mais.",
          "O programa ainda consegue imprimir `x` depois do `if`.",
        ],
      },
    ],
    tips: [
      "Declare variáveis o mais perto possível de onde serão usadas.",
      "Use blocos pequenos para limitar onde cada variável existe.",
      "Se uma variável só faz sentido dentro de um `if` ou `for`, declare ali.",
    ],
    commonMistakes: [
      "Tentar usar fora do bloco uma variável criada dentro dele.",
      "Criar variáveis com o mesmo nome em escopos diferentes e se confundir.",
      "Declarar tudo no começo do `main` mesmo quando o uso é bem localizado.",
    ],
    quiz: [
      {
        question: "O que é escopo?",
        options: [
          "A região onde um nome pode ser acessado",
          "O tipo de uma variável",
          "O valor retornado por uma função",
          "O tamanho de um array",
        ],
        correctAnswer: 0,
        explanation:
          "Escopo define onde uma variável, função ou outro nome pode ser usado no código.",
      },
      {
        question: "Uma variável criada dentro de um bloco `{ }` pode ser usada onde?",
        options: [
          "Em qualquer arquivo do projeto",
          "Somente depois do `return`",
          "Dentro daquele bloco e de blocos internos",
          "Apenas antes de ser declarada",
        ],
        correctAnswer: 2,
        explanation:
          "A variável local pertence ao bloco onde foi declarada e pode ser vista por blocos internos.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>

int main() {
    int x = 2;

    {
        int y = 3;
        std::cout << x + y << '\\n';
    }

    std::cout << x << '\\n';

    return 0;
}`,
        answer: "5\n2",
        explanation:
          "Dentro do bloco, `x` e `y` existem, então `x + y` dá 5. Fora dele, apenas `x` continua acessível.",
      },
    ],
    practiceExercises: [
      {
        title: "Variável no lugar certo",
        description:
          "Crie um programa com um `if` e declare dentro dele uma variável usada apenas naquele bloco.",
        expectedConcepts: ["escopo", "if", "variável local", "bloco"],
      },
    ],
    quickReview: [
      "Escopo define onde uma variável pode ser usada.",
      "Variáveis locais pertencem à função ou bloco onde foram criadas.",
      "Ao sair do bloco, a variável local deixa de existir.",
      "Escopos menores deixam o código mais fácil de entender.",
    ],
  },
  {
    id: "pilha-de-chamadas",
    title: "Pilha de chamadas de função",
    module: "Funções",
    chapterReference: "Deitel, Cap. 6, p. 204-206",
    difficulty: "iniciante",
    estimatedMinutes: 11,
    tags: ["pilha", "chamada", "função"],
    objective:
      "Visualizar o que acontece quando uma função chama outra e como cada chamada guarda suas próprias variáveis.",
    explanation: {
      short:
        "A pilha de chamadas registra quais funções estão em execução e em que ordem elas devem terminar.",
      detailed:
        "Quando uma função é chamada, um novo espaço de execução é colocado no topo da pilha. Esse espaço guarda parâmetros e variáveis locais daquela chamada. Quando a função termina, esse espaço sai da pilha e o programa volta para quem chamou.",
    },
    codeExamples: [
      {
        title: "Uma função chamando outra",
        code: `#include <iostream>

int quadrado(int x) {
    return x * x;
}

int somarQuadrados(int a, int b) {
    return quadrado(a) + quadrado(b);
}

int main() {
    int resultado = somarQuadrados(2, 3);

    std::cout << resultado << '\\n';

    return 0;
}`,
        explanation: [
          "`main` chama `somarQuadrados(2, 3)`.",
          "`somarQuadrados` chama `quadrado(a)` e depois `quadrado(b)`.",
          "Cada chamada de `quadrado` tem seu próprio parâmetro `x`.",
          "Depois que as chamadas terminam, o resultado volta para o `main`.",
        ],
      },
    ],
    tips: [
      "Pense na pilha como uma sequência de tarefas: a última chamada precisa terminar antes de voltar.",
      "Cada chamada tem suas próprias variáveis locais.",
      "Ao depurar, observe a ordem das chamadas para entender de onde veio um valor.",
    ],
    commonMistakes: [
      "Achar que variáveis locais de uma função continuam existindo depois que ela termina.",
      "Confundir duas chamadas da mesma função como se compartilhassem o mesmo parâmetro local.",
      "Perder a ordem mental quando uma função chama outra função.",
    ],
    quiz: [
      {
        question: "O que acontece quando uma função é chamada?",
        options: [
          "Um novo contexto entra na pilha de chamadas",
          "Todas as variáveis do programa são apagadas",
          "O código volta imediatamente para o `main`",
          "O compilador cria um novo arquivo",
        ],
        correctAnswer: 0,
        explanation:
          "Cada chamada cria um novo contexto com parâmetros, variáveis locais e ponto de retorno.",
      },
      {
        question: "Quando uma função termina, o que acontece com suas variáveis locais?",
        options: [
          "Ficam disponíveis para todas as outras funções",
          "Saem junto com o contexto daquela chamada",
          "Viraram variáveis globais",
          "São impressas automaticamente",
        ],
        correctAnswer: 1,
        explanation:
          "As variáveis locais pertencem à chamada. Quando a chamada termina, esse contexto é removido.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>

int adicionarUm(int x) {
    return x + 1;
}

int main() {
    int valor = adicionarUm(adicionarUm(3));
    std::cout << valor << '\\n';
    return 0;
}`,
        answer: "5",
        explanation:
          "A chamada interna `adicionarUm(3)` retorna 4. Depois a chamada externa recebe 4 e retorna 5.",
      },
    ],
    practiceExercises: [
      {
        title: "Desenhar a pilha",
        description:
          "Crie duas funções pequenas, uma chamando a outra, e escreva em comentário a ordem das chamadas até voltar ao `main`.",
        expectedConcepts: ["função", "pilha de chamadas", "return", "comentários"],
      },
    ],
    quickReview: [
      "Cada chamada de função cria um contexto próprio.",
      "Parâmetros e variáveis locais pertencem à chamada atual.",
      "Quando a função termina, seu contexto sai da pilha.",
      "A execução volta para o ponto logo após a chamada.",
    ],
  },
  {
    id: "arrays",
    title: "Arrays",
    module: "Coleções e texto",
    chapterReference: "Deitel, Cap. 7, p. 251-267",
    difficulty: "iniciante",
    estimatedMinutes: 12,
    tags: ["array", "índice", "coleção"],
    objective:
      "Guardar vários valores do mesmo tipo em uma sequência e acessar cada posição por índice.",
    explanation: {
      short:
        "Array é uma coleção de tamanho fixo que guarda vários elementos do mesmo tipo.",
      detailed:
        "Em C++, um array como `int notas[3]` cria três posições para inteiros. Os índices começam em 0, então as posições válidas são `0`, `1` e `2`. Acessar fora desse limite é erro perigoso.",
    },
    codeExamples: [
      {
        title: "Guardando notas",
        code: `#include <iostream>

int main() {
    int notas[3] = {8, 9, 10};

    std::cout << notas[0] << '\\n';
    std::cout << notas[1] << '\\n';
    std::cout << notas[2] << '\\n';

    return 0;
}`,
        explanation: [
          "`int notas[3]` cria um array com três inteiros.",
          "`{8, 9, 10}` inicializa as três posições.",
          "`notas[0]` acessa o primeiro elemento.",
          "`notas[2]` acessa o terceiro elemento.",
        ],
      },
      {
        title: "Percorrendo com for",
        code: `#include <iostream>

int main() {
    int notas[3] = {8, 9, 10};

    for (int i = 0; i < 3; i++) {
        std::cout << notas[i] << '\\n';
    }

    return 0;
}`,
        explanation: [
          "`i` começa em 0 porque o primeiro índice do array é 0.",
          "`i < 3` garante que os índices sejam 0, 1 e 2.",
          "`notas[i]` acessa uma posição diferente a cada volta.",
          "O `for` evita repetir três comandos `cout` parecidos.",
        ],
      },
    ],
    tips: [
      "Sempre lembre: se o tamanho é 3, o último índice é 2.",
      "Use `for` para percorrer arrays com contador.",
      "Prefira `std::vector` mais adiante quando precisar de tamanho variável.",
    ],
    commonMistakes: [
      "Acessar `notas[3]` em um array de tamanho 3.",
      "Começar o laço em 1 e pular o primeiro elemento sem querer.",
      "Usar arrays para tamanho que precisa crescer durante o programa.",
    ],
    quiz: [
      {
        question: "Qual é o primeiro índice de um array em C++?",
        options: ["`0`", "`1`", "`-1`", "`tamanho`"],
        correctAnswer: 0,
        explanation:
          "Arrays em C++ começam no índice 0. O primeiro elemento é acessado com `array[0]`.",
      },
      {
        question: "Em `int valores[5]`, qual é o último índice válido?",
        options: ["`5`", "`4`", "`6`", "`1`"],
        correctAnswer: 1,
        explanation:
          "Um array de tamanho 5 tem índices 0, 1, 2, 3 e 4.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>

int main() {
    int numeros[4] = {2, 4, 6, 8};

    std::cout << numeros[1] + numeros[3] << '\\n';

    return 0;
}`,
        answer: "12",
        explanation:
          "`numeros[1]` vale 4 e `numeros[3]` vale 8. A soma é 12.",
      },
    ],
    practiceExercises: [
      {
        title: "Maior nota",
        description:
          "Crie um array com 5 notas inteiras e use um `for` para mostrar todas elas.",
        expectedConcepts: ["array", "índice", "for", "cout"],
      },
    ],
    quickReview: [
      "Array guarda vários elementos do mesmo tipo.",
      "O tamanho do array tradicional é fixo.",
      "Índices começam em 0.",
      "Acessar fora do limite do array é erro perigoso.",
    ],
  },
  {
    id: "arrays-em-funcoes",
    title: "Passagem de arrays para funções",
    module: "Coleções e texto",
    chapterReference: "Deitel, Cap. 7, p. 267-271",
    difficulty: "iniciante",
    estimatedMinutes: 12,
    tags: ["array", "função", "tamanho"],
    objective:
      "Passar arrays para funções com segurança básica, sempre informando também o tamanho.",
    explanation: {
      short:
        "Quando um array é passado para uma função, a função precisa saber quantos elementos deve percorrer.",
      detailed:
        "Em muitos contextos, o array passado para uma função se comporta como acesso ao início da sequência original. Por isso, alterar elementos dentro da função altera o array original. Como a função não sabe sozinha o tamanho, passe o tamanho em outro parâmetro.",
    },
    codeExamples: [
      {
        title: "Mostrando um array",
        code: `#include <iostream>

void mostrarNotas(const int notas[], int tamanho) {
    for (int i = 0; i < tamanho; i++) {
        std::cout << notas[i] << '\\n';
    }
}

int main() {
    int notas[3] = {8, 9, 10};

    mostrarNotas(notas, 3);

    return 0;
}`,
        explanation: [
          "`const int notas[]` indica que a função recebe um array para leitura.",
          "`tamanho` informa quantas posições devem ser percorridas.",
          "O `for` usa `i < tamanho` para evitar passar do limite.",
          "`mostrarNotas(notas, 3)` envia o array e seu tamanho.",
        ],
      },
      {
        title: "Alterando elementos",
        code: `#include <iostream>

void zerar(int valores[], int tamanho) {
    for (int i = 0; i < tamanho; i++) {
        valores[i] = 0;
    }
}

int main() {
    int pontos[3] = {5, 7, 9};

    zerar(pontos, 3);

    std::cout << pontos[0] << ' ' << pontos[1] << ' ' << pontos[2] << '\\n';

    return 0;
}`,
        explanation: [
          "`zerar` recebe o array e percorre todas as posições.",
          "`valores[i] = 0` altera cada elemento.",
          "A alteração afeta o array original `pontos`.",
          "Por isso a saída mostra três zeros.",
        ],
      },
    ],
    tips: [
      "Passe o tamanho junto com o array.",
      "Use `const` quando a função só precisa ler os elementos.",
      "Nomeie o parâmetro de tamanho com clareza: `tamanho`, `quantidade` ou `total`.",
    ],
    commonMistakes: [
      "Esquecer o tamanho e tentar descobrir dentro da função.",
      "Alterar o array original sem perceber.",
      "Usar `<= tamanho` no laço e acessar uma posição fora do array.",
    ],
    quiz: [
      {
        question: "Por que passamos `tamanho` junto com o array?",
        options: [
          "Porque a função precisa saber quantos elementos percorrer",
          "Porque arrays só aceitam tamanho negativo",
          "Porque `cout` exige isso",
          "Porque `main` não pode chamar funções sem tamanho",
        ],
        correctAnswer: 0,
        explanation:
          "A função não deve adivinhar o limite. O tamanho evita percorrer posições inválidas.",
      },
      {
        question: "Quando usar `const int valores[]` em um parâmetro?",
        options: [
          "Quando a função só vai ler o array",
          "Quando a função precisa alterar todos os elementos",
          "Quando o array tem tamanho zero",
          "Quando o array guarda `double`",
        ],
        correctAnswer: 0,
        explanation:
          "`const` comunica e protege a intenção de apenas leitura.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>

void alterar(int valores[], int tamanho) {
    for (int i = 0; i < tamanho; i++) {
        valores[i] = valores[i] + 1;
    }
}

int main() {
    int numeros[3] = {1, 2, 3};
    alterar(numeros, 3);
    std::cout << numeros[0] << ' ' << numeros[2] << '\\n';
    return 0;
}`,
        answer: "2 4",
        explanation:
          "A função soma 1 em cada elemento do array original. O primeiro vira 2 e o terceiro vira 4.",
      },
    ],
    practiceExercises: [
      {
        title: "Somar array",
        description:
          "Crie uma função que receba um array de inteiros e seu tamanho, e retorne a soma dos elementos.",
        expectedConcepts: ["array", "função", "for", "return"],
      },
    ],
    quickReview: [
      "Passe arrays para funções junto com o tamanho.",
      "Use `const` para arrays que serão apenas lidos.",
      "Funções podem alterar elementos do array original.",
      "O laço deve usar `i < tamanho`, não `i <= tamanho`.",
    ],
  },
  {
    id: "ponteiros-basicos",
    title: "Ponteiros básicos",
    module: "Ponteiros",
    chapterReference: "Deitel, Cap. 8, p. 312-315",
    difficulty: "intermediario",
    estimatedMinutes: 12,
    tags: ["ponteiro", "endereço", "memória"],
    objective:
      "Entender ponteiro como uma variável que guarda o endereço de outra variável.",
    explanation: {
      short:
        "Ponteiro é uma variável que guarda um endereço de memória.",
      detailed:
        "Se uma variável comum guarda um valor, um ponteiro guarda onde esse valor está. O operador `&` pega o endereço de uma variável. O operador `*`, quando usado com um ponteiro, acessa o valor guardado naquele endereço.",
    },
    codeExamples: [
      {
        title: "Endereço e valor apontado",
        code: `#include <iostream>

int main() {
    int idade = 21;
    int* ponteiro = &idade;

    std::cout << idade << '\\n';
    std::cout << ponteiro << '\\n';
    std::cout << *ponteiro << '\\n';

    return 0;
}`,
        explanation: [
          "`idade` guarda o valor 21.",
          "`int* ponteiro` declara um ponteiro para inteiro.",
          "`&idade` pega o endereço da variável `idade`.",
          "`ponteiro` guarda esse endereço.",
          "`*ponteiro` acessa o valor que está no endereço apontado.",
        ],
      },
      {
        title: "Alterando pelo ponteiro",
        code: `#include <iostream>

int main() {
    int numero = 10;
    int* p = &numero;

    *p = 30;

    std::cout << numero << '\\n';

    return 0;
}`,
        explanation: [
          "`p` aponta para `numero`.",
          "`*p = 30;` entra no endereço apontado e altera o valor.",
          "Como o endereço é o de `numero`, a variável original muda.",
          "A saída é 30.",
        ],
      },
    ],
    tips: [
      "Leia `&x` como 'endereço de x'.",
      "Leia `*p` como 'valor apontado por p'.",
      "Inicialize ponteiros; se não tiver endereço válido, use `nullptr`.",
    ],
    commonMistakes: [
      "Confundir o endereço guardado no ponteiro com o valor apontado.",
      "Usar `*p` antes de `p` apontar para um endereço válido.",
      "Achar que `int* p` cria um inteiro; ele cria um ponteiro para inteiro.",
    ],
    quiz: [
      {
        question: "O que `&idade` produz?",
        options: [
          "O valor de `idade` dobrado",
          "O endereço da variável `idade`",
          "Uma cópia de `idade`",
          "Um array de inteiros",
        ],
        correctAnswer: 1,
        explanation:
          "O operador `&` pega o endereço de uma variável.",
      },
      {
        question: "Se `p` é um ponteiro válido, o que `*p` acessa?",
        options: [
          "O nome do ponteiro",
          "O valor guardado no endereço apontado",
          "O tamanho do programa",
          "O número de linhas do arquivo",
        ],
        correctAnswer: 1,
        explanation:
          "`*p` desreferencia o ponteiro, acessando o valor no endereço que ele guarda.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>

int main() {
    int x = 5;
    int* p = &x;

    *p = *p + 2;

    std::cout << x << '\\n';

    return 0;
}`,
        answer: "7",
        explanation:
          "`p` aponta para `x`. `*p = *p + 2` soma 2 ao valor de `x`, que passa de 5 para 7.",
      },
    ],
    practiceExercises: [
      {
        title: "Valor pelo endereço",
        description:
          "Crie uma variável `int`, um ponteiro apontando para ela e altere o valor original usando `*ponteiro`.",
        expectedConcepts: ["ponteiro", "&", "*", "atribuição"],
      },
    ],
    quickReview: [
      "Ponteiro guarda endereço de memória.",
      "`&` pega o endereço de uma variável.",
      "`*` acessa o valor apontado por um ponteiro.",
      "`nullptr` representa um ponteiro que não aponta para objeto válido.",
    ],
  },
  {
    id: "ponteiros-em-funcoes",
    title: "Ponteiros em funções",
    module: "Ponteiros",
    chapterReference: "Deitel, Cap. 8, p. 315-319",
    difficulty: "intermediario",
    estimatedMinutes: 12,
    tags: ["ponteiro", "função", "parâmetro"],
    objective:
      "Usar ponteiros como parâmetros para permitir que uma função acesse ou altere uma variável original.",
    explanation: {
      short:
        "Uma função pode receber um ponteiro para trabalhar com o endereço de uma variável.",
      detailed:
        "Ao passar `&x` para uma função que recebe `int*`, a função recebe o endereço de `x`. Dentro da função, `*p` acessa ou altera o valor original. Isso se parece com referência em efeito, mas a sintaxe deixa o endereço explícito.",
    },
    codeExamples: [
      {
        title: "Alterando por ponteiro",
        code: `#include <iostream>

void alterar(int* p) {
    *p = 99;
}

int main() {
    int x = 10;

    alterar(&x);

    std::cout << x << '\\n';

    return 0;
}`,
        explanation: [
          "`alterar` recebe um ponteiro para inteiro.",
          "`alterar(&x)` envia o endereço de `x`.",
          "Dentro da função, `*p = 99;` altera o valor no endereço recebido.",
          "Como o endereço é o de `x`, a saída é 99.",
        ],
      },
      {
        title: "Verificando nullptr",
        code: `#include <iostream>

void mostrar(const int* p) {
    if (p != nullptr) {
        std::cout << *p << '\\n';
    }
}

int main() {
    int valor = 42;

    mostrar(&valor);
    mostrar(nullptr);

    return 0;
}`,
        explanation: [
          "`const int* p` indica que a função não deve alterar o valor apontado.",
          "`p != nullptr` verifica se há um endereço válido antes de usar `*p`.",
          "`mostrar(&valor)` imprime 42.",
          "`mostrar(nullptr)` não imprime nada, evitando acesso inválido.",
        ],
      },
    ],
    tips: [
      "Antes de usar `*p`, tenha certeza de que `p` não é `nullptr`.",
      "Use `const` no ponteiro quando a função só precisa ler o valor apontado.",
      "Se a ideia é só alterar uma variável simples, referência costuma ser mais legível para iniciantes.",
    ],
    commonMistakes: [
      "Chamar a função com `x` quando ela espera `&x`.",
      "Desreferenciar `nullptr` com `*p`.",
      "Esquecer que alterar `*p` altera o valor original apontado.",
    ],
    quiz: [
      {
        question: "Se uma função recebe `int* p`, como enviar o endereço de `x`?",
        options: ["`alterar(x)`", "`alterar(&x)`", "`alterar(*x)`", "`alterar(int x)`"],
        correctAnswer: 1,
        explanation:
          "`&x` pega o endereço de `x`, que combina com o parâmetro `int*`.",
      },
      {
        question: "Por que verificar `p != nullptr` antes de usar `*p`?",
        options: [
          "Para evitar acessar um endereço inválido",
          "Para transformar `p` em array",
          "Para imprimir o nome da variável",
          "Para encerrar o compilador",
        ],
        correctAnswer: 0,
        explanation:
          "`nullptr` indica que o ponteiro não aponta para um objeto válido. Desreferenciar isso é perigoso.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>

void somarDez(int* p) {
    *p = *p + 10;
}

int main() {
    int valor = 15;
    somarDez(&valor);
    std::cout << valor << '\\n';
    return 0;
}`,
        answer: "25",
        explanation:
          "A função recebe o endereço de `valor` e altera o valor apontado, somando 10.",
      },
    ],
    practiceExercises: [
      {
        title: "Dobrar por ponteiro",
        description:
          "Crie uma função que receba `int*` e dobre o valor original apenas se o ponteiro não for `nullptr`.",
        expectedConcepts: ["ponteiro", "função", "nullptr", "if"],
      },
    ],
    quickReview: [
      "Funções podem receber ponteiros como parâmetros.",
      "`&x` envia o endereço de `x`.",
      "`*p` acessa ou altera o valor apontado.",
      "Verifique `nullptr` antes de desreferenciar ponteiros que podem estar vazios.",
    ],
  },
  {
    id: "const-com-ponteiros",
    title: "const com ponteiros",
    module: "Ponteiros",
    chapterReference: "Deitel, Cap. 8, p. 319-324",
    difficulty: "intermediario",
    estimatedMinutes: 13,
    tags: ["const", "ponteiro", "imutabilidade"],
    objective:
      "Diferenciar ponteiro para valor constante, ponteiro constante e ponteiro constante para valor constante.",
    explanation: {
      short:
        "`const` com ponteiros define o que não pode mudar: o valor apontado, o endereço guardado, ou os dois.",
      detailed:
        "Em `const int* p`, o valor apontado não pode ser alterado por `p`, mas `p` pode apontar para outro lugar. Em `int* const p`, o ponteiro não pode mudar de endereço, mas o valor apontado pode ser alterado. Em `const int* const p`, nem o valor apontado nem o endereço guardado podem ser alterados por aquele ponteiro.",
    },
    codeExamples: [
      {
        title: "Ponteiro para valor constante",
        code: `#include <iostream>

int main() {
    int a = 10;
    int b = 20;

    const int* p = &a;

    std::cout << *p << '\\n';

    p = &b;

    std::cout << *p << '\\n';

    return 0;
}`,
        explanation: [
          "`const int* p` significa que `p` aponta para um valor tratado como constante.",
          "Você não pode fazer `*p = 30;` usando esse ponteiro.",
          "Mas pode mudar o endereço guardado em `p`.",
          "Por isso `p = &b;` é permitido.",
        ],
      },
      {
        title: "Ponteiro constante",
        code: `#include <iostream>

int main() {
    int numero = 10;

    int* const p = &numero;

    *p = 50;

    std::cout << numero << '\\n';

    return 0;
}`,
        explanation: [
          "`int* const p` significa que o ponteiro `p` é constante.",
          "O endereço guardado em `p` não pode mudar depois da inicialização.",
          "Mas o valor apontado ainda pode ser alterado.",
          "`*p = 50;` muda `numero` para 50.",
        ],
      },
      {
        title: "Os dois constantes",
        code: `#include <iostream>

int main() {
    int valor = 7;

    const int* const p = &valor;

    std::cout << *p << '\\n';

    return 0;
}`,
        explanation: [
          "`const int* const p` trava as duas coisas.",
          "Você não pode alterar o valor usando `*p`.",
          "Você também não pode fazer `p` apontar para outro endereço.",
          "Esse formato é útil quando a função deve apenas observar um valor fixo.",
        ],
      },
    ],
    tips: [
      "Leia da direita para a esquerda quando ficar confuso.",
      "`const` antes do tipo costuma proteger o valor apontado.",
      "`const` depois do `*` protege o próprio ponteiro.",
    ],
    commonMistakes: [
      "Achar que `const int* p` impede `p` de apontar para outro endereço.",
      "Achar que `int* const p` impede alterar o valor apontado.",
      "Esquecer que um ponteiro constante precisa ser inicializado na declaração.",
    ],
    quiz: [
      {
        question: "Em `const int* p`, o que fica protegido contra alteração por `p`?",
        options: [
          "O endereço guardado em `p`",
          "O valor apontado por `p`",
          "O nome da variável",
          "O arquivo inteiro",
        ],
        correctAnswer: 1,
        explanation:
          "`const int* p` permite mudar `p` para outro endereço, mas não permite alterar o valor usando `*p`.",
      },
      {
        question: "Em `int* const p`, o que não pode mudar?",
        options: [
          "O endereço guardado em `p`",
          "O valor apontado por `p`",
          "O tipo `int` da linguagem",
          "A saída do programa",
        ],
        correctAnswer: 0,
        explanation:
          "O `const` depois do `*` torna o próprio ponteiro constante.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>

int main() {
    int a = 3;
    int b = 9;

    const int* p = &a;
    p = &b;

    std::cout << *p << '\\n';

    return 0;
}`,
        answer: "9",
        explanation:
          "`const int* p` não permite alterar `*p`, mas permite apontar para `b`. Depois da troca, `*p` vale 9.",
      },
    ],
    practiceExercises: [
      {
        title: "Leitura segura",
        description:
          "Crie uma função que receba `const int*` e imprima o valor apenas se o ponteiro não for `nullptr`.",
        expectedConcepts: ["const", "ponteiro", "nullptr", "função"],
      },
    ],
    quickReview: [
      "`const int* p` protege o valor apontado.",
      "`int* const p` protege o endereço guardado no ponteiro.",
      "`const int* const p` protege os dois.",
      "O lugar do `const` muda o significado.",
    ],
  },
  {
    id: "ponteiros-e-arrays",
    title: "Relação entre ponteiros e arrays",
    module: "Ponteiros",
    chapterReference: "Deitel, Cap. 8, p. 332-335",
    difficulty: "intermediario",
    estimatedMinutes: 13,
    tags: ["ponteiro", "array", "índice"],
    objective:
      "Entender por que arrays e ponteiros aparecem juntos em muitos exemplos de C++.",
    explanation: {
      short:
        "O nome de um array pode ser usado como acesso ao endereço do primeiro elemento.",
      detailed:
        "Quando escrevemos `numeros`, em muitos contextos o array se comporta como um ponteiro para seu primeiro elemento. Por isso `numeros[0]` e `*numeros` acessam o primeiro valor. A notação com índice é mais clara para iniciantes, mas a relação com ponteiros explica como arrays são passados para funções.",
    },
    codeExamples: [
      {
        title: "Primeiro elemento pelo ponteiro",
        code: `#include <iostream>

int main() {
    int numeros[3] = {10, 20, 30};

    std::cout << numeros[0] << '\\n';
    std::cout << *numeros << '\\n';

    return 0;
}`,
        explanation: [
          "`numeros[0]` acessa o primeiro elemento pelo índice.",
          "Em muitos contextos, `numeros` representa o endereço do primeiro elemento.",
          "`*numeros` acessa o valor guardado nesse primeiro endereço.",
          "As duas linhas imprimem 10.",
        ],
      },
      {
        title: "Percorrendo com ponteiro",
        code: `#include <iostream>

int main() {
    int numeros[3] = {10, 20, 30};
    int* p = numeros;

    for (int i = 0; i < 3; i++) {
        std::cout << *(p + i) << '\\n';
    }

    return 0;
}`,
        explanation: [
          "`int* p = numeros;` faz `p` apontar para o primeiro elemento.",
          "`p + i` avança `i` posições de inteiro.",
          "`*(p + i)` acessa o valor naquela posição.",
          "Para leitura inicial, `numeros[i]` costuma ser mais claro.",
        ],
      },
      {
        title: "Array como parâmetro",
        code: `#include <iostream>

void mostrar(const int* valores, int tamanho) {
    for (int i = 0; i < tamanho; i++) {
        std::cout << valores[i] << '\\n';
    }
}

int main() {
    int pontos[3] = {4, 6, 8};

    mostrar(pontos, 3);

    return 0;
}`,
        explanation: [
          "`const int* valores` recebe acesso ao primeiro elemento do array.",
          "`valores[i]` ainda pode ser usado com índice dentro da função.",
          "`tamanho` continua necessário para saber onde parar.",
          "Esse exemplo mostra a ponte entre arrays e ponteiros em funções.",
        ],
      },
    ],
    tips: [
      "Para estudar, prefira `array[i]` quando a intenção for acessar posição.",
      "Use ponteiros para entender o que acontece por baixo, não para complicar exemplos simples.",
      "Sempre mantenha o tamanho por perto ao percorrer arrays.",
    ],
    commonMistakes: [
      "Achar que o nome do array é uma variável comum que pode receber outro endereço.",
      "Avançar ponteiro além do último elemento válido.",
      "Confundir `p + 1` com somar 1 byte; em `int*`, ele avança uma posição de `int`.",
    ],
    quiz: [
      {
        question: "Em muitos contextos, o nome de um array representa o quê?",
        options: [
          "O endereço do primeiro elemento",
          "O último elemento do array",
          "A soma de todos os elementos",
          "O tamanho total automaticamente",
        ],
        correctAnswer: 0,
        explanation:
          "O nome do array pode ser usado como acesso ao endereço do primeiro elemento.",
      },
      {
        question: "Se `int numeros[3] = {10, 20, 30};`, o que `*numeros` acessa?",
        options: ["`10`", "`20`", "`30`", "O tamanho 3"],
        correctAnswer: 0,
        explanation:
          "`numeros` aponta para o primeiro elemento em muitos contextos; `*numeros` acessa esse valor.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>

int main() {
    int valores[3] = {2, 4, 6};
    int* p = valores;

    std::cout << *(p + 2) << '\\n';

    return 0;
}`,
        answer: "6",
        explanation:
          "`p` aponta para o primeiro elemento. `p + 2` avança até o terceiro elemento, que vale 6.",
      },
    ],
    practiceExercises: [
      {
        title: "Mesmo resultado, duas sintaxes",
        description:
          "Crie um array com 3 inteiros e imprima o primeiro elemento usando `array[0]` e `*array`.",
        expectedConcepts: ["array", "ponteiro", "índice", "desreferência"],
      },
    ],
    quickReview: [
      "O nome do array pode representar o endereço do primeiro elemento.",
      "`array[0]` e `*array` acessam o primeiro valor.",
      "`*(p + i)` é equivalente à ideia de acessar a posição `i`.",
      "Mesmo com ponteiros, o tamanho do array precisa ser controlado.",
    ],
  },
  {
    id: "string-basico",
    title: "std::string básico",
    module: "Coleções e texto",
    chapterReference: "Deitel, Cap. 3, p. 60-67",
    difficulty: "iniciante",
    estimatedMinutes: 10,
    tags: ["string", "texto", "entrada"],
    objective:
      "Usar `std::string` para guardar textos de forma mais simples que arrays de `char`.",
    explanation: {
      short:
        "`std::string` é o tipo mais comum para trabalhar com texto em C++ moderno.",
      detailed:
        "Para usar `std::string`, inclua `<string>`. Uma string pode guardar palavras, frases, ser concatenada com `+` e ter seu tamanho consultado com `.size()`. Para iniciantes, ela evita muitos detalhes difíceis de arrays de caracteres.",
    },
    codeExamples: [
      {
        title: "Guardando e mostrando texto",
        code: `#include <iostream>
#include <string>

int main() {
    std::string nome = "Ana";

    std::cout << "Ola, " << nome << '\\n';

    return 0;
}`,
        explanation: [
          "`#include <string>` permite usar `std::string`.",
          "`std::string nome = \"Ana\";` cria uma variável de texto.",
          "Textos em C++ usam aspas duplas.",
          "O `cout` mistura texto fixo com o valor de `nome`.",
        ],
      },
      {
        title: "Lendo uma palavra",
        code: `#include <iostream>
#include <string>

int main() {
    std::string nome;

    std::cout << "Digite seu nome: ";
    std::cin >> nome;

    std::cout << "Bem-vindo, " << nome << '\\n';

    return 0;
}`,
        explanation: [
          "`std::string nome;` cria uma string inicialmente vazia.",
          "`std::cin >> nome;` lê uma palavra.",
          "A leitura com `>>` para no primeiro espaço.",
          "Se digitar `Ana Maria`, apenas `Ana` será lido nesse exemplo.",
        ],
      },
    ],
    tips: [
      "Use `std::string` para nomes, mensagens e textos em geral.",
      "Para uma palavra simples, `std::cin >> texto` resolve.",
      "Para frases com espaços, use `std::getline`, que vem na próxima lição.",
    ],
    commonMistakes: [
      "Esquecer `#include <string>`.",
      "Usar aspas simples para texto longo; aspas simples são para `char`.",
      "Esperar que `std::cin >> nome` leia nomes compostos com espaço.",
    ],
    quiz: [
      {
        question: "Qual cabeçalho deve ser incluído para usar `std::string`?",
        options: ["`<iostream>`", "`<string>`", "`<vector>`", "`<cmath>`"],
        correctAnswer: 1,
        explanation:
          "`std::string` é disponibilizada pelo cabeçalho `<string>`.",
      },
      {
        question: "O que `std::cin >> nome` lê quando o usuário digita `Ana Maria`?",
        options: ["`Ana`", "`Maria`", "`Ana Maria`", "Nada"],
        correctAnswer: 0,
        explanation:
          "O operador `>>` para a leitura da string no primeiro espaço em branco.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>
#include <string>

int main() {
    std::string linguagem = "C++";

    std::cout << linguagem << " de bolso" << '\\n';

    return 0;
}`,
        answer: "C++ de bolso",
        explanation:
          "O `cout` imprime o conteúdo da string e depois o texto fixo na mesma linha.",
      },
    ],
    practiceExercises: [
      {
        title: "Cartão de apresentação",
        description:
          "Leia uma palavra representando seu nome e mostre uma mensagem dizendo que você está estudando C++.",
        expectedConcepts: ["std::string", "cin", "cout", "concatenação visual"],
      },
    ],
    quickReview: [
      "`std::string` guarda texto.",
      "Inclua `<string>` para usar esse tipo.",
      "`std::cin >> texto` lê uma palavra.",
      "Aspas duplas representam texto.",
    ],
  },
  {
    id: "string-completo",
    title: "std::string completo",
    module: "Coleções e texto",
    chapterReference: "Deitel, Cap. 18, p. 703-722",
    difficulty: "iniciante",
    estimatedMinutes: 13,
    tags: ["string", "getline", "size", "índice"],
    objective:
      "Trabalhar melhor com textos usando concatenação, `.size()`, índices e `std::getline`.",
    explanation: {
      short:
        "`std::string` também permite manipular frases, medir tamanho e acessar caracteres por posição.",
      detailed:
        "Strings funcionam como sequências de caracteres. Você pode concatenar com `+`, consultar o tamanho com `.size()`, acessar caracteres com `[]` e ler linhas inteiras com `std::getline`. Como arrays, os índices começam em 0.",
    },
    codeExamples: [
      {
        title: "Concatenando e medindo",
        code: `#include <iostream>
#include <string>

int main() {
    std::string primeiro = "C++";
    std::string segundo = "de bolso";
    std::string frase = primeiro + " " + segundo;

    std::cout << frase << '\\n';
    std::cout << frase.size() << '\\n';

    return 0;
}`,
        explanation: [
          "`+` concatena strings e textos.",
          "`\" \"` adiciona um espaço entre as palavras.",
          "`frase` recebe o texto completo.",
          "`.size()` retorna a quantidade de caracteres da string.",
        ],
      },
      {
        title: "Lendo uma linha inteira",
        code: `#include <iostream>
#include <string>

int main() {
    std::string nomeCompleto;

    std::cout << "Digite seu nome completo: ";
    std::getline(std::cin, nomeCompleto);

    std::cout << nomeCompleto << '\\n';

    return 0;
}`,
        explanation: [
          "`std::getline` lê até o Enter.",
          "Diferente de `>>`, ela preserva espaços no meio do texto.",
          "`std::cin` informa de onde a linha será lida.",
          "`nomeCompleto` recebe a frase digitada.",
        ],
      },
      {
        title: "Acessando caracteres",
        code: `#include <iostream>
#include <string>

int main() {
    std::string palavra = "codigo";

    std::cout << palavra[0] << '\\n';
    std::cout << palavra[palavra.size() - 1] << '\\n';

    return 0;
}`,
        explanation: [
          "`palavra[0]` acessa o primeiro caractere.",
          "Como os índices começam em 0, o último índice é `size() - 1`.",
          "`palavra.size()` retorna o tamanho da string.",
          "A saída mostra `c` e depois `o`.",
        ],
      },
    ],
    tips: [
      "Use `std::getline` para nomes completos e frases.",
      "Antes de acessar `texto[0]`, garanta que a string não está vazia.",
      "Quando misturar `cin >>` com `getline`, pode sobrar um Enter no buffer.",
    ],
    commonMistakes: [
      "Acessar `texto[0]` quando a string está vazia.",
      "Usar `texto[texto.size()]` achando que é o último caractere.",
      "Misturar `std::cin >> valor` e `std::getline` sem tratar a quebra de linha pendente.",
    ],
    quiz: [
      {
        question: "Qual função lê uma linha inteira com espaços?",
        options: ["`std::cin >> texto`", "`std::getline`", "`std::cout`", "`texto.size()`"],
        correctAnswer: 1,
        explanation:
          "`std::getline(std::cin, texto)` lê até o Enter, incluindo espaços no meio.",
      },
      {
        question: "Se `texto.size()` vale 5, qual é o último índice válido?",
        options: ["`5`", "`4`", "`1`", "`6`"],
        correctAnswer: 1,
        explanation:
          "Índices começam em 0, então uma string de tamanho 5 vai de 0 até 4.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>
#include <string>

int main() {
    std::string texto = "abc";
    texto = texto + "de";

    std::cout << texto.size() << '\\n';

    return 0;
}`,
        answer: "5",
        explanation:
          "`texto` começa com 3 caracteres. Depois concatena `de`, ficando com 5 caracteres.",
      },
    ],
    practiceExercises: [
      {
        title: "Primeira e última letra",
        description:
          "Leia uma palavra e mostre a primeira e a última letra. Antes, verifique se a string não está vazia.",
        expectedConcepts: ["std::string", "size", "índice", "if"],
      },
    ],
    quickReview: [
      "`+` concatena strings.",
      "`.size()` retorna o tamanho do texto.",
      "`texto[0]` acessa o primeiro caractere.",
      "`std::getline` lê frases com espaços.",
    ],
  },
  {
    id: "vector-basico",
    title: "std::vector básico",
    module: "Coleções e texto",
    chapterReference: "Deitel, Cap. 7, p. 288-292",
    difficulty: "iniciante",
    estimatedMinutes: 11,
    tags: ["vector", "coleção", "push_back"],
    objective:
      "Usar `std::vector` para guardar uma sequência de valores que pode crescer durante o programa.",
    explanation: {
      short:
        "`std::vector` é uma coleção dinâmica: parecida com array, mas com tamanho ajustável.",
      detailed:
        "Diferente de um array tradicional, um vector pode receber novos elementos com `push_back`. Ele também informa seu tamanho com `.size()` e permite acessar posições com `[]`. Para muitos programas modernos em C++, `std::vector` é uma escolha mais confortável que array bruto.",
    },
    codeExamples: [
      {
        title: "Criando e mostrando um vector",
        code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> numeros = {10, 20, 30};

    for (int i = 0; i < 3; i++) {
        std::cout << numeros[i] << '\\n';
    }

    return 0;
}`,
        explanation: [
          "`#include <vector>` permite usar `std::vector`.",
          "`std::vector<int>` cria uma sequência de inteiros.",
          "`{10, 20, 30}` inicializa os elementos.",
          "`numeros[i]` acessa cada posição pelo índice.",
        ],
      },
      {
        title: "Adicionando elementos",
        code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> pontos;

    pontos.push_back(5);
    pontos.push_back(8);
    pontos.push_back(10);

    std::cout << pontos.size() << '\\n';
    std::cout << pontos[1] << '\\n';

    return 0;
}`,
        explanation: [
          "`pontos` começa vazio.",
          "`push_back` adiciona um valor no fim do vector.",
          "Depois de três inserções, `.size()` retorna 3.",
          "`pontos[1]` acessa o segundo elemento, que vale 8.",
        ],
      },
    ],
    tips: [
      "Use `std::vector` quando a quantidade de elementos pode mudar.",
      "`push_back` adiciona no final.",
      "Mesmo em vector, o primeiro índice continua sendo 0.",
    ],
    commonMistakes: [
      "Esquecer `#include <vector>`.",
      "Acessar `vector[0]` quando o vector está vazio.",
      "Achar que `.size()` retorna o último índice; o último índice é `.size() - 1`.",
    ],
    quiz: [
      {
        question: "Qual função adiciona um elemento ao final de um `std::vector`?",
        options: ["`.size()`", "`.push_back()`", "`.getline()`", "`.cout()`"],
        correctAnswer: 1,
        explanation:
          "`.push_back(valor)` insere o valor no final do vector.",
      },
      {
        question: "Qual cabeçalho permite usar `std::vector`?",
        options: ["`<string>`", "`<iostream>`", "`<vector>`", "`<array>`"],
        correctAnswer: 2,
        explanation:
          "`std::vector` é disponibilizado pelo cabeçalho `<vector>`.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> valores;
    valores.push_back(2);
    valores.push_back(4);

    std::cout << valores[0] + valores[1] << '\\n';

    return 0;
}`,
        answer: "6",
        explanation:
          "O vector recebe 2 e 4. A soma dos elementos nas posições 0 e 1 é 6.",
      },
    ],
    practiceExercises: [
      {
        title: "Lista de notas",
        description:
          "Crie um `std::vector<int>`, adicione três notas com `push_back` e mostre todas usando um `for`.",
        expectedConcepts: ["std::vector", "push_back", "for", "índice"],
      },
    ],
    quickReview: [
      "`std::vector` guarda uma sequência de valores.",
      "Inclua `<vector>` para usar esse tipo.",
      "`push_back` adiciona no final.",
      "`.size()` retorna a quantidade de elementos.",
    ],
  },
  {
    id: "vector-stl",
    title: "std::vector e STL",
    module: "Coleções e texto",
    chapterReference: "Deitel, Cap. 23, p. 902-908",
    difficulty: "intermediario",
    estimatedMinutes: 13,
    tags: ["vector", "STL", "range-based for"],
    objective:
      "Percorrer vectors de forma moderna e entender o papel de `std::vector` dentro da STL.",
    explanation: {
      short:
        "`std::vector` faz parte da STL e combina bem com laços modernos e algoritmos da biblioteca padrão.",
      detailed:
        "A STL oferece contêineres, algoritmos e iteradores. `std::vector` é um contêiner de sequência. Para percorrer todos os valores, o range-based `for` deixa o código mais limpo. Para alterar elementos, use referência no laço; para apenas ler, use `const` quando fizer sentido.",
    },
    codeExamples: [
      {
        title: "Range-based for",
        code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> numeros = {3, 6, 9};

    for (int numero : numeros) {
        std::cout << numero << '\\n';
    }

    return 0;
}`,
        explanation: [
          "`for (int numero : numeros)` percorre cada elemento do vector.",
          "A variável `numero` recebe uma cópia de cada valor.",
          "O corpo do laço imprime um valor por vez.",
          "Esse formato é ótimo quando você não precisa do índice.",
        ],
      },
      {
        title: "Alterando com referência",
        code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> valores = {1, 2, 3};

    for (int& valor : valores) {
        valor = valor * 2;
    }

    for (int valor : valores) {
        std::cout << valor << ' ';
    }

    return 0;
}`,
        explanation: [
          "`int& valor` permite alterar o elemento original dentro do vector.",
          "Cada elemento é multiplicado por 2.",
          "O segundo laço apenas imprime os valores.",
          "A saída é `2 4 6`.",
        ],
      },
      {
        title: "Somando elementos",
        code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> pontos = {4, 5, 6};
    int soma = 0;

    for (int ponto : pontos) {
        soma = soma + ponto;
    }

    std::cout << soma << '\\n';

    return 0;
}`,
        explanation: [
          "`soma` começa em zero.",
          "O laço percorre todos os elementos de `pontos`.",
          "Cada valor é acumulado em `soma`.",
          "No fim, a saída é 15.",
        ],
      },
    ],
    tips: [
      "Use range-based `for` quando não precisar do índice.",
      "Use `const int&` para ler objetos grandes sem copiar; para `int`, cópia é tranquila.",
      "Use `int&` no laço quando quiser modificar o elemento original.",
    ],
    commonMistakes: [
      "Usar `int valor` esperando alterar o vector original.",
      "Acessar posição fora do vector com `[]`.",
      "Confundir `.size()` com índice final.",
    ],
    quiz: [
      {
        question: "No laço `for (int valor : valores)`, `valor` é o quê?",
        options: [
          "Uma cópia de cada elemento",
          "Sempre o índice atual",
          "O tamanho do vector",
          "Um ponteiro nulo",
        ],
        correctAnswer: 0,
        explanation:
          "Sem `&`, a variável do range-based `for` recebe uma cópia de cada elemento.",
      },
      {
        question: "Qual forma permite alterar os elementos originais no range-based `for`?",
        options: [
          "`for (int valor : valores)`",
          "`for (int& valor : valores)`",
          "`for (int valor = valores)`",
          "`for (std::cout : valores)`",
        ],
        correctAnswer: 1,
        explanation:
          "`int& valor` cria uma referência para cada elemento, permitindo alteração direta.",
      },
    ],
    outputChallenges: [
      {
        question: "Qual será a saída?",
        code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> valores = {1, 2, 3};

    for (int& valor : valores) {
        valor++;
    }

    std::cout << valores[0] << ' ' << valores[2] << '\\n';

    return 0;
}`,
        answer: "2 4",
        explanation:
          "O laço usa referência, então altera os elementos originais. O primeiro vira 2 e o terceiro vira 4.",
      },
    ],
    practiceExercises: [
      {
        title: "Dobrar lista",
        description:
          "Crie um vector com 5 números, dobre todos usando range-based `for` com referência e depois imprima a lista.",
        expectedConcepts: ["std::vector", "range-based for", "referência", "cout"],
      },
    ],
    quickReview: [
      "`std::vector` é um contêiner da STL.",
      "Range-based `for` percorre todos os elementos.",
      "Sem `&`, o laço trabalha com cópias.",
      "Com `int&`, o laço pode alterar os elementos originais.",
    ],
  },
];

export const findLessonById = (lessonId: string) =>
  lessons.find((lesson) => lesson.id === lessonId);
