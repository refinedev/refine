import { AuthPage } from "@refinedev/antd";
import { ExtendedNextPage } from "./_app";

const Register: ExtendedNextPage = () => {
    return (
        <AuthPage
            type="register"
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
        />
    );
};

Register.noLayout = true;

export default Register;
