import React from "react";

import {
    IDataContextProvider,
    IDataMultipleContextProvider,
} from "../../interfaces";

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

export const DataContextProvider: React.FC<
    IDataMultipleContextProvider | IDataContextProvider
> = ({ children, ...rest }) => {
    let dataProviders;

    if (!rest.hasOwnProperty("defaultProvider")) {
        dataProviders = {
            defaultProvider: rest,
        } as IDataMultipleContextProvider;
    } else {
        dataProviders = rest as IDataMultipleContextProvider;
    }
    return (
        <DataContext.Provider value={dataProviders}>
            {children}
        </DataContext.Provider>
    );
};
