import { getData } from "@/services/axios";
import { createContext, FC, useEffect, useState } from "react";

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider: FC<TChildren> = ({ children }) => {
  const [auth, setAuth] = useState<IAuthState>({
    id: "",
    name: "",
    username: "",
    role: "",
    isAuthorized: false,
  });
  useEffect(() => {
    const setUser = async () => {
      const response = await getData("user");
      if (response.status === 200) {
        setAuth(response.data.find((user: IAuthState) => user.id === "1"));
        console.log(response.data.find((user: IAuthState) => user.id === "1"));
      } else {
        //handleError
      }
    };
    setUser();
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
