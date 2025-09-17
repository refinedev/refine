import { createDataProvider } from "../../..";
import { simpleRestDataProviderOptions } from "../simple-rest.options";

export const simpleRestDataProvider = createDataProvider(
  "https://api.fake-rest.refine.dev",
  simpleRestDataProviderOptions,
);
