interface IThemeContext {
  theme: string;
  toggleTheme: () => void;
}

interface IThemeProviderProps {
  children: ReactNode;
}
