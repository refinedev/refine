import React, { ReactNode, useState } from "react";

import { IThemedLayoutContext } from "./IThemedLayoutContext";

export const ThemedLayoutContext = React.createContext<IThemedLayoutContext>(
    {},
);

export const ThemedLayoutContextProvider: React.FC<{
    children: ReactNode;
    initialSiderCollapsed?: boolean;
}> = ({ children, initialSiderCollapsed }) => {
    const [siderVisible, setSiderVisible] = useState(false);
    const [drawerSiderVisible, setDrawerSiderVisible] = useState(
        typeof initialSiderCollapsed === "undefined"
            ? true
            : !initialSiderCollapsed,
    );

    return (
        <ThemedLayoutContext.Provider
            value={{
                siderVisible,
                drawerSiderVisible,
                setSiderVisible,
                setDrawerSiderVisible,
            }}
        >
            {children}
        </ThemedLayoutContext.Provider>
    );
};
