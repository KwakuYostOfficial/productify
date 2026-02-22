import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import api from "../lib/axios";

const useAuthReq = () => {
  const { isSignedIn, isLoaded, getToken } = useAuth();

  //include the token to the req headers
  useEffect(() => {
    const interceptor = api.interceptors.request.use(async (config) => {
      if (isSignedIn) {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });
    return () => api.interceptors.request.eject(interceptor);
  }, [isSignedIn, getToken]);
  return { isSignedIn, isClerkLoader: isLoaded };
};

export default useAuthReq;
