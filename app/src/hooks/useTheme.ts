import { useEffect } from "react";
import type { ThemePreference } from "../types/progress";

export const useTheme = (theme: ThemePreference) => {
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#10201b" : "#f6f8f4");
  }, [theme]);
};
