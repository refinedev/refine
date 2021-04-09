---
id: env
title: Environment Variables(.env)
sidebar_label: Enviroment Variables
description: How to use env in Next.js apps?
---

Using Environment variables important to keep your private information secure. Next.js comes with built-in support for environment variables.



superplate has a plugin to generate those files for different environments automatically.

### .env.local

Next.js has built-in support for loading environment variables from `.env.local` into `process.env`.


```CSS title=".env.local"
DB_HOST_URL=localhost
DB_USER=user
DB_PASS=password
```


This loads `process.env.DB_HOST_URL`, `process.env.DB_USER`, and `process.env.DB_PASS` into the Node.js environment automatically.

```ts title="pages/index.tsx"
export async function getServerSideProps() {
  const db = await myDB.connect({
    host: process.env.DB_HOST_URL,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  })
  // ...
}
```
 

### .env.development

Next.js allows us to set defaults in `.env` (all environments), `.env.development` (development environment) and .`env.production` (production environment).


```env title=".env.development"
# DO NOT ADD SECRETS TO THIS FILE. This is a good place for defaults.
# If you want to add secrets use `.env.development.local` instead.

DEVELOPMENT_ENV_VARIABLE="server_only_development_variable"
NEXT_PUBLIC_DEVELOPMENT_ENV_VARIABLE="public_development_variable"
```

:::important

In order to expose a variable to the browser you have to prefix the variable with `NEXT_PUBLIC_`.

:::

### .env.production

```env title=".env.production"
# DO NOT ADD SECRETS TO THIS FILE. This is a good place for defaults.
# If you want to add secrets use `.env.production.local` instead.

PRODUCTION_ENV_VARIABLE="server_only_production_variable"
NEXT_PUBLIC_PRODUCTION_ENV_VARIABLE="public_production_variable"
```


```jsx title="components/envExample.tsx"
import React from "react";
import styles from "./index.module.css";

export const EnvExample: React.FC = () => {
    console.log(process.env.NEXT_PUBLIC_ENV_VARIABLE);
    console.log(process.env.NEXT_PUBLIC_DEVELOPMENT_ENV_VARIABLE);
    console.log(process.env.NEXT_PUBLIC_PRODUCTION_ENV_VARIABLE);
};
```

### .env.test

In the same way you can set defaults for development or production environments, you can do the same with `.env.test` file for testing environment


```env title=".env.test"
# USE THIS FILE IF YOU WANT TO DEFINE VARIABLES SPECIFIC TO TEST ENVIRONMENT

ENV_TEST_VARIABLE="test_variable"
```

:::tip

`.env.test` is useful when running tests with tools like jest or cypress where you need to set specific environment variables only for testing.
:::


[Refer to official documentation for detailed usage  &#8594](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables)