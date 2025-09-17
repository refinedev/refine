import type { Options as KyOptions } from "ky";

import { createDataProvider } from "../../create-data-provider";
import { strapiV4DataProviderOptions } from "./strapi-v4.options";

type CreateStrapiV4DataProviderParams = {
  apiURL: string;
  kyOptions?: KyOptions;
};

export const createStrapiV4DataProvider = (
  params: CreateStrapiV4DataProviderParams,
) => {
  const { apiURL, kyOptions } = params;

  return createDataProvider(apiURL, strapiV4DataProviderOptions, kyOptions);
};
