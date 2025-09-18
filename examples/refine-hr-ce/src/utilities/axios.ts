import axios, { type AxiosRequestConfig, type AxiosError } from "axios";
import {
  ACCESS_TOKEN_KEY,
  BASE_URL,
  REFRESH_TOKEN_KEY,
} from "@/utilities/constants";
import type { ResponseLogin } from "@/types";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken && config?.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry: boolean;
    };

    if (error.status === 401 && !originalRequest?._retry) {
      const tokens = await refreshTokens();
      if (!tokens) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  },
);

export const refreshTokens = async () => {
  const currentRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!currentRefreshToken) return null;

  try {
    const response = await axiosInstance.post<ResponseLogin>("/refresh-token", {
      refreshToken: currentRefreshToken,
    });
    const data = response.data;

    localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  } catch (error) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem("user");
    return null;
  }
};
