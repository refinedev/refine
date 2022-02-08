import React from "react";

import { IDataMultipleContextProvider } from "../../interfaces";

export const defaultDataProvider = () => {
    return {
        defaultProvider: {
            create: () => Promise.resolve({ data: { id: 1 } }),
            createMany: () => Promise.resolve({ data: [] }),
            deleteOne: () => Promise.resolve({ data: { id: 1 } }),
            deleteMany: () => Promise.resolve({ data: [] }),
            getList: () => Promise.resolve({ data: [], total: 0 }),
            getMany: () => Promise.resolve({ data: [] }),
            getOne: () => Promise.resolve({ data: { id: 1 } }),
            update: () => Promise.resolve({ data: { id: 1 } }),
            updateMany: () => Promise.resolve({ data: [] }),
            custom: () => Promise.resolve({ data: {} }),
            getApiUrl: () => "",
        },
    };
};

export const DataContext = React.createContext<IDataMultipleContextProvider>(
    defaultDataProvider() as IDataMultipleContextProvider,
);

export const DataContextProvider: React.FC<IDataMultipleContextProvider> = ({
    children,
    ...rest
}) => {
    return <DataContext.Provider value={rest}>{children}</DataContext.Provider>;
};
