import type { ChapterId } from "../types/study";

const icons: Record<ChapterId, string> = {
  "17": "▤",
  "18": "“”",
  "20": "◇",
  "21": "±",
  listas: "↬",
  pilhas: "≡",
  filas: "⇄",
  "big-o": "↗",
  ordenacao: "⇅",
  busca: "⌕",
  ponteiros: "⌁",
};

export const chapterIcon = (id: ChapterId) => icons[id];
