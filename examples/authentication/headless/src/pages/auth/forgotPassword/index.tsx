import { AuthPage } from "@pankod/refine-core";
export const ForgotPasswordPage: React.FC = () => {
    return <AuthPage type="forgotPassword" backLink="/auth/login" />;
};
