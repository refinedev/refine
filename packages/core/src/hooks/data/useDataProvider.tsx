import { useCallback, useContext } from "react";
import { DataContext } from "@contexts/data";
import {
    IDataContextProvider,
    IDataMultipleContextProvider,
} from "src/interfaces";

// export const useDataProvider = (
//     dataProviderName?: string,
// ): IDataContextProvider => {
//     console.log("dataProviderName", dataProviderName);

//     try {
//         if (dataProviderName) {
//             return useContext<IDataMultipleContextProvider>(DataContext)[
//                 dataProviderName
//             ];
//         } else {
//             return useContext<IDataMultipleContextProvider>(DataContext)
//                 .defaultProvider;
//         }
//     } catch (error) {
//         throw new Error(
//             "useDataProvider: You must provide a dataProviderName if you use multiple dataProviders",
//         );
//     }
// };

export const useDataProvider = (
    dataProviderName?: string,
): IDataContextProvider => {
    console.log("dataProviderName", dataProviderName);

    const handleDataProvider = useCallback(() => {
        if (dataProviderName) {
            return useContext<IDataMultipleContextProvider>(DataContext)[
                dataProviderName
            ];
        } else {
            return useContext<IDataMultipleContextProvider>(DataContext)
                .defaultProvider;
        }
    }, [dataProviderName]);
    return handleDataProvider();
};
