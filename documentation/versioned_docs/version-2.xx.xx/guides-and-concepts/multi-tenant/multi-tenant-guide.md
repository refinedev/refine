---
id: multiTenant
title: Multi Tenant
---

## Introduction

In this guide, we will create an application with you in the logic of Multi Tenant. Multi Tenant application is to separate and manage multiple contents independently from each other in a single application.

We will make a Cake House application using **refine** and [Appwrite](https://appwrite.io/). Our Cake House will consist of two separate stores and there will be special products for these stores. We will explain step by step how to manage these stores, products and orders separately.

## Setup

```bash
npm install @pankod/refine-appwrite
```

## Usage

```tsx
import { Refine } from "@pankod/refine";
import { dataProvider } from "@pankod/refine-appwrite";
import routerProvider from "@pankod/refine-react-router";

import { appwriteClient } from "utility";
import { authProvider } from "./authProvider";

const App: React.FC = () => {
    return (
        <Refine
            //highlight-start
            dataProvider={dataProvider(appwriteClient)}
            authProvider={authProvider}
            //highlight-end
            routerProvider={routerProvider}
        />
    );
};
```

:::caution
We recommend that you read the detailed [Appwrite DataProvider](https://refine.dev/docs/guides-and-concepts/data-provider/appwrite/) guide before reading this article. You can find detailed information about Installation, Usage and Collection creation.
:::

## Create Collections

We need three collections for our Cake House application. Let's create these collections in the appwrite database.

:::info
[Check out you can how create collections with **refine** Appwrite guide →](https://refine.dev/docs/guides-and-concepts/data-provider/appwrite/#create-collections)
:::

`stores`

-   Title: text

`products`

-   Title: text
-   Description: text
-   Image: wilcard
-   StoreId: text

`orders`

-   ProductId: text
-   Customer Name: text
-   Customer Address: text
-   Status: text
-   Quantitiy: numeric
-   StoreId: text

Now that we have completed the setup and our collections, we can now log in with the **refine** and start the listing processes.
