import { AuthPage } from "@refinedev/antd";
import { ExtendedNextPage } from "./_app";

const UpdatePassword: ExtendedNextPage = () => {
    return <AuthPage type="updatePassword" />;
};

UpdatePassword.noLayout = true;

export default UpdatePassword;
