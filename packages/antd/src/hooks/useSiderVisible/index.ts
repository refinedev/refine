import { useContext } from "react";

import { ThemedLayoutContext } from "@contexts";
import { IThemedLayoutContext } from "@contexts/themedLayoutContext/IThemedLayoutContext";

export type UseSiderVisibleType = IThemedLayoutContext & {
    /** @deprecated Please use `siderCollapsed` instead. */
    siderVisible: boolean;
    /** @deprecated Please use `mobileSiderOpen` instead. */
    drawerSiderVisible: boolean;
    /** @deprecated Please use `setSiderCollapsed` instead. */
    setSiderVisible?: (visible: boolean) => void;
    /** @deprecated Please use `setMobileSiderOpen` instead. */
    setDrawerSiderVisible?: (visible: boolean) => void;
};

export const useSiderVisible = (): UseSiderVisibleType => {
    const {
        mobileSiderOpen,
        siderCollapsed,
        setMobileSiderOpen,
        setSiderCollapsed,
    } = useContext(ThemedLayoutContext);

    return {
        siderVisible: mobileSiderOpen,
        setSiderVisible: setMobileSiderOpen,
        drawerSiderVisible: siderCollapsed,
        setDrawerSiderVisible: setSiderCollapsed,
        mobileSiderOpen,
        siderCollapsed,
        setMobileSiderOpen,
        setSiderCollapsed,
    };
};
