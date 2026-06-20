import * as React from "react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
});

/** Read the current theme and the toggle/set helpers from the nearest provider. */
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

export interface ThemeProviderProps {
  /** Theme to start from (e.g. hydrated from a cookie on the server). */
  initialTheme?: Theme;
  /**
   * Called whenever the theme changes. Use this to persist the choice
   * (cookie, API, localStorage) — persistence is intentionally not built in
   * so the provider stays framework-agnostic.
   */
  onThemeChange?: (theme: Theme) => void;
  children: React.ReactNode;
}

/**
 * Toggles the `.dark` class on `<html>` and shares the current theme via
 * context. Bring your own persistence through `onThemeChange`.
 */
export function ThemeProvider({
  initialTheme = "light",
  onThemeChange,
  children,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  // Treat `initialTheme` as a live "controlled initial": when a parent
  // resolves it asynchronously (e.g. a "system"/OS-preference wrapper that
  // reads matchMedia after mount) and passes a new value, adopt it. A stable
  // prop — what most consumers pass — makes this a harmless no-op.
  useEffect(() => {
    setThemeState(initialTheme);
  }, [initialTheme]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      onThemeChange?.(next);
    },
    [onThemeChange],
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
