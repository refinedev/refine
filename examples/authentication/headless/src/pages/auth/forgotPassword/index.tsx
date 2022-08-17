import { AuthPage } from "@pankod/refine-core";
export const ForgotPasswordPage: React.FC = () => {
    console.log("RegisterPage");

    return (
        <AuthPage
            type="forgot"
            forgotLink="/auth/forgot-password"
            backLink="/auth/login"
        />
    );
};
