import React from "react";

import { IComponentsContext } from "../../interfaces";

export const ComponentsContext = React.createContext<IComponentsContext>({
    components: <></>,
});

export const ComponentsContextProvider: React.FC<IComponentsContext> = ({
    children,
    components,
}) => {
    return (
        <ComponentsContext.Provider
            value={{
                components,
            }}
        >
            {children}
        </ComponentsContext.Provider>
    );
};
