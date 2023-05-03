import React, { ReactNode, useState } from "react";

import { IThemedLayoutContext } from "./IThemedLayoutContext";

export const ThemedLayoutContext = React.createContext<IThemedLayoutContext>({
    siderVisible: false,
    drawerSiderVisible: false,
});

export const ThemedLayoutContextProvider: React.FC<{
    children: ReactNode;
    initialSiderCollapsed?: boolean;
}> = ({ children, initialSiderCollapsed }) => {
    const [siderVisible, setSiderVisible] = useState(false);
    const [drawerSiderVisible, setDrawerSiderVisible] = useState(
        initialSiderCollapsed ?? false,
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
