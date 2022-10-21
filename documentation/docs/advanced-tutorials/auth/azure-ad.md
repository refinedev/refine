---
id: azure-ad-b2c
title: Azure AD B2C Login
---

# Azure Active Directory B2C (AAD B2C)

[Azure Active Directory B2C](https://learn.microsoft.com/en-us/azure/active-directory-b2c/overview) provides business-to-customer identity as a service. Your customers use their preferred social, enterprise, or local account identities to get single sign-on access to your applications and APIs.

The Microsoft Authentication Library (MSAL) enables developers to acquire security tokens from the Microsoft identity platform to authenticate users and access secured web APIs. It can be used to provide secure access to Microsoft Graph, other Microsoft APIs, third-party web APIs, or your own web API. MSAL supports many different application architectures and platforms including .NET, JavaScript, Java, Python, Android, and iOS.

### We use Azure AD B2C in our example but authentication with Azure AD should be very similar.

We will be using the javascript version of msal library and a helper for react. You can find more about the msal library here: [docs](https://learn.microsoft.com/en-us/azure/active-directory/develop/msal-overview)

To install the required dependencies, run the following command:

```bash
npm install @azure/msal-browser @azure/msal-react
```

Detailed documentation for using msal with react can be found here: [docs](https://learn.microsoft.com/en-us/azure/active-directory/develop/single-page-app-quickstart?pivots=devlang-react)

## Project Setup:

Make the changes to following files:

index.tsx

```tsx title="index.tsx"
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App, { TOKEN_KEY } from "./App";

import {
    EventType,
    PublicClientApplication,
    AccountInfo,
    EventPayload,
    SilentRequest,
} from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig, tokenRequest } from "./config";

const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback(async (event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS) {
        const payload: EventPayload = event.payload;
        msalInstance.setActiveAccount(payload as AccountInfo);

        let account = msalInstance.getActiveAccount();

        const request: SilentRequest = {
            ...tokenRequest,
            account: account!,
        };
        try {
            // Silently acquires an access token which is then attached to a request for API access
            const response = await msalInstance.acquireTokenSilent(request);
            console.log("Fetching access token: success");
            console.log("Scopes", response.scopes);
            console.log("Token Type", response.tokenType);

            localStorage.setItem(TOKEN_KEY, response.accessToken);
        } catch (e) {
            msalInstance.acquireTokenPopup(request).then((response) => {
                localStorage.setItem(TOKEN_KEY, response.accessToken);
            });
        }
    }
});

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <App />
        </MsalProvider>
    </React.StrictMode>,
);
```

config.tsx

```typescript
import { Configuration, LogLevel } from "@azure/msal-browser";

export const msalConfig: Configuration = {
    auth: {
        clientId: `${process.env.REACT_APP_AZURE_AAD_CLIENT_ID}`,
        authority: `https://${process.env.REACT_APP_AZURE_AAD_TENANT_NAME}.b2clogin.com/${process.env.REACT_APP_AZURE_AAD_TENANT_NAME}.onmicrosoft.com/${process.env.REACT_APP_AZURE_AAD_POLICY_NAME}`,
        knownAuthorities: [`${process.env.REACT_APP_AZURE_AAD_TENANT_NAME}.b2clogin.com`],
        redirectUri: "http://localhost:3000/", // Replace appropriately
        postLogoutRedirectUri: window.location.origin,
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
    scopes: ["User.Read"]
};

export const tokenRequest = {
    scopes: [...] // Replace ... with your custom scopes
};


// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: "Enter_the_Graph_Endpoint_Here/v1.0/me"
};
```

_Make sure the env vars are set correctly via a .env file or command line._

app.tsx

```tsx title="app.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { AuthProvider } from "@pankod/refine-core";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import axios from "axios";
import { AxiosRequestConfig } from "axios";

import LoginPage from "./pages/auth";
import { AccountInfo, SilentRequest } from "@azure/msal-browser";
import { tokenRequest } from "./config";
import { Layout } from "./components/layout";

export const TOKEN_KEY = "refine-auth";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    // Here we can perform any function we'd like on the request
    (request: AxiosRequestConfig) => {
        // Retrieve the token from local storage
        const token = localStorage.getItem(TOKEN_KEY);

        // Check if the header property exists
        if (request.headers) {
            // Set the Authorization header if it exists
            request.headers["Authorization"] = `Bearer ${token}`;
        } else {
            // Create the headers property if it does not exist
            request.headers = {
                Authorization: `Bearer ${token}`,
            };
        }
        return request;
    },
);

const App: React.FC = () => {
    const isAuthenticated = useIsAuthenticated();
    const { instance, inProgress, accounts } = useMsal();

    if (inProgress === "login" || inProgress === "handleRedirect") {
        return <div>Loading...</div>;
    }

    const account: AccountInfo = accounts[0];

    const request: SilentRequest = {
        ...tokenRequest,
        account,
    };

    const authProvider: AuthProvider = {
        login: async () => {
            return Promise.resolve(false);
        },
        register: async () => Promise.resolve(),
        resetPassword: async () => Promise.resolve(),
        updatePassword: async () => Promise.resolve(),
        logout: async () => Promise.resolve(),
        checkAuth: async () => {
            try {
                if (account) {
                    const token = await instance.acquireTokenSilent(request);
                    localStorage.setItem(TOKEN_KEY, token.accessToken);
                    return Promise.resolve();
                } else {
                    return Promise.reject();
                }
            } catch (e) {
                console.log("error", { e });
                return Promise.reject();
            }
        },
        checkError: async () => Promise.resolve(),
        getPermissions: async () => Promise.resolve(),
        getUserIdentity: async (): Promise<AccountInfo> => {
            if (account === null || account === undefined) {
                return Promise.reject();
            }
            return Promise.resolve(account);
        },
    };

    const API_URL = `${process.env.REACT_APP_API_URL}`;

    return (
        <>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL, axiosInstance)}
                authProvider={authProvider}
                LoginPage={LoginPage}
                Layout={Layout}
                resources={[]}
            />
        </>
    );
};

export default App;
```

login.tsx

```tsx title="login.tsx"
import React from "react";
import { SignInButton } from "../../widgets/auth/SignInButton";

type Props = {};

const LoginPage = (props: Props) => {
    return (
        <>
            <div>Login</div>

            <SignInButton />
        </>
    );
};

export default LoginPage;
```

SignInButton.tsx

```tsx title="SignInButton.tsx"
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../config";
import { IPublicClientApplication } from "@azure/msal-browser";
import { Button } from "@pankod/refine-mui";

function handleLogin(instance: IPublicClientApplication) {
    instance
        .loginRedirect() // Pick the strategy you prefer i.e. redirect or popup
        .catch((e) => {
            console.error(e);
        });
}

/**
 * Renders a button which, when selected, will redirect the page to the login prompt
 */
export const SignInButton = () => {
    const { instance } = useMsal();

    return (
        <Button className="ml-auto" onClick={() => handleLogin(instance)}>
            Sign In
        </Button>
    );
};
```

And that should be it.
