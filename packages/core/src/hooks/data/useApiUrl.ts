import { useDataProvider, useResource } from "@hooks";

export const useApiUrl = (dataProviderName?: string): string => {
  const dataProvider = useDataProvider();
  const { resource } = useResource();

  const { getApiUrl } = dataProvider(
    dataProviderName ?? resource?.meta?.dataProviderName,
  );

  return getApiUrl();
};
