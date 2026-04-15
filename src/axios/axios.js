import axios from "axios";
import { getApiPath } from "../functions/helpers";

export const api = axios.create({
   baseURL: getApiPath(),
});

api.interceptors.request.use((config) => {
   const token = localStorage.getItem("token");
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});

// If the server returns 401 (token expired / revoked), clear local auth state
// and redirect to sign-in so the user is never silently stuck.
api.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response?.status === 401) {
         localStorage.removeItem("token");
         localStorage.removeItem("user");
         // Hard redirect — avoids needing to import the Redux store here,
         // which would create a circular dependency.
         window.location.href = "/sign-in";
      }
      return Promise.reject(error);
   }
);
