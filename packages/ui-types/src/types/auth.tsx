export type RefineAuthPageProps = {
    type?: "login" | "register" | "resetPassword" | "updatePassword";
    providers?: IProvider[];
    submitButton?: React.ReactNode;
    registerLink?: React.ReactNode;
    loginLink?: React.ReactNode;
    resetPasswordLink?: React.ReactNode;
    updatePasswordLink?: React.ReactNode;
    /**
     * @default false
     * @description when `type` is `login` show the remember me checkbox on login form
     * @optional
     * */

    remember?: boolean;
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
    remember?: boolean;
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
