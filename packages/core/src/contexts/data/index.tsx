import React from "react";

import { IDataContext } from "../../interfaces";

const defaultDataProvider = (): IDataContext => {
    return {
        create: () => Promise.resolve({ data: { id: 1 } }),
        deleteOne: () => Promise.resolve({ data: { id: 1 } }),
        deleteMany: () => Promise.resolve({ data: [] }),
        getList: () => Promise.resolve({ data: [], total: 0 }),
        getMany: () => Promise.resolve({ data: [] }),
        getOne: () => Promise.resolve({ data: { id: 1 } }),
        update: () => Promise.resolve({ data: { id: 1 } }),
        updateMany: () => Promise.resolve({ data: [] }),
        getApiUrl: () => "",
    };
};

export const DataContext = React.createContext<IDataContext>(
    defaultDataProvider(),
);

export const DataContextProvider: React.FC<IDataContext> = ({
    getList,
    getMany,
    create,
    getOne,
    update,
    updateMany,
    deleteOne,
    deleteMany,
    getApiUrl,
    children,
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
                deleteOne,
                deleteMany,
                getApiUrl,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
