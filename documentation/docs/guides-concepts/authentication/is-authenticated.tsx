import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function IsAuthentcated() {
    return (
        <Sandpack
            dependencies={{
                "@refinedev/core": "latest",
                axios: "^0.26.1",
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
                "/login-page.tsx": {
                    code: LoginPageTsxCode,
                    hidden: false,
                    active: true,
                },
                "/auth-provider.ts": {
                    code: AuthProviderCode,
                    hidden: false,
                },
                "/data-provider.ts": {
                    code: DataProviderCode,
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

const API_URL = "https://api.fake-rest.refine.dev";


export default function App() {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            authProvider={authProvider}
        >
            <HomePage />
        </Refine>
    );
}

`.trim();

const AuthProviderCode = `
import React from "react";
import { AuthBindings } from "@refinedev/core";


// to keep the example short and simple, we didn't send a request, and we save the token in localStorage.
// in real world, you should send a request and token should save in more secure place.
export const authProvider: AuthBindings = {
    login: async ({ email }) => {
        // to keep the example short and simple, we didn't send a request, and we save the token in localStorage.
        // in real world, you should send a request and token should save in more secure place.
        localStorage.setItem("token", email);

        return {
            success: true,
        };
    },
    check: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return {
                authenticated: false,
            };
        }

        return {
            authenticated: true,
        };
    },
    logout: async () => {
        localStorage.removeItem("token");
        return {
            success: true,
        };
    },
    getIdentity: async () => {
        const token = localStorage.getItem("token");
        return {
            user: token,
        };
    },
    register: async () => {
        throw new Error("Not implemented");
    },
    onError: async () => {
        throw new Error("Not implemented");
    },
};
`.trim();

const DataProviderCode = `
import React from "react";
import { DataProvider } from "@refinedev/core";

export const dataProvider = (url: string): DataProvider => ({
    getList: async () => {
        throw new Error("Not implemented");
    },
    getOne: async () => {
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

const LoginPageTsxCode = `
import React from "react";
import { useLogin } from "@refinedev/core";

export const LoginPage = () => {
    const [formData, setFormData] = React.useState({ email: "" });

    const { mutate: login } = useLogin();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(formData);
        setFormData({ email: "" });
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <input
                    type="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                        }))
                    }
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

`.trim();

const HomePageTsxCode = `
import React from "react";
import { useIsAuthenticated, useGetIdentity, useLogout } from "@refinedev/core";
import { LoginPage } from "./login-page.tsx";

export const HomePage = () => {
    const { data: authenticated } = useIsAuthenticated();
    const { data: identity } = useGetIdentity<{ user: string }>();
    const { mutate: logout } = useLogout();

    if (authenticated?.authenticated) {
        return (
            <div>
                <h1>Hello,  {identity?.user}</h1>
                <button onClick={() => logout()}>Logout</button>
            </div>
        );
    }

    return <LoginPage />;
};


`.trim();
