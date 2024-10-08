import { toast } from "react-toastify";
import { BASE_URL } from "../constants/urls.constant";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { authStore } from "@/lib/store/auth/authStore";
import Providers from "@/providers";
import { logout } from "@/lib/hooks/actions";

export function withAxiosInstance(axios: AxiosInstance) {
  async function requestGet<T>(url: string, config?: AxiosRequestConfig) {
    const result = await axios.get<T>(url, config);
    return result.data;
  }

  async function requestPost<T, K = unknown>(url: string, data: K, config?: AxiosRequestConfig) {
    const result = await axios.post<T>(url, data, config);
    return result.data;
  }

  async function requestPut<T, K = unknown>(url: string, data: K, config?: AxiosRequestConfig) {
    const result = await axios.put<T>(url, data, config);
    return result.data;
  }

  async function requestPatch<T, K = unknown>(url: string, data: K, config?: AxiosRequestConfig) {
    const result = await axios.patch<T>(url, data, config);
    return result.data;
  }

  async function requestDelete<T>(url: string, config?: AxiosRequestConfig) {
    const result = await axios.delete<T>(url, config);
    return result.data;
  }

  return {
    get: requestGet,
    post: requestPost,
    put: requestPut,
    patch: requestPatch,
    delete: requestDelete,
  };
}

const defaultInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

const protectedInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

protectedInstance.interceptors.request.use((config) => {
  const TOKEN = authStore.getState().token;
  const token = TOKEN ? `Bearer ${TOKEN}` : "";
  config.headers.Authorization = token;
  return config;
});

protectedInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error?.response?.status === 401) {
      authStore.getState().logout();
      toast.error("لطفا وارد حساب کاربری خود شوید");
      Providers.queryClient.clear();
      await logout("/login");
      return { data: {} };
    }

    if (error?.response?.status === 403) {
      toast.error("دسترسی غیرمجاز");
      logout("/");
      return { data: {} };
    }

    throw error;
  }
);

const apiProtected = withAxiosInstance(protectedInstance);

const api = {
  ...withAxiosInstance(defaultInstance),
  protected: apiProtected,
};

export default api;
