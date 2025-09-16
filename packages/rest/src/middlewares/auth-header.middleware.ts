import type { Hooks } from "ky";

type AuthHeaderMiddlewareOptions = {
  ACCESS_TOKEN_KEY: string;
};

export const authHeaderMiddleware =
  (
    options: AuthHeaderMiddlewareOptions,
  ): NonNullable<Hooks["beforeRequest"]>[number] =>
  async (req) => {
    const token = localStorage.getItem(options.ACCESS_TOKEN_KEY);

    if (token) {
      req.headers.set("Authorization", `Bearer ${token}`);
    }
  };
