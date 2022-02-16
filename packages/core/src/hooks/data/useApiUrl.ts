import { useDataProvider } from "@hooks";

export const useApiUrl = (dataProviderName?: string): string => {
    const dataProvider = useDataProvider();

    const { getApiUrl } = dataProvider(dataProviderName);

    return getApiUrl();
};
