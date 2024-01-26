import useObjectLocalStorage from "@/hooks/useObjectLocalStorage";
import { createContext, FC } from "react";

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider: FC<TChildren> = ({ children }) => {
    const [auth, setAuth] = useObjectLocalStorage("auth", {
        name: "",
        username: "",
        role: "",
        isAuthorized: false
    })

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider