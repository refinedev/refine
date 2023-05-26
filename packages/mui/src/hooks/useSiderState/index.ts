import { useContext } from "react";

import { ThemedLayoutContext } from "../../contexts";
import { IThemedLayoutContext } from "../../contexts/themedLayoutContext/IThemedLayoutContext";

export type UseSiderStateType = IThemedLayoutContext;

export const useSiderState = (): UseSiderStateType => {
    const {
        mobileSiderOpen,
        siderCollapsed,
        setMobileSiderOpen,
        setSiderCollapsed,
    } = useContext(ThemedLayoutContext);

    return {
        mobileSiderOpen,
        siderCollapsed,
        setMobileSiderOpen,
        setSiderCollapsed,
    };
};
