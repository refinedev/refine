import React from "react";

import { IRbacContext } from "./IRbacContext";

export const RbacContext = React.createContext<IRbacContext>({
    can: () => true,
});

export const RbacContextProvider: React.FC<IRbacContext> = ({
    can,
    children,
}) => {
    return (
        <RbacContext.Provider value={{ can }}>{children}</RbacContext.Provider>
    );
};
