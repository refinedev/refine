import React from "react";

import { LayoutProps } from "../../../contexts/refine/types";

export const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};
