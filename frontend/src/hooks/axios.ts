import axios from "axios";
import useAuthStore from "@/store/useAuthStaor";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().userToken;
        console.log(token && token.slice(0, 15));
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            return error.response;
        } else {
            return error;
        }
    }
);

export default axiosInstance;
