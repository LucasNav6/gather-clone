import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";
import { LS_AUTH_JWT } from "../domain/localstorage";
import { API_BASE } from "../domain/api-url";

const REQUEST_TIMEOUT = 20000;

const ApiWithInterceptor = axios.create({
    baseURL: API_BASE,
});


ApiWithInterceptor.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(LS_AUTH_JWT);

    if (!config.headers) {
        config.headers = new AxiosHeaders();
    }

    if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
    }


    const controller = new AbortController();
    config.signal = controller.signal;

    setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    return config;
});


ApiWithInterceptor.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isCancel(error) || error.code === "ERR_CANCELED") {
            return Promise.reject(new Error("Request timed out"));
        }
        return Promise.reject(error);
    }
);

export default ApiWithInterceptor;
