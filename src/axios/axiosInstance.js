import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3003",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.log("No token found in localStorage");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
