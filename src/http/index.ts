import { STORAGE_KEYS, getFromStorage } from "@/utils";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";



const createAxiosInstance = (config: AxiosRequestConfig = {}): AxiosInstance => {
    const defaultConfig: Record<string, any> = {
        ...config,
        "headers": {
            "Accept":"application/json",
        },
        "withCredentials": false
    }

    const instance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        ...defaultConfig,
    });

    instance.interceptors.request.use(
        (config) => {
            const token = getFromStorage<string>(STORAGE_KEYS.TOKEN);

            if(token !== null) config.headers["Authorization"] = `Bearer ${token}`
          return config;
        },
        (error) => {
          // Handle request error
          return Promise.reject(error);
        }
    );

    return instance;
};

const http = createAxiosInstance();

export default http;