---
id: live-provider
title: Live Provider
---

## Overview

**refine** lets you add real time support to your app via `liveProvider` prop for [`<Refine>`](#). It can be used to update and show data in real time throughout your app. **refine** remains agnostic in its API to allow different solutions([PubNub](https://www.pubnub.com/), [Mercure](https://mercure.rocks/), [supabase](https://supabase.com) etc.) to be integrated.

A live provider must include following methods:

```ts
const liveProvider = {
    subscribe: ({ channel, params: { id }, type, callback }) => ({}),
    publish: (event) => {},
    unsubscribe: (subscription) => {},
};
```

:::tip
**refine** includes out-of-the-box live providers to use in your projects like

-   [Supabase](#)
-   [PubNub](#)
    :::

:::important
**refine** consumes these methods using [useSubscription](#)
:::

## Usage

You must pass a live provider to the `liveProvider` prop of `<Refine>`

```tsx title="App.tsx"
import { Refine } from "@pankod/refine";

import liveProvider from "./liveProvider";

const App: React.FC = () => {
    return <Refine liveProvider={liveProvider} />;
};
```

## Creating a live provider

### `subscribe`

[useSubscription](#)

### `unsubscribe`

### `publish`

## `liveMode`

`liveMode` must be passed to either `<Refine>` or [supported hooks](#) for `liveProvider` to work. If it's not provided live features won't be activated. Passing it to `<Refine>` configures it app wide and hooks will use this option. It can also be passed to hooks directly without passing to `<Refine>` for detailed configuration. If both are provided value passed to the hook will override the value at `<Refine>`.

#### Usage in `<Refine>`:

```tsx title="App.tsx"
// ...

const App: React.FC = () => {
    return <Refine liveProvider={liveProvider} liveMode="immediate" />;
};
```

#### Usage in a hook:

```tsx
const { data } = useList({ liveMode: "controlled" });
```

### `immediate`

Queries of related resource are invalidated in real-time as new events from subscription arrive.

### `controlled`

## `onLiveEvent`

hook lar da alır ve sadece controlled de çalışır.

refine da alır hep çalışır.

## Supported Hooks
