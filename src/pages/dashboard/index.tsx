import React from "react";
import { Link } from "react-router-dom";

import { Layout } from "@components";

export const DashboardPage: React.FC = () => {
    return (
        <Layout>
            <div>dashboard page</div>
            <Link to="/login">go to login</Link>
        </Layout>
    );
};
