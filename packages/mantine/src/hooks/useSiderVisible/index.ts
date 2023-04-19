import { useContext } from "react";

import { ThemedLayoutContext } from "@contexts";
import { IThemedLayoutContext } from "@contexts/themedLayoutContext/IThemedLayoutContext";

export type UseSiderVisibleType = IThemedLayoutContext;

export const useSiderVisible = (): UseSiderVisibleType => {
    const {
        siderVisible,
        setSiderVisible,
        drawerSiderVisible,
        setDrawerSiderVisible,
    } = useContext(ThemedLayoutContext);

    return {
        siderVisible,
        setSiderVisible,
        drawerSiderVisible,
        setDrawerSiderVisible,
    };
};
