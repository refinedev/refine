import { AuthPage } from "@refinedev/antd";
import { ExtendedNextPage } from "./_app";

const Login: ExtendedNextPage = () => {
    return <a href="/api/auth/login">Login</a>;
};

Login.noLayout = true;

export default Login;
