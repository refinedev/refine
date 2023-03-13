import { AuthPage } from "@refinedev/antd";
import { ExtendedNextPage } from "./_app";

const Login: ExtendedNextPage = () => {
    return (
        <AuthPage
            type="login"
            formProps={{
                initialValues: {
                    email: "admin@refine.dev",
                    password: "password",
                },
            }}
        />
    );
};

Login.noLayout = true;

export default Login;
