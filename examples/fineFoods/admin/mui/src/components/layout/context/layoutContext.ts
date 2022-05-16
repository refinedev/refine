import React, { useContext } from "react";

type LayoutContextType = {
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LayoutContext = React.createContext({} as LayoutContextType);

export const useConfig = (): LayoutContextType => useContext(LayoutContext);
