import { createDataProvider } from "@refinedev/rest";
import { NestjsxCrudDataProviderOptions } from "../src";

export const nestjsxTestDataProvider = createDataProvider(
  "https://api.nestjsx-crud.refine.dev",
  NestjsxCrudDataProviderOptions,
);
