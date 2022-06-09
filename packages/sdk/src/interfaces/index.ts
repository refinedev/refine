export interface IUser {
    id: string;
    email: string;
    phone?: string;
    name: string;
    createdAt: string;
}

export interface ISession {
    user: IUser;
    accessToken: string;
    refreshToken: string;
}

export interface ILog {
    id: "string";
    application: {
        id: "string";
        name: "string";
    };
    data?: any;
    previousData?: any;
    resource: "string";
    action: "string";
    name: "string";
    author?: any;
    createdAt: "string";
}

export interface IResource {
    name: string;
    key: string;
    parentName?: string;
    options?: any;
    hasList: boolean;
    hasCreate: boolean;
    hasEdit: boolean;
    hasShow: boolean;
    hasDelete: boolean;
}

export interface IDraftResource {
    id: string;
    resources: IResource[];
    user: {
        id: string;
        name: string;
        email: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface IConfigItem {
    name: string;
    options: {
        auditLog: {
            permissions: string[];
        };
    };
}

export type IConfig = IConfigItem[];
