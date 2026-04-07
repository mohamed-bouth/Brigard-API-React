import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const headers = config.headers ?? {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  headers.Accept = "application/json";
  config.headers = headers;

  return config;
});

export default api;
