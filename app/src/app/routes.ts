export type AppRoute =
  | "home"
  | "chapters"
  | "questions"
  | "mistakes"
  | "simulation"
  | "review"
  | "flashcards"
  | "practice"
  | "complexity"
  | "algorithms"
  | "more"
  | "visualizer";

export type AppLocation = { route: AppRoute; chapterId?: string };

const knownRoutes = new Set<AppRoute>([
  "home", "chapters", "questions", "mistakes", "simulation", "review",
  "flashcards", "practice", "complexity", "algorithms", "more", "visualizer",
]);

export const readLocation = (): AppLocation => {
  const [routePart, chapterId] = window.location.hash.replace(/^#\/?/, "").split("/");
  if (routePart === "chapter" && chapterId) return { route: "chapters", chapterId: decodeURIComponent(chapterId) };
  return knownRoutes.has(routePart as AppRoute) ? { route: routePart as AppRoute } : { route: "home" };
};

export const toHash = ({ route, chapterId }: AppLocation) =>
  chapterId ? "#/chapter/" + encodeURIComponent(chapterId) : route === "home" ? "#/" : "#/" + route;
