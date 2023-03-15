export interface IRole {
    name: string;
    description?: string;
}
export interface IUser {
    id: string;
    email: string;
    phone?: string;
    name: string;
    createdAt: string;
    roles: IRole[];
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
    meta?: any;
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

export interface IResourceConfigItem {
    name: string;
    meta: {
        auditLog: {
            permissions: string[];
        };
    };
}

export type IResourcesConfig = IResourceConfigItem[];

export interface IAuthConfigItem {
    name: string;
    type: string;
    disableSignup: boolean;
    url?: string;
}

export type IAuthConfig = IAuthConfigItem[];
