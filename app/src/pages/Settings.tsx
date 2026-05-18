import { ThemeToggle } from "../components/ThemeToggle";
import type { UserProgress } from "../types/progress";

type SettingsProps = {
  progress: UserProgress;
  onThemeChange: (theme: UserProgress["theme"]) => void;
  onResetProgress: () => void;
};

export const Settings = ({ progress, onThemeChange, onResetProgress }: SettingsProps) => (
  <main className="page">
    <header className="page-header">
      <p className="quiet-label">Configurações</p>
      <h1>Ajustes do estudo</h1>
      <p>Tema e progresso ficam salvos apenas neste navegador.</p>
    </header>

    <section className="section-block settings-row">
      <div>
        <h2>Tema</h2>
        <p>Alterne entre modo claro e escuro.</p>
      </div>
      <ThemeToggle theme={progress.theme} onChange={onThemeChange} />
    </section>

    <section className="section-block">
      <h2>Progresso local</h2>
      <p>
        Lições concluídas: <strong>{progress.completedLessons.length}</strong>
      </p>
      <p>
        Favoritos: <strong>{progress.favoriteLessons.length}</strong>
      </p>
      <button className="secondary-button" type="button" onClick={onResetProgress}>
        Reiniciar progresso
      </button>
    </section>
  </main>
);
