import type { ThemePreference } from "../types/progress";

type ThemeToggleProps = {
  theme: ThemePreference;
  onChange: (theme: ThemePreference) => void;
};

export const ThemeToggle = ({ theme, onChange }: ThemeToggleProps) => {
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      className="icon-button"
      type="button"
      onClick={() => onChange(nextTheme)}
      aria-label={`Alternar para modo ${nextTheme === "dark" ? "escuro" : "claro"}`}
      title={`Alternar para modo ${nextTheme === "dark" ? "escuro" : "claro"}`}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

const SunIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="button-icon">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
  </svg>
);

const MoonIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="button-icon">
    <path d="M20 14.5A7.5 7.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
  </svg>
);
