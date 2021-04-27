export interface ILoginResponse {
    jwt: string;
    user: {
        id: number | string;
        username: string;
    };
}
