export type TLogoutData = void | false | string;
export type TLoginData = void | false | string;

export interface IAuthContext {
    login?: (params: any) => Promise<TLoginData>;
    logout?: (params: any) => Promise<TLogoutData>;
    checkAuth?: (params?: any) => Promise<void>;
    checkError?: (error: any) => Promise<void>;
    getPermissions?: (params?: any) => Promise<any>;
    getUserIdentity?: () => Promise<any>;
    isProvided?: boolean;
    isAuthenticated?: boolean;
}

export type AuthProvider = Partial<
    Omit<IAuthContext, "isProvided" | "isAuthenticated">
> &
    Required<
        Pick<
            IAuthContext,
            "login" | "logout" | "checkAuth" | "checkError" | "getPermissions"
        >
    >;
