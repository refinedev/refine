export type TLogoutData = void | false | string;
export type TLoginData = void | false | string | object;
export type TRegisterData = void | false | string;
export type TForgotPasswordData = void | false | string;
export type TUpdatePasswordData = void | false | string;

/**
 * @deprecated `LegacyAuthProvider` is deprecated with refine@4, use `AuthBindings` instead, however, we still support `LegacyAuthProvider` for backward compatibility.
 */
export interface LegacyAuthProvider {
    login: (params: any) => Promise<TLoginData>;
    register?: (params: any) => Promise<TRegisterData>;
    forgotPassword?: (params: any) => Promise<TForgotPasswordData>;
    updatePassword?: (params: any) => Promise<TUpdatePasswordData>;
    logout: (params: any) => Promise<TLogoutData>;
    checkAuth: (params?: any) => Promise<any>;
    checkError: (error: any) => Promise<void>;
    getPermissions?: (params?: any) => Promise<any>;
    getUserIdentity?: (params?: any) => Promise<any>;
}

/**
 * @deprecated `IAuthContext` is deprecated with refine@4, use `AuthBindingsContext` instead, however, we still support `IAuthContext` for backward compatibility.
 */
export interface ILegacyAuthContext extends Partial<LegacyAuthProvider> {
    isProvided?: boolean;
}
