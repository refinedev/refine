export type TLogoutVariables = {
    redirectPath?: string;
    [key: string]: any;
} | void;

export type TLogoutData = void | false | string;

export interface IAuthContext {
    login: (params: any) => Promise<any>;
    logout: (params: any) => Promise<TLogoutData>;
    checkAuth: (params?: any) => Promise<void>;
    checkError: (error: any) => Promise<void>;
    getPermissions: (params?: any) => Promise<any>;
    getUserIdentity?: () => Promise<any>;
    isProvided?: boolean;
    [key: string]: any;
}
