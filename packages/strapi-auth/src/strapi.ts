export interface ILoginResponse {
    jwt: string;
    user: IUser;
}

export interface IRole {
    id: number | string;
    name: string;
    description: string;
    type: string;
}
export interface IUser {
    id: number | string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    role: IRole;
    created_at: string;
    updated_at: string;
}
