import { AuthPage } from "@refinedev/antd";
import { ExtendedNextPage } from "./_app";

const Register: ExtendedNextPage = () => {
    return <AuthPage type="register" />;
};

Register.noLayout = true;

export default Register;
