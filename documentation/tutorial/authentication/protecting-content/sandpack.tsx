import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";
import { TutorialCreateFileButton } from "@site/src/refine-theme/tutorial-create-file-button";

import { dependencies, finalFiles as initialFiles } from "../intro/sandpack";

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

const AuthProviderTsxCode = /* tsx */ `
// TODO: change this
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
    login: async ({ email, password }) => { throw new Error("Not implemented"); },
    logout: async () => { throw new Error("Not implemented"); },
    check: async () => { throw new Error("Not implemented"); },
    onError: async (error) => { throw new Error("Not implemented"); },
    // optional methods
    register: async (params) => { throw new Error("Not implemented"); },
    forgotPassword: async (params) => { throw new Error("Not implemented"); },
    updatePassword: async (params) => { throw new Error("Not implemented"); },
    getIdentity: async () => { throw new Error("Not implemented"); },
    getPermissions: async () => { throw new Error("Not implemented"); },
};
`.trim();

const AppTsxWithAuthProvider = /* tsx */ `
import { Refine } from "@refinedev/core";

import { dataProvider } from "./data-provider";
import { authProvider } from "./auth-provider";

import { ShowProduct } from "./show-product";
import { EditProduct } from "./edit-product";
import { ListProducts } from "./list-products";
import { CreateProduct } from "./create-product";

export default function App(): JSX.Element {
  return (
    <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
      {/* <ShowProduct /> */}
      {/* <EditProduct /> */}
      <ListProducts />
      {/* <CreateProduct /> */}
    </Refine>
  );
}
`.trim();

const AuthProviderTsxWithCheckMethod = /* tsx */ `
// TODO: change this
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
    check: async () => {
      // When logging in, we'll obtain an access token from our API and store it in the local storage.
      // Now let's check if the token exists in the local storage.
      // In the later steps, we'll be implementing the login and logout methods.
      const token = localStorage.getItem("my_access_token");
  
      return { authenticated: Boolean(token) };
    },
    login: async ({ email, password }) => { throw new Error("Not implemented"); },
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

const AppTsxWithAuthenticatedComponent = /* tsx */ `
import { Refine, Authenticated } from "@refinedev/core";

import { dataProvider } from "./data-provider";
import { authProvider } from "./auth-provider";

import { ShowProduct } from "./show-product";
import { EditProduct } from "./edit-product";
import { ListProducts } from "./list-products";
import { CreateProduct } from "./create-product";

export default function App(): JSX.Element {
  return (
    <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
      <Authenticated
        key="protected"
        fallback={<div>Not authenticated</div>}
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

// actions

// protecting-content actions

export const CreateAuthProviderFile = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialCreateFileButton
            onClick={() => {
                sandpack.addFile({
                    "/auth-provider.ts": {
                        code: AuthProviderTsxCode,
                    },
                });
                sandpack.openFile("/auth-provider.ts");
                sandpack.setActiveFile("/auth-provider.ts");
            }}
            name="auth-provider.ts"
        />
    );
};

export const AddAuthProviderToAppTsx = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile("/App.tsx", AppTsxWithAuthProvider);
                sandpack.setActiveFile("/App.tsx");
            }}
        />
    );
};

export const AddCheckMethodToAuthProvider = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile(
                    "/auth-provider.ts",
                    AuthProviderTsxWithCheckMethod,
                );
                sandpack.setActiveFile("/auth-provider.ts");
            }}
        />
    );
};

export const AddAuthenticatedComponentToAppTsx = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile(
                    "/App.tsx",
                    AppTsxWithAuthenticatedComponent,
                );
                sandpack.setActiveFile("/App.tsx");
            }}
        />
    );
};

// files

export const finalFiles = {
    ...initialFiles,
    "App.tsx": {
        code: AppTsxWithAuthenticatedComponent,
    },
    "auth-provider.ts": {
        code: AuthProviderTsxWithCheckMethod,
    },
};
