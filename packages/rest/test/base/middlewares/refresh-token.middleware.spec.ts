import nock from "nock";
import { API_URL, createDataProvider } from "..";
import { authHeaderMiddleware } from "../../../src/middlewares/auth-header.middleware";
import { refreshTokenMiddleware } from "../../../src/middlewares/refresh-token.middleware";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

const CURRENT_TOKEN = "current-token";
const CURRENT_REFRESH_TOKEN = "current-refresh-token";

const NEW_TOKEN = "new-token";
const NEW_REFRESH_TOKEN = "new-refresh-token";

describe("auth", () => {
  const dataProvider = createDataProvider(API_URL, {
    middlewares: {
      global: [
        authHeaderMiddleware({ ACCESS_TOKEN_KEY }),
        refreshTokenMiddleware({ ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY }),
      ],
    },
  });

  it("should add Authorization header", async () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, CURRENT_TOKEN);
    localStorage.setItem(REFRESH_TOKEN_KEY, CURRENT_REFRESH_TOKEN);

    nock(API_URL)
      .matchHeader("Authorization", `Bearer ${CURRENT_TOKEN}`)
      .get("/posts")
      .reply(401, {});

    nock(API_URL)
      .post("/refresh-token", { refreshToken: CURRENT_REFRESH_TOKEN })
      .reply(200, { token: NEW_TOKEN, refreshToken: NEW_REFRESH_TOKEN });

    nock(API_URL)
      .matchHeader("Authorization", `Bearer ${NEW_TOKEN}`)
      .get("/posts")
      .reply(200, { records: [{ id: 1 }], totalCount: 1 });

    const result = await dataProvider.getList({ resource: "posts" });

    expect(localStorage.getItem(ACCESS_TOKEN_KEY)).toEqual(NEW_TOKEN);
    expect(localStorage.getItem(REFRESH_TOKEN_KEY)).toEqual(NEW_REFRESH_TOKEN);

    expect(result.data).toEqual([{ id: 1 }]);
    expect(result.total).toEqual(1);
  });
});
