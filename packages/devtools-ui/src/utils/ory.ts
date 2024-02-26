import { FrontendApi } from "@ory/client";

const ORY_URL = "/api/.auth";

export const ory = new FrontendApi({
  isJsonMime: () => true,
  basePath: ORY_URL,
  baseOptions: {
    withCredentials: true,
  },
});
