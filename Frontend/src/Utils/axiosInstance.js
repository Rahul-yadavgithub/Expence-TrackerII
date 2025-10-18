import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // ✅ Keep cookies enabled
});

// No need for Authorization header if backend reads req.cookies.token
// Remove interceptor entirely
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized: redirecting to login...");
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Internal Server Error. Please try again later");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("A timeout has occurred. Please try again later");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
