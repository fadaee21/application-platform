interface IThemeContext {
  isDark: boolean;
  toggleTheme: () => void;
}

type TChildren = {
  children: ReactNode;
};
interface IAuthState {
  id?: string;
  name: string;
  username: string;
  role: string;
}
interface IAuthContext {
  auth: IAuthState | null;
  setAuth: Dispatch<SetStateAction<IAuthState>>;
}

