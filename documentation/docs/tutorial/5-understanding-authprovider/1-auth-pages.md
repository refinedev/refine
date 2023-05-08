---
id: auth-pages
title: 2. Auth Pages
tutorial:
    prev: tutorial/understanding-authprovider/create-authprovider
    next: false
---

In this post, we explore how authentication is implemented in a login page. We also discuss briefly how to make use of **refine-MUI**'s `<AuthPage />` component in order to render pages for login, signup, forgot password and reset password.


## Login Page

The login page is used to authenticate users. Logging in a user is carried out by the data provider's `login` action, which is accessible via the `useLogin()` hook.


Our **Blog** app initialized by **refine.new** implements user login in the `<Login />` component. It looks like this:

```tsx
// src/pages/login.tsx

import { useLogin } from "@refinedev/core";
import { useEffect, useRef } from "react";

import { Box, Container, Typography } from "@mui/material";
import { ThemedTitleV2 } from "@refinedev/mui";

import { CredentialResponse } from "../interfaces/google";

import { AppIcon } from "components/app-icon";

// Todo: Update your Google Client ID here
const GOOGLE_CLIENT_ID =
  "1041339102270-jlljcjl19jo1hkgf695em3ibr7q2m734.apps.googleusercontent.com";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        gap="36px"
        justifyContent="center"
        flexDirection="column"
      >
        <ThemedTitleV2
          collapsed={false}
          wrapperStyles={{
            fontSize: "22px",
            justifyContent: "center",
          }}
          text="refine Project"
          icon={<AppIcon />}
        />

        <GoogleButton />

        <Typography align="center" color={"text.secondary"} fontSize="12px">
          Powered by
          <img
            style={{ padding: "0 5px" }}
            alt="Google"
            src="https://refine.ams3.cdn.digitaloceanspaces.com/superplate-auth-icons%2Fgoogle.svg"
          />
          Google
        </Typography>
      </Box>
    </Container>
  );
};
```

This is a simple login page that allows logging in a user with Google account. Notice the `mutate` function exposed by the call to the `useLogin()` hook. It is stored as `login`, which we are using to log the user in with a Google account.


## Auth Pages in refine

The example provided is a simplistic login page that involves only Google Auth. However, **refine** provides more robust auth pages with `<AuthPage />` components that come from the core package, as well as supplementary packages such as **Material UI**, **Ant Design**, **Mantine**, etc.

The `<AuthPage />` component provided by `@refinedev/mui`, **refine**'s support package for **Material UI**, comes with all required variations for login, register, forgot password, update password pages. The component used is the same `<AuthPage />` component, but the UI and functionality changes with the `type` prop passed to the component.

For example, `<AuthPage type="register" />` implements signing up a user with the `useRegister()` hook and renders all fields required for the sign up form, whereas `<AuthPage type="login" >` implements `useLogin()` hook and shows only the login fields in the form.

[Refer to the `<AuthPage />` documentation for more information &#8594](/docs/api-reference/mui/components/mui-auth-page/)

<br/>
<br/>

<Checklist>

<ChecklistItem id="auth-provider-headless-auth-pages">
I understood how to implement login using `useLogin()` hook.
</ChecklistItem>
<ChecklistItem id="auth-provider-headless-auth-pages-2">
I understood how `<AuthPage /> variations work.
</ChecklistItem>

</Checklist>
