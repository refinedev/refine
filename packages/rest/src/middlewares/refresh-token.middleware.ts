import ky, { type Hooks } from "ky";
import type { FetchLike, WretchOptions } from "wretch/types";
import type { GlobalMiddleware } from "../data-provider/types";

type RefreshTokenMiddlewareOptions = {
  ACCESS_TOKEN_KEY: string;
  REFRESH_TOKEN_KEY: string;
  REFRESH_TOKEN_URL: string;
};

export const refreshTokenMiddleware =
  (
    refineOptions: RefreshTokenMiddlewareOptions,
  ): NonNullable<Hooks["afterResponse"]>[number] =>
  async (request, options, response) => {
    if (response.status === 401) {
      const currentRefreshToken = localStorage.getItem(
        refineOptions.REFRESH_TOKEN_KEY,
      );

      try {
        const data = await ky<{ token: string; refreshToken: string }>(
          refineOptions.REFRESH_TOKEN_URL,
          {
            method: "post",
            body: JSON.stringify({ refreshToken: currentRefreshToken }),
          },
        ).json();

        const accessToken = data.token;
        const refreshToken = data.refreshToken;

        localStorage.setItem(refineOptions.ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(refineOptions.REFRESH_TOKEN_KEY, refreshToken);

        request.headers.set("Authorization", `token ${accessToken}`);

        return ky(request);
      } catch (e) {
        return response;
      }
    }

    return response;
  };
