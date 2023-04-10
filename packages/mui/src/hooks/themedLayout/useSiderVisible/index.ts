import { useContext } from "react";
import { ThemedLayoutContext } from "@contexts/themedLayout";

export type UseSiderVisibleType = {
    siderVisible?: boolean;
    setSiderVisible?: (visible: boolean) => void;
    drawerSiderVisible?: boolean;
    setDrawerSiderVisible?: (visible: boolean) => void;
};

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
