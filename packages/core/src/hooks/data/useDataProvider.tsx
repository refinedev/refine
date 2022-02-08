import { useCallback, useContext } from "react";
import { DataContext } from "@contexts/data";
import {
    IDataContextProvider,
    IDataMultipleContextProvider,
} from "src/interfaces";

export const useDataProvider = (
    dataProviderName?: string,
): IDataContextProvider => {
    const handleDataProvider = useCallback(() => {
        if (dataProviderName) {
            return useContext<IDataMultipleContextProvider>(DataContext)[
                dataProviderName
            ];
        }

        return useContext<IDataMultipleContextProvider>(DataContext)
            .defaultProvider;
    }, [dataProviderName]);
    return handleDataProvider();
};
