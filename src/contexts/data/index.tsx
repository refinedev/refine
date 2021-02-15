import React from "react";

import jsonServerDataProvider from "@dataProviders/jsonServer";

import { IDataContext } from "@interfaces";

export const DataContext = React.createContext<IDataContext>(
    jsonServerDataProvider("http://jsonplaceholder.typicode.com"),
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
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
