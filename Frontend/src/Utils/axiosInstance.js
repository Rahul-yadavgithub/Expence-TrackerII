import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 100000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    withCredentials: true,
});

// Attach token to each request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle responses
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                window.location.href = "/login";
            } else if (error.response.status === 500) {
                console.log("Internal Server Error. Please try again later");
            }
        } else if (error.code === "ECONNABORTED") {
            console.log("A timeout has occurred. Please try again later");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
