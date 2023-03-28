import { AuthPage } from "@refinedev/antd";

import { ExtendedNextPage } from "./_app";

const Login: ExtendedNextPage = () => {
    return (
        <AuthPage
            type="login"
            providers={[
                {
                    name: "google",
                    label: "with Google",
                },
                {
                    name: "auth0",
                    label: "with Auth0",
                },
                {
                    name: "keycloak",
                    label: "with Keycloak",
                },
            ]}
            formProps={{
                initialValues: {
                    email: "demo@refine.dev",
                    password: "demodemo",
                },
            }}
        />
    );
};

Login.noLayout = true;

export default Login;
