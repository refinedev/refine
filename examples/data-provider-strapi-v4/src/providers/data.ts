import {
  authHeaderMiddleware,
  createDataProvider,
  strapiV4DataProviderOptions,
} from "@refinedev/rest";
import { API_URL, TOKEN_KEY } from "../constants";

export const dataProvider = createDataProvider(
  `${API_URL}/api`,
  strapiV4DataProviderOptions,
  {
    hooks: {
      beforeRequest: [authHeaderMiddleware({ ACCESS_TOKEN_KEY: TOKEN_KEY })],
    },
  },
);
