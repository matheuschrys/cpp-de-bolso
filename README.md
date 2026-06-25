# C++ de Bolso

Web app de estudos para prova de C++ e Estruturas de Dados Básicas.

O projeto reúne teoria direta, exemplos em C++, banco de questões, simulado, flashcards, desafios práticos, revisão de erros, Big O interativo e tabela de complexidades.

## Stack

- Vite;
- React;
- TypeScript;
- CSS global;
- Playwright para smoke test visual;
- progresso local com `localStorage`.

## Estrutura

```txt
docs/   Planejamento, estrutura e roadmap de conteúdo.
app/    Futuro web app/PWA em Vite, React e TypeScript.
Slides/ Materiais de aula existentes.
Labs/   Exercícios e laboratórios existentes.
```

## Como rodar

```bash
cd app
npm install
npm run dev
```

## Validação

```bash
cd app
npm run lint
npm run build
npm test
```

Para smoke test visual:

```bash
npm run preview -- --host 127.0.0.1
UI_SMOKE_URL=http://127.0.0.1:4173/ npm run test:ui
```

Se o Vite escolher outra porta, ajuste `UI_SMOKE_URL`.

## Manutenção de conteúdo

Para adicionar conteúdos, questões, flashcards, desafios ou entender os scripts de validação, consulte:

- [Guia de manutenção](docs/MAINTENANCE_GUIDE.md)
- [Checklist de revisão](docs/STUDY_REVIEW_CHECKLIST.md)
