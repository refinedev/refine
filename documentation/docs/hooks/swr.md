---
id: swr
title: SWR
sidebar_label: SWR
description: Data fetching in Next.js — How to use SWR
---

React Hooks library for data fetching.

The name “SWR” is derived from stale-while-revalidate, a HTTP cache invalidation strategy popularized by [HTTP RFC 5861](https://tools.ietf.org/html/rfc5861). SWR is a strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data.

With SWR, components will get a stream of data updates constantly and automatically.
And the UI will be always fast and reactive.  
[Refer to official documentation for detailed usage. &#8594](https://swr.vercel.app/)


### useSWR

Pass an API key and start using it inside any function components:

```jsx
import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json());

function Profile () {
  const { data, error } = useSWR('/api/user/123', fetcher);

  if (error) return <div>failed to load</div>

  if (!data) return <div>loading...</div>

  // render data
  return <div>hello {data.name}!</div>
}
```

`fetcher` is an async function that accepts the key of SWR, and returns the data. You can use any library to handle data fetching.

```js
import axios from 'axios';

const fetcher = url => axios.get(url).then(res => res.data);
```

[Refer to official documentation on data fetching for detailed usage. &#8594](https://swr.vercel.app/docs/data-fetching)

### Mutation

`useSWR` also returns a `mutate` method that is pre-bound to SWR's key

```jsx
import useSWR from 'swr';

function Profile () {
  const { data, mutate } = useSWR('/api/user', fetcher);
  return (
    <div>
      <h1>My name is {data.name}.</h1>
      <button onClick={async () => {
        const newName = data.name.toUpperCase();
        // send a request to the API to update the data
        await requestUpdateUsername(newName);
        // update the local data immediately and revalidate (refetch)
        // NOTE: key is not required when using useSWR's mutate as it's pre-bound
        mutate({ ...data, name: newName });
      }}>Uppercase my name!</button>
    </div>
  )
}
```

`mutate` can also be imported directly form `swr`

```jsx
import useSWR, { mutate } from 'swr';

function App () {
  return (
    <div>
      <Profile />
      <button onClick={() => {
        // set the cookie as expired
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // tell all SWRs with this key to revalidate
        mutate('/api/user');
      }}>
        Logout
      </button>
    </div>
  )
}
```

[Refer to official documentation on mutation for detailed usage. &#8594](https://swr.vercel.app/docs/mutation)


## Adding SWR to your project later

If you didn't choose the plugin during project creation phase, you can follow the instructions below to add it.

- Install `swr` package.

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
npm install swr
```

  </TabItem>
  <TabItem value="yarn">

```bash
yarn add swr
```

  </TabItem>
</Tabs>