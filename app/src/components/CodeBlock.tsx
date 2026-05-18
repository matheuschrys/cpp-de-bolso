import { useMemo, useState, type ReactNode } from "react";

type CodeBlockProps = {
  code: string;
  title?: string;
  language?: string;
  compact?: boolean;
};

const cppKeywords = new Set([
  "bool",
  "break",
  "char",
  "const",
  "continue",
  "double",
  "else",
  "false",
  "float",
  "for",
  "if",
  "int",
  "return",
  "true",
  "void",
  "while",
]);

const tokenPattern =
  /(#include|std::[A-Za-z_]\w*|\/\/.*|"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b|[{}()[\];,.*&<>!=+\-/%]+)/g;

export const CodeBlock = ({
  code,
  title = "Exemplo",
  language = "C++",
  compact = false,
}: CodeBlockProps) => {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const highlightedCode = useMemo(() => highlightCpp(code), [code]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 1600);
    } catch {
      setCopyStatus("error");
      window.setTimeout(() => setCopyStatus("idle"), 1600);
    }
  };

  return (
    <figure className={compact ? "code-card code-card--compact" : "code-card"}>
      <figcaption className="code-card__header">
        <span>{title}</span>
        <div className="code-card__actions">
          <span>{language}</span>
          <button type="button" onClick={copyCode}>
            {copyStatus === "copied" ? "Copiado" : copyStatus === "error" ? "Erro" : "Copiar"}
          </button>
        </div>
      </figcaption>
      <pre className="code-block" aria-label={`${title} em ${language}`}>
        <code>{highlightedCode}</code>
      </pre>
    </figure>
  );
};

const highlightCpp = (code: string) => {
  const lines = code.split("\n");

  return lines.map((line, lineIndex) => (
    <span className="code-line" key={`${line}-${lineIndex}`}>
      {highlightLine(line)}
      {lineIndex < lines.length - 1 ? "\n" : null}
    </span>
  ));
};

const highlightLine = (line: string) => {
  const tokens = line.match(tokenPattern);

  if (!tokens) {
    return line;
  }

  let cursor = 0;
  const parts: ReactNode[] = [];

  tokens.forEach((token, tokenIndex) => {
    const tokenStart = line.indexOf(token, cursor);

    if (tokenStart > cursor) {
      parts.push(line.slice(cursor, tokenStart));
    }

    parts.push(
      <span className={getTokenClass(token)} key={`${token}-${tokenIndex}-${tokenStart}`}>
        {token}
      </span>,
    );
    cursor = tokenStart + token.length;
  });

  if (cursor < line.length) {
    parts.push(line.slice(cursor));
  }

  return parts;
};

const getTokenClass = (token: string) => {
  if (token.startsWith("//")) {
    return "token-comment";
  }

  if (token.startsWith('"') || token.startsWith("'")) {
    return "token-string";
  }

  if (token === "#include" || cppKeywords.has(token)) {
    return "token-keyword";
  }

  if (token.startsWith("std::")) {
    return "token-namespace";
  }

  if (/^\d/.test(token)) {
    return "token-number";
  }

  return "token-plain";
};
