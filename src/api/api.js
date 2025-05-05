import axios from "axios";

// Axios configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const { res, status } = err || {};
    if (res && status === 401) localStorage.removeItem("token");
    return Promise.reject(err);
  }
);

export default api;
