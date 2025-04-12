import axios from "axios";
import { getApiPath } from "../functions/helpers";

export const api = axios.create({
   baseURL: getApiPath() ,
});

api.interceptors.request.use((config) => {

   const token = localStorage.getItem("token");

   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }

   return config;
});
