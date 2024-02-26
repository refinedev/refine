import React, { ReactNode, useState } from "react";

import { IThemedLayoutContext } from "./IThemedLayoutContext";

export const ThemedLayoutContext = React.createContext<IThemedLayoutContext>({
  siderCollapsed: false,
  mobileSiderOpen: false,
  setSiderCollapsed: () => undefined,
  setMobileSiderOpen: () => undefined,
});

export const ThemedLayoutContextProvider: React.FC<{
  children: ReactNode;
  initialSiderCollapsed?: boolean;
}> = ({ children, initialSiderCollapsed }) => {
  const [siderCollapsed, setSiderCollapsed] = useState(
    initialSiderCollapsed ?? false,
  );
  const [mobileSiderOpen, setMobileSiderOpen] = useState(false);

  return (
    <ThemedLayoutContext.Provider
      value={{
        siderCollapsed,
        mobileSiderOpen,
        setSiderCollapsed,
        setMobileSiderOpen,
      }}
    >
      {children}
    </ThemedLayoutContext.Provider>
  );
};
