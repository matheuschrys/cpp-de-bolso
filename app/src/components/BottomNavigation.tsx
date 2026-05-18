import type { AppRoute } from "../app/App";

type BottomNavigationProps = {
  route: AppRoute;
  onNavigate: (route: AppRoute) => void;
};

const items: { route: AppRoute; label: string; icon: string }[] = [
  { route: "home", label: "Início", icon: "M4 5h16v14H4z M8 9h8 M8 13h5" },
  { route: "trail", label: "Trilha", icon: "M5 6h14M5 12h14M5 18h14" },
  { route: "review", label: "Revisão", icon: "M6 4h12v16l-6-3-6 3z" },
  { route: "glossary", label: "Glossário", icon: "M6 5h12M6 12h12M6 19h8" },
  { route: "settings", label: "Config", icon: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" },
];

export const BottomNavigation = ({ route, onNavigate }: BottomNavigationProps) => (
  <nav className="bottom-nav" aria-label="Navegação principal">
    {items.map((item) => (
      <button
        key={item.route}
        className={route === item.route ? "bottom-nav__item is-active" : "bottom-nav__item"}
        type="button"
        onClick={() => onNavigate(item.route)}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d={item.icon} />
        </svg>
        <span>{item.label}</span>
      </button>
    ))}
  </nav>
);
