# Conversa exportada: Projeto C++ de Bolso

Data da exportação: 2026-05-18

---

## Usuário

acho que vou ter de criar um site/web app para poder estudar quando tiver somente meu celular, me ajude a estruturar uma ideia, vamos fazer em partes primeiro essa parte: 
main, primeiro programa, cout	Cap. 2, p. 27-31
cin, entrada de dados, soma de inteiros	Cap. 2, p. 31-34
variáveis e memória	Cap. 2, p. 31-35
tipos fundamentais	Cap. 2, p. 31-35 e Apêndice C, p. 989
aritmética	Cap. 2, p. 35-37
if, operadores relacionais	Cap. 2, p. 37-40 e Cap. 4, p. 98-103
while	Cap. 4, p. 103-116
for	Cap. 5, p. 141-146
break, continue	Cap. 5, p. 159-161
operadores lógicos &&, ||, !	Cap. 5, p. 161-164
funções	Cap. 6, p. 182-190
passagem por valor	Cap. 6, p. 185-189
referência e parâmetros por referência	Cap. 6, p. 209-213
escopo de variáveis	Cap. 6, p. 202-204
pilha de chamadas de função	Cap. 6, p. 204-206
ponteiros básicos	Cap. 8, p. 312-315
ponteiros em funções	Cap. 8, p. 315-319
const com ponteiros	Cap. 8, p. 319-324
relação entre ponteiros e arrays	Cap. 8, p. 332-335
arrays	Cap. 7, p. 251-267
passagem de arrays para funções	Cap. 7, p. 267-271
std::string básico	Cap. 3, p. 60-67
std::string completo	Cap. 18, p. 703-722
std::vector básico	Cap. 7, p. 288-292
std::vector mais completo/STL	Cap. 23, p. 902-908

se baseie no livro e em outros materiais pela internet, o assunto tem que ter exemplos, dicas e macetes, perguntas/quizes, modo noturno e oq vc achar melhor

---

## Assistente

Boa ideia. Um web app/PWA para estudar C++ pelo celular seria perfeito para esse caso: abre no navegador, pode instalar como “app”, salva progresso e funciona até offline. A melhor estrutura é fazer um app pequeno, direto, com teoria em blocos curtos, exemplos, quiz e desafios de saída de código.

A base pode ser: Deitel como trilha principal, e complementos como cppreference para consulta técnica, LearnCpp para explicações modernas e cplusplus.com/GeeksforGeeks para exemplos e quizzes. O cppreference é bom para referência de bibliotecas como entrada/saída, `string` e `vector`; LearnCpp é focado em ensinar C++ moderno desde compilação, debugging e fundamentos; cplusplus.com organiza o tutorial por estrutura do programa, variáveis, operadores, fluxo, funções, arrays e ponteiros.

A ideia do app pode ser assim:

**Nome do projeto:**  
`C++ Pocket POO`, `Cppzinho`, `Deitel Pocket`, ou `C++ de Bolso`.

**Objetivo do app:**  
Estudar C++ em sessões curtas pelo celular, principalmente quando você estiver sem notebook. Cada assunto vira uma “fase” com explicação, exemplo, macete, quiz e exercício.

A estrutura principal ficaria assim:

```txt
Home
 ├── Continuar estudando
 ├── Trilha: Fundamentos de C++
 ├── Revisão rápida
 ├── Quiz aleatório
 ├── Desafios de código
 ├── Glossário
 └── Configurações: modo noturno, tamanho da fonte, progresso
```

A trilha dessa primeira parte pode ser dividida em 7 módulos.

**Módulo 1: Primeiro contato com C++**

Aqui entram:

```txt
main
primeiro programa
cout
```

Conteúdo da tela:

```cpp
#include <iostream>

int main() {
    std::cout << "Olá, C++!";
    return 0;
}
```

Explicação curta:

`#include <iostream>` permite usar entrada e saída de dados.  
`int main()` é o ponto inicial do programa.  
`std::cout` envia texto para a saída padrão, geralmente o terminal.  
`return 0` indica que o programa terminou corretamente.

Macete:

Pense no `main` como a porta de entrada da casa. Se não tiver porta, o programa fica do lado de fora segurando a mochila.

Quiz exemplo:

```txt
O que o std::cout faz?

A) Lê dados do teclado
B) Mostra dados na tela
C) Cria uma variável
D) Encerra o programa

Resposta: B
```

**Módulo 2: Entrada, variáveis e memória**

Aqui entram:

```txt
cin
entrada de dados
soma de inteiros
variáveis e memória
tipos fundamentais
```

Exemplo:

```cpp
#include <iostream>

int main() {
    int a;
    int b;

    std::cout << "Digite dois números: ";
    std::cin >> a >> b;

    int soma = a + b;

    std::cout << "Soma: " << soma << '\n';

    return 0;
}
```

Explicação:

`int a;` reserva um espaço na memória para guardar um inteiro.  
`std::cin >> a;` pega um valor digitado e guarda dentro da variável.  
Variável é um nome amigável para um espaço de memória. O computador não “lembra” que é `idade`; ele lembra de endereço, tipo e valor.

Tipos fundamentais:

```txt
int       -> inteiros
double    -> números com casas decimais
char      -> um caractere
bool      -> verdadeiro ou falso
float     -> decimal com menos precisão que double
```

Macete:

Tipo é o “formato da gaveta”. Não adianta tentar guardar uma melancia em uma gaveta de talher. O C++ vai reclamar, e com razão.

**Módulo 3: Operações e decisões**

Aqui entram:

```txt
aritmética
if
operadores relacionais
operadores lógicos &&, ||, !
```

Exemplo:

```cpp
#include <iostream>

int main() {
    int idade;

    std::cout << "Digite sua idade: ";
    std::cin >> idade;

    if (idade >= 18) {
        std::cout << "Maior de idade\n";
    } else {
        std::cout << "Menor de idade\n";
    }

    return 0;
}
```

Operadores importantes:

```txt
+   soma
-   subtração
*   multiplicação
/   divisão
%   resto da divisão

==  igual
!=  diferente
>   maior
<   menor
>=  maior ou igual
<=  menor ou igual

&&  e
||  ou
!   não
```

Mini-macete:

`=` atribui.  
`==` compara.

Esse é um erro clássico. Um `=` perdido dentro de um `if` é uma banana jogada no corredor do código.

Quiz exemplo:

```txt
Qual expressão verifica se x está entre 10 e 20?

A) x >= 10 || x <= 20
B) x >= 10 && x <= 20
C) x = 10 && 20
D) x == 10 || 20

Resposta: B
```

**Módulo 4: Repetições**

Aqui entram:

```txt
while
for
break
continue
```

Exemplo com `while`:

```cpp
#include <iostream>

int main() {
    int contador = 1;

    while (contador <= 5) {
        std::cout << contador << '\n';
        contador++;
    }

    return 0;
}
```

Exemplo com `for`:

```cpp
#include <iostream>

int main() {
    for (int i = 1; i <= 5; i++) {
        std::cout << i << '\n';
    }

    return 0;
}
```

Exemplo com `break` e `continue`:

```cpp
#include <iostream>

int main() {
    for (int i = 1; i <= 10; i++) {
        if (i == 5) {
            continue;
        }

        if (i == 8) {
            break;
        }

        std::cout << i << '\n';
    }

    return 0;
}
```

Explicação:

`continue` pula para a próxima repetição.  
`break` encerra o laço.

Macete:

`continue` diz: “esse aqui pula”.  
`break` diz: “acabou o expediente”.

**Módulo 5: Funções, escopo e pilha de chamadas**

Aqui entram:

```txt
funções
passagem por valor
referência
parâmetros por referência
escopo de variáveis
pilha de chamadas de função
```

Exemplo com passagem por valor:

```cpp
#include <iostream>

void dobrar(int x) {
    x = x * 2;
}

int main() {
    int numero = 10;

    dobrar(numero);

    std::cout << numero << '\n';

    return 0;
}
```

Saída:

```txt
10
```

Porque a função recebeu uma cópia.

Exemplo com referência:

```cpp
#include <iostream>

void dobrar(int& x) {
    x = x * 2;
}

int main() {
    int numero = 10;

    dobrar(numero);

    std::cout << numero << '\n';

    return 0;
}
```

Saída:

```txt
20
```

Porque `int& x` recebe a própria variável, não uma cópia.

Tela especial do app:

```txt
Visualizador da pilha de chamadas

main()
 └── chama dobrar(numero)
      └── x aponta/representa numero
```

Macete:

Passagem por valor: “toma uma xerox”.  
Passagem por referência: “pega o original, cuidado com o café”.

**Módulo 6: Ponteiros**

Aqui entram:

```txt
ponteiros básicos
ponteiros em funções
const com ponteiros
relação entre ponteiros e arrays
```

Ponteiros são uma parte importante da linguagem. Eles guardam endereços de memória. cplusplus.com explica a diferença entre pegar o endereço com `&` e acessar o valor apontado com `*`, que é exatamente a base que você precisa dominar antes de chegar forte em arrays, funções e POO.

Exemplo:

```cpp
#include <iostream>

int main() {
    int idade = 21;
    int* ponteiro = &idade;

    std::cout << idade << '\n';
    std::cout << &idade << '\n';
    std::cout << ponteiro << '\n';
    std::cout << *ponteiro << '\n';

    return 0;
}
```

Explicação:

`&idade` pega o endereço da variável.  
`int* ponteiro` cria um ponteiro para inteiro.  
`*ponteiro` acessa o valor guardado no endereço.

Macete visual:

```txt
idade = 21
endereço da idade = casa onde o 21 mora
ponteiro = papel com o endereço da casa
*ponteiro = entrar na casa e ver o 21
```

Exemplo com função:

```cpp
#include <iostream>

void alterar(int* p) {
    *p = 99;
}

int main() {
    int x = 10;

    alterar(&x);

    std::cout << x << '\n';

    return 0;
}
```

Saída:

```txt
99
```

**Módulo 7: Arrays, string e vector**

Aqui entram:

```txt
arrays
passagem de arrays para funções
std::string básico
std::string completo
std::vector básico
std::vector mais completo/STL
```

Exemplo com array:

```cpp
#include <iostream>

int main() {
    int notas[3] = {8, 9, 10};

    for (int i = 0; i < 3; i++) {
        std::cout << notas[i] << '\n';
    }

    return 0;
}
```

Exemplo passando array para função:

```cpp
#include <iostream>

void mostrar(int valores[], int tamanho) {
    for (int i = 0; i < tamanho; i++) {
        std::cout << valores[i] << '\n';
    }
}

int main() {
    int numeros[3] = {10, 20, 30};

    mostrar(numeros, 3);

    return 0;
}
```

Exemplo com `std::string`:

```cpp
#include <iostream>
#include <string>

int main() {
    std::string nome;

    std::cout << "Digite seu nome: ";
    std::cin >> nome;

    std::cout << "Olá, " << nome << '\n';

    return 0;
}
```

Exemplo com `std::vector`:

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> numeros = {10, 20, 30};

    numeros.push_back(40);

    for (int n : numeros) {
        std::cout << n << '\n';
    }

    return 0;
}
```

Macete:

Array é uma estante de tamanho fixo.  
`vector` é uma mochila expansível.  
`string` é um texto que não te obriga a sofrer com array de `char` logo no começo.

Para complementar o Deitel, eu colocaria no app links de apoio por assunto. A trilha de cplusplus.com separa justamente fundamentos, estruturas de controle, funções, arrays e ponteiros; já o GeeksforGeeks organiza C++ por básicos, funções, tipos compostos, ponteiros, referências, strings e STL, incluindo quizzes.

A melhor tela de cada assunto seria sempre neste formato:

```txt
1. O que é?
2. Para que serve?
3. Exemplo mínimo
4. Explicação linha por linha
5. Erros comuns
6. Macete
7. Quiz rápido
8. Desafio: qual é a saída?
9. Exercício prático
10. Resumo de 30 segundos
```

Exemplo de card no app:

```txt
Assunto: Referência em C++

O que é?
Uma referência é um apelido para uma variável existente.

Exemplo:
void alterar(int& x) {
    x = 50;
}

Macete:
Referência não é cópia. É apelido.

Erro comum:
Achar que int x e int& x fazem a mesma coisa em parâmetros.

Quiz:
O que acontece se uma função recebe int& x?
A) Recebe uma cópia
B) Pode alterar a variável original
C) Cria um ponteiro
D) Cria um array

Resposta: B
```

Funcionalidades que eu colocaria no MVP:

```txt
Modo noturno
Progresso por módulo
Favoritar assuntos difíceis
Quiz por assunto
Quiz aleatório
Flashcards
Desafios de “qual é a saída?”
Glossário de símbolos: &, *, [], ::, <<, >>
Área “erros clássicos”
Revisão rápida antes da prova
```

Funcionalidades mais avançadas para depois:

```txt
Sistema de XP
Streak de estudos
Simulado estilo prova
Modo “só tenho 5 minutos”
Editor de código visual
Integração com links externos para testar código
Modo offline como PWA
Busca por assunto
Anotações pessoais
```

Eu não colocaria compilador C++ real logo de início, porque isso complica bastante. Para o primeiro MVP, o app pode mostrar código, pedir previsão da saída e explicar. Depois você pode adicionar links para testar no OnlineGDB, Compiler Explorer, Replit ou outro ambiente.

Stack recomendada:

```txt
Vite + React
Tailwind CSS
React Router
LocalStorage ou IndexedDB
Prism.js ou Shiki para destacar código
PWA para instalar no celular
```

Estrutura de dados dos conteúdos:

```js
const lesson = {
  id: "cout-primeiro-programa",
  title: "Primeiro programa com cout",
  chapter: "Cap. 2, p. 27-31",
  level: "iniciante",
  tags: ["main", "cout", "iostream"],
  theory: "...",
  code: "...",
  explanation: ["linha 1...", "linha 2..."],
  tips: ["std::cout mostra dados na tela"],
  commonMistakes: ["Esquecer o ;", "Esquecer #include <iostream>"],
  quiz: [
    {
      question: "O que o std::cout faz?",
      options: ["Lê dados", "Mostra dados", "Cria variável", "Repete código"],
      answer: 1
    }
  ],
  challenge: {
    question: "Qual será a saída?",
    code: "...",
    answer: "..."
  }
};
```

Para essa primeira parte, eu faria o app com esta ordem de estudo:

```txt
1. main, cout e primeiro programa
2. cin, variáveis, memória e tipos
3. aritmética e operadores relacionais
4. if e operadores lógicos
5. while
6. for
7. break e continue
8. funções
9. passagem por valor
10. referência
11. escopo
12. pilha de chamadas
13. arrays
14. arrays em funções
15. ponteiros básicos
16. ponteiros em funções
17. const com ponteiros
18. ponteiros e arrays
19. std::string básico
20. std::string completo
21. std::vector básico
22. std::vector e STL
```

E eu colocaria uma tela chamada **“Mapa mental do C++ básico”**:

```txt
Entrada/Saída
 ├── cout
 └── cin

Dados
 ├── variáveis
 ├── tipos
 ├── memória
 ├── arrays
 ├── string
 └── vector

Controle
 ├── if
 ├── while
 ├── for
 ├── break
 └── continue

Funções
 ├── passagem por valor
 ├── referência
 ├── escopo
 └── pilha de chamadas

Memória
 ├── ponteiros
 ├── const com ponteiros
 └── ponteiros + arrays
```

Minha sugestão para começarmos em partes: primeiro criar o conteúdo do **Módulo 1: main, primeiro programa e cout**. Depois transformamos isso em formato pronto para o Codex gerar o site.

A primeira página do app poderia ter esta cara:

```txt
C++ de Bolso

Continue estudando:
[Primeiro programa com cout]

Revisão rápida:
[Quiz de 5 perguntas]

Trilha:
[01] Primeiro programa
[02] Entrada com cin
[03] Variáveis e memória
[04] Tipos fundamentais
...
```

Resumo da ideia: o app não deve ser um “livro digital gigante”. Ele deve ser um treinador de bolso: explica pouco, mostra exemplo, pergunta, corrige, repete e salva progresso. C++ no celular precisa virar lanche de estudo, não feijoada de 900 páginas.

Piada sem graça final: ponteiro é tão carente que vive apontando para alguém. O problema é quando aponta para `nullptr`, aí nem terapia compila.

---

## Usuário

agora me ajude com um agente.md para esse projeto

---

## Assistente

Claro. Para esse projeto, eu recomendo criar um arquivo chamado **`AGENTS.md`** na raiz do projeto. Ele vai servir como “manual de comportamento” para o Codex entender que o site é um app de estudos de C++ para celular, baseado no Deitel, mas sem copiar texto do livro.

Aqui vai uma versão bem completa e pronta para usar:

```md
# AGENTS.md

## Visão geral do projeto

Este projeto é um web app/PWA de estudos de C++ para celular, voltado para estudantes iniciantes que estão aprendendo fundamentos da linguagem e se preparando para POO.

O app deve funcionar como um "treinador de bolso": explicar conceitos de forma curta, mostrar exemplos, fazer perguntas, corrigir respostas, salvar progresso e permitir revisão rápida.

O conteúdo principal segue a ordem de estudo baseada no livro "C++ Como Programar", de Deitel, mas o texto do app deve ser original, didático e resumido. Não copie trechos do livro. Use as referências apenas como guia de tópicos e sequência.

## Objetivo principal

Criar uma experiência mobile-first para estudar C++ em sessões curtas, com:

- explicações simples;
- exemplos de código;
- explicação linha por linha;
- dicas e macetes;
- erros comuns;
- quizzes;
- desafios de "qual é a saída?";
- exercícios práticos;
- modo noturno;
- progresso salvo localmente;
- revisão rápida antes de provas.

## Público-alvo

O usuário principal é um estudante de Ciência da Computação iniciante/intermediário em C++, estudando fundamentos da linguagem e se preparando para conteúdos de Programação Orientada a Objetos.

O app deve evitar explicações excessivamente formais. A linguagem deve ser clara, didática e direta, mas sem infantilizar o conteúdo.

## Stack recomendada

Use preferencialmente:

- Vite
- React
- TypeScript
- Tailwind CSS
- React Router
- LocalStorage ou IndexedDB para progresso
- Shiki ou Prism.js para destaque de código
- PWA para instalação no celular

Evite adicionar bibliotecas grandes sem necessidade.

## Princípios de desenvolvimento

1. Priorize mobile-first.
2. O app deve ser leve, rápido e legível em telas pequenas.
3. Cada tela deve ter um objetivo claro.
4. Evite excesso de texto em uma única página.
5. Use cards, abas, acordeões ou etapas para organizar o conteúdo.
6. O modo noturno deve ser tratado como recurso principal, não como detalhe.
7. O progresso do usuário deve ser salvo localmente.
8. O app deve continuar útil mesmo sem backend.
9. O código deve ser limpo, organizado e fácil de expandir.
10. O conteúdo deve ser modular, para permitir adicionar novos capítulos depois.

## Estrutura sugerida do projeto

```txt
src/
  app/
    App.tsx
    routes.tsx

  components/
    Layout/
    LessonCard/
    CodeBlock/
    Quiz/
    ProgressBar/
    ThemeToggle/
    Flashcard/
    ChallengeCard/

  data/
    lessons/
      module-01-introducao.ts
      module-02-variaveis.ts
      module-03-controle.ts
      module-04-repeticao.ts
      module-05-funcoes.ts
      module-06-ponteiros.ts
      module-07-arrays-strings-vectors.ts
    quizzes/
    glossary.ts

  hooks/
    useProgress.ts
    useTheme.ts
    useQuiz.ts

  pages/
    Home.tsx
    Lesson.tsx
    QuizPage.tsx
    Review.tsx
    Glossary.tsx
    Settings.tsx

  styles/
    globals.css

public/
  icons/
  manifest.json
```

## Ordem inicial dos conteúdos

A trilha inicial deve seguir esta ordem:

1. `main`, primeiro programa e `cout`
2. `cin`, entrada de dados e soma de inteiros
3. variáveis e memória
4. tipos fundamentais
5. aritmética
6. `if` e operadores relacionais
7. `while`
8. `for`
9. `break` e `continue`
10. operadores lógicos `&&`, `||`, `!`
11. funções
12. passagem por valor
13. referências e parâmetros por referência
14. escopo de variáveis
15. pilha de chamadas de função
16. ponteiros básicos
17. ponteiros em funções
18. `const` com ponteiros
19. relação entre ponteiros e arrays
20. arrays
21. passagem de arrays para funções
22. `std::string` básico
23. `std::string` completo
24. `std::vector` básico
25. `std::vector` e STL

## Formato padrão de uma lição

Cada lição deve seguir este formato:

```ts
export type Lesson = {
  id: string;
  title: string;
  module: string;
  chapterReference?: string;
  difficulty: "iniciante" | "intermediario" | "avancado";
  estimatedMinutes: number;
  tags: string[];

  objective: string;

  explanation: {
    short: string;
    detailed: string;
  };

  codeExamples: {
    title: string;
    code: string;
    explanation: string[];
  }[];

  tips: string[];

  commonMistakes: string[];

  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];

  outputChallenges: {
    question: string;
    code: string;
    answer: string;
    explanation: string;
  }[];

  practiceExercises: {
    title: string;
    description: string;
    starterCode?: string;
    expectedConcepts: string[];
  }[];

  quickReview: string[];
};
```

## Estilo das explicações

As explicações devem seguir este padrão:

- Comece com uma definição simples.
- Depois mostre para que serve.
- Em seguida mostre um exemplo pequeno.
- Depois explique o exemplo linha por linha.
- Mostre erros comuns.
- Finalize com uma revisão rápida.

Exemplo de tom desejado:

> `std::cout` é usado para mostrar informações na tela. Ele envia dados para a saída padrão, que normalmente é o terminal. Em programas iniciantes, ele é usado para exibir mensagens, resultados de contas e valores de variáveis.

Evite explicações assim:

> O objeto ostream cout, pertencente ao namespace std, realiza inserções formatadas no buffer de saída padrão mediante sobrecarga do operador bitwise left shift.

Essa explicação pode aparecer em uma seção avançada, mas não como primeira explicação.

## Regras para exemplos de C++

Use C++ moderno, mas adequado para iniciantes.

Preferir:

```cpp
#include <iostream>

int main() {
    std::cout << "Olá, C++!\n";
    return 0;
}
```

Evitar nos exemplos iniciais:

```cpp
using namespace std;
```

Explicar que `using namespace std;` existe, mas preferir `std::` para clareza e boa prática.

Use `'\n'` preferencialmente em vez de `std::endl`, mas explique `std::endl` quando necessário.

Sempre que possível, compile mentalmente os exemplos antes de adicioná-los.

## Regras para conteúdo de C++

Ao criar conteúdo, priorize os seguintes pontos:

### `main`, `cout` e primeiro programa

Explicar:

- `#include <iostream>`
- `int main()`
- bloco `{ }`
- `std::cout`
- operador `<<`
- `return 0`
- ponto e vírgula

### `cin` e entrada de dados

Explicar:

- `std::cin`
- operador `>>`
- leitura de inteiros
- leitura de múltiplos valores
- erros comuns ao digitar dados incompatíveis

### Variáveis e memória

Explicar:

- variável como nome para espaço de memória
- declaração
- inicialização
- atribuição
- diferença entre declarar e atribuir
- tipos de dados

### Tipos fundamentais

Explicar:

- `int`
- `double`
- `float`
- `char`
- `bool`
- noção básica de tamanho e precisão
- quando usar cada um

### Aritmética

Explicar:

- `+`
- `-`
- `*`
- `/`
- `%`
- precedência de operadores
- uso de parênteses
- divisão inteira

### `if` e operadores relacionais

Explicar:

- `if`
- `else`
- `else if`
- `==`
- `!=`
- `>`
- `<`
- `>=`
- `<=`
- diferença entre `=` e `==`

### Laços

Explicar:

- `while`
- `for`
- contador
- condição de parada
- loop infinito
- `break`
- `continue`

### Operadores lógicos

Explicar:

- `&&`
- `||`
- `!`
- tabelas verdade simples
- expressões compostas
- curto-circuito, se fizer sentido

### Funções

Explicar:

- declaração
- definição
- chamada
- parâmetros
- retorno
- `void`
- organização de código

### Passagem por valor

Explicar:

- cópia do valor
- a função não altera a variável original
- bom para dados pequenos e quando não precisa modificar

### Referência

Explicar:

- `int&`
- apelido para variável
- permite alterar valor original
- diferença entre passagem por valor e por referência

### Escopo

Explicar:

- variável local
- variável dentro de bloco
- variável dentro de função
- tempo de vida básico

### Pilha de chamadas

Explicar:

- cada função chamada cria um novo contexto
- parâmetros e variáveis locais pertencem à chamada
- retorno remove a chamada da pilha
- usar diagramas textuais simples

### Ponteiros

Explicar:

- endereço de memória
- operador `&`
- operador `*`
- declaração `int* p`
- ponteiro nulo
- ponteiros como parâmetros de função

### `const` com ponteiros

Explicar com cuidado:

- ponteiro para valor constante
- ponteiro constante
- ponteiro constante para valor constante

Use exemplos pequenos e comentários claros.

### Arrays

Explicar:

- sequência de elementos do mesmo tipo
- índice começa em 0
- tamanho fixo
- acesso com `[]`
- erro comum: acessar fora do limite

### Arrays em funções

Explicar:

- arrays decaem para ponteiros em muitos contextos
- passar tamanho junto
- cuidado com alteração dos elementos

### `std::string`

Explicar:

- string como texto
- `#include <string>`
- concatenação
- `.size()`
- acesso por índice
- `getline`
- diferença entre `cin >> nome` e `getline`

### `std::vector`

Explicar:

- array dinâmico
- `#include <vector>`
- `push_back`
- `.size()`
- acesso por índice
- range-based for
- diferença entre array e vector

## Regras de UI/UX

O app deve ter:

- modo claro e modo escuro;
- botão de alternância de tema;
- layout responsivo;
- cards com bom espaçamento;
- fonte legível no celular;
- blocos de código com rolagem horizontal;
- barra de progresso;
- marcação de lições concluídas;
- botões grandes o suficiente para toque;
- tela de revisão rápida;
- tela de quiz;
- tela de glossário.

Evite:

- páginas muito longas;
- botões pequenos;
- excesso de texto em parágrafos grandes;
- tabelas muito largas no celular;
- dependência de hover, pois celular não usa hover.

## Design visual

O visual deve ser limpo, moderno e confortável para estudo noturno.

Preferências:

- fundo escuro suave no modo noturno;
- contraste bom para leitura;
- cards arredondados;
- sombra leve;
- destaque visual para código;
- ícones simples;
- navegação inferior no mobile, se fizer sentido.

Exemplo de navegação mobile:

```txt
[Início] [Trilha] [Quiz] [Revisão] [Config]
```

## Sistema de progresso

Salvar localmente:

- lições concluídas;
- quizzes respondidos;
- pontuação;
- favoritos;
- tema escolhido;
- última lição acessada.

Usar `localStorage` para MVP.

Exemplo:

```ts
type UserProgress = {
  completedLessons: string[];
  favoriteLessons: string[];
  quizScores: Record<string, number>;
  lastLessonId?: string;
  theme: "light" | "dark";
};
```

## Sistema de quiz

Cada quiz deve:

- ter de 3 a 5 alternativas;
- mostrar feedback imediato;
- explicar por que a resposta correta está certa;
- explicar, quando possível, por que as outras estão erradas;
- permitir refazer.

Tipos de pergunta recomendados:

1. Conceito
2. Complete o código
3. Qual é a saída?
4. Encontre o erro
5. Verdadeiro ou falso

## Desafios de saída

Criar muitos desafios do tipo:

```txt
Qual será a saída deste programa?
```

Exemplo:

```cpp
#include <iostream>

int main() {
    int x = 5;
    x = x + 2;

    std::cout << x << '\n';

    return 0;
}
```

Resposta esperada:

```txt
7
```

Explicação:

A variável começa com 5. Depois recebe o valor dela mesma mais 2. Portanto, passa a valer 7.

## Glossário

Criar um glossário com termos como:

- variável
- tipo
- memória
- compilador
- função
- parâmetro
- argumento
- retorno
- escopo
- ponteiro
- endereço
- referência
- array
- índice
- string
- vector
- STL
- namespace
- biblioteca
- expressão
- operador
- condição

Cada termo deve ter:

- definição curta;
- exemplo;
- relação com outros termos.

## Regras de qualidade

Antes de finalizar qualquer implementação:

1. Verifique se o app compila.
2. Verifique se não há erro de TypeScript.
3. Verifique se o layout funciona em telas pequenas.
4. Verifique se o modo noturno funciona.
5. Verifique se os dados do progresso são salvos.
6. Verifique se os blocos de código são legíveis.
7. Verifique se os quizzes mostram feedback.
8. Verifique se o conteúdo está correto para iniciantes em C++.

## Comandos úteis

Use estes comandos como padrão:

```bash
npm install
npm run dev
npm run build
npm run preview
```

Se o projeto usar lint:

```bash
npm run lint
```

Se o projeto usar testes:

```bash
npm test
```

## Estilo de código

Preferir:

- componentes pequenos;
- nomes claros;
- tipagem explícita em estruturas de dados;
- funções puras quando possível;
- separação entre dados das lições e componentes visuais;
- evitar lógica complexa dentro do JSX.

Exemplo desejado:

```tsx
<LessonCard lesson={lesson} progress={progress} />
```

Evitar componentes gigantes com conteúdo, estado, quiz e layout misturados no mesmo arquivo.

## Proibições importantes

Não copiar texto extenso do livro Deitel ou de qualquer fonte externa.

Não inventar explicações tecnicamente falsas para simplificar.

Não usar exemplos avançados antes da hora.

Não transformar o app em uma documentação gigante.

Não criar backend sem necessidade no MVP.

Não adicionar autenticação no MVP.

Não depender de internet para o conteúdo principal depois que o app estiver carregado.

## Prioridade de implementação

A ordem recomendada é:

1. Criar layout base mobile-first.
2. Criar tema claro/escuro.
3. Criar estrutura de dados das lições.
4. Criar página inicial.
5. Criar página de lição.
6. Criar componente de bloco de código.
7. Criar quiz.
8. Criar progresso com localStorage.
9. Criar revisão rápida.
10. Criar glossário.
11. Transformar em PWA.
12. Melhorar visual e animações.

## Primeira entrega esperada

A primeira versão funcional deve conter:

- Home;
- lista de lições;
- página de lição;
- modo noturno;
- progresso local;
- pelo menos 3 lições completas:
  - primeiro programa com `cout`;
  - entrada com `cin`;
  - variáveis e tipos;
- quiz simples por lição;
- desafio "qual é a saída?".

## Estilo pedagógico obrigatório

Sempre que criar uma lição, seguir este modelo:

```txt
1. Objetivo da lição
2. Explicação curta
3. Exemplo mínimo
4. Explicação linha por linha
5. Variação do exemplo
6. Erros comuns
7. Macete
8. Quiz
9. Desafio de saída
10. Exercício prático
11. Revisão rápida
```

## Exemplo de lição esperada

```ts
export const lessonCout = {
  id: "primeiro-programa-cout",
  title: "Primeiro programa com cout",
  module: "Fundamentos",
  chapterReference: "Deitel, Cap. 2, p. 27-31",
  difficulty: "iniciante",
  estimatedMinutes: 8,
  tags: ["main", "cout", "iostream"],

  objective: "Entender a estrutura mínima de um programa em C++ e como mostrar uma mensagem na tela.",

  explanation: {
    short: "`std::cout` é usado para mostrar informações na tela.",
    detailed:
      "Em C++, todo programa começa sua execução pela função main. Para mostrar mensagens no terminal, usamos std::cout, que pertence à biblioteca iostream."
  },

  codeExamples: [
    {
      title: "Olá, C++!",
      code: `#include <iostream>

int main() {
    std::cout << "Olá, C++!\\n";
    return 0;
}`,
      explanation: [
        "`#include <iostream>` permite usar entrada e saída de dados.",
        "`int main()` é a função principal do programa.",
        "`std::cout` mostra texto na tela.",
        "`<<` envia o texto para o cout.",
        "`return 0` indica que o programa terminou corretamente."
      ]
    }
  ],

  tips: [
    "Todo comando em C++ geralmente termina com ponto e vírgula.",
    "Prefira usar std::cout no começo para entender de onde vem cada recurso.",
    "Use '\\n' para quebrar linha."
  ],

  commonMistakes: [
    "Esquecer o ponto e vírgula.",
    "Escrever cout sem std:: e sem using namespace std.",
    "Esquecer aspas no texto.",
    "Esquecer de fechar chaves."
  ],

  quiz: [
    {
      question: "Qual é a função do std::cout?",
      options: [
        "Ler dados do teclado",
        "Mostrar dados na tela",
        "Criar uma variável",
        "Encerrar o programa"
      ],
      correctAnswer: 1,
      explanation: "`std::cout` envia informações para a saída padrão, geralmente o terminal."
    }
  ],

  outputChallenges: [
    {
      question: "Qual será a saída?",
      code: `#include <iostream>

int main() {
    std::cout << "C++";
    std::cout << " é legal";
    return 0;
}`,
      answer: "C++ é legal",
      explanation:
        "Os dois cout escrevem na mesma linha porque não foi usado '\\n' entre eles."
    }
  ],

  practiceExercises: [
    {
      title: "Mensagem personalizada",
      description:
        "Crie um programa que mostre seu nome, seu curso e uma frase dizendo que você está aprendendo C++.",
      expectedConcepts: ["main", "cout", "quebra de linha"]
    }
  ],

  quickReview: [
    "Todo programa C++ começa pelo main.",
    "std::cout mostra dados na tela.",
    "O operador << envia dados para o cout.",
    "O ponto e vírgula finaliza comandos."
  ]
};
```

## Critério de sucesso

O projeto será considerado bem encaminhado quando o usuário conseguir abrir o app no celular, estudar uma lição em menos de 10 minutos, responder um quiz, ver seu progresso salvo e revisar rapidamente os principais pontos antes de uma prova.
```

Além desse `AGENTS.md` global, eu também recomendo criar depois um arquivo específico para conteúdo, por exemplo:

```txt
src/data/lessons/AGENTS.md
```

Com regras só para criação das lições. Algo assim:

```md
# AGENTS.md para conteúdo das lições

Esta pasta contém os dados educacionais do app.

Ao criar ou editar uma lição:

1. Não copie texto de livros ou sites.
2. Use linguagem original, clara e didática.
3. Sempre inclua exemplos de código pequenos.
4. Sempre explique o código linha por linha.
5. Sempre inclua pelo menos um quiz.
6. Sempre inclua pelo menos um desafio de saída.
7. Sempre inclua erros comuns.
8. Sempre inclua uma revisão rápida.
9. Mantenha o conteúdo adequado para iniciantes.
10. Use C++ moderno, mas sem antecipar conceitos avançados demais.

Cada lição deve ser independente o suficiente para ser estudada pelo celular em poucos minutos.

Priorize clareza sobre profundidade excessiva.
```

E um para UI:

```txt
src/components/AGENTS.md
```

```md
# AGENTS.md para componentes

Esta pasta contém componentes React reutilizáveis.

Regras:

1. Criar componentes pequenos e reutilizáveis.
2. Usar TypeScript.
3. Usar Tailwind CSS.
4. Priorizar mobile-first.
5. Garantir boa leitura em modo escuro.
6. Evitar lógica pedagógica complexa dentro dos componentes.
7. Receber dados por props sempre que possível.
8. Não misturar dados das lições com layout.
9. Criar componentes acessíveis.
10. Usar nomes claros.

Componentes importantes:

- LessonCard
- CodeBlock
- QuizCard
- ProgressBar
- ThemeToggle
- ChallengeCard
- Flashcard
- BottomNavigation
```

O melhor caminho seria você começar com **um único `AGENTS.md` na raiz**. Depois, quando o projeto crescer, você divide em agentes menores por pasta.

Para pedir ao Codex depois, você pode usar este prompt:

```txt
Leia o AGENTS.md da raiz do projeto e siga todas as instruções.

Crie a primeira versão do web app/PWA de estudos de C++ para celular.

Implemente:
- Vite + React + TypeScript;
- Tailwind CSS;
- layout mobile-first;
- modo claro/escuro;
- página inicial;
- lista de lições;
- página de lição;
- componente de bloco de código;
- quiz com feedback;
- progresso salvo no localStorage;
- dados iniciais com 3 lições:
  1. primeiro programa com cout;
  2. entrada com cin;
  3. variáveis e tipos fundamentais.

Não crie backend.
Não copie texto de fontes externas.
Use conteúdo didático original.
Priorize código limpo e fácil de expandir.
```

Esse `AGENTS.md` vai deixar o Codex bem menos “solto na floresta com uma colher”, e mais como um monitor de C++ com prancheta, café e um leve medo de ponteiros.

Piada sem graça final: `AGENTS.md` é tipo o professor substituto do Codex. Ele chega dizendo “não sei quem bagunçou essa sala, mas agora todo mundo vai seguir padrão de projeto”.

---

## Usuário

exporte toda essa conversa em um .md

---

## Assistente

Arquivo Markdown gerado com a conversa organizada por mensagens.

