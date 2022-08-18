import { AuthPage } from "@pankod/refine-core";
export const RegisterPage: React.FC = () => {
    return <AuthPage type="register" loginLink="/auth/login" />;
};
