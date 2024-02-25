import useRefreshToken from "./useRefreshToken";
import { useAuth } from "./useAuth";
import instance from "@/services/axios";
import Cookies from "js-cookie";
import { useEffect } from "react";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = instance.interceptors.request.use(
      (config) => {
        if (auth?.accessToken) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseIntercept = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          console.count("responseIntercept is running");
          originalRequest._retry = true;
          const newAccessToken = await refresh?.();
          Cookies.remove("accessToken"); //prevent to send invalid access token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestIntercept);
      instance.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return instance;
};

export default useAxiosPrivate;
