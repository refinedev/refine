---
id: auth0
title: Auth0 Login
sidebar_label: Auth0 Login
---

import login from '@site/static/img/auth0-login.gif';


Auth0 is a flexible, drop-in solution to add authentication and authorization services to your applications. Your team and organization can avoid the cost, time, and risk that comes with building your own solution to authenticate and authorize users. You can check the [document](https://auth0.com/docs) for details.

To use auth0 with refine;

### Instalation

Run the following command within your project directory to install the Auth0 React SDK:

```
npm install @auth0/auth0-react
```

#### Configure the Auth0Provider component

Wrap your root component with an Auth0Provider that you can import from the SDK.

```tsx title="index.tsx"
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// highlight-next-line
import { Auth0Provider } from "@auth0/auth0-react";

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

:::important
See the [**Auth0 docs**](https://auth0.com/docs) for detailed information and `CLIENT_ID`.
:::


### Create login page

First, we need to override the refine, `login page`. In this way, we will redirect it to the auth0 login screen. We create a `login.tsx` file in the `/pages` folder.

```tsx title="/pages/login.tsx"
import React from "react";
import { Row, AntdLayout, Card, Typography, Button } from "@pankod/refine";
// highlight-next-line
import { useAuth0 } from "@auth0/auth0-react";

export const Login: React.FC = () => {
const { Title } = Typography;

    // highlight-next-line
    const { loginWithRedirect } = useAuth0();

    return (
        <AntdLayout>
            <Row
                justify="center"
                style={{
                    display: "flex",
                    alignContent: "center",
                    height: "100vh",
                }}
            >
                <Card>
                    <Title
                        level={3}
                        style={{
                            textAlign: "center",
                        }}
                    >
                        Login
                    </Title>
                    // highlight-start
                    <Button
                        onClick={() => loginWithRedirect()}
                        size="large"
                        type="primary"
                    >
                        Login with Auth0
                    </Button>
                    // highlight-end
                </Card>
            </Row>
        </AntdLayout>
    );
};
```

Clicking the `Login with Auth0` button, you will be directed to the auth0 login screen.

<div style={{textAlign: "center"}}>
    <img src={login} />
</div>
<br/>
