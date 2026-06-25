# Checklist de revisão do site de estudos

Este arquivo acompanha as etapas finais de revisão do **C++ de Bolso**. Atualize os itens conforme cada rodada for concluída.

## Etapas principais

- [x] **1. Revisão manual de conteúdo**
  - [x] Ler conteúdos teóricos longos.
  - [x] Conferir se explicações, macetes e pegadinhas soam naturais.
  - [x] Procurar frases repetitivas, confusas ou alternativas óbvias demais.
  - [x] Ajustar trechos em que texto comum e código/comando fiquem visualmente misturados.

- [x] **2. Revisão visual manual**
  - [x] Conferir desktop.
  - [x] Conferir celular.
  - [x] Conferir blocos longos de conteúdo.
  - [x] Conferir questões com código.
  - [x] Conferir filtros, flashcards e resultado do simulado.

- [x] **3. Melhorar fluxo de estudo**
  - [x] Criar “Continuar de onde parei”.
  - [x] Mostrar progresso por assunto.
  - [x] Mostrar flashcards vencidos hoje na Home.
  - [x] Mostrar desafios concluídos por conteúdo.

- [x] **4. Aprofundar revisão de erros**
  - [x] Separar erros por tema.
  - [x] Permitir remover manualmente uma questão da lista de erros.
  - [x] Criar “refazer só meus erros mais recentes”.

- [x] **5. Melhorar simulado**
  - [x] Permitir escolher dificuldade.
  - [x] Permitir escolher tipo da questão.
  - [x] Mostrar análise mais detalhada no resultado.
  - [x] Salvar histórico de forma mais visual.

- [x] **6. Melhorar flashcards**
  - [x] Mostrar data de próxima revisão.
  - [x] Criar níveis “fácil / médio / difícil”.
  - [x] Implementar repetição espaçada mais refinada.
  - [x] Criar modo “só cards com código”.

- [x] **7. Aprofundar Big O e ordenações**
  - [x] Criar visualizador interativo de crescimento Big O.
  - [x] Permitir alterar tamanho da entrada e ver custos estimados.
  - [x] Criar aba de ordenações/sortings.
  - [x] Mostrar como Big O influencia cada algoritmo de ordenação.
  - [x] Comparar tipos de sort em cenários diferentes.

- [x] **8. Polimento visual**
  - [x] Revisar tema claro.
  - [x] Melhorar estados vazios.
  - [x] Refinar animações.
  - [x] Melhorar espaçamento em telas muito pequenas.

- [x] **9. Documentação para manutenção**
  - [x] Explicar como adicionar nova questão.
  - [x] Explicar como adicionar flashcard.
  - [x] Explicar como adicionar conteúdo/capítulo.
  - [x] Explicar scripts de validação.

- [ ] **10. Futuro maior**
  - [ ] Login opcional.
  - [ ] Sincronização entre dispositivos.
  - [ ] Exportar/importar progresso.
  - [x] Deploy/preview público.

## Registro da rodada atual

- Status: concluída.
- Foco: etapa 9, documentação para manutenção.
- O que foi feito:
  - Criado `docs/MAINTENANCE_GUIDE.md` com mapa dos arquivos de conteúdo.
  - Documentado o fluxo para adicionar conteúdos, questões, flashcards e desafios.
  - Documentados os scripts de validação e quando usar cada um.
  - Atualizados `README.md` e `app/README.md` para refletirem o estado atual do projeto.

## Registro da etapa 8

- Status: concluída.
- Foco: etapa 8, polimento visual.
- O que foi feito:
  - Suavizado o tema claro com superfícies mais limpas, bordas menos pesadas e sombra um pouco mais discreta.
  - Melhorados os estados vazios com cartão mais evidente, fundo sutil e contorno tracejado interno.
  - Refinadas animações leves de entrada e hover, respeitando `prefers-reduced-motion`.
  - Ajustados espaçamentos, títulos, botões e blocos de código para telas muito pequenas.
  - Validada a UI com screenshots de desktop, mobile e estado vazio.

## Registro da etapa 7

- Status: concluída.
- Foco: nova etapa 7, aprofundando Big O e ordenações.
- O que foi feito:
  - Criada uma área interativa para visualizar crescimento de funções Big O.
  - Criada uma aba de ordenações com comparação de algoritmos e cenários.
  - Mantida a tabela de complexidades como consulta rápida.
  - Atualizado o smoke test para reconhecer o novo título da página Big O.

## Registro da etapa 6

- Status: concluída.
- Foco: etapa 6, melhorando flashcards.
- O que foi feito:
  - Mostrada a data de próxima revisão por card.
  - Criada avaliação fácil/médio/difícil.
  - Implementada repetição espaçada com intervalos progressivos.
  - Criado modo “só cards com código”.
  - Mantida compatibilidade com progresso antigo de flashcards.

## Registro da etapa 5

- Status: concluída.
- Foco: etapa 5, melhorando o modo simulado.
- O que foi feito:
  - Adicionados filtros por dificuldade e tipo de questão.
  - Enriquecido o resultado final com análise por tema, dificuldade e tipo.
  - Adicionado histórico visual de simulados recentes.
  - Mantida a compatibilidade com o progresso já salvo.
  - Marcado o deploy/preview público como concluído em “Futuro maior”.

## Registro da etapa 4

- Status: concluída.
- Foco: etapa 4, aprofundando a revisão de erros.
- O que foi feito:
  - Criado painel de revisão de erros com total pendente e agrupamento por tema.
  - Adicionado filtro rápido por tema dentro da revisão de erros.
  - Criado modo “Refazer recentes”, limitado aos últimos erros pendentes.
  - Adicionado botão “Remover da revisão” em cada questão pendente.
  - Criado estado vazio mais claro quando não há erro com os filtros atuais.
  - Validada a remoção manual e o modo de recentes com Playwright.

## Registro da etapa 3

- Status: concluída.
- Foco: etapa 3, melhorando o fluxo de continuidade do estudo.
- O que foi feito:
  - Mantido o botão “Continuar em ...” na Home com base no último conteúdo aberto.
  - Adicionado resumo de fluxo com questões treinadas, desafios concluídos, flashcards vencidos e erros pendentes.
  - Adicionado progresso por conteúdo nos cards da Home e na tela de Conteúdos.
  - Sincronizado o contador de flashcards vencidos quando o progresso dos cards muda.
  - Validada a interface em desktop e celular com Playwright.

## Registro inicial

- Status: concluída.
- Foco: etapas 1 e 2, com atenção especial à legibilidade dos conteúdos teóricos.
- O que foi feito:
  - Criado este checklist de acompanhamento.
  - Revisada a leitura dos conteúdos em desktop e mobile.
  - Ajustados os blocos teóricos para separar visualmente “O que é”, “Para que serve”, “Analogia”, “Pegadinha”, “Macete” e “Exemplo em C++”.
  - Aplicado destaque de código inline em conteúdos e macetes, evitando que comandos como `seekg`, `ios::app`, `clear()` e `std::fstream` pareçam texto comum.
  - Validada a renderização em desktop e celular com screenshots temporários.

## Etapas restantes após esta rodada

1. Futuro maior: login, sincronização e exportação/importação de progresso.
