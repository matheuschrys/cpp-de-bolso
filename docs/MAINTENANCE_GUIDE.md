# Guia de manutenção do C++ de Bolso

Este guia explica onde alterar o conteúdo educacional do site e quais validações rodar antes de considerar uma mudança pronta.

## Visão rápida da stack

- App: Vite + React + TypeScript.
- Estilos: CSS global em `app/src/styles/global.css`.
- Estado do estudante: `localStorage`, via hooks em `app/src/hooks/`.
- Conteúdo principal: arquivos TypeScript em `app/src/data/`.
- Validação: scripts Node em `app/scripts/`.

## Mapa dos arquivos de conteúdo

| O que você quer alterar | Arquivo principal |
| --- | --- |
| Conteúdos/capítulos | `app/src/data/studyChapters.ts`, `app/src/data/expandedChapters.ts`, `app/src/data/linkedStructuresContent.ts` |
| Referência/fonte do conteúdo | `app/src/data/studyChallenges.ts`, função `sourceForChapter` |
| Desafios práticos | `app/src/data/studyChallenges.ts` |
| Questões objetivas | `app/src/data/questionBank.ts`, `app/src/data/edbQuestionBank.ts`, `app/src/data/linkedStructuresQuestions.ts` |
| Flashcards | `app/src/data/flashcards.ts` |
| Ícones dos conteúdos | `app/src/data/chapterIcons.ts` |
| Tipos aceitos | `app/src/types/study.ts` |
| Tabela de complexidades | `app/src/data/complexities.ts` |

## Como adicionar um conteúdo ou capítulo

1. Confira se o assunto já existe em `ChapterId`, em `app/src/types/study.ts`.
2. Se for um assunto novo, adicione o id em:
   - `ChapterId`;
   - `app/src/data/chapterIcons.ts`;
   - `app/src/data/studyChallenges.ts`;
   - dados de conteúdo em `studyChapters.ts` ou arquivos complementares.
3. Crie ou atualize um objeto `StudyChapter` com:
   - `id`;
   - `title`;
   - `shortTitle`;
   - `subtitle`;
   - `description`;
   - `themes`;
   - `quickReview`;
   - `topics`.
4. Em cada `TopicBlock`, preencha:
   - `title`;
   - `what`;
   - `purpose`;
   - `analogy`, quando ajudar;
   - `trap`;
   - `shortcut`;
   - `code`.
5. Adicione a referência didática em `sourceForChapter`.
6. Garanta pelo menos dois desafios práticos no `studyChallenges`.

Modelo mínimo de tópico:

```ts
{
  title: "Inserção no início",
  what: "Cria um novo nó e faz ele apontar para a cabeça atual.",
  purpose: "Adicionar elemento sem percorrer a lista.",
  analogy: "É colocar uma nova folha no começo de uma corrente.",
  trap: "Atualizar inicio antes de ligar o novo nó à lista antiga perde o restante da lista.",
  shortcut: "Primeiro novo->prox recebe inicio; depois inicio recebe novo.",
  code: `No* novo = new No{valor, inicio};
inicio = novo;`,
}
```

Regras de conteúdo:

- Não use “Capítulo 17” no título exibido. A referência deve ficar em `sourceForChapter`.
- Evite blocos longos sem estrutura. Prefira explicar por `what`, `purpose`, `trap`, `shortcut` e `code`.
- Exemplos C++ devem ser pequenos, compiláveis quando forem exemplo completo, e preferencialmente C++17.

## Como adicionar uma questão

As questões finais são geradas a partir de sementes (`QuestionSeed`). O sistema embaralha as alternativas de forma determinística e distribui o gabarito entre A, B, C, D e E.

Campos principais de uma questão-semente:

```ts
{
  chapter: "listas",
  theme: "Inserção no início",
  difficulty: "Difícil",
  kind: "interpretação de código",
  prompt: "Qual é a nova cabeça após o trecho?",
  code: `No* inicio = new No{5, nullptr};
inicio = new No{10, inicio};`,
  answer: "O nó com valor 10.",
  distractors: [
    "nullptr.",
    "O nó com valor 5.",
    "O último nó da lista.",
    "Erro de compilação.",
  ],
  explanation: "O novo nó aponta para a cabeça antiga e depois passa a ser a cabeça.",
  tags: ["No*&", "inserção", "ponteiros"],
}
```

Checklist para nova questão:

- `chapter` deve existir em `ChapterId`.
- `difficulty` deve ser `"Média"`, `"Difícil"` ou `"Muito difícil"`.
- `kind` deve ser um dos tipos de `StudyQuestion["kind"]`.
- Use uma resposta correta em `answer` e quatro alternativas erradas em `distractors`.
- Evite distratores repetidos com palavras diferentes, mas mesmo sentido.
- Se a pergunta for sobre saída, erro, estado final ou complexidade, tente incluir código.
- A explicação deve justificar a correta e apontar a pegadinha central.
- Tags devem ajudar filtros e revisão, não apenas repetir o título.

Tipos de questão aceitos:

- `conceito`;
- `interpretação de código`;
- `saída do programa`;
- `complexidade`;
- `erro de compilação`;
- `estado final`;
- `implementação`.

Onde colocar:

- Questões originais de C++/OO/arquivos/strings: `app/src/data/questionBank.ts`.
- Questões geradas de EDB, Big O, ordenação, busca e ponteiros: `app/src/data/edbQuestionBank.ts`.
- Questões de inserção em listas e fila encadeada: `app/src/data/linkedStructuresQuestions.ts`.

Depois de adicionar, rode:

```bash
cd app
npm run test:questions
npm run test:quality
```

O validador verifica:

- ids duplicados;
- metadados obrigatórios;
- alternativas A–E;
- alternativas repetidas;
- gabarito válido;
- distribuição balanceada das respostas;
- enunciado/código duplicado;
- textos com placeholder ou prefixo indevido de capítulo.

## Como adicionar um flashcard

Flashcards ficam em `app/src/data/flashcards.ts`.

Modelo:

```ts
{
  id: "fc-listas-insercao-antes",
  chapter: "listas",
  theme: "Inserção antes de nó",
  front: "Por que inserir antes de um nó em lista simples exige conhecer o anterior?",
  back: "Porque a lista simples só aponta para frente; para religar anterior->prox ao novo nó, você precisa do nó anterior.",
  hint: "Pense no ponteiro que será alterado.",
  code: `novo->prox = atual;
anterior->prox = novo;`,
  tags: ["lista", "ponteiros", "inserção"],
}
```

Checklist para flashcards:

- `id` único e descritivo, começando com `fc-`.
- `chapter` existente.
- `theme` compatível com os filtros do conteúdo.
- Frente curta, em formato de pergunta ou provocação.
- Verso direto, com a ideia que o aluno deve lembrar.
- `hint` opcional, mas útil para cards difíceis.
- `code` opcional; use quando o conceito envolve sintaxe ou pegadinha de C++.
- Tags úteis para revisão.

Depois de adicionar, rode:

```bash
cd app
npm run test:flashcards
npm run test:quality
```

O validador confere se os flashcards cobrem todos os conteúdos cadastrados e se não há duplicações óbvias.

## Como adicionar desafios práticos

Desafios ficam em `app/src/data/studyChallenges.ts`.

Cada conteúdo deve manter pelo menos dois desafios:

```ts
{
  title: "1. Fila Encadeada",
  goal: "Implemente enqueue no fim e dequeue no início com nós.",
  requires: "Use ponteiros, lista simples e encapsulamento.",
  deliverables: [
    "frente e tras.",
    "vazia e front.",
    "Caso de remover o último nó.",
  ],
}
```

Boa prática:

- O desafio 1 deve fixar o assunto atual.
- O desafio 2 deve exigir o assunto atual mais conhecimentos anteriores.
- Use verbos de entrega claros: implementar, validar, exibir, comparar, tratar.

## Como validar antes de finalizar

Dentro de `app/`:

```bash
npm run lint
npm run build
npm test
```

Para validação visual:

```bash
npm run preview -- --host 127.0.0.1
```

Em outro terminal:

```bash
UI_SMOKE_URL=http://127.0.0.1:4173/ npm run test:ui
```

Se o preview escolher outra porta, ajuste `UI_SMOKE_URL`.

## O que cada script faz

| Script | Finalidade |
| --- | --- |
| `npm run lint` | Verifica padrões de TypeScript/React com ESLint. |
| `npm run build` | Compila TypeScript e gera o build de produção com Vite. |
| `npm run test:questions` | Valida banco de questões, ids, alternativas e gabarito. |
| `npm run test:flashcards` | Valida cobertura dos flashcards por conteúdo. |
| `npm run test:quality` | Valida textos, duplicações, referências e qualidade geral. |
| `npm run test:cpp` | Compila exemplos C++ selecionados com `g++`. |
| `npm test` | Roda validações de questões, flashcards, qualidade e C++. |
| `npm run test:ui` | Executa smoke test visual com Playwright/Chromium. |

Observação: `npm test` pode precisar de permissão para executar `g++`, porque o script de C++ cria arquivos temporários e compila exemplos.

## Cuidados antes de mexer

- Não edite `dist/`, `node_modules/` ou screenshots temporários.
- Não altere dados de progresso salvos no navegador como se fossem fonte do projeto.
- Se mudar estrutura de dados, ajuste os tipos em `app/src/types/` primeiro.
- Se criar novo conteúdo, adicione questões, flashcards e desafios junto, ou registre a pendência no checklist.
- Antes de terminar uma rodada, confira `git diff --stat` e rode ao menos `npm run lint` e `npm run build`.
