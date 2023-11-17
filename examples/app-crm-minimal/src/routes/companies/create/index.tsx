import React from "react";
import { CompanyList, CompanyCreateModal } from "../components";

export const CompanyCreatePage: React.FC = () => {
    return (
        <CompanyList>
            <CompanyCreateModal />
        </CompanyList>
    );
};
