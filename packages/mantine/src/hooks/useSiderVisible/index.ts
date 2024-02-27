import { useContext } from "react";

import { ThemedLayoutContext } from "@contexts";

export type UseSiderVisibleType = {
  siderVisible: boolean;
  drawerSiderVisible: boolean;
  setSiderVisible: (visible: boolean) => void;
  setDrawerSiderVisible: (visible: boolean) => void;
};

/**
 * @deprecated Please use `useThemedLayoutContext` instead.
 */
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
  };
};
