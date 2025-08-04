import adminApi from "@/lib/config";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";

export const useAxiosPrivate = () => {
  const { logout } = useAuthStore();

  useEffect(() => {
    // The Auth Interceptor is already configured in the admin api
    // we just need to handle the logout on 401 erros if needed

    const responseIntercept = adminApi.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          logout();

          // redirect to login
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );

    return () => {
      adminApi.interceptors.response.eject(responseIntercept);
    };
  }, [logout]);

  return adminApi;
};
