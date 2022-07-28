import React from "react";

import { LayoutProps } from "../../../interfaces";

export const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
    return <div>{children}</div>;
};
