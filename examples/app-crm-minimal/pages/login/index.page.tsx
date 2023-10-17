import { AuthPage } from "@refinedev/antd";
import { demoCredentials } from "@providers";

export default function Login() {
    return (
        <AuthPage
            type="login"
            formProps={{
                initialValues: demoCredentials,
            }}
        />
    );
}

Login.noLayout = true;
