import type { AuthProvider } from "@refinedev/core";
import { Role, type Employee, type ResponseLogin } from "@/types";
import {
  ACCESS_TOKEN_KEY,
  BASE_URL,
  REFRESH_TOKEN_KEY,
} from "@/utilities/constants";

import kyBase from "ky";
import { authHeaderMiddleware } from "@refinedev/rest";

const ky = kyBase.create({
  prefixUrl: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const authProvider: AuthProvider = {
  login: async ({ email, redirectTo }) => {
    try {
      const { accessToken, refreshToken, user } = await ky<ResponseLogin>(
        "login",
        {
          method: "post",
          body: JSON.stringify({ email }),
        },
      ).json();

      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      return {
        success: true,
        redirectTo,
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
  register: async () => {
    throw new Error("Not implemented");
  },
  logout: async () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem("user");

    return {
      success: true,
      redirectTo: "/login",
    };
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
  getPermissions: async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      return {
        role: Role.EMPLOYEE,
      };
    }

    const parsedUser = JSON.parse(user);

    return {
      role: parsedUser.role,
    };
  },
  getIdentity: async () => {
    const identityKy = ky.extend({
      hooks: { beforeRequest: [authHeaderMiddleware({ ACCESS_TOKEN_KEY })] },
    });

    const user = await identityKy("me").json<Employee>();

    return user;
  },
};
