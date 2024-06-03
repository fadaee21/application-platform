import useRefreshToken from "./useRefreshToken";
import { useAuth } from "./useAuth";
import Cookies from "js-cookie";
import { useEffect } from "react";
import axiosPrivate from "@/services/axios";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (auth?.accessToken) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log({ error });
        const originalRequest = error?.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          console.count("first");
          originalRequest._retry = true;
          const newAccessToken = await refresh();
          console.log({ newAccessToken });
          Cookies.remove("accessToken");
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
