import React from "react";

import { IDataContext, IDataContextProvider } from "../../interfaces";

export const defaultDataProvider = () => {
    return {
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
    };
};

export const DataContext = React.createContext<IDataContext>(
    defaultDataProvider() as IDataContext,
);
export const DataContextProvider: React.FC<IDataContextProvider> = ({
    getList,
    getMany,
    create,
    createMany,
    getOne,
    update,
    updateMany,
    deleteOne,
    deleteMany,
    getApiUrl,
    children,
    custom = (defaultDataProvider() as IDataContext).custom,
}) => {
    return (
        <DataContext.Provider
            value={{
                getList,
                getOne,
                getMany,
                update,
                updateMany,
                create,
                createMany,
                deleteOne,
                deleteMany,
                getApiUrl,
                custom,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
