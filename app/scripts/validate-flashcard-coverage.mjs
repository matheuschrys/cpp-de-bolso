import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const esbuild = process.platform === "win32" ? join(root, "node_modules", ".bin", "esbuild.cmd") : join(root, "node_modules", ".bin", "esbuild");
if (!existsSync(esbuild)) throw new Error("esbuild não foi encontrado. Execute npm install antes da validação.");

const normalize = (value) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
const directory = mkdtempSync(join(tmpdir(), "cpp-flashcards-"));

try {
  execFileSync(esbuild, ["src/data/flashcards.ts", "src/data/studyChapters.ts", "--bundle", "--platform=node", "--format=esm", "--outdir=" + directory, "--log-level=error"], { cwd: root, stdio: "inherit" });
  const flashcardModule = await import(pathToFileURL(join(directory, "flashcards.js")).href + "?v=" + Date.now());
  const chapterModule = await import(pathToFileURL(join(directory, "studyChapters.js")).href + "?v=" + Date.now());
  const flashcards = flashcardModule.flashcards;
  const studyChapters = chapterModule.studyChapters;
  const chapterCounts = Object.fromEntries(studyChapters.map((chapter) => [chapter.id, 0]));
  const missingThemes = [];

  for (const card of flashcards) chapterCounts[card.chapter] = (chapterCounts[card.chapter] ?? 0) + 1;
  for (const chapter of studyChapters) {
    const chapterCards = flashcards.filter((card) => card.chapter === chapter.id);
    const corpus = normalize(chapterCards.flatMap((card) => [card.theme, card.front, card.back, ...card.tags]).join(" "));
    for (const theme of chapter.themes) {
      if (!corpus.includes(normalize(theme))) missingThemes.push(chapter.shortTitle + ": " + theme);
    }
  }

  console.table(chapterCounts);
  if (missingThemes.length) {
    console.error("Temas sem flashcard correspondente:\n- " + missingThemes.join("\n- "));
    process.exitCode = 1;
  } else {
    console.log("Cobertura válida: " + flashcards.length + " flashcards contemplam todos os temas cadastrados.");
  }
} finally {
  rmSync(directory, { recursive: true, force: true });
}
