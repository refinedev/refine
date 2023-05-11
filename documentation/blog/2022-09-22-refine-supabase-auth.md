---
title: OTP Authentication with Supabase and Twilio in React
description: We'll implement OTP(SMS) authorization using Twilio and Supabase in React app.
slug: supabase-twilio-otp-authentication-in-react
authors: vijit_ail
tags: [react, supabase, refine, access-control, tutorial]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-22-refine-supabase-auth/social.png
hide_table_of_contents: false
---

:::caution

This post was created using version 3.x.x of **refine**. Although we plan to update it with the latest version of **refine** as soon as possible, you can still benefit from the post in the meantime.

You should know that **refine** version 4.x.x is backward compatible with version 3.x.x, so there is no need to worry. If you want to see the differences between the two versions, check out the [migration guide](https://refine.dev/docs/migration-guide/).

Just be aware that the source code example in this post have been updated to version 4.x.x.

:::

## Introduction

Passwords are one of the most popular ways to authenticate a user. However, passwords have disadvantages, such as being subject to brute force attacks and data breaches.

Another significant problem with password-based login is that keeping track of different passwords can become challenging. This is where the term 'OTP' (One Time Password) can be helpful.

When we talk about OTP-based authentication, users need to enter a six-digit OTP number sent to them through an automated call or SMS when they want to access the application.

You can see the example app we'll build in the article from [here](https://github.com/refinedev/refine/tree/master/examples/refine-supabase-auth)

Steps we'll cover:

-   [Introduction](#introduction)
-   [What is Supabase?](#what-is-supabase)
-   [What is refine?](#what-is-refine)
-   [Prerequisites](#prerequisites)
-   [Getting Started](#getting-started)
-   [Installing Tailwind CSS for refine project](#installing-tailwind-css-for-refine-project)
-   [Set up the Supabase Project](#set-up-the-supabase-project)
-   [Create the Login Page](#create-the-login-page)
-   [Data Provider](#data-provider)
-   [Auth Provider](#auth-provider)
-   [Conclusion](#conclusion)
-   [Build your React-based CRUD applications without constraints](#build-your-react-based-crud-applications-without-constraints)

## What is Supabase?

Supabase is an open-source Firebase alternative. It provides a real-time database, authentication, and media buckets in one platform. You can use Supabase with any frontend tool, such as React, Angular, or Vue.js.

One of the great features of Supabase is its Auth service. Supabase Auth allows you to easily add OTP-based authentication to your app with just a few lines of code.

In this guide, you will implement OTP-based login in Refine using the Supabase library.

## What is refine?

[refine](https://refine.dev) is a React-based open-source frameworks for building admin panels, dashboards, internal tools and storefront apps rapidly. It helps developers to avoid from repetitive tasks demanded by CRUD operations and provides solutions for like authentication, access control, routing, networking, state management.

One of the great features of refine is its out-of-the-box data providers integrations. refine has a built-in data provider for supabase and we'll see how to use it propery.

## Prerequisites

To follow this guide, you must install the latest Node.js version on your system and be familiar with React and TypeScript concepts. For this tutorial, you will also require a Twilio account to send out OTP text messages and a Github account to sign up for Supabase.

## Getting Started

Start by creating the refine app using the [superplate](https://github.com/pankod/superplate) CLI.

```
npm create refine-app@latest refine-supabase-auth -- -p refine-react -b v3
```

<div class="img-container" align-items="center" >
   <img   src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-22-refine-supabase-auth/terminal.png"  alt="terminal" />
</div>

<br/>

Choose the headless option while specifying the UI framework, as you will be integrating tailwind in this tutorial. You can select your preferred package manager; this tutorial will use yarn. Choose the `supabase` option when selecting the Data Provider.

Here is the source code of [refine supabase data provider](https://github.com/refinedev/refine/tree/master/packages/supabase)

## Installing Tailwind CSS for refine project

Next, navigate to your project directory and install the following packages.

```
yarn add -D tailwindcss
```

```
yarn add daisyui react-daisyui
```

Daisy UI adds attractive component classes to Tailwind, which are customizable and comes with modular React components like `Button`, `Card`, etc., out-of-the-box.

Run the following command to initialize Tailwind in your project.

```
npx tailwindcss init
```

Update the recently added `tailwind.config.js` file to add some theming to the refine app.

```tsx title="tailwind.config.js"
module.exports = {
    content: [
        "node_modules/daisyui/dist/**/*.js",
        "node_modules/react-daisyui/dist/**/*.js",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: "#030303",
                gray: "#eaeaec",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#545bef",
                    secondary: "#757EC0",
                    accent: "#09f08a",
                },
            },
        ],
    },
};
```

Now, create the `App.css` file and add the following content.

```tsx title="src/App.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

In the `App.tsx` file, import the `App.css` file to add the styling.

Run the `yarn dev` command to start the refine development server.

```
yarn dev
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-22-refine-supabase-auth/dashboard.png" alt="dashboard" />
</div>

<br/>

## Set up the Supabase Project

Head over to app.supabase.com and sign in to your Supabase account. Next, create a new project by clicking on the "New Project" button.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-22-refine-supabase-auth/setupSupabase.png" alt="setupSupabase" />
</div>

<br/>

Add the name of the project and the database password, and wait for Supabase to set up and create your project. Meanwhile, you can grab the public key and the project URL from the Supabase dashboard and update the credentials in your code.

Once the project is created, go to Authentication -> Settings to configure the Auth providers.

<div class="img-container">
    <div class="window" style={{alignSelf:"center", width:"400px"}} >
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img style={{alignSelf:"center", width:"400px"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-22-refine-supabase-auth/supabase2.png" alt="supabase2" />
</div>

<br/>
<div class="img-container">
    <div class="window" style={{alignSelf:"center", width:"400px"}} >
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
     <img style={{alignSelf:"center", width:"400px"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-22-refine-supabase-auth/supabase3.png" alt="supabase3" />
</div>

<br/>

You will find the Phone Auth option in the Auth providers section; enable it and select Twilio as the SMS provider.

<br/>

<div class="img-container" >
    <div class="window" >
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
         <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-22-refine-supabase-auth/supabase4.png" alt="supabase4" />
</div>

<br/>

You need to create and developer account and set up credentials on [Twilio Console](https://www.twilio.com/)

Add your Twilio API credentials to complete the integration. You can also edit the OTP expiry time, length of the OTP, and the SMS template according to your business requirements. For this guide, you can stick with the default values.

The backend setup is now complete. In the next section, you will start building the app's frontend.

<br/>
<div>
<a href="https://github.com/refinedev/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/github-support-banner.png" alt="github support banner" />
</a>
</div>

## Create the Login Page

In this guide, you are allowing users to access their account without requiring a password. Once the users log into their account, they will see a list of countries on the dashboard screen.

On the login page, you need to create a two-step form.
In the first step, the user will enter the mobile number to receive the OTP message, and in the second step, the user will enter the OTP token to log in. Display an error if the OTP token is invalid or expired.

```tsx title="src/pages/Login.tsx"
import { useRef, useState } from "react";
import { Alert, Button, Card, Input } from "react-daisyui";

export const LoginPage = () => {
    const mobileNoRef = useRef<string>();
    const otpRef = useRef<string>();
    const [error, setError] = useState<string>();
    const [formState, setFormState] = useState<"SEND_OTP" | "LOGIN">(
        "SEND_OTP",
    );

    const onSendOtp = () => {
        setFormState("LOGIN");
    };

    const mobileFormRender = () => (
        <>
            <label className="text-dark font-medium">
                Enter your mobile mumber
            </label>
            <Input
                className="border-gray bg-gray text-dark mb-4 text-lg font-medium"
                onChange={(e) => (mobileNoRef.current = e.target.value)}
                onFocus={() => setError("")}
                name="mobile"
                type={"tel"}
                defaultValue={mobileNoRef.current}
            />
            <Button color="accent" className="shadow" onClick={onSendOtp}>
                Send OTP
            </Button>
        </>
    );

    const otpFormRender = () => (
        <>
            <label className="text-dark font-medium">Enter OTP</label>
            <Input
                className="border-gray bg-gray text-dark mb-4 text-lg font-medium"
                onChange={(e) => (otpRef.current = e.target.value)}
                onFocus={() => setError("")}
                name="otp"
                value={otpRef.current}
            />
            <Button color="accent" className="shadow" onClick={onLogin}>
                Login
            </Button>
        </>
    );

    return (
        <div className="bg-primary flex min-h-screen items-center justify-center">
            <Card className="w-1/2 bg-white shadow-lg " bordered={false}>
                <Card.Body>
                    {error && (
                        <Alert status="error" className="mb-2">
                            {error}
                        </Alert>
                    )}
                    <h2 className="text-dark mb-3  text-xl font-bold">
                        Sign In
                    </h2>
                    {formState === "SEND_OTP" && mobileFormRender()}
                    {formState === "LOGIN" && otpFormRender()}
                </Card.Body>
            </Card>
        </div>
    );
};
```

In the above code, we set a `formState` state variable to define whether to render the mobile input or the OTP input on the screen. If there's any error, set the `error` variable and display it using the `Alert` component.

Import the `LoginPage` component in the `App.tsx` file and pass it as a prop to the `<Refine/>` component to override the Login page.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import { dataProvider } from "@refinedev/supabase";
import { supabaseClient } from "utility";
import authProvider from "./authProvider";
import { Countries } from "pages/Countries";
import { Layout } from "pages/Layout";
import "./App.css";
//highlight-next-line
import { LoginPage } from "pages/Login";

function App() {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(supabaseClient)}
            resources={[{ name: "countries" }]}
            authProvider={authProvider}
            //highlight-next-line
            LoginPage={LoginPage}
        />
    );
}
```

Also, notice that superplate CLI has already imported the `authProvider` and `dataProvider` for you.

## Data Provider

The `dataProvider` acts as a data layer for your app that makes the HTTP requests and encapsulates how the data is retrieved. It requests and returns the data using predefined methods like `create()`, `getMany()`, etc. Refine consumes these methods via data hooks.

For example, when you use the `useList` hook, Refine internally calls the `getList()` method of the data provider.

In this case, we pass the supabaseClient as the data provider. Supabase is supported out-of-the-box as a data provider by Refine. Here, the data provider internally calls supabase-js database methods like `select()`, `insert()`, etc., to handle the data.

[You can learn more about data provider in the Refine docs.](https://refine.dev/docs/api-reference/core/providers/data-provider/)


---

<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />


---

## Auth Provider

The `authProvider` is an object that refine uses to authenticate and authorize the users. The auth provider must have methods like `login()`, `register()`, etc., to manage authentication in your app. These methods should return a Promise and are accessible via hooks.

The superplate CLI autogenerates the auth provider from your selected preference- in this case, it is Supabase. Unlike data providers, refine does not offer out-of-the-box support for auth providers; you must create it from scratch.

[You can read more about auth provider in detail here.](https://refine.dev/docs/api-reference/core/providers/auth-provider/)

Alright, now coming back to the `LoginPage` component. When the user requests for OTP, validate the mobile number using the regex shown in the below code. The mobile number is expected to include the country code; you can use other third-party components for mobile input with a country code dropdown and mobile validation out-of-the-box.

We'll use the input field in this guide for brevity.

```tsx title="src/pages/Login.tsx"
import { supabaseClient } from "utility";

...

const onSendOtp = async () => {
  const mobileNo = mobileNoRef.current || "";
  if (!/^\+[1-9]{1}[0-9]{3,14}$/.test(mobileNo)) {
    setError("Please enter a valid mobile number");
    return;
  }
  const { error } = await supabaseClient.auth.signIn({
    phone: mobileNo,
  });
  if (error) {
    setError(error.message);
    return;
  }
  setFormState("LOGIN");
};

...
```

To send the OTP message to the user, use the `supabase.auth.signIn()` method and pass the mobile number in the `phone` property as shown above.

<div class="img-container" >
    <div class="window" >
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
         <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-22-refine-supabase-auth/login.png" alt="login" />
</div>

<br/>
<div class="img-container" >
    <div class="window" >
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
         <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-22-refine-supabase-auth/loginInvalid.png" alt="loginInvalid" />
</div>

<br/>

Update the `login` property in `authProvider` to accept the mobile number and OTP as input and call the `supabase.auth.verifyOTP()` method for verifying the OTP entered by the user and enabling access to the dashboard page of the app.

```tsx title="src/authProvider.ts"
...

const authProvider: AuthBindings = {
  login: async ({ mobileNo, otp }) => {
    const { user, error } = await supabaseClient.auth.verifyOTP({
      phone: mobileNo,
      token: otp,
    });
    if (error) {
      return ({
        success: false,
        error,
      });
    }
    if (user) {
      return ({
        success: true,
        redirectTo: "/",
      });
    }
  },
  ...
}
```

In the `onLogin()` function of the `<LoginPage/>` component, pass the mobile number and OTP to the `login()` acquired from the `useLogin` hook.

```tsx title="src/pages/Login.tsx"

...

const { mutate: login } = useLogin();

const onLogin = () => {
  login(
    { mobileNo: mobileNoRef.current, otp: otpRef.current },
    { onError: (error) => setError(error.message) }
  );
};
```

If the OTP is invalid, the error message will be displayed as shown below.

<div class="img-container" >
    <div class="window" >
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
         <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-22-refine-supabase-auth/loginToken.png" alt="loginToken" />
</div>

<br/>

The authentication flow is now complete. Let’s finish the rest of the app by creating the countries resource.

In your Supabase project, head to the SQL editor page and click on the “Countries” option from the Quick start section. It will open up the SQL statements in an editor page; click on the RUN button to execute them.

<div class="img-container" >
    <div class="window" >
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
         <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-22-refine-supabase-auth/supabaseDB.png" alt="supabaseDB" />
</div>

<br/>
<div class="img-container" >
    <div class="window" >
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
         <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-22-refine-supabase-auth/supabaseDB2.png" alt="supabaseDB2" />
</div>

<br/>

The SQL snippet will create a countries table and dump the country list and other columns like country code and continent.

In the `Countries` component, get the data from Supabase using the `useList` hook and render the data using the `Table` component.

```tsx title="src/pages/Countries.tsx"
import { useList } from "@refinedev/core";
import { Table } from "react-daisyui";

const columns = ["ID", "Name", "ISO Code", "Local Name", "Continent"];

export const Countries = () => {
    const { data: countries } = useList({
        resource: "countries",
        hasPagination: false,
    });
    return (
        <div className="overflow-x-auto">
            <Table color="primary" className="w-full">
                <Table.Head className="bg-primary">
                    {columns.map((column) => (
                        <span key={column}>{column}</span>
                    ))}
                </Table.Head>
                <Table.Body>
                    {countries?.data.map((country: Record<string, string>) => (
                        <Table.Row key={country.id}>
                            <span className="text-dark font-medium opacity-50">
                                {country.id}
                            </span>
                            <span className="text-dark font-medium opacity-50">
                                {country.name}
                            </span>
                            <span className="text-dark font-medium opacity-50">
                                {country.iso2}
                            </span>
                            <span className="text-dark font-medium opacity-50">
                                {country.local_name}
                            </span>
                            <span className="text-dark font-medium opacity-50">
                                {country.continent}
                            </span>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};
```

Create the Layout component to create an app bar with a logout button.

```tsx title="src/pages/Layout.tsx"
import { LayoutProps, useLogout } from "@refinedev/core";
import { Button } from "react-daisyui";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { mutate: logout } = useLogout();
    return (
        <div className="flex min-h-screen flex-col">
            <div className="bg-gray mb-2 py-3">
                <div className="container mx-auto flex">
                    <Button
                        color="accent"
                        size="sm"
                        className="ml-auto shadow"
                        onClick={() => logout()}
                    >
                        Logout
                    </Button>
                </div>
            </div>
            <div className="container mx-auto bg-white py-4">{children}</div>
        </div>
    );
};
```

Import the Countries and the Layout component in the App.tsx fle to finish up the application.

```tsx title="App.tsx"
...
//highlight-start
import { Countries } from "pages/Countries";
import { Layout } from "components/Layout";
//highlight-end

function App() {
  return (
    <Refine
      routerProvider={{
        ...routerProvider,
      }}
      dataProvider={dataProvider(supabaseClient)}
      authProvider={authProvider}
      LoginPage={LoginPage}
      //highlight-start
      resources={[{ name: "countries", list: Countries }]}
      Layout={Layout}
      //highlight-end
    />
  );
}
```

<div class="img-container" >
    <div class="window" >
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
         <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-22-refine-supabase-auth/final.png" alt="final" />
</div>

<br/>

## Conclusion

OTP authentication adds an extra layer of security to your application and helps ensure that only authorized users can access it. In this article, we've gone over how to add OTP-based authentication in refine using Supabase Auth. We've also looked at how to set up the phone auth provider in Supabase using Twilio so that users can receive their OTP tokens.

Following this article's steps, you should now have a refine application with OTP-based authentication enabled.

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord-banner.png" alt="discord banner" />
</a>
</div>

---

## Build your React-based CRUD applications without constraints

Low-code React frameworks are great for gaining development speed but they often fall short of flexibility if you need extensive styling and customization for your project.

Check out [refine](https://github.com/refinedev/refine),if you are interested in a headless framework you can use with any custom design or UI-Kit for 100% control over styling.

<div>
<a href="https://github.com/refinedev/refine">
    <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/refine_blog_logo_1.png" alt="refine blog logo" />
</a>
</div>

<br/>

**refine** is an open-source React-based framework for building CRUD applications **without constraints.**
It can speed up your development time up to **3X** without compromising freedom on **styling**, **customization** and **project workflow.**

**refine** is headless by design and it connects **30+** backend services out-of-the-box including custom REST and GraphQL API’s.

Visit [refine GitHub repository](https://github.com/refinedev/refine) for more information, demos, tutorials, and example projects.
