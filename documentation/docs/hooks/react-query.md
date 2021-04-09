---
id: react-query
title: React Query
sidebar_label: React Query
description: React Query with server side rendering using Next.js
---
  
Provides performant and powerful data synchronization for React.

React Query is often described as the missing data-fetching library for React, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in your React applications a breeze.  

[Refer to official documentation for detailed usage. &#8594](https://react-query.tanstack.com/)

:::tip

All required configurations will be handled automatically by CLI as long as you choose plugins during the project creation phase.

:::

React Query supports prefetching multiple queries on the server in Next.js and then dehydrating those queries to the queryClient.

To support caching queries on the server and set up hydration:
- Create a new `QueryClient` instance
- Wrap your app component with `<QueryClientProvider>` and pass it the client instance
- Wrap your app component with `<Hydrate>` and pass it the `dehydratedState` prop from `pageProps`.

[We recommend to check the official documentation for SSR implemantation. &#8594](https://react-query.tanstack.com/)

```js title="pages/_app.js"
import React from 'react';
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const queryClient = new QueryClient()
    return (
        <Hydrate state={pageProps.dehydratedState}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </Hydrate>
    );
}

export default MyApp;
```
:::caution

If you didn't choose the plugin during project creation phase, you must update your `_app.js` file as above after [installing required package](#adding-react-query-to-your-project-later) to add it.

:::

#### Example usage `useQuery`:

```js title="components/reactQueryExample/index.tsx"
import { useQuery } from "react-query";

const API_URL = "https://official-joke-api.appspot.com/jokes/programming/random";

export const ReactQueryExample = () => {

  const { data } = useQuery("random-programming-joke", () => 
    fetch(
      API_URL
    ).then(res => res.json())
  );
};
```


## Adding react-query to your project later

If you didn't choose the plugin during project creation phase, you can follow the instructions below to add it.

- Install `react-query` package.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```bash
npm install react-query
```

  </TabItem>
  <TabItem value="yarn">

```bash
yarn add react-query
```

  </TabItem>
</Tabs>