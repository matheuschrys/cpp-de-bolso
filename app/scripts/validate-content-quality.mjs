import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const esbuild = process.platform === "win32"
  ? join(root, "node_modules", ".bin", "esbuild.cmd")
  : join(root, "node_modules", ".bin", "esbuild");

if (!existsSync(esbuild)) {
  throw new Error("esbuild não foi encontrado. Execute npm install antes de validar o conteúdo.");
}

const temporaryDirectory = mkdtempSync(join(tmpdir(), "cpp-content-quality-"));
const entry = join(temporaryDirectory, "content-entry.ts");
const output = join(temporaryDirectory, "content-entry.mjs");
const labels = ["A", "B", "C", "D", "E"];
const hardIssues = [];
const warnings = [];

const normalize = (text) => text
  .normalize("NFD")
  .replace(/\p{Diacritic}/gu, "")
  .toLocaleLowerCase("pt-BR")
  .replace(/[“”"'.:;!?()[\]{}]/g, "")
  .replace(/\s+/g, " ")
  .trim();

const normalizeOption = (text) => text
  .toLocaleLowerCase("pt-BR")
  .replace(/[ \t]+$/g, "")
  .replace(/[.。]+$/g, "");
const hasSuspiciousToken = (text) => /\b(TODO|FIXME|lorem|Lorem|placeholder|Placeholder)\b/.test(text);
const hasTemplateLeak = (text) => /\$\{[^}]+\}/.test(text);
const isShortButValidOption = (text) => /^(?:-?\d+|[A-Z]\b|O\([^)]+\)|nullptr|null|true|false|sim|não|nao)$/i.test(text.trim().replace(/[.。]+$/g, ""));
const stripInlineCode = (text) => text.replace(/`[^`]*`/g, "X");
const hasBrokenSpacing = (text) => /\s{2,}/.test(stripInlineCode(text)) || /\s+[,.!?;:]/.test(stripInlineCode(text));
const hasChapterPrefix = (text) => /\bcap(?:í|i)tulo\b|\bcap\.\s*\d+/i.test(text);

const checkText = (context, text, { allowChapterReference = false } = {}) => {
  if (!text.trim()) hardIssues.push(`${context}: texto vazio`);
  if (hasSuspiciousToken(text)) hardIssues.push(`${context}: texto placeholder/TODO encontrado`);
  if (hasTemplateLeak(text)) hardIssues.push(`${context}: interpolação não resolvida encontrada`);
  if (hasBrokenSpacing(text)) warnings.push(`${context}: espaçamento suspeito`);
  if (!allowChapterReference && hasChapterPrefix(text)) hardIssues.push(`${context}: contém prefixo de capítulo fora da referência`);
};

try {
  writeFileSync(entry, [
    `export { questionBank } from ${JSON.stringify(join(root, "src/data/questionBank.ts"))};`,
    `export { flashcards } from ${JSON.stringify(join(root, "src/data/flashcards.ts"))};`,
    `export { studyChapters } from ${JSON.stringify(join(root, "src/data/studyChapters.ts"))};`,
    `export { sourceForChapter, studyChallenges } from ${JSON.stringify(join(root, "src/data/studyChallenges.ts"))};`,
  ].join("\n"));

  execFileSync(esbuild, [entry, "--bundle", "--platform=node", "--format=esm", `--outfile=${output}`, "--log-level=error"], { cwd: root, stdio: "inherit" });
  const { questionBank, flashcards, studyChapters, sourceForChapter, studyChallenges } = await import(`${pathToFileURL(output).href}?v=${Date.now()}`);
  const chapterIds = new Set(studyChapters.map((chapter) => chapter.id));
  const questionPromptMap = new Map();
  const flashcardFrontMap = new Map();
  const questionsByKind = {};

  for (const chapter of studyChapters) {
    checkText(`conteúdo ${chapter.id} shortTitle`, chapter.shortTitle);
    checkText(`conteúdo ${chapter.id} title`, chapter.title);
    checkText(`conteúdo ${chapter.id} subtitle`, chapter.subtitle);
    checkText(`conteúdo ${chapter.id} description`, chapter.description);
    checkText(`conteúdo ${chapter.id} fonte`, sourceForChapter(chapter.id), { allowChapterReference: true });

    if (!chapter.topics.length) hardIssues.push(`conteúdo ${chapter.id}: sem tópicos teóricos`);
    if (!studyChallenges[chapter.id] || studyChallenges[chapter.id].length < 2) hardIssues.push(`conteúdo ${chapter.id}: menos de dois desafios`);

    for (const topic of chapter.topics) {
      checkText(`conteúdo ${chapter.id} tópico ${topic.title} título`, topic.title);
      checkText(`conteúdo ${chapter.id} tópico ${topic.title} conceito`, topic.what);
      checkText(`conteúdo ${chapter.id} tópico ${topic.title} uso`, topic.purpose);
      checkText(`conteúdo ${chapter.id} tópico ${topic.title} pegadinha`, topic.trap);
      checkText(`conteúdo ${chapter.id} tópico ${topic.title} macete`, topic.shortcut);
      if (!topic.code.trim()) warnings.push(`conteúdo ${chapter.id} tópico ${topic.title}: sem exemplo de código`);
    }
  }

  for (const question of questionBank) {
    const where = `questão ${question.id}`;
    questionsByKind[question.kind ?? "sem tipo"] = (questionsByKind[question.kind ?? "sem tipo"] ?? 0) + 1;

    if (!chapterIds.has(question.chapter)) hardIssues.push(`${where}: capítulo/conteúdo inexistente ${question.chapter}`);
    checkText(`${where} enunciado`, question.prompt);
    checkText(`${where} explicação`, question.explanation);

    if (!question.tags.length) warnings.push(`${where}: sem tags`);
    if (question.kind === "saída do programa" && !question.code?.trim()) {
      warnings.push(`${where}: tipo "${question.kind}" sem código`);
    }

    const normalizedOptions = question.options.map((option) => normalizeOption(option.text));
    if (new Set(normalizedOptions).size !== labels.length) {
      hardIssues.push(`${where}: alternativas repetidas ou equivalentes`);
    }

    for (const option of question.options) {
      if (!labels.includes(option.label)) hardIssues.push(`${where}: alternativa com rótulo inválido ${option.label}`);
      checkText(`${where} alternativa ${option.label}`, option.text);
      if (normalize(option.text).length < 2 && !isShortButValidOption(option.text)) {
        hardIssues.push(`${where}: alternativa ${option.label} curta demais`);
      }
    }

    for (const label of Object.keys(question.wrongAnswerNotes ?? {})) {
      if (!labels.includes(label)) hardIssues.push(`${where}: nota de alternativa inválida ${label}`);
      if (label === question.correctAnswer) warnings.push(`${where}: nota cadastrada para a alternativa correta ${label}`);
    }

    const promptKey = normalize(`${question.prompt}\n${question.code ?? ""}`);
    questionPromptMap.set(promptKey, [...(questionPromptMap.get(promptKey) ?? []), question.id]);
  }

  for (const [prompt, ids] of questionPromptMap.entries()) {
    if (prompt && ids.length > 1) hardIssues.push(`questões com enunciado/código duplicado: ${ids.join(", ")}`);
  }

  for (const card of flashcards) {
    const where = `flashcard ${card.id}`;
    if (!chapterIds.has(card.chapter)) hardIssues.push(`${where}: conteúdo inexistente ${card.chapter}`);
    checkText(`${where} frente`, card.front);
    checkText(`${where} verso`, card.back);
    if (!card.theme.trim()) hardIssues.push(`${where}: tema vazio`);
    if (!card.tags.length) warnings.push(`${where}: sem tags`);
    const frontKey = normalize(`${card.chapter} ${card.front}`);
    flashcardFrontMap.set(frontKey, [...(flashcardFrontMap.get(frontKey) ?? []), card.id]);
  }

  for (const [front, ids] of flashcardFrontMap.entries()) {
    if (front && ids.length > 1) hardIssues.push(`flashcards duplicados: ${ids.join(", ")}`);
  }

  console.table(questionsByKind);
  console.log(`Conteúdos: ${studyChapters.length}; questões: ${questionBank.length}; flashcards: ${flashcards.length}.`);

  if (warnings.length) {
    console.warn("Avisos de qualidade:\n- " + warnings.join("\n- "));
  }

  if (hardIssues.length) {
    console.error("Falhas de qualidade:\n- " + hardIssues.join("\n- "));
    process.exitCode = 1;
  } else {
    console.log("Qualidade de conteúdo válida: alternativas, textos, referências e duplicações verificadas.");
  }
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
