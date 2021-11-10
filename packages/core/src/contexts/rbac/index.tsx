import React from "react";

import { IRbacContext } from "./IRbacContext";

export const defaultRbacContext: IRbacContext = {
    can: () => true,
};

export const RbacContext =
    React.createContext<IRbacContext>(defaultRbacContext);

export const RbacContextProvider: React.FC<IRbacContext> = ({
    can,
    children,
}) => {
    return (
        <RbacContext.Provider value={{ can }}>{children}</RbacContext.Provider>
    );
};
