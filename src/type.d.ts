interface IThemeContext {
  isDark: boolean;
  toggleTheme: () => void;
}

interface IThemeProviderProps {
  children: ReactNode;
}
