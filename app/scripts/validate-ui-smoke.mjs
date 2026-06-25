import { mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

let chromium;

try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("Playwright não encontrado. Instale/prepare com: npx playwright install chromium");
  process.exit(1);
}

const baseUrl = process.env.UI_SMOKE_URL ?? "http://127.0.0.1:4173/";
const outputDir = join(tmpdir(), "cpp-de-bolso-ui-smoke");
mkdirSync(outputDir, { recursive: true });

const routes = [
  { hash: "#/", text: "Estude C++ para a prova com clareza.", name: "home" },
  { hash: "#/chapters", text: "Conteúdos para a prova.", name: "chapters" },
  { hash: "#/questions", text: "Questões com gabarito comentado", name: "questions" },
  { hash: "#/simulation", text: "Prova sem padrão previsível.", name: "simulation" },
  { hash: "#/review", text: "O que lembrar na véspera.", name: "review" },
  { hash: "#/flashcards", text: "Flashcards para lembrar sem decorar.", name: "flashcards" },
  { hash: "#/complexity", text: "Complexidade que dá para ver.", name: "complexity" },
  { hash: "#/algorithms", text: "Identifique o algoritmo.", name: "algorithms" },
  { hash: "#/visualizer", text: "Ponteiros em movimento.", name: "visualizer" },
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
const page = await context.newPage();
const consoleIssues = [];
const pageErrors = [];

page.on("console", (message) => {
  if (["error", "warning"].includes(message.type())) {
    consoleIssues.push(`${message.type()}: ${message.text()}`);
  }
});
page.on("pageerror", (error) => pageErrors.push(error.message));

const openRoute = async ({ hash, text, name }) => {
  await page.goto(baseUrl + hash, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.getByText(text, { exact: false }).first().waitFor({ timeout: 5000 });
  await page.screenshot({ path: join(outputDir, `${name}.png`), fullPage: false });
  console.log(`ok:${name}`);
};

const answerFirstVisibleQuestion = async () => {
  const firstQuestion = page.locator(".study-question").first();
  await firstQuestion.waitFor({ timeout: 5000 });
  await firstQuestion.locator(".question-option").first().click();
  await firstQuestion.locator(".answer-feedback").waitFor({ timeout: 5000 });
};

try {
  for (const route of routes) await openRoute(route);

  await page.goto(baseUrl + "#/questions", { waitUntil: "networkidle" });
  await page.getByLabel("Conteúdo").selectOption("filas");
  await page.getByPlaceholder("assunto, conceito ou tag").fill("fila");
  await page.getByText(/questões encontradas/i).waitFor({ timeout: 5000 });
  await answerFirstVisibleQuestion();
  await page.screenshot({ path: join(outputDir, "question-answered.png"), fullPage: false });
  console.log("ok:question-answer-feedback");

  await page.goto(baseUrl + "#/mistakes", { waitUntil: "networkidle" });
  await page.getByText("Refaça o que ainda confunde.", { exact: false }).waitFor({ timeout: 5000 });
  console.log("ok:mistakes-route");

  await page.goto(baseUrl + "#/flashcards", { waitUntil: "networkidle" });
  await page.getByLabel("Prioridade").selectOption("due");
  await page.getByText("Nenhum card neste recorte.", { exact: false })
    .or(page.getByText("Toque para virar", { exact: false }))
    .first()
    .waitFor({ timeout: 5000 });
  console.log("ok:flashcards-due-filter");

  await page.getByLabel("Prioridade").selectOption("all");
  await page.getByText("Toque para virar", { exact: false }).first().waitFor({ timeout: 5000 });
  await page.getByLabel(/Mostrar resposta/i).click();
  await page.getByText("Resposta", { exact: false }).first().waitFor({ timeout: 5000 });
  console.log("ok:flashcards-flip");

  await page.goto(baseUrl + "#/simulation", { waitUntil: "networkidle" });
  await page.getByLabel("Questões").selectOption("5");
  await page.getByRole("button", { name: "Gerar simulado" }).click();
  await page.locator(".study-question").first().waitFor({ timeout: 5000 });
  for (const card of await page.locator(".study-question").all()) {
    await card.locator(".question-option").first().click();
  }
  await page.getByText("Resultado do simulado", { exact: false }).waitFor({ timeout: 5000 });
  await page.getByRole("button", { name: "Novo simulado" }).waitFor({ timeout: 5000 });
  await page.screenshot({ path: join(outputDir, "simulation-result.png"), fullPage: false });
  console.log("ok:simulation-complete");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseUrl + "#/", { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.getByText("Estude C++ para a prova com clareza.", { exact: false }).first().waitFor({ timeout: 5000 });
  await page.screenshot({ path: join(outputDir, "home-mobile.png"), fullPage: false });
  console.log("ok:mobile-home");

  if (consoleIssues.length || pageErrors.length) {
    console.error(JSON.stringify({ consoleIssues, pageErrors }, null, 2));
    process.exitCode = 1;
  } else {
    console.log(`Smoke UI válido. Screenshots em: ${outputDir}`);
  }
} finally {
  await browser.close();
}
