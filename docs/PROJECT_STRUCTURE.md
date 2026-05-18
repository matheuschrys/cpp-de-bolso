# Estrutura do Projeto

## Decisão principal

A raiz do repositório fica como área de organização dos materiais de estudo e planejamento. O código do web app fica dentro de `app/`.

Essa separação evita misturar PDFs, slides e labs com arquivos de frontend.

## Árvore planejada

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

## Responsabilidade das pastas

- `docs/`: decisões de projeto, roadmap, escopo do MVP e notas de arquitetura.
- `app/`: futuro app Vite/React/TypeScript.
- `app/src/app/`: composição principal, rotas e configuração da aplicação.
- `app/src/components/`: componentes reutilizáveis.
- `app/src/data/`: dados das lições, quizzes, glossário e desafios.
- `app/src/hooks/`: hooks para tema, progresso, quiz e preferências.
- `app/src/pages/`: telas principais.
- `app/src/styles/`: estilos globais e tokens visuais.
- `app/src/types/`: tipos TypeScript compartilhados.
- `app/src/utils/`: funções auxiliares puras.
- `app/public/icons/`: ícones do PWA.

## Fases sugeridas

1. Criar agente e documentação base.
2. Inicializar o app em Vite + React + TypeScript.
3. Criar layout mobile-first com tema claro/escuro.
4. Criar tipos e dados das primeiras lições.
5. Implementar Home e página de lição.
6. Implementar quiz com feedback.
7. Salvar progresso no `localStorage`.
8. Criar revisão rápida e glossário.
9. Adicionar configuração PWA.
10. Validar responsividade e fluxo no navegador.
