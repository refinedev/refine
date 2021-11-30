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

We will build **"PubNub Live Provider"** of `@pankod/refine-pubnub` from scratch to show the logic of how live provider methods interact with PubNub.

### `subscribe`

This method is used to subscribe to a real-time channel.

```ts title="liveProvier.ts"
import { LiveProvider, LiveEvent } from "@pankod/refine";
import PubNub, { ListenerParameters } from "pubnub";

const liveProvider = (pubnubClient: PubNub): LiveProvider => {
    return {
        // highlight-start
        subscribe: ({
            channel,
            type,
            params,
            callback,
        }): [ListenerParameters, string] => {
            const listenerObject: ListenerParameters = {
                message: function (pubnubMessage) {
                    const { message, channel: pubnubChannel } = pubnubMessage;

                    if (
                        pubnubChannel === channel &&
                        (message?.type === type || type === "*")
                    ) {
                        if (
                            params?.id &&
                            message.payload.id.toString() !== params.id
                        ) {
                            return;
                        }

                        callback({
                            ...message,
                            date: new Date(),
                        });
                    }
                },
            };

            pubnubClient.subscribe({ channels: [channel] });
            pubnubClient.addListener(listenerObject);

            return [listenerObject, channel];
        },
        // highlight-end
    };
};
```

#### Parameter Types

| Name     | Type                                                           |
| -------- | -------------------------------------------------------------- |
| channel  | `string`                                                       |
| type     | `"deleted"` \| `"updated"` \| `"created"` \| "`*`" \| `string` |
| params   | `{id?: string; [key: string]: any;}`                           |
| callback | `(event: LiveEvent) => void;`                                  |

> [`LiveEvent`](#)

#### Return Type

| Type  |
| ----- |
| `any` |

<br/>

**refine** will use this subscribe method in the [`useSubscription`](#) hook.

```ts
import { useSubscription } from "@pankod/refine";

useSubscription({
    resource: "resource-name",
    channel: "channel-name",
});
```

> [Refer to the useSubscription documentation for more information. &#8594](#)

<br />

### `unsubscribe`

This method is used to unsubscribe from a channel.

```ts title="liveProvier.ts"
// ...

const liveProvider = (pubnubClient: PubNub): LiveProvider => {
    return {
        // ...
        // highlight-start
        unsubscribe: ([listenerObject, channel]: [
            ListenerParameters,
            string,
        ]) => {
            pubnubClient.removeListener(listenerObject);
        },
        // highlight-end
        // ...
    };
};
```

#### Parameter Types

| Name         | Type  |
| ------------ | ----- |
| subscription | `any` |

#### Return Type

| Type   |
| ------ |
| `void` |

<br/>

### `publish`

This method is used to publish an event.

```ts title="liveProvier.ts"
// ...

const liveProvider = (pubnubClient: PubNub): LiveProvider => {
    return {
        // ...
        // highlight-start
        publish: (event: LiveEvent) => {
            try {
                pubnubClient.publish({
                    channel: event.channel,
                    message: event,
                });
            } catch (e) {
                console.log(e);
            }
        },
        // highlight-end
        // ...
    };
};
```

#### Parameter Types

| Name  | Type        |
| ----- | ----------- |
| event | `LiveEvent` |

> [`LiveEvent`](#)

#### Return Type

| Type   |
| ------ |
| `void` |

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

Queries of related resource are **not invalidated** in real-time, instead [`onLiveEvent`](#) is run with the `event` as new events from subscription arrive.

## `onLiveEvent`

Callback that is run when new events from subscription arrive. It can be passed to both `<Refine>` and [supported hooks](#).

### `<Refine>`

`onLiveEvent` passed to `<Refine>` will run every time when a new event occurs regardless of the `liveMode`. It can be used for actions that are generally applicable to all events.

```tsx title="App.tsx"
// ...

const App: React.FC = () => {
    return (
        <Refine
            liveProvider={liveProvider}
            liveMode="immediate"
            onLiveEvent={(event) => {
                // Put your own logic based on event
            }}
        />
    );
};
```

### Hooks

`onLiveEvent` passed to hooks runs when `liveMode` is `controlled`.

```tsx
const { data } = useList({
    liveMode: "controlled",
    onLiveEvent: (event) => {
        // Put your own logic based on event
    },
});
```

:::caution
Even if `liveMode` for a hook is not `controlled`, `onLiveEvent` from `<Refine>` will still be run.
:::

## Supported Hooks
