import type { FetchLike, WretchOptions } from "wretch/types";
import type { GlobalMiddleware } from "../data-provider/types";

type AuthHeaderMiddlewareOptions = {
  ACCESS_TOKEN_KEY: string;
};

export const authHeaderMiddleware =
  (options: AuthHeaderMiddlewareOptions): GlobalMiddleware =>
  (_wretch) =>
  (next: FetchLike) =>
  async (url: string, opts: WretchOptions) => {
    const token = localStorage.getItem(options.ACCESS_TOKEN_KEY);

    opts.headers = {
      ...opts.headers,
      Authorization: `Bearer ${token}`,
    };
    return next(url, opts);
  };
