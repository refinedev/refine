import { IAuthConfig, IResourcesConfig, ISession, IUser } from "@refinedev/sdk";
export const createClient = (): Client => {
    return new Client();
};

class Client {
    get auth(): Auth {
        return new Auth();
    }
    get config(): Config {
        return new Config();
    }
}

class Auth {
    login(): Promise<ISession> {
        return Promise.resolve({
            user: {
                id: "1",
                email: "test@mail.com",
                name: "John Doe",
                roles: [
                    {
                        name: "admin",
                        description: "Admin",
                    },
                ],
                createdAt: "2022-01-01",
            },
            accessToken: "*",
            refreshToken: "**",
        });
    }
    logout(): void {
        return;
    }
    session(): Promise<IUser> {
        return Promise.resolve({
            id: "1",
            email: "test@mail.com",
            name: "John Doe",
            roles: [
                {
                    name: "admin",
                    description: "Admin",
                },
            ],
            createdAt: "2022-01-01",
        });
    }
    getSessionFromUrl(): void {
        return;
    }
}

class Config {
    auth(): Promise<IAuthConfig> {
        return Promise.resolve([
            {
                disableSignup: false,
                name: "database",
                type: "database",
            },
        ]);
    }

    resources(): Promise<IResourcesConfig> {
        return Promise.resolve([
            {
                name: "posts",
                meta: {
                    auditLog: {
                        permissions: ["*"],
                    },
                },
            },
        ]);
    }
}

export { Client };
