import { getData } from "@/services/axios";
import Cookies from "js-cookie";
import { createContext, FC, useEffect, useState } from "react";

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider: FC<TChildren> = ({ children }) => {
    const [auth, setAuth] = useState<IAuthState | null>(null)
    useEffect(() => {
        const getUserData = async () => {
            const token = Cookies.get("token");
            if (token) {
                const response = await getData("user");
                if (response.status === 200) {
                    const firstUser = response.data.find((user: IAuthState) => user.id === "1");
                    setAuth(firstUser);
                    console.log("again data fetch in AuthProvider", firstUser)
                }
            }
        }
        getUserData()
    }, [])


    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider