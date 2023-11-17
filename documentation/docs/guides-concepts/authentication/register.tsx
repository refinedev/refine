import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function Login() {
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
                "/register-page.tsx": {
                    code: RegisterPageTsxCode,
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

import { RegisterPage } from "./register-page.tsx";
import { dataProvider } from "./data-provider.ts";
import { authProvider } from "./auth-provider.ts";

const API_URL = "https://api.fake-rest.refine.dev";


export default function App() {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            authProvider={authProvider}
        >
            <RegisterPage />
        </Refine>
    );
}

`.trim();

const AuthProviderCode = `
import React from "react";
import { AuthBindings } from "@refinedev/core";

export const authProvider: AuthBindings = {
    register: async ({ email }) => {
        // to keep the example short and simple, we didn't send a request, and we save the token in localStorage.
        // in real world, you should send a request and token should be saved in more secure place.
        localStorage.setItem("token", email);

        return {
            success: true,
        };
    },
    login: async () => {
        throw new Error("Not implemented");
    },
    logout: async () => {
        throw new Error("Not implemented");
    },
    check: async () => {
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

const RegisterPageTsxCode = `
import React from "react";
import { useRegister } from "@refinedev/core";

export const RegisterPage = () => {
    const [formData, setFormData] = React.useState({ email: "" });

    const { mutate: register } = useRegister();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        register(formData);
        setFormData({ email: "" });
    };

    return (
        <div>
            <h1>Register</h1>
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
