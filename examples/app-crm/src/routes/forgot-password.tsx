import React from "react";
import { AuthPage } from "@refinedev/antd";

import { Title } from "../components/title";

export const ForgotPasswordPage: React.FC = () => {
    return (
        <AuthPage type="forgotPassword" title={<Title collapsed={false} />} />
    );
};
