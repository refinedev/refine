export interface User {
    id: string;
    email: string;
    phone?: string;
    name: string;
    createdAt: string;
}

export interface Session {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface Resource {
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
    user?: {
        id: "string";
        email: "string";
    };
    author?: any;
    createdAt: "string";
}
