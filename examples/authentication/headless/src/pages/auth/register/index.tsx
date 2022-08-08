import { AuthPage } from "@pankod/refine-core";
export const RegisterPage: React.FC = () => {
    console.log("RegisterPage");

    return <AuthPage type="register" loginLink="/auth/login" />;
};
