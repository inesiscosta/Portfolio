export type Theme = "light" | "dark" | undefined;

export interface ThemeContextInterface {
  theme: Theme;
  toggleTheme: () => void;
}
