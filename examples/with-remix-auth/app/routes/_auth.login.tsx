import { AuthPage } from "@refinedev/antd";

export default function Login() {
    return (
        <AuthPage
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
}
