import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";
import { TutorialCreateFileButton } from "@site/src/refine-theme/tutorial-create-file-button";

import { dependencies } from "../intro/sandpack";
import { finalFiles as initialFiles } from "../protecting-content/sandpack";
import { removeActiveFromFiles } from "@site/src/utils/remove-active-from-files";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
    return (
        <TutorialSandpack
            dependencies={dependencies}
            files={initialFiles}
            finalFiles={finalFiles}
        >
            {children}
        </TutorialSandpack>
    );
};

// updates

const AuthProviderTsxWithLoginMethod = /* tsx */ `
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
    // login method receives an object with all the values you've provided to the useLogin hook.
    login: async ({ email, password }) => {
        const response = await fetch("https://api.fake-rest.refine.dev/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (data.token) {
            localStorage.setItem("my_access_token", data.token);
            return { success: true };
        }

        return { success: false };
    },
    check: async () => {
      const token = localStorage.getItem("my_access_token");
  
      return { authenticated: Boolean(token) };
    },
    logout: async () => { throw new Error("Not implemented"); },
    onError: async (error) => { throw new Error("Not implemented"); },
    // optional methods
    register: async (params) => { throw new Error("Not implemented"); },
    forgotPassword: async (params) => { throw new Error("Not implemented"); },
    updatePassword: async (params) => { throw new Error("Not implemented"); },
    getIdentity: async () => { throw new Error("Not implemented"); },
    getPermissions: async () => { throw new Error("Not implemented"); },
};
`.trim();

const LoginComponentBase = /* tsx */ `
import React from "react";

export const Login = () => {
    return (
        <div>
            <h1>Login</h1>
        </div>
    );
};
`.trim();

const AppTsxWithLoginComponent = /* tsx */ `
import { Refine, Authenticated } from "@refinedev/core";

import { dataProvider } from "./data-provider";
import { authProvider } from "./auth-provider";

import { ShowProduct } from "./show-product";
import { EditProduct } from "./edit-product";
import { ListProducts } from "./list-products";
import { CreateProduct } from "./create-product";

import { Login } from "./login";

export default function App(): JSX.Element {
  return (
    <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
      <Authenticated
        key="protected"
        fallback={<Login />}
      >
        {/* <ShowProduct /> */}
        {/* <EditProduct /> */}
        <ListProducts />
        {/* <CreateProduct /> */}
      </Authenticated>
    </Refine>
  );
}
`.trim();

const LoginComponentWithUseLogin = /* tsx */ `
import React from "react";
import { useLogin } from "@refinedev/core";

export const Login = () => {
    const { mutate, isLoading } = useLogin();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Using FormData to get the form values and convert it to an object.
      const data = Object.fromEntries(new FormData(event.target).entries());
      // Calling mutate to submit with the data we've collected from the form.
      mutate(data);
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue="demo@demo.com"
                />

                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  defaultValue="demodemo"
                />

                {isLoading && <span>loading...</span>}
                <button
                    type="submit"
                    disabled={isLoading}
                >Submit</button>
            </form>
        </div>
    );
};
`.trim();

const AuthProviderTsxWithLogoutMethod = /* tsx */ `
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
    logout: async () => {
        localStorage.removeItem("my_access_token");
        return { success: true };
    },
    // login method receives an object with all the values you've provided to the useLogin hook.
    login: async ({ email, password }) => {
        const response = await fetch("https://api.fake-rest.refine.dev/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (data.token) {
            localStorage.setItem("my_access_token", data.token);
            return { success: true };
        }

        return { success: false };
    },
    check: async () => {
        const token = localStorage.getItem("my_access_token");

        return { authenticated: Boolean(token) };
    },
    onError: async (error) => { throw new Error("Not implemented"); },
    // optional methods
    register: async (params) => { throw new Error("Not implemented"); },
    forgotPassword: async (params) => { throw new Error("Not implemented"); },
    updatePassword: async (params) => { throw new Error("Not implemented"); },
    getIdentity: async () => { throw new Error("Not implemented"); },
    getPermissions: async () => { throw new Error("Not implemented"); },
};
`.trim();

const HeaderComponentBase = /* tsx */ `
import React from "react";

export const Header = () => {
    return (
      <>
        <h2>Welcome!</h2>
        <button type="button">
            Logout
        </button>
      </>
    );
};
`.trim();

const AppTsxWithHeaderComponent = /* tsx */ `
import { Refine, Authenticated } from "@refinedev/core";

import { dataProvider } from "./data-provider";
import { authProvider } from "./auth-provider";

import { ShowProduct } from "./show-product";
import { EditProduct } from "./edit-product";
import { ListProducts } from "./list-products";
import { CreateProduct } from "./create-product";

import { Login } from "./login";
import { Header } from "./header";

export default function App(): JSX.Element {
  return (
    <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
      <Authenticated
        key="protected"
        fallback={<Login />}
      >
        <Header />
        {/* <ShowProduct /> */}
        {/* <EditProduct /> */}
        <ListProducts />
        {/* <CreateProduct /> */}
      </Authenticated>
    </Refine>
  );
}
`.trim();

const HeaderComponentWithUseLogout = /* tsx */ `
import React from "react";
import { useLogout } from "@refinedev/core";

export const Header = () => {
  const { mutate, isLoading } = useLogout();

  return (
    <>
      <h2>Welcome!</h2>
      <button
        type="button"
        disabled={isLoading}
        onClick={mutate}
      >
        Logout
      </button>
    </>
  );
};
`.trim();

// actions

// logging-in-out actions

export const AddLoginMethodToAuthProvider = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile(
                    "/auth-provider.ts",
                    AuthProviderTsxWithLoginMethod,
                );
                sandpack.setActiveFile("/auth-provider.ts");
            }}
        />
    );
};

export const CreateLoginComponentFile = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialCreateFileButton
            onClick={() => {
                sandpack.addFile({
                    "/login.tsx": {
                        code: LoginComponentBase,
                    },
                });
                sandpack.openFile("/login.tsx");
                sandpack.setActiveFile("/login.tsx");
            }}
            name="login.tsx"
        />
    );
};

export const AddLoginToAppTsx = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile("/App.tsx", AppTsxWithLoginComponent);
                sandpack.setActiveFile("/App.tsx");
            }}
        />
    );
};

export const AddUseLoginToLoginComponent = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile("/login.tsx", LoginComponentWithUseLogin);
                sandpack.setActiveFile("/login.tsx");
            }}
        />
    );
};

export const AddLogoutMethodToAuthProvider = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile(
                    "/auth-provider.ts",
                    AuthProviderTsxWithLogoutMethod,
                );
                sandpack.setActiveFile("/auth-provider.ts");
            }}
        />
    );
};

export const CreateHeaderComponentFile = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialCreateFileButton
            onClick={() => {
                sandpack.addFile({
                    "/header.tsx": {
                        code: HeaderComponentBase,
                    },
                });
                sandpack.openFile("/header.tsx");
                sandpack.setActiveFile("/header.tsx");
            }}
            name="header.tsx"
        />
    );
};

export const AddHeaderToAppTsx = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile("/App.tsx", AppTsxWithHeaderComponent);
                sandpack.setActiveFile("/App.tsx");
            }}
        />
    );
};

export const AddUseLogoutToHeaderComponent = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile(
                    "/header.tsx",
                    HeaderComponentWithUseLogout,
                );
                sandpack.setActiveFile("/header.tsx");
            }}
        />
    );
};

// files

export const finalFiles = {
    ...removeActiveFromFiles(initialFiles),
    "App.tsx": {
        code: AppTsxWithHeaderComponent,
    },
    "auth-provider.ts": {
        code: AuthProviderTsxWithLogoutMethod,
    },
    "login.tsx": {
        code: LoginComponentWithUseLogin,
    },
    "header.tsx": {
        code: HeaderComponentWithUseLogout,
        active: true,
    },
};
