import { TOKEN_KEY } from "@/constants";
import { axiosInstance as strapiAxiosInstance } from "@refinedev/strapi-v4";

export const axiosInstance = strapiAxiosInstance;

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});
