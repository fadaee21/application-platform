type Role = "SUPERUSER" | "ADMIN" | "USER";

interface SelectedOption {
  value: string;
  label: string;
}

type TChildren = {
  children: ReactNode;
};

interface IThemeContext {
  isDark: boolean;
  toggleTheme: () => void;
}

interface AuthContextType {
  auth: IAuth | null;
  setAuth: React.Dispatch<React.SetStateAction<IAuth | null>>;
  persist: boolean;
  setPersist: (value: boolean) => void;
}

interface IAuth {
  user: string;
  pwd: string;
  roles: Role[];
  accessToken: string;
}
type TAllowRoles = {
  allowedRoles: string[];
};

/*=========================================
                                            
              Responses

=========================================*/

type Sort = {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
};

type Pageable = {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

type ResponseBody<T> = {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  empty: boolean;
};

type ResponseData<T> = {
  timestamp: string;
  body: ResponseBody<T>;
  is_successful: boolean;
};

type User = {
  first_name: string;
  last_name: string;
  // birthDate: string;
  username: string;
  mobile: string;
  email: string;
  national_code: null | string;
};

/*=========================================
                                            
              packages

=========================================*/
interface MyJwtPayload extends JwtPayload {
  id: string | null;
  email: string | null;
  mobile: string | null;
  roles: Role[];
}
