---
title: Adding Realtime Collaboration
description: We'll implement realtime broadcast and subscription of pixels updates in Pixels app.
slug: refine-pixels-4
authors: abdullah_numan
tags: [refine-week, Refine, supabase]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-11-refine-pixels-4%2Fsocial.png
hide_table_of_contents: false
---

In this post, we implement realtime broadcast and subscription of `pixels` updates in our **Refine** based **Pixels** app. We do this with the [`liveProvider`](https://refine.dev/docs/api-reference/core/providers/live-provider/) prop on `<Refine />` and [**Supabase**'s **Realtime servers**](https://supabase.com/docs/guides/realtime). Applying a PubSub feature allows us to receive instant updates in one part of our app for database changes triggered from another part or by a different client.

Here's a quick rundown of the features we'll work on:

1. Allow multiple users to draw pixels on a canvas.
2. All contributors can see realtime updates on the canvas.

This is Day 4 in the series titled [**RefineWeek**](https://refine.dev/week-of-refine/). **RefineWeek** is a quickfire tutorial guide that aims to help developers learn the ins-and-outs of **Refine**'s powerful capabilities and get going with **Refine** within a week.

### RefineWeek series

- Day 1 - [Pilot & Refine architecture](https://refine.dev/blog/refine-pixels-1/)
- Day 2 - [Setting Up the Client App](https://refine.dev/blog/refine-pixels-2/)
- Day 3 - [Adding CRUD Actions and Authentication](https://refine.dev/blog/refine-pixels-3/)
- Day 4 - [Adding Realtime Collaboration](https://refine.dev/blog/refine-pixels-4/)
- Day 5 - [Creating an Admin Dashboard with Refine](https://refine.dev/blog/refine-pixels-5/)
- Day 6 - [Implementing Role Based Access Control](https://refine.dev/blog/refine-pixels-6/)
- Day 7 - [Audit Log With Refine](https://refine.dev/blog/refine-pixels-7/)

## Overview

On Day Three, we implemented CRUD operations using **Supabase** `dataProvider` methods and the `resources` prop, which leveraged RESTful routes in the [`routerProvider`](https://refine.dev/docs/api-reference/core/providers/router-provider/) object under the hood.

Today, we are going to explore the [`liveProvider`](https://refine.dev/docs/api-reference/core/providers/live-provider/) prop as we implement realtime collaboration on a `canvas` so that `pixels` drawn on a `canvas` by one user is instantly seen by anyone else viewing it from another client.

There are two parts to our endeavor in this post, one in the **Supabase** backend and one in our **Refine** app:

1. Spin up Realtime servers from **Supabase** dashboard for the resource we want to publish changes for and subscribe to.
2. Registering the `liveProvider` prop inside `<Refine />` component and enabling subscription with `liveMode: auto`.

**Refine** has already added the implementation code for **Supabase** **Realtime** provider in the `liveProvider` object it created for us during project initialization. We will mostly play the laymen role here as we tour around the underlying principles and the magic at work behind the scenes.

Let's start by first making sure **Realtime** servers are set up for the `pixels` table in the **Supabase** backend.

## Setting Up Supabase Realtime

In order to make drawing collaborative between our users, we have to run [**Supabase** **Realtime**](https://supabase.com/docs/guides/realtime) servers and create channels for our `pixels` resource.

We can do this from the **Supabase** dashboard for the database we created. If you haven't already, please go ahead and select `Enable Realtime` for the `pixels` table from its editor:

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-11-refine-pixels-4%2Frealtime.png"  alt="supabase realtime" />
</div>

<br/>

Behind the scenes, **Supabase** spins up globally distributed **Realtime** servers that facilitate low latency communication between our app and **Supabase** database tables. **Supabase**'s **Realtime** feature spares a **channel** for each resource to be broadcasted. Any change in the resource is published in the channel, and clients that subscribe to the channel receive updates as soon as the change is made.

We are using **Supabase** **Realtime**'s [**PostgreSQL Change Data Capture**](https://supabase.com/docs/guides/realtime#postgres-cdc) feature which will now allow our app to publish mutation events to the `pixels` channel and also listen to those changes from a subscriber component.

This means mutation hooks such as [`useCreate()`](https://refine.dev/docs/api-reference/core/hooks/data/useCreate/) can now publish events to the `pixels` channel and consumer hooks like [`useList()`](https://refine.dev/docs/api-reference/core/hooks/data/useList/) are able to get instant updates for any change to `pixels`.

## `<Refine />`'s `liveProvider` Prop

Now, it's time to move our attention back to the `<Refine />` component in our app.

We already have the `liveProvider` prop passed in with the `liveProvider()` function from `@refinedev/supabase`:

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { liveProvider } from "@refinedev/supabase";
import { supabaseClient } from "./utility";

function App() {
  return (
    <Refine
      // ...
      liveProvider={liveProvider(supabaseClient)}
    />
  );
}
```

And that's it! The channel for `pixels` resource that was specified above in **Supabase** will broadcast all mutations on the `pixels` table. And any subscriber will be able to receive real time updates about the changes.

Now, let's try opening the app in two browsers, one with Google account and one with GitHub. Navigate to a canvas page, the same one in both and try adding some `pixels` from each. We'll see that `pixel`s created in one are displayed in the other in real time:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-18-refine-pixels-5/live-provider.gif"  alt="supabase realtime" />

<br />

This looks like a magic, because we don't know how this is happening. And very pleasant because `create refine-app` already generated the code that handles the PubSub logic for **Supabase** **PostregSQL CDC**. Let's have a look to see what's happening in the **Supabase** `liveProvider` object.

### Refine's Supabase `liveProvider` Object

**Refine**'s `liveProvider` object has the following signature:

```tsx
const liveProvider = {
	subscribe: ({ channel, params: { ids }, types, callback }) => any,
	unsubscribe: (subscription) => void,
	publish?: (event) => void,
};
```

In [`@refinedev/supabase`](https://github.com/refinedev/refine/blob/main/packages/supabase/src/liveProvider/index.ts) `version 5.0.0`, at the time of publishing this article, the `liveProvider` consists of only the `subscribe` and `unsubscribe` methods. Its implementation looks like this:

Let's have a look.

<details>
<summary>Show `liveProvider` code</summary>
<p>

```tsx title="@refinedev/supabase liveProvider"
import { LiveProvider, CrudFilter, CrudFilters } from "@refinedev/core";
import {
  RealtimeChannel,
  RealtimePostgresChangesPayload,
  SupabaseClient,
} from "@supabase/supabase-js";
import { liveTypes, supabaseTypes } from "../types";
import { mapOperator } from "../utils";

export const liveProvider = (supabaseClient: SupabaseClient): LiveProvider => {
  return {
    subscribe: ({ channel, types, params, callback }): RealtimeChannel => {
      const resource = channel.replace("resources/", "");

      const listener = (payload: RealtimePostgresChangesPayload<any>) => {
        if (
          types.includes("*") ||
          types.includes(liveTypes[payload.eventType])
        ) {
          if (
            liveTypes[payload.eventType] !== "created" &&
            params?.ids !== undefined &&
            payload.new?.id !== undefined
          ) {
            if (params.ids.map(String).includes(payload.new.id.toString())) {
              callback({
                channel,
                type: liveTypes[payload.eventType],
                date: new Date(payload.commit_timestamp),
                payload: payload.new,
              });
            }
          } else {
            callback({
              channel,
              type: liveTypes[payload.eventType],
              date: new Date(payload.commit_timestamp),
              payload: payload.new,
            });
          }
        }
      };

      const mapFilter = (filters?: CrudFilters): string | undefined => {
        if (!filters || filters?.length === 0) {
          return;
        }

        return filters
          .map((filter: CrudFilter): string | undefined => {
            if ("field" in filter) {
              return `${filter.field}=${mapOperator(filter.operator)}.${
                filter.value
              }`;
            }
            return;
          })
          .filter(Boolean)
          .join(",");
      };

      const client = supabaseClient.channel("any").on(
        "postgres_changes",
        {
          event: supabaseTypes[types[0]] as any,
          schema: "public",
          table: resource,
          filter: mapFilter(params?.filters),
        },
        listener,
      );

      return client.subscribe();
    },

    unsubscribe: async (channel: RealtimeChannel) => {
      supabaseClient.removeChannel(channel);
    },
  };
};
```

</p>
</details>

Both methods are concerned with subscription to the changes. That's because the publishing the event is done by mutation methods. In our case, it is done from the [`useCreate()`](/docs/data/hooks/use-create) hook we invoke to create a pixel.

## Broadcasting

If we look inside our `<CanvasShow />` component that is rendered at `/canvases/:id`, we have a `<CanvasItem />` component which basically displays all `pixel`s that belong to the `canvas` item being visited. `<CanvasItem />` is also the component from where a `pixel` is created, so let's look at that now:

```tsx title="src/pages/components/canvas/item.tsx"
import React from "react";
import { Typography } from "antd";

import { Pixel, Canvas } from "../../types";
import { DEFAULT_SCALE, PIXEL_SIZE } from "../../utility/constants";

const { Text } = Typography;

type CanvasItemProps = {
  canvas: Canvas;
  pixels: Pixel[] | undefined;
  scale?: number;
  border?: boolean;
  active?: boolean;
  onPixelClick?: (x: number, y: number) => void;
};

export const CanvasItem: React.FC<CanvasItemProps> = ({
  canvas: { id, name, width, height },
  pixels,
  scale = DEFAULT_SCALE,
  border = true,
  active = true,
  onPixelClick,
}) => {
  return (
    <div>
      {Array.from({ length: height }).map((_, i) => (
        <div key={`row-${i}`} style={{ display: "flex" }}>
          {Array.from({ length: width }).map((_, j) => (
            <div key={`row-${i}-col-${j}`}>
              <div
                onClick={() => {
                  if (onPixelClick && active) {
                    onPixelClick(j, i);
                  }
                }}
                style={{
                  cursor: active ? "pointer" : undefined,
                  width: PIXEL_SIZE * scale,
                  height: PIXEL_SIZE * scale,
                  border: border ? "0.5px solid rgba(0,0,0,0.05)" : undefined,
                  background:
                    pixels?.find((el) => el.x === j && el.y === i)?.color ??
                    "transparent",
                }}
              />
            </div>
          ))}
        </div>
      ))}
      {!active && <Text className="canvas-name-text">{name ?? id}</Text>}
    </div>
  );
};
```

The most relevant thing to look in the component above is the `onPixelClick` click event handler. It is a prop received by the `<CanvasItem />` from the `<CanvasShow />` component. It's original value is the `onSubmit()` function defined inside the `<CanvasShow />` component.

We'd like to focus on this `onSubmit` event handler, because it is what facilitates the creation of a `pixel`:

```tsx title="src/pages/canvases/show.tsx"
import { useCreate, useNavigation } from "@refinedev/core";

export const CanvasShow: React.FC = () => {
  // ...

  const { push } = useNavigation();
  const { mutate } = useCreate();

  const onSubmit = (x: number, y: number) => {
    if (!authenticated) {
      if (pathname) {
        return push(`/login?to=${encodeURIComponent(pathname)}`);
      }

      return push(`/login`);
    }

    if (typeof x === "number" && typeof y === "number" && canvas?.id) {
      mutate({
        resource: "pixels",
        values: {
          x,
          y,
          color,
          canvas_id: canvas?.id,
          user_id: identity.id,
        },
        meta: {
          canvas,
        },
        successNotification: false,
      });
    }
  };

  return /* ... */;
};
```

As we can see, with the call to `mutate` method of the `useCreate()` hook, a new entry is being added to the `pixels` table upon every click on the canvas.

And since we enabled realtime for the `pixels` table, each successful `create` action broadcasts the change to the `pixels` channel for subscribers to pick.
<br />

### Refine [`usePublish()`](https://refine.dev/docs/api-reference/core/hooks/live/usePublish/) Hook

The exact way it happens looks like this:

1. `useCreate()` hook is called from the consumer component.
2. `useCreate()`, behind the scenes, uses the live `usePublish()` hook to publish the `created` event to the `pixels` channel on **Supabase** **Realtime** servers.

The published event for `pixels` `create` action produces an object with the following signature:

```tsx
{
	channel: `resources/pixels`,
	type: "created",
	payload: {
			ids: ["id-of-created-pixel"]
	},
	date: new Date(),
}
```

Feel free to go through the [live hooks docs](https://refine.dev/docs/api-reference/core/providers/live-provider/#publish-events-from-hooks) for details about how live publishing is supported by `useCreate()` and other mutation hooks.

## Subscription

The changes to the `pixels` table can be subscribed by consumer components with the `useList()` hook. We are showing the `pixels` inside the `<CanvasShow />` component itself, but they are fetched inside the `<DisplayCanvas />` render-props component.

The `useList()` hook inside `<DisplayCanvas />` looks like this:

```tsx title="src/components/canvas/display.tsx"
import React, { ReactElement } from "react";
import { useList } from "@refinedev/core";

import { Canvas } from "../../types/canvas";
import { Pixel } from "../../types/pixel";

type DisplayCanvasProps = {
  canvas: Canvas;
  children: (pixels: Pixel[] | undefined) => ReactElement;
};

export const DisplayCanvas: React.FC<DisplayCanvasProps> = ({
  canvas: { id },
  children,
}) => {
  const { data } = useList<Pixel>({
    resource: "pixels",
    liveMode: "auto",
    meta: {
      select: "*, users(id, full_name, avatar_url)",
    },
    filters: [
      {
        field: "canvas_id",
        operator: "eq",
        value: id,
      },
    ],
    sorters: [
      {
        field: "created_at",
        order: "desc",
      },
    ],
    pagination: {
      mode: "off",
    },
  });

  const pixels = data?.data;

  return <>{children(pixels)}</>;
};
```

Among the loads of arguments and options passed to the `useList()` hook, we have used the `liveMode: auto` property which allows us to subscribe to the **Realtime** channel for the `pixels` resource.

With `liveProvider` disabled in the `<Refine />` component, `useList()` acts as a normal `dataProvider` hook.

With `liveProvider` activated, under the hood, `useList()` banks on **Refine**'s `useResourceSubscription()` live hook to communicate with the `pixels` channel.

### Refine `useResourceSubscription()` Hook

The actual subscription is done by the `liveProvider.subscribe()` method.

The `subscribe()` method is called from inside the `useResourceSubscription()` hook in order to subscribe to the `pixels` channel.

If you want to dive into the details, please feel free to do so in the [`liveProvider` docs here](https://refine.dev/docs/api-reference/core/providers/live-provider/).

## Summary

In today's part, we implemented real time collaboration for drawing `pixels` on `canvas` items using `<Refine />` component's `liveProvider` prop and its supporting hooks for publishing and subscribing to **Supabase**'s **Realtime** servers.

The `subscribe()` method on **Supabase**'s `liveProvider` object allows us to subscribe to a channel created for a resource. Subscription for the resource is triggered by the `useResourceSubscription()` hook called from data hooks that support live subscription - the `useList()` hook in our example.

Broadcasting, in turn, is initiated by the `usePublish()` hook called from a supported mutation hook for our resource - the `useCreate()` hook in this case.

We implemented real time collaboration very effortlessly due to the out-of-box solutions provided by **Refine**'s `@refinedev/supabase` package.

With this now, we have enabled multiple users to draw on a canvas at the same time and receive updates instantly.

[Click here to read "Creating an Admin Dashboard with Refine" article. &#8594](https://refine.dev/blog/refine-pixels-5/)
