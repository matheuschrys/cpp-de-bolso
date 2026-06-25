import type { AppRoute } from "../app/routes";

type Props = { route: AppRoute; onNavigate: (route: AppRoute) => void };
const items: { route: AppRoute; label: string; icon: string }[] = [
  { route: "home", label: "Início", icon: "M4 5h16v14H4z M8 9h8 M8 13h5" },
  { route: "chapters", label: "Conteúdos", icon: "M5 5h14v14H5z M8 9h8 M8 13h6" },
  { route: "simulation", label: "Simulado", icon: "M6 4h12v16l-6-3-6 3z M9 9h6" },
  { route: "review", label: "Revisão", icon: "M5 5h14v14H5z M8 9h8 M8 13h5" },
  { route: "more", label: "Mais", icon: "M6 12h.01 M12 12h.01 M18 12h.01" },
];

export const BottomNavigation = ({ route, onNavigate }: Props) => <nav className="bottom-nav" aria-label="Navegação móvel">{items.map((item) => <button key={item.route} className={route === item.route ? "is-active" : ""} type="button" onClick={() => onNavigate(item.route)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={item.icon} /></svg><span>{item.label}</span></button>)}</nav>;
