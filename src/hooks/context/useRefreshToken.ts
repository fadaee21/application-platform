import { instanceRefresh } from "@/services/axios";
import { useAuth } from "./useAuth";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { getRole } from "@/helper/getRole";

const useRefreshToken = () => {
  const { setAuth, auth } = useAuth();
  const refreshToken = Cookies.get("refreshToken");
  if (!refreshToken) return;
  const refresh = async () => {
    console.log({ auth });
    console.log({ refreshToken });

    try {
      const response = await instanceRefresh.post("/auths/refresh", {
        refresh_token: refreshToken,
      });
      // console.log({ response });

      if (response.status === 200) {
        const accessToken = response.data.body.access_token;
        const refreshTokenNew = response.data.body.refresh_token;
        const userInfo = jwtDecode<MyJwtPayload>(accessToken); // decode your token
        const roles = getRole(userInfo.roles);
        setAuth(() => {
          return {
            user: "superuser", //TODO: it must comes from backend
            pwd: "",
            roles,
            accessToken: response.data.body.access_token,
          };
        });
        Cookies.set("refreshToken", refreshTokenNew, {
          path: "/",
          expires: 0.5,
          secure: true,
          sameSite: "strict",
        });
        return response.data.body.access_token;
      } else {
        console.error(`An error occurred: ${response.status}`);
        Cookies.remove("refreshToken");
        return;
      }
    } catch (error) {
      console.error(`An error occurred: ${error}`);
      Cookies.remove("refreshToken");
      return;
    }
  };

  return refresh;
};

export default useRefreshToken;
