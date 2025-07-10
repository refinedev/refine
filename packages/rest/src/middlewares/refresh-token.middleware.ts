import type { FetchLike, WretchOptions } from "wretch/types";
import type { GlobalMiddleware } from "../data-provider/types";

type RefreshTokenMiddlewareOptions = {
  ACCESS_TOKEN_KEY: string;
  REFRESH_TOKEN_KEY: string;
};

export const refreshTokenMiddleware =
  (options: RefreshTokenMiddlewareOptions): GlobalMiddleware =>
  (wretch) =>
  (next: FetchLike) =>
  async (url: string, opts: WretchOptions) => {
    const response = await next(url, opts);

    if (response.status === 401) {
      const currentRefreshToken = localStorage.getItem(
        options.REFRESH_TOKEN_KEY,
      );

      try {
        const response = await wretch
          .url("/refresh-token")
          .post({
            refreshToken: currentRefreshToken,
          })
          .res();

        const data = await response.json();

        const accessToken = data.token;
        const refreshToken = data.refreshToken;

        localStorage.setItem(options.ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(options.REFRESH_TOKEN_KEY, refreshToken);

        opts.headers = {
          ...opts.headers,
          Authorization: `Bearer ${accessToken}`,
        };

        return next(url, opts);
      } catch (e) {
        return response;
      }
    }

    return response;
  };
