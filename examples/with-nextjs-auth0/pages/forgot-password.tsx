import { AuthPage } from "@refinedev/antd";
import { ExtendedNextPage } from "./_app";

const ForgotPassword: ExtendedNextPage = () => {
    return <AuthPage type="forgotPassword" />;
};

ForgotPassword.noLayout = true;

export default ForgotPassword;
