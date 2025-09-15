import { createDataProvider, simpleRestDataProviderOptions } from "../../src";

export const simpleRestDataProvider = createDataProvider(
  "https://api.fake-rest.refine.dev",
  simpleRestDataProviderOptions,
);
