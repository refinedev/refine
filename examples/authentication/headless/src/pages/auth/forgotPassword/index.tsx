import { AuthPage } from "@pankod/refine-core";
export const ForgotPasswordPage: React.FC = () => {
    return <AuthPage type="resetPassword" backLink="/auth/login" />;
};
