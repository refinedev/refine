---
id: auth0
title: Auth0 Login
---


[Auth0](https://auth0.com/) is a flexible, drop-in solution for adding authentication and authorization services to your applications. Your team and organization can avoid the cost, time, and risk that comes with building your own solution to authenticate and authorize users. You can check the [Auth0 document](https://auth0.com/docs) for details.

We will show you how to use Auth0 with refine

### Installation

Run the following command within your project directory to install the Auth0 React SDK:

```
npm install @auth0/auth0-react
```

#### Configure the Auth0Provider component

Wrap your root component with an Auth0Provider that you can import from the SDK.

```tsx title="index.tsx"
import React from "react";
import ReactDOM from "react-dom";

// highlight-next-line
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";

ReactDOM.render(
    <React.StrictMode>
// highlight-start
        <Auth0Provider
            domain="YOUR_DOMAIN"
            clientId="YOUR_CLIENT_ID"
            redirectUri={window.location.origin}
        >
            <App />
        </Auth0Provider>
// highlight-end
    </React.StrictMode>,
    document.getElementById("root"),
);
```

:::caution
Refer to [**Auth0 docs**](https://auth0.com/docs/quickstart/spa/react#configure-auth0) for detailed configuration.
:::

### Override login page

First, we need to override the **refine** login page. In this way, we will redirect it to the Auth0 login page. We create a `login.tsx` file in the `/pages` folder.

```tsx  title="/pages/login.tsx"
import { 
    Row,
    Col,
    AntdLayout,
    Card,
    Typography,
    Button,
// highlight-next-line
    useLogin
} from "@pankod/refine";

export const Login: React.FC = () => {
// highlight-next-line
    const { mutate: login } = useLogin();

    const CardTitle = (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "60px",
            }}
        >
            <img src="./refine.svg" alt="Logo" />
        </div>
    );

    return (
        <AntdLayout
            style={{
                backgroundColor: "#eff7f7",
            }}
        >
            <Row
                justify="center"
                align="middle"
                style={{
                    height: "100vh",
                }}
            >
                <Col xs={22}>
                    <Card
                        style={{
                            maxWidth: "400px",
                            margin: "auto",
                        }}
                        title={CardTitle}
                    >
                        <Button
                            type="primary"
                            size="large"
                            htmlType="submit"
                            block
// highlight-next-line
                            onClick={() => login({})}
                        >
                            Login
                        </Button>
                        <br />
                        <br />
                        <div
                            style={{ textAlign: "center", padding: "10px 0px" }}
                        >
                            <Typography.Text>
                                Still no account? Please go to
                                <a href="#"> Sign up</a>
                            </Typography.Text>
                        </div>
                    </Card>
                </Col>
            </Row>
        </AntdLayout>
    );
};
```

After clicking the `Login` button, you will be directed to the auth0 login screen.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/auth0/auth0-login.gif" alt="auth0-login" />
</div>
<br/>

### Auth Provider

In refine, authentication and authorization processes are performed with the auth provider. Let's write a provider for Auth0.

```tsx title="App.tsx"
import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router";
import { useAuth0 } from "@auth0/auth0-react";

import { Login } from "pages/login";

import axios from "axios";


const API_URL = "https://api.fake-rest.refine.dev";

const App = () => {
    const {
        isLoading,
        loginWithRedirect,
        isAuthenticated,
        user,
        logout,
        getIdTokenClaims,
    } = useAuth0();

    if (isLoading) {
        return <span>loading...</span>;
    }

    const authProvider: AuthProvider = {
        login: () => {
            loginWithRedirect();
            return Promise.resolve();
        },
        logout: () => {
            logout({ returnTo: window.location.origin });
            return Promise.resolve("/");
        },
        checkError: () => Promise.resolve(),
        checkAuth: () => {
            if (isAuthenticated) {
                return Promise.resolve();
            }

            return Promise.reject();
        },
        getPermissions: () => Promise.resolve(),
        getUserIdentity: () => {
            if (user) {
                return Promise.resolve({
                    ...user,
                    avatar: user.picture,
                });
            }
        },
    };

    getIdTokenClaims().then((token) => {
        if (token) {
            axios.defaults.headers.common = {
                Authorization: `Bearer ${token.__raw}`,
            };
        }
    });

    return (
        <Refine
            LoginPage={Login}
            routerProvider={routerProvider}
            authProvider={authProvider}
            dataProvider={dataProvider(API_URL, axios)}
        />
    );
};

export default App;
```

#### login

`loginWithRedirect` method comes from the `useAuth0` hook.

#### logout

`logout` method comes from the `useAuth0` hook.

#### checkError & getPermissions

We revert to empty promise because Auth0 does not support it.

#### checkAuth

We can use the `isAuthenticated` method, which returns the authentication status of the `useAuth0` hook.

#### getUserIdentity

We can use it with the `user` from the `useAuth0` hook.

## Live Codesandbox Example

Auth0 example doesn't work in codesandbox embed mode. With [this](https://ussft.csb.app/) link, you can open the example in the browser and try it.

<iframe src="https://codesandbox.io/embed/refine-auth0-example-7drxm?autoresize=1&fontsize=14&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-auth0-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
