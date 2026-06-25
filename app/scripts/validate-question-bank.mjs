import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const esbuild = process.platform === "win32"
  ? join(root, "node_modules", ".bin", "esbuild.cmd")
  : join(root, "node_modules", ".bin", "esbuild");

if (!existsSync(esbuild)) {
  throw new Error("esbuild não foi encontrado. Execute npm install antes de validar o banco.");
}

const temporaryDirectory = mkdtempSync(join(tmpdir(), "cpp-question-bank-"));
const output = join(temporaryDirectory, "question-bank.mjs");

try {
  execFileSync(esbuild, ["src/data/questionBank.ts", "--bundle", "--platform=node", "--format=esm", `--outfile=${output}`, "--log-level=error"], { cwd: root, stdio: "inherit" });
  const { questionBank } = await import(`${pathToFileURL(output).href}?v=${Date.now()}`);
  const labels = ["A", "B", "C", "D", "E"];
  const ids = new Set();
  const duplicateContent = new Map();
  const issues = [];
  const byChapter = {};
  const byDifficulty = {};
  const byAnswer = Object.fromEntries(labels.map((label) => [label, 0]));

  for (const question of questionBank) {
    if (ids.has(question.id)) issues.push(`id duplicado: ${question.id}`);
    ids.add(question.id);
    byChapter[question.chapter] = (byChapter[question.chapter] ?? 0) + 1;
    byDifficulty[question.difficulty] = (byDifficulty[question.difficulty] ?? 0) + 1;
    byAnswer[question.correctAnswer] = (byAnswer[question.correctAnswer] ?? 0) + 1;

    if (!question.theme || !question.kind || !question.difficulty || !question.prompt || !question.explanation) {
      issues.push(`metadados incompletos: ${question.id}`);
    }
   if (question.options.length !== labels.length || new Set(question.options.map((option) => option.label)).size !== labels.length) {
     issues.push(`alternativas inválidas: ${question.id}`);
   }
    if (new Set(question.options.map((option) => option.text.trim().toLocaleLowerCase("pt-BR"))).size !== labels.length) {
      issues.push(`alternativas repetidas: ${question.id}`);
    }
    if (!question.options.some((option) => option.label === question.correctAnswer)) {
      issues.push(`gabarito inválido: ${question.id}`);
    }

    const key = `${question.prompt}\n${question.code ?? ""}`;
    duplicateContent.set(key, [...(duplicateContent.get(key) ?? []), question.id]);
  }

  const duplicateGroups = [...duplicateContent.values()].filter((group) => group.length > 1);
  if (duplicateGroups.length) issues.push(`questões duplicadas: ${duplicateGroups.map((group) => group.join(", ")).join(" | ")}`);
  const answerCounts = Object.values(byAnswer);
  if (Math.max(...answerCounts) - Math.min(...answerCounts) > 1) issues.push("gabarito desbalanceado entre A–E");

  console.table(byChapter);
  console.table(byDifficulty);
  console.table(byAnswer);
  console.log(`Total: ${questionBank.length} questões; ${Object.keys(byChapter).length} assuntos.`);

  if (issues.length) {
    console.error("Falhas na validação do banco:\n- " + issues.join("\n- "));
    process.exitCode = 1;
  } else {
    console.log("Banco de questões válido: ids, metadados, alternativas, gabarito e duplicações verificados.");
  }
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
