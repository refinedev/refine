import { FrontendApi } from "@ory/client";
import { AUTH_SERVER_URL } from "./constants";

export const ory = new FrontendApi({
  isJsonMime: () => true,
  basePath: AUTH_SERVER_URL,
  baseOptions: {
    withCredentials: true,
  },
});
