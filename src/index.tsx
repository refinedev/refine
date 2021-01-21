import React from "react";
import "antd/dist/antd.css";

import { Layout } from "./components/layout/index";

export interface AdminProps {
    foo?: string;
}

export const Admin: React.FC<AdminProps> = ({ children }) => {
    return <Layout>{children}</Layout>;
};
