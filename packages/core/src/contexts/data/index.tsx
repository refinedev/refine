import React from "react";

import {
    IDataContextProvider,
    IDataMultipleContextProvider,
} from "../../interfaces";

export const defaultDataProvider = () => {
    return {
        default: {
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

type ProviderProps = React.PropsWithChildren & {
    dataProvider: IDataMultipleContextProvider | IDataContextProvider;
};

export const DataContextProvider: React.FC<ProviderProps> = ({
    children,
    dataProvider,
}) => {
    let dataProviders;
    if (!dataProvider.getList || !dataProvider.getOne) {
        dataProviders = dataProvider as IDataMultipleContextProvider;
    } else {
        dataProviders = {
            default: dataProvider,
        } as IDataMultipleContextProvider;
    }
    return (
        <DataContext.Provider value={dataProviders}>
            {children}
        </DataContext.Provider>
    );
};
