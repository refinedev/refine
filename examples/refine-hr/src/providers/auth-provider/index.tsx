import type { AuthProvider } from "@refinedev/core";
import { axiosInstance } from "@/utilities/axios";
import type { Employee, ResponseLogin } from "@/types";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/utilities/constants";

export const authProvider: AuthProvider = {
  login: async ({ email }) => {
    try {
      const response = await axiosInstance.post<ResponseLogin>("/login", {
        email,
      });
      const data = response.data;

      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      return {
        success: true,
        redirectTo: "/",
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: "Login failed",
          name: "Invalid email or password",
        },
      };
    }
  },
  register: async (params) => {
    throw new Error("Not implemented");
  },
  logout: async () => {
    throw new Error("Not implemented");
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
  check: async () =>
    localStorage.getItem(ACCESS_TOKEN_KEY)
      ? {
          authenticated: true,
        }
      : {
          authenticated: false,
          error: {
            message: "Check failed",
            name: "Not authenticated",
          },
          logout: true,
          redirectTo: "/login",
        },
  getPermissions: async () => ["admin"],
  getIdentity: async () => {
    const response = await axiosInstance.get<Employee>("/me");
    const data = response?.data;

    return data;
  },
};
