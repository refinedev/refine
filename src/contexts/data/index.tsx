import React from "react";

import jsonServerDataProvider from "@dataProviders/jsonServer";

import { IDataContext } from "@interfaces";

export const DataContext = React.createContext<IDataContext>(
    jsonServerDataProvider("http://jsonplaceholder.typicode.com")
);

export const DataContextProvider: React.FC<IDataContext> = ({
    getList,
    create,
    getOne,
    update,
    deleteOne,
    children
}) => {
    return (
        <DataContext.Provider
            value={{ getList, getOne, update, create, deleteOne }}
        >
            {children}
        </DataContext.Provider>
    );
};
