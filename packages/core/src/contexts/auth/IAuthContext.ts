import {
    RefineForgotPasswordFormTypes,
    RefineLoginFormTypes,
    RefineRegisterFormTypes,
    RefineUpdatePasswordFormTypes,
} from "@pankod/refine-ui-types";

export type TLogoutData = void | false | string;
export type TLoginData = void | false | string | object;
export type TRegisterData = void | false | string;
export type TForgotPasswordData = void | false | string;
export type TUpdatePasswordData = void | false | string;

export interface AuthProvider {
    login: (params: RefineLoginFormTypes) => Promise<TLoginData>;
    register?: (params: RefineRegisterFormTypes) => Promise<TRegisterData>;
    forgotPassword?: (
        params: RefineForgotPasswordFormTypes,
    ) => Promise<TForgotPasswordData>;
    updatePassword?: (
        params: RefineUpdatePasswordFormTypes,
    ) => Promise<TUpdatePasswordData>;
    logout: (params: any) => Promise<TLogoutData>;
    checkAuth: (params?: any) => Promise<any>;
    checkError: (error: any) => Promise<void>;
    getPermissions: (params?: any) => Promise<any>;
    getUserIdentity?: (params?: any) => Promise<any>;
}

export interface IAuthContext extends Partial<AuthProvider> {
    isProvided?: boolean;
}
