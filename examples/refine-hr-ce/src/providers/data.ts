import {
  authHeaderMiddleware,
  createDataProvider,
  refreshTokenMiddleware,
} from "@refinedev/rest";

import { NestjsxCrudDataProviderOptions } from "@refinedev/nestjsx-crud";
import {
  ACCESS_TOKEN_KEY,
  BASE_URL,
  REFRESH_TOKEN_KEY,
  REFRESH_TOKEN_URL,
} from "@/utilities/constants";

export const dataProvider = createDataProvider(
  BASE_URL,
  NestjsxCrudDataProviderOptions,
  {
    hooks: {
      beforeRequest: [authHeaderMiddleware({ ACCESS_TOKEN_KEY })],
      afterResponse: [
        refreshTokenMiddleware({
          ACCESS_TOKEN_KEY,
          REFRESH_TOKEN_KEY,
          REFRESH_TOKEN_URL,
        }),
      ],
    },
  },
);
