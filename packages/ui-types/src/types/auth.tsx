export type RefineAuthPageProps = {
    type?: "login" | "register" | "resetPassword" | "updatePassword";
    providers?: IProvider[];
    submitButton?: React.ReactNode;
    registerLink?: React.ReactNode;
    loginLink?: React.ReactNode;
    resetPasswordLink?: React.ReactNode;
    updatePasswordLink?: React.ReactNode;
    /**
     * @description when `<AuthPage>` `type` is `login` show the remember me checkbox on login form
     * @optional
     * */
    rememberMe?: React.ReactNode;
};
export type IProvider = {
    name: string;
    icon?: React.ReactNode;
    label?: string;
};

export type RefineLoginPageProps = {
    providers?: IProvider[];
    submitButton?: React.ReactNode;
    registerLink?: React.ReactNode;
    resetPasswordLink?: React.ReactNode;
    rememberMe?: React.ReactNode;
};

export type RefineRegisterPageProps = {
    submitButton?: React.ReactNode;
    loginLink?: React.ReactNode;
};

export type RefineResetPasswordPageProps = {
    submitButton?: React.ReactNode;
    loginLink?: React.ReactNode;
};

export type RefineUpdatePasswordPageProps = {
    submitButton?: React.ReactNode;
};
