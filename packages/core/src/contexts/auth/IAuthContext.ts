export interface IAuthContext {
    login: (params: any) => Promise<any>;
    logout: (params?: any) => Promise<void | false | string>;
    checkAuth: (params?: any) => Promise<void>;
    checkError: (error: any) => Promise<void>;
    getPermissions: (params?: any) => Promise<any>;
    getUserIdentity?: () => Promise<any>;
    isProvided?: boolean;
    [key: string]: any;
}
