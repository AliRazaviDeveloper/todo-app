import axios, { AxiosError, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError) => {
    const errorResponse = error?.response;

    switch (errorResponse?.status) {
      case 401:
        localStorage.clear();
        break;
      case 403:
        break;
      default:
        break;
      // throw error;
    }

    return Promise.reject(error);
  }
);

export default api;
