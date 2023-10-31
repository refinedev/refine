import { AuthPage } from "@refinedev/antd";

export const initialValues = {
    email: "michael.scott@dundermifflin.com",
    password: "demodemo",
};

export default function Login() {
    return (
        <AuthPage
            type="login"
            formProps={{
                initialValues,
            }}
        />
    );
}

Login.noLayout = true;
