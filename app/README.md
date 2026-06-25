# App

Esta pasta está reservada para o web app/PWA **C++ de Bolso**.

Stack planejada:

- Vite
- React
- TypeScript
- tema claro/escuro
- progresso com `localStorage`
- PWA para instalação no celular

## Conteúdo atual

O app já contém 24 lições iniciais:

1. Primeiro programa com `cout`.
2. Entrada com `cin`.
3. Variáveis e tipos fundamentais.
4. Aritmética e precedência.
5. `if` e operadores relacionais.
6. Operadores lógicos.
7. Repetição com `while`.
8. Repetição com `for`.
9. `break` e `continue`.
10. Funções.
11. Passagem por valor.
12. Referências e parâmetros por referência.
13. Escopo de variáveis.
14. Pilha de chamadas de função.
15. Arrays.
16. Passagem de arrays para funções.
17. Ponteiros básicos.
18. Ponteiros em funções.
19. `const` com ponteiros.
20. Relação entre ponteiros e arrays.
21. `std::string` básico.
22. `std::string` completo.
23. `std::vector` básico.
24. `std::vector` e STL.

## Recursos da trilha

- busca por título, objetivo, tags e referência;
- filtro por módulo;
- filtro de favoritas;
- agrupamento visual por módulo;
- contagem de lições concluídas por módulo.

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

As dependências já foram instaladas com `npm install`.

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
