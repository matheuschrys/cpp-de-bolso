# AGENTS.md

## Idioma e postura

- Responda em português do Brasil, exceto quando o arquivo, API ou pedido estiver em inglês.
- Explique de forma didática quando o contexto for estudo de C++, Git, Linux ou desenvolvimento web.
- Prefira soluções simples, legíveis e fáceis de revisar.
- Antes de refatorações grandes, apresente um plano curto.
- Não faça commit, push, deploy, instalação de dependências ou alteração ampla sem pedido explícito.

## Visão geral do projeto

Este repositório organiza o projeto **C++ de Bolso**, um web app/PWA mobile-first para estudar fundamentos de C++ pelo celular.

O app deve funcionar como um treinador de estudos em sessões curtas: explicar conceitos, mostrar exemplos, perguntar, corrigir respostas, salvar progresso e permitir revisão rápida antes de provas.

O conteúdo segue a trilha de estudos baseada no livro **C++ Como Programar**, de Deitel, e nos materiais locais do projeto, mas o texto do app deve ser original. Use livros, slides e sites apenas como referência de sequência, conceitos e checagem técnica.

## Fontes, direitos e conteúdo

- Não copie trechos extensos do livro, PDFs, slides ou páginas externas.
- Não exponha conteúdo de PDFs protegidos ou materiais privados no chat sem autorização explícita.
- Ao usar fontes externas, prefira documentação primária e materiais confiáveis, como cppreference, LearnCpp e documentação oficial das ferramentas.
- Para dúvidas atuais de frameworks, bibliotecas, SDKs, APIs ou CLIs, use Context7 quando disponível.
- Se precisar pesquisar na web, use Firecrawl, Exa, Tavily ou web search quando disponíveis, cite as fontes e escreva conteúdo próprio.

## Estrutura do repositório

A raiz do projeto guarda materiais de estudo, documentação e planejamento. O app web deve ficar isolado em `app/`.

```txt
.
├── AGENTS.md
├── README.md
├── conversa_cpp_de_bolso.md
├── C++ Como Programar - 5ª Edição.pdf
├── Slides/
├── Labs/
├── docs/
│   ├── PROJECT_STRUCTURE.md
│   └── CONTENT_ROADMAP.md
└── app/
    ├── README.md
    ├── public/
    │   └── icons/
    └── src/
        ├── app/
        ├── assets/
        ├── components/
        ├── data/
        │   ├── lessons/
        │   └── quizzes/
        ├── hooks/
        ├── pages/
        ├── styles/
        ├── types/
        └── utils/
```

Não mova os PDFs, slides ou labs sem autorização. A pasta `app/` será a base do futuro Vite/React.

## Stack recomendada

Para o MVP, use preferencialmente:

- Vite
- React
- TypeScript
- CSS moderno ou Tailwind CSS, se o usuário autorizar a instalação/configuração
- React Router, se houver múltiplas páginas reais
- `localStorage` para progresso no MVP
- PWA para instalação no celular
- Shiki ou Prism.js para destaque de código, apenas se necessário

Evite backend, autenticação e bibliotecas pesadas no MVP.

## Skills, plugins e MCPs

Use as capacidades disponíveis de forma intencional:

- `build-web-apps:frontend-app-builder`: use para criar ou redesenhar a interface principal do app. Para implementação visual completa, siga o fluxo de design, implementação e verificação visual da skill.
- `build-web-apps:frontend-testing-debugging`, `playwright`, Chrome DevTools ou Browser MCP: use para testar layout, navegação, responsividade e erros visuais quando houver UI implementada.
- `build-web-apps:react-best-practices` ou `vercel:react-best-practices`: use após mudanças relevantes em componentes React/TSX.
- `context7`: use para documentação atual de React, Vite, Tailwind, React Router, PWA, TypeScript e bibliotecas.
- GitHub plugin/MCP: use apenas quando a tarefa envolver issues, PRs, actions, checks, histórico remoto ou publicação no GitHub.
- Vercel plugin/MCP: use quando a tarefa envolver deploy, preview, domínio, logs ou variáveis de ambiente da Vercel.
- Figma plugin/MCP: use quando houver arquivo, link ou referência de design no Figma. Carregue a skill de Figma apropriada antes de chamar ferramentas Figma.
- Firecrawl, Exa ou Tavily: use quando a tarefa exigir pesquisa web, leitura de páginas externas ou extração de conteúdo.
- `pdf`: use quando for necessário analisar layout ou estrutura de PDFs. Não copie conteúdo protegido.
- Codex Security: use quando o usuário pedir revisão ou correção de segurança.
- Gmail e Notion: use somente se o usuário pedir explicitamente contexto dessas ferramentas.

Quando uma ferramenta MCP não estiver carregada, use `tool_search` para localizar a ferramenta adequada. Se não estiver disponível, explique a limitação e siga com a melhor alternativa local.

## Produto esperado

O app deve conter, em fases:

- home com continuação de estudo;
- trilha de lições;
- página de lição;
- blocos de código legíveis no celular;
- quizzes com feedback;
- desafios de "qual é a saída?";
- favoritos;
- progresso salvo localmente;
- modo claro e escuro;
- revisão rápida;
- glossário;
- instalação como PWA.

## Ordem inicial dos conteúdos

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

Cada lição deve ser curta o bastante para estudo no celular e seguir este formato:

1. objetivo da lição;
2. explicação curta;
3. exemplo mínimo;
4. explicação linha por linha;
5. variação do exemplo;
6. erros comuns;
7. dica ou macete;
8. quiz;
9. desafio de saída;
10. exercício prático;
11. revisão rápida.

Estrutura de dados sugerida:

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

## Regras para exemplos de C++

- Priorize C++17, salvo se o projeto indicar outra versão.
- Prefira exemplos pequenos, compiláveis e adequados para iniciantes.
- Use `std::cout`, `std::cin`, `std::string` e `std::vector` com namespace explícito nos primeiros módulos.
- Evite `using namespace std;` nos exemplos iniciais. Pode explicar que existe, mas prefira `std::` por clareza.
- Use `'\n'` preferencialmente em vez de `std::endl`, explicando `std::endl` apenas quando necessário.
- Compile mentalmente os exemplos antes de adicioná-los.
- Para exemplos simples, use como referência:

```bash
g++ -std=c++17 -Wall -Wextra -pedantic main.cpp -o main
```

## UI e experiência

- Mobile-first é obrigatório.
- O app deve ser confortável para estudo noturno.
- Botões e áreas clicáveis devem ser adequados para toque.
- Blocos de código devem ter rolagem horizontal em telas pequenas.
- Evite páginas longas sem divisão visual.
- Não dependa de hover para funcionalidades importantes.
- Use texto claro, direto e didático, sem infantilizar.
- Preserve acessibilidade básica: contraste, foco visível, semântica e navegação por teclado quando aplicável.

## Desenvolvimento e verificação

Antes de alterar projetos React/Vite, verifique `package.json` e o lockfile.

Use os scripts existentes. Quando existirem, tente rodar:

```bash
npm run build
npm run lint
npm run test
```

Se ainda não houver `package.json`, não invente comandos de build. Primeiro estruture ou crie o projeto conforme pedido.

Depois de mudanças de UI, quando houver app executável, verifique pelo menos:

- build sem erro;
- modo claro e escuro;
- responsividade básica mobile e desktop;
- navegação principal;
- progresso salvo no `localStorage`;
- quizzes com feedback;
- blocos de código legíveis.

## Segurança e limites

- Nunca leia, crie, edite ou exponha secrets, tokens, `.env`, `.env.*`, cookies, chaves privadas ou credenciais sem autorização explícita.
- Não altere `.codex/`, `.agents/`, `.git/`, caches, `node_modules`, `dist`, `build`, `.next` ou arquivos gerados sem necessidade clara.
- Não rode comandos destrutivos.
- Não instale dependências novas sem explicar o motivo e confirmar que são necessárias.
- Não faça deploy, commit, push, merge ou rebase remoto sem pedido explícito.

## Critério de primeira entrega funcional

A primeira versão do app será considerada útil quando tiver:

- Home;
- lista de lições;
- página de lição;
- modo claro e escuro;
- progresso local;
- pelo menos 3 lições completas;
- quiz simples por lição;
- desafio de saída;
- layout legível no celular.
