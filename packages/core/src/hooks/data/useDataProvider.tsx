import { useCallback, useContext } from "react";
import { DataContext } from "@contexts/data";
import {
    IDataContextProvider,
    IDataMultipleContextProvider,
} from "src/interfaces";

export const useDataProvider = (): ((
    dataProviderName?: string,
) => IDataContextProvider) => {
    const context = useContext<IDataMultipleContextProvider>(DataContext);

    const handleDataProvider = useCallback(
        (dataProviderName?: string) => {
            if (dataProviderName) {
                return context[dataProviderName];
            }
            return context.defaultProvider;
        },
        [context],
    );

    return handleDataProvider;
};
