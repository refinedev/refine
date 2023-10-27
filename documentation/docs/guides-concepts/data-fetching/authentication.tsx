import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function Authentication() {
    return (
        <Sandpack
            dependencies={{
                "@refinedev/core": "latest",
            }}
            startRoute="/"
            files={{
                "/App.tsx": {
                    code: AppTsxCode,
                    hidden: false,
                },
                "/home-page.tsx": {
                    code: HomePageTsxCode,
                    hidden: false,
                    active: true,
                },
                "/data-provider.ts": {
                    code: DataProviderCode,
                    hidden: false,
                },
                "/auth-provider.ts": {
                    code: AuthProviderCode,
                    hidden: false,
                },
            }}
        />
    );
}

const AppTsxCode = `
import React from "react";
import { Refine } from "@refinedev/core";

import { HomePage } from "./home-page.tsx";
import { dataProvider } from "./data-provider.ts";
import { authProvider } from "./auth-provider.ts";

const API_URL = "http://localhost:3001";


export default function App() {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            authProvider={authProvider(API_URL)}
        >
            <HomePage />
        </Refine>
    );
}

`.trim();

const AuthProviderCode = `
import React from "react";
import { AuthBindings } from "@refinedev/core";

export const authProvider = (url: string): AuthBindings => ({
    login: async ({ email, password }) => {
        const response = await fetch(\`\${url}\/login\`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        localStorage.setItem("token", data.token);

        return data;
    },

    check: async () => {
        const token = localStorage.getItem("token");
        return {
            authenticated: !!token,
            error: new Error("Unauthorized"),
        };
    },

    logout: async () => {
        localStorage.removeItem("token");
        return {
            success: true,
        };
    },

    onError: async () => {
        throw new Error("Not implemented");
    },
});
`.trim();

const DataProviderCode = `
import React from "react";
import { DataProvider } from "@refinedev/core";

const fetchWrapper = (url: string, options?: RequestInit) => {
    const token = localStorage.getItem("token");
    return fetch(url, {
        ...options,
        headers: {
            ...options?.headers,
            Authorization: \`Bearer \${token}\`,
        },
    });
};

export const dataProvider = (url: string): DataProvider => ({
    getList: async ({ resource }) => {
        const response = await fetchWrapper(\`\${url}\/\${resource}\`);
        const data = await response.json();

        return {
            data,
            total: data.length,
        };
    },

    getOne: async () => {
        throw new Error("Not implemented");
    },

    getMany: async () => {
        throw new Error("Not implemented");
    },

    create: async () => {
        throw new Error("Not implemented");
    },
    update: async () => {
        throw new Error("Not implemented");
    },
    deleteOne: async () => {
        throw new Error("Not implemented");
    },

    getApiUrl: () => url,
});
`.trim();

const HomePageTsxCode = `
import React from "react";
import {
    BaseKey,
    useList,
    useIsAuthenticated,
    useLogin,
    useLogout,
} from "@refinedev/core";

export const HomePage = () => {
    const { data: animalsData, isLoading: isLoadingAnimals } =
        useList<IAnimals>({
            resource: "animals",
        });
    const animals = animalsData?.data;

    const { data: authenticatedData, isLoading: isLoadingAuthentication } =
        useIsAuthenticated();
    const isAuthenticated = authenticatedData?.authenticated;

    const { mutate: login, isLoading: isLoadingLogin } = useLogin();
    const { mutate: logout } = useLogout();

    if (isLoadingAuthentication || isLoadingAnimals) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return (
            <div>
                <h4>You are not authenticated</h4>
                <button
                    disabled={isLoadingLogin}
                    onClick={() =>
                        login({ email: "refine@demo.com", password: "refine" })
                    }
                >
                    Login
                </button>
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => logout()}>Logout</button>
            <h4>Animals</h4>
            <ul>
                {animals?.map((animal) => (
                    <li key={animal.id}>
                        <p>Name: {animal.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

interface IAnimals {
    id: BaseKey;
    name: string;
    type: string;
}
`.trim();
