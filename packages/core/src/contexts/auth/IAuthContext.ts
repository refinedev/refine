export type TLogoutData = void | false | string;
export type TLoginData = void | false | string;
export type TRegisterData = void | false | string;
export type TResetPasswordData = void | false | string;
export type TUpdatePasswordData = void | false | string;

export interface AuthProvider {
    login: (params: any) => Promise<TLoginData>;
    register?: (params: any) => Promise<TRegisterData>;
    resetPassword?: (params: any) => Promise<TResetPasswordData>;
    updatePassword?: (params: any) => Promise<TUpdatePasswordData>;
    logout: (params: any) => Promise<TLogoutData>;
    checkAuth: (params?: any) => Promise<void>;
    checkError: (error: any) => Promise<void>;
    getPermissions: (params?: any) => Promise<any>;
    getUserIdentity?: () => Promise<any>;
}

export interface IAuthContext extends Partial<AuthProvider> {
    isProvided?: boolean;
}
