import React, { PropsWithChildren } from "react";
import { CompanyList } from "../components";

export const CompanyListPage: React.FC<PropsWithChildren> = ({ children }) => {
    return <CompanyList>{children}</CompanyList>;
};
