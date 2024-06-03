import { useAuth } from "./useAuth";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { getRole } from "@/helper/getRole";
import { axiosInstance } from "@/services/axios";
import { useCallback } from "react";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refreshToken = Cookies.get("refreshToken");

  const refresh = useCallback(async () => {
    if (!refreshToken) return null;
    try {
      const response = await axiosInstance.post("/auths/refresh", {
        refresh_token: refreshToken,
      });
      const { access_token: accessToken } = response.data.body;
      const userInfo = jwtDecode<MyJwtPayload>(accessToken);
      const roles = getRole(userInfo.roles);
      setAuth({
        user: "superuser", //TODO: it must comes from backend
        pwd: "",
        roles,
        accessToken,
      });
      return accessToken;
    } catch (error) {
      Cookies.remove("refreshToken");
    }
  }, [refreshToken, setAuth]);

  return refresh;
};

export default useRefreshToken;
