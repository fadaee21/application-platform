interface IThemeContext {
  isDark: boolean;
  toggleTheme: () => void;
}

type TChildren = {
  children: ReactNode;
};
interface IAuthState {
  name: string;
  username: string;
  role: string;
  isAuthorized: boolean;
}
interface IAuthContext{
  auth: IAuthState;
  setAuth: Dispatch<SetStateAction<IAuthState>>
}
