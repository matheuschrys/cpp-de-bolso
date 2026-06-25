import type { Difficulty } from "../types/study";

export type QuestionFilterState = { chapter: string; theme: string; difficulty: string; kind: string; search: string };

type Props = {
  value: QuestionFilterState;
  themes: string[];
  chapters: { id: string; label: string }[];
  onChange: (value: QuestionFilterState) => void;
};

export const QuestionFilters = ({ value, themes, chapters, onChange }: Props) => (
  <section className="question-filters" aria-label="Filtros de questões">
    <label>Conteúdo
      <select value={value.chapter} onChange={(event) => onChange({ ...value, chapter: event.target.value })}>
        <option value="">Todos</option>{chapters.map((chapter) => <option key={chapter.id} value={chapter.id}>{chapter.label}</option>)}
      </select>
    </label>
    <label>Tema
      <select value={value.theme} onChange={(event) => onChange({ ...value, theme: event.target.value })}>
        <option value="">Todos</option>{themes.map((theme) => <option key={theme}>{theme}</option>)}
      </select>
    </label>
    <label>Dificuldade
      <select value={value.difficulty} onChange={(event) => onChange({ ...value, difficulty: event.target.value as Difficulty | "" })}>
        <option value="">Todas</option><option>Média</option><option>Difícil</option><option>Muito difícil</option>
      </select>
    </label>
    <label>Tipo
      <select value={value.kind} onChange={(event) => onChange({ ...value, kind: event.target.value })}>
        <option value="">Todos</option><option value="conceito">Conceito</option><option value="interpretação de código">Interpretação de código</option><option value="saída do programa">Saída do programa</option><option value="complexidade">Complexidade</option><option value="erro de compilação">Erro de compilação</option><option value="estado final">Estado final</option><option value="implementação">Implementação</option>
      </select>
    </label>
    <label className="filter-search">Buscar
      <input value={value.search} onChange={(event) => onChange({ ...value, search: event.target.value })} placeholder="assunto, conceito ou tag" />
    </label>
    <button type="button" className="button button--quiet" onClick={() => onChange({ chapter: "", theme: "", difficulty: "", kind: "", search: "" })}>Limpar filtros</button>
  </section>
);
