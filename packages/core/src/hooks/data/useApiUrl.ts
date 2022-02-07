import { useDataProvider } from "@hooks";

export const useApiUrl = (dataProviderName?: string): string => {
    const { getApiUrl } = useDataProvider(dataProviderName);

    return getApiUrl();
};
