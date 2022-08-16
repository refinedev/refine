export type TLogoutData = void | false | string;
export type TLoginData = void | false | string | object;

export interface AuthProvider {
    login: (params: any) => Promise<TLoginData>;
    logout: (params: any) => Promise<TLogoutData>;
    checkAuth: (params?: any) => Promise<any>;
    checkError: (error: any) => Promise<void>;
    getPermissions: (params?: any) => Promise<any>;
    getUserIdentity?: (params?: any) => Promise<any>;
}

export interface IAuthContext extends Partial<AuthProvider> {
    isProvided?: boolean;
}
