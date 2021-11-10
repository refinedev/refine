import React from "react";

import { IRbacContext, IRbacProvider } from "./IRbacContext";

export const RbacContext = React.createContext<IRbacContext>({
    can: () => true,
});

export const RbacContextProvider: React.FC<IRbacProvider> = ({
    can = () => true,
    children,
}) => {
    return (
        <RbacContext.Provider value={{ can }}>{children}</RbacContext.Provider>
    );
};
