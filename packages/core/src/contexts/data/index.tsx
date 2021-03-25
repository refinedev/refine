import React from "react";

import jsonServerDataProvider from "@dataProviders/jsonServer";

import { IDataContext } from "@interfaces";

const defaultApiUrl = "https://readmin-fake-rest.pankod.com";

export const DataContext = React.createContext<IDataContext>(
    jsonServerDataProvider(defaultApiUrl),
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
