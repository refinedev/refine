import React from "react";

import jsonServerDataProvider from "@dataProviders/jsonServer";

import { IDataContext } from "./IDataContext";

export { IDataContext };

export const DataContext = React.createContext<IDataContext>(
    jsonServerDataProvider("http://jsonplaceholder.typicode.com"),
);

export const DataContextProvider: React.FC<IDataContext> = ({
    getList,
    children,
}) => {
    return (
        <DataContext.Provider value={{ getList }}>
            {children}
        </DataContext.Provider>
    );
};
