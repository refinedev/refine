import { pickNotDeprecated } from "@definitions/index";
import { useDataProvider, useResource } from "@hooks";

export const useApiUrl = (dataProviderName?: string): string => {
  const dataProvider = useDataProvider();
  const { resource } = useResource();

  const { getApiUrl } = dataProvider(
    dataProviderName ??
      pickNotDeprecated(resource?.meta, resource?.options)?.dataProviderName,
  );

  return getApiUrl();
};
