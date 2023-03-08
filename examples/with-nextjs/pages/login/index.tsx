import { AuthPage } from "@refinedev/antd";

export default function Login() {
    return (
        <AuthPage
            type="login"
            formProps={{
                initialValues: {
                    email: "admin@refine.dev",
                    password: "admin",
                },
            }}
        />
    );
}

Login.layout = "auth";
