import { AuthPage } from "@pankod/refine-core";
export const ForgotPasswordPage: React.FC = () => {
    return (
        <AuthPage
            type="resetPassword"
            forgotLink="/auth/forgot-password"
            backLink="/auth/login"
        />
    );
};
