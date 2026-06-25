# App C++ de Bolso

Esta pasta contém o web app **C++ de Bolso**.

Stack:

- Vite
- React
- TypeScript
- tema claro/escuro
- progresso com `localStorage`
- Playwright para smoke test visual

## Conteúdo atual

O app cobre:

- Arquivos em C++;
- Strings e streams;
- Classes, objetos, construtores e destrutores;
- Sobrecarga de operadores e OO avançada;
- Listas, pilhas e filas;
- Big O e tabela de complexidades;
- Ordenação e busca;
- Ponteiros e alocação dinâmica.

## Recursos da trilha

- conteúdos por assunto;
- banco de questões com filtros;
- simulado geral;
- revisão rápida;
- flashcards com repetição espaçada;
- revisão de erros;
- desafios práticos;
- visualizações de Big O e estruturas.

## Pastas

```txt
public/icons/       Ícones do PWA.
src/app/            Composição principal e rotas.
src/assets/         Imagens e assets estáticos do app.
src/components/     Componentes reutilizáveis.
src/data/           Lições, quizzes, glossário e desafios.
src/hooks/          Hooks de tema, progresso e quiz.
src/pages/          Telas principais.
src/styles/         Estilos globais.
src/types/          Tipos TypeScript.
src/utils/          Funções auxiliares.
```

## Manutenção de conteúdo

Use o guia central:

```txt
../docs/MAINTENANCE_GUIDE.md
```

Ele explica como adicionar questão, flashcard, conteúdo/capítulo, desafio prático e como interpretar os scripts de validação.

## Validação automatizada da interface

Validações de conteúdo e código:

```bash
npm run lint
npm test
```

O `npm test` verifica banco de questões, cobertura de flashcards, qualidade textual/alternativas e compilação dos exemplos C++.

Depois de gerar o build, rode o preview em um terminal:

```bash
npm run build
npm run preview -- --host 127.0.0.1
```

Em outro terminal, execute o smoke test visual:

```bash
npm run test:ui
```

O teste abre Chromium via Playwright, passa por rotas principais, valida o filtro de flashcards, vira um card e salva screenshots temporários em `/tmp/cpp-de-bolso-ui-smoke`.

## Próxima fase: conta e sincronização

Ideia registrada para depois da versão local:

- login opcional;
- sincronização de progresso, revisões e simulados entre dispositivos;
- backup/exportação dos dados locais;
- ranking pessoal por conteúdo.

Antes de implementar, será necessário escolher autenticação, banco de dados e política de privacidade; os dados atuais do localStorage devem migrar sem perda.
