export interface IAuthContext {
    login: (params: any) => Promise<any>;
    logout: (params: any) => Promise<void | false | string>;
    checkAuth: (params: any) => Promise<void>;
    checkError: (error: any) => Promise<void>;
    getPermissions: (params: any) => Promise<any>;
    getIdentity?: () => Promise<{
        id: string | number;
        fullName?: string;
        avatar?: string;
        [key: string]: any;
    }>;
    [key: string]: any;
}
