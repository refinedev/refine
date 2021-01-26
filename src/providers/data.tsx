import React from "react";

// import jsonServerDataProvider from "@dataProviders/jsonServer";

export interface DataContextProps {
    getList?: (resousrce: string, params: object) => Promise<any>;
}

export const DataContext = React.createContext<DataContextProps>({});

export const DataContextProvider: React.FC<DataContextProps> = ({
    getList,
    children,
}) => {
    return (
        <DataContext.Provider value={{ getList }}>
            {children}
        </DataContext.Provider>
    );
};
