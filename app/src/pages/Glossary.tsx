import { useMemo, useState } from "react";
import { glossary } from "../data/glossary";

export const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredTerms = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return glossary;
    }

    return glossary.filter((item) =>
      [item.term, item.definition, item.example, ...item.related]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch),
    );
  }, [searchTerm]);

  return (
    <main className="page">
      <header className="page-header">
        <p className="quiet-label">Glossário</p>
        <h1>Termos que aparecem toda hora.</h1>
        <p>Definições curtas para destravar leitura de código e enunciados.</p>
      </header>

      <label className="search-field glossary-search">
        <span>Buscar termo</span>
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Ex.: ponteiro, função, vector"
        />
      </label>

      <div className="glossary-list">
        {filteredTerms.map((item) => (
          <article className="glossary-item" key={item.term}>
            <h2>{item.term}</h2>
            <p>{item.definition}</p>
            <code>{item.example}</code>
            <div className="tag-list">
              {item.related.map((term) => (
                <span key={term}>{term}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};
