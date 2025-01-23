---
title: Audit Log With Refine
description: We'll apply Refine's built-in audit logging functionality
slug: refine-pixels-7
authors: abdullah_numan
tags: [refine-week, Refine, supabase]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-20-refine-pixels-7%2Fsocial.png
hide_table_of_contents: false
---

### RefineWeek series

- Day 1 - [Pilot & Refine architecture](https://refine.dev/blog/refine-pixels-1/)
- Day 2 - [Setting Up the Client App](https://refine.dev/blog/refine-pixels-2/)
- Day 3 - [Adding CRUD Actions and Authentication](https://refine.dev/blog/refine-pixels-3/)
- Day 4 - [Adding Realtime Collaboration](https://refine.dev/blog/refine-pixels-4/)
- Day 5 - [Creating an Admin Dashboard with Refine](https://refine.dev/blog/refine-pixels-5/)
- Day 6 - [Implementing Role Based Access Control](https://refine.dev/blog/refine-pixels-6/)
- Day 7 - [Audit Log With Refine](https://refine.dev/blog/refine-pixels-7/)

In this post, we apply **Refine**'s built-in audit logging functionality to our **Pixels Admin** app and to the **Pixels** client app that we built previously in this [**RefineWeek**](http://localhost:3000/week-of-refine/) series. **Refine**'s audit logging system comes already baked into its data hooks and inside supplemental data provider packages, like the [`@refinedev/supabase`](https://www.npmjs.com/package/@refinedev/supabase). Today we are going to get it to work by using the `auditLogProvider` prop.

This is Day 7, and **RefineWeek** is a quickfire tutorial guide that aims to help developers learn the ins-and-outs of **Refine**'s powerful capabilities and get going with **Refine** within a week.

## Overview

In this series, we have been exploring **Refine**'s internals by building two apps: the **Pixels** client that allows users to create and collboratively draw on a canvas, and the **Pixels Admin** app that allows admins and editors to manage canvases created by users.

We implemented CRUD actions for **Pixels** client app on [Day 3](https://refine.dev/blog/refine-pixels-3/) and for the admin app on [Day 5](https://refine.dev/blog/refine-pixels-5/). In this episode, we enable audit logging on database mutations by defining the `auditLogProvider` object and passing it to `<Refine />`.

We are using **Refine**'s supplemental [**Supabase**](https://supabase.com/) `@refinedev/supabase` package for our `dataProvider` client. The database mutation methods in **Supabase** `dataProvider` already come with audit logging mechanism implemented on them. For each successful database mutation, i.e. `create`, `update` and `delete` actions, a log event is emitted and a `params` object representing the change is made available to the `auditLogProvider.create()` method.

We will store the log entries in a `logs` table in our **Supabase** database. So, we have to set up the `logs` table with a shape that complies with the `params` object sent from the mutation.

We will start by examining the shape of the `params` object and specifying how the `logs` table should look like - before we go ahead and create the table with appropriate columns from our **Supabase** dashboard. We will then work on the `auditLogProvider` methods, and use the `useLogList()` hook to list `pixels` logs inside a modal for each canvas item. Finally, like we did in other parts, we will dig into the existing code to explore how **Refine** emits a log event and how mutation methods implement audit logging under the hood.

Let's dive in!

## `logs` Table for **Refine** Audit Logs

We need to set up the `logs` table from the **Supabase** dashboard. But let's first figure out the columns we need for the table. The table should have as columns the properties of the log `params` object emitted by a mutation.

### **Refine**'s Log Params Object

A successful resource `create` action makes the following log `params` object available to the `auditLogProvider.create()` method:

```tsx
{
  "action": "create",
  "resource": "pixels",
  "data": {
    "id": "1",
    "x": "3",
    "y": "3",
    "color": "cyan",
  },
  "meta": {
    "dataProviderName": "Google",
    "id": "1"
  }
}
```

This object should be passed to the audit log provider's `create` method in order to create a new record in the `logs` table.

Likewise, the `update` and `delete` actions of a resource - for example, `pixels` - emit an object with similar, overlapping variations. More on that [here](https://refine.dev/docs/api-reference/core/providers/audit-log-provider/#create).

It is important **_not_** to confuse a resource `create` action with that of the `auditLogProvider`. The resource `create` action is carried out by the `dataProvider.create()` method and produces the log `params` object. The `auditLogProvider.create()` method consumes the `params` object and creates an entry in the `logs` table.

For our case, we are focused on logging the `pixels` `create` actions on a canvas in our **Pixels** client app.

### The `meta` Object

Notice, the `meta.id` property on the log `params` object above. It represents the `id` of the **resource item** on which the event was created.

It is possible to append useful data to the `meta` field by passing the data to the `meta` object when the mutation is invoked from a hook. For example, we can add the `canvas` property to the `metaData` object inside the argument passed to the `mutate` function of the `useCreate()` hook:

```tsx
const { mutate } = useCreate();

mutate({
  resource: "pixels",
  values: { x, y, color, canvas_id: canvas?.id, user_id: identity.id },
  meta: {
    canvas,
  },
});
```

And it will be included in the log `params` object's `meta` field:

```tsx
{
  "action": "create",
  "resource": "pixels",
  "author": {
    "id": ""
    // ...other_properties
  },
  "data": {
    "id": "1",
    "x": "3",
    "y": "3",
    "color": "cyan",
  },
  "meta": {
    "dataProviderName": "Google",
    "id": "1",
    "canvas": {
      "id": "",
      // ...etc.
    },
  }
}
```

Properties inside the `meta` object are handy for filtering `get` requests to the `logs` table. We are going to use this when we define the `auditLogProvider.get()` method.

Notice also the `author` property. It is added when a user is authenticated. Otherwise, it is excluded.

### The `logs` Table

Emanating from the log params object above, our `logs` table looks like this:

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-20-refine-pixels-7%2Fdiagram.png"  alt="react crud app" />
</div>

<br/>

Let's go ahead and create this table from our **Supabase** dashboard before we move forward and start working on the `auditLogProvider` methods.

## `<Refine />`'s `auditLogProvider` Object

`<Refine />`'s audit log provider object should have three methods. It has the following type signature:

```tsx
const auditLogProvider = {
  create: (params: {
    resource: string;
    action: string;
    data?: any;
    author?: {
      name?: string;
      [key: string]: any;
    };
    previousData?: any;
    meta?: Record<string, any>;
  }) => void;
  get: (params: {
    resource: string;
    action?: string;
    meta?: Record<string, any>;
    author?: Record<string, any>;
    metaData?: MetaDataQuery;
  }) => Promise<any>;
  update: (params: {
    id: BaseKey;
    name: string;
  }) => Promise<any>;
};
```

Based on this, our `auditLogProvider` looks like this:

```tsx title="providers/auditLogProvider.ts"
import { AuditLogProvider } from "@refinedev/core";
import { dataProvider } from "@refinedev/supabase";

import { supabaseClient } from "../utility";

export const auditLogProvider: AuditLogProvider = {
  get: async ({ resource, meta }) => {
    const { data } = await dataProvider(supabaseClient).getList({
      resource: "logs",
      filters: [
        {
          field: "resource",
          operator: "eq",
          value: resource,
        },
        {
          field: "meta->canvas->id",
          operator: "eq",
          value: `"${meta?.canvas?.id}"`,
        },
      ],
      sort: [{ order: "desc", field: "created_at" }],
    });

    return data;
  },
  create: (params) => {
    return dataProvider(supabaseClient).create({
      resource: "logs",
      variables: params,
    });
  },
  update: async ({ id, name }) => {
    const { data } = await dataProvider(supabaseClient).update({
      resource: "logs",
      id,
      variables: { name },
    });

    return data;
  },
};
```

We'll analyze all three methods in the below sections.

### `create`

The `create` method is very straightforward. It just takes the log `params` object sent when the log event was emitted, and adds an entry to the `logs` table.

It is called when any of the three mutation actions, namely `create`, `update` and `delete` is completed successfully.

### `update`

The `update` method is similar. Our implementation allows updating the `name` of the log item. Hence we need to add a `name` column in our database. If you haven't already noticed it, we have a `name` column in our `logs` table and this is the reason. The `update` methods queries the database with the `id` of the log entry and allows updating its `name`. More information is available in [this section](https://refine.dev/docs/api-reference/core/providers/audit-log-provider/#update).

### `get`

The `get` method is the most significant of the three, especially with the use of the `meta` argument. What we're doing first is using the `dataProvider.getList()` method to query the `logs` table.

Then inside the `filters` array, we're first filtering `log` records with the `resource` field and then with the nested embedded field of `meta->canvas->id`. As we will encounter in the next section, the `canvas` property will be appended to the `meta` field of the log `params` object. It will be done by passing the `canvas` to the `meta` object of the argument passed to the mutation method of `useCreate()` data hook. It will therefore be stored in the `log` record.

When we want to query the `logs` table, we will use the `useLogList()` audit log hook that consumes the `get()` method. The `meta?.canvas?.id` comes from the `meta` argument passed to `useLogList()`.

With this done, we are ready to log all `pixels` creations and show the `pixels` log list for each of our canvases.

## Audit Logging with **Refine**

In order to enable audit logging feature in our app, we have to first pass the `auditLogProvider` prop to `<Refine />`. Since `pixels` are being created in the **Pixels** app, that's where we are going to implement it:

```tsx title="App.tsx"
<Refine
  ...
  auditLogProvider={auditLogProvider}
/>
```

This makes all database mutations emit a log event and send the log `params` object towards the `auditLogProvider.create()` method. Mutations that emit an event are `create()`, `update()` and `delete()` methods of the `dataProvider` object.

When these methods are consumed from components using corresponding hooks, and given the `logs` table is set up properly, a successful mutation creates an entry in the `logs` table.

### Audit Log `create` Action

In the **Pixels** app, `pixels` are created by the `onSubmit()` event handler defined inside the `<CanvasShow />` component. The `<CanvasShow />` component looks like this:

<details>
<summary>Show CanvasShow code</summary>
<p>

```tsx title="pages/canvases/show.tsx"
import { useState } from "react";
import {
  useCreate,
  useGetIdentity,
  useNavigation,
  useShow,
  useParsed,
  useIsAuthenticated,
} from "@refinedev/core";
import { useModal } from "@refinedev/antd";

import { LeftOutlined } from "@ant-design/icons";
import { Button, Typography, Spin, Modal } from "antd";

import { CanvasItem, DisplayCanvas } from "../../components/canvas";
import { ColorSelect } from "../../components/color-select";
import { AvatarPanel } from "../../components/avatar";
import { colors } from "../../utility";
import { Canvas } from "../../types";
import { LogList } from "../../components/logs";

const { Title } = Typography;

type Colors = typeof colors;

export const CanvasShow: React.FC = () => {
  const { pathname } = useParsed();
  const [color, setColor] = useState<Colors[number]>("black");
  const { modalProps, show, close } = useModal();
  const { data: identity } = useGetIdentity<any>();
  const { data: { authenticated } = {} } = useIsAuthenticated();

  const {
    queryResult: { data: { data: canvas } = {} },
  } = useShow<Canvas>();
  const { mutate } = useCreate();
  const { list, push } = useNavigation();

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

  return (
    <div className="container">
      <div className="paper">
        <div className="paper-header">
          <Button
            type="text"
            onClick={() => list("canvases")}
            style={{ textTransform: "uppercase" }}
          >
            <LeftOutlined />
            Back
          </Button>
          <Title level={3}>{canvas?.name ?? canvas?.id ?? ""}</Title>
          <Button type="primary" onClick={show}>
            View Changes
          </Button>
        </div>
        <Modal
          title="Canvas Changes"
          {...modalProps}
          centered
          destroyOnClose
          onOk={close}
          onCancel={() => {
            close();
          }}
          footer={[
            <Button type="primary" key="close" onClick={close}>
              Close
            </Button>,
          ]}
        >
          <LogList currentCanvas={canvas} />
        </Modal>

        {canvas ? (
          <DisplayCanvas canvas={canvas}>
            {(pixels) =>
              pixels ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 48,
                  }}
                >
                  <div>
                    <ColorSelect selected={color} onChange={setColor} />
                  </div>
                  <CanvasItem
                    canvas={canvas}
                    pixels={pixels}
                    onPixelClick={onSubmit}
                    scale={(20 / (canvas?.width ?? 20)) * 2}
                    active={true}
                  />
                  <div style={{ width: 120 }}>
                    <AvatarPanel pixels={pixels} />
                  </div>
                </div>
              ) : (
                <div className="spin-wrapper">
                  <Spin />
                </div>
              )
            }
          </DisplayCanvas>
        ) : (
          <div className="spin-wrapper">
            <Spin />
          </div>
        )}
      </div>
    </div>
  );
};
```

</p>
</details>

The `mutate()` function being invoked inside `onSubmit()` handler is destrcutured from the `useCreate()` hook. We know that audit logging has been activated for the `useCreate()` hooks, so a successful `pixels` creation sends the `params` object to `auditLogProvider.create` method.

Notice that we are passing the `currentCanvas` as `metaData.canvas`, which we expect to be populated inside the `meta` property of the log `params` object. As we'll see below, we are going to use it to filter our `GET` request to the `logs` table using `useLogList()` hook.

### Audit Log List with **Refine**

We are going to display the `pixels` log list for a canvas in the `<LogList />` component. In the **Pixels** app, it is contained in the `<CanvasShow />` page and housed inside a modal accessible by clicking on the `View Changes` button. The `<LogList />` component uses the `useLogList()` hook to query the `logs` table:

```tsx title="components/logs/list.tsx"
import { useLogList } from "@refinedev/core";
import { Avatar, List, Typography } from "antd";

import { formattedDate, timeFromNow } from "../../utility/time";

type TLogListProps = {
  currentCanvas: any;
};

export const LogList = ({ currentCanvas }: TLogListProps) => {
  const { data } = useLogList({
    resource: "pixels",
    meta: {
      canvas: currentCanvas,
    },
  });

  return (
    <List
      size="small"
      dataSource={data}
      renderItem={(item: any) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar src={item?.author?.user_metadata?.avatar_url} size={20} />
            }
          />
          <Typography.Text style={{ fontSize: "12px" }}>
            <strong>{item?.author?.user_metadata?.email}</strong>
            {` ${item.action}d a pixel on canvas: `}
            <strong>{`${item?.meta?.canvas?.name} `}</strong>
            <span style={{ fontSize: "10px", color: "#9c9c9c" }}>
              {`${formattedDate(item.created_at)} - ${timeFromNow(
                item.created_at,
              )}`}
            </span>
          </Typography.Text>
        </List.Item>
      )}
    />
  );
};
```

If we examine closely, the `meta` property of the argument object passed to `useLogList()` hook contains the `canvas` against which we want to filter the `logs` table. If we revisit the `auditLogProvider.create` method, we can see that the `value` field of the second filter corresponds to this canvas:

```tsx
{
  field: "meta->canvas->id",
  operator: "eq",
  value: `"${meta?.canvas?.id}"`,
}
```

We are doing this to make sure that we are getting only the logs for the current canvas.

With this completed, if we ask for the modal in the `CanvasShow` page, we should be able to see the pixels log list:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-18-refine-pixels-5/client-audit-log.jpg"  alt="react crud app" />

<br />

We don't have a case for creating a pixel in the **Pixels Admin** app. But we can go ahead and implement the same pixels `<LogList />` component for each `canvas` item in the `<CanvasList />` page at `/canvases`. The code is essentially the same, but the `View Changes` button appears inside each row in the table:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-18-refine-pixels-5/admin-audit-log.jpg"  alt="react crud app" />

<br />

## Low Level Inspection

We are now going to examine how audit logging comes built-in inside **Refine**'s mutation hooks.

### Log `params` Object

We mentioned earlier that each successful mutation emits a log event and sends a `params` object to the `auditLogProvider.create()` method. Let's dig into the code to see how it is done.

The log `params` object is sent to the `auditLogProvider.create()` method from inside the `log` object returned from the `useLog()` hook:

```tsx title="@refinedev/core/src/hooks/auditLog/useLog/index.ts"
// v4.5.8
const log = useMutation<TLogData, Error, LogParams, unknown>(async (params) => {
  const resource = resources.find((p) => p.name === params.resource);
  const logPermissions = resource?.options?.auditLog?.permissions;

  if (logPermissions) {
    if (!hasPermission(logPermissions, params.action)) {
      return;
    }
  }

  let authorData;
  if (isLoading) {
    authorData = await refetch();
  }

  return await auditLogContext.create?.({
    ...params,
    author: identityData ?? authorData?.data,
  });
});
```

As we can see above, `params` is made available by reaching the provider via the `auditLogContext.create()` method.

Prior to that, the `log` object here utilizes `react-query`'s `useMutation()` hook to catch the results of the mutation with an observer and emit the event.

### Inside Mutation Hooks

Inside mutation hooks, the `useLog()` hook is used to create a log automatically after a successful resource mutation. For example, the `useCreate()` data hook implements it with the `mutate` method on `log` object returned from `useLog()`:

```tsx title="@refinedev/core/src/hooks/data/useCreate.ts"
// v4.5.8

log?.mutate({
  action: "create",
  resource,
  data: values,
  meta: {
    dataProviderName: pickDataProvider(resource, dataProviderName, resources),
    id: data?.data?.id ?? undefined,
    ...rest,
  },
});
```

The code snippets above are enough to give us a peek inside what is going, but feel free to explore the entire files for more insight.

## Summary

In this episode, we activated **Refine**'s built-in audit logging feature by defining and passing the `auditLogProvider`prop to `<Refine />`. We we learned that **Refine** implements audit logging from its resource mutation hooks by sending a log `params` object to the `auditProvider.create()` method, and when audit logging is activated, every successful mutation creates an entry in the `logs` table.

We implemented audit logging for `create` actions of the `pixels` resource in our **Pixels** app and saved the entries in a `logs` table in our **Supabase** database. We then fetched the pixel creation logs for each canvas using the `useLoglist()` hook and displayed the in a modal. We leverage the `meta` property of the log `params` object in order to filter our `auditProvider.get()` request.

## Series Wrap Up

In this **RefineWeek** series, built the following two apps with **Refine**:

[**Pixels**](https://github.com/refinedev/refine/tree/main/examples/pixels) - the client app that allows users to create a canvas and draw collaboratively on
[**Pixels Admin**](https://github.com/refinedev/refine/tree/main/examples/pixels-admin) - the admin dashboard that helps managers manage users and canvases

While building these twp apps, we have covered core **Refine** concepts like the providers and hooks in significant depth. We had the opportunity to use majority of the providers with the features we added to these apps. Below is the brief outline of the providers we learned about:

- [`authProvider`](https://refine.dev/docs/api-reference/core/providers/auth-provider/): used to handling authentication. We used it to implement email / password based authentication as well as social logins with Google and GitHub.
- [`dataProvider`](https://refine.dev/docs/api-reference/core/providers/data-provider/): used to fetch data to and from a backend API by sending HTTP requests. We used the supplementary **Supabase** package to build a gallery of canvases, a public dashboard and a private dashboard for role based managers.
- [`routerProvider`](https://refine.dev/docs/api-reference/core/providers/router-provider/): used for routing. We briefly touched over how it handles routing and resources following RESTful conventions.
- [`liveProvider`](https://refine.dev/docs/api-reference/core/providers/live-provider/): used to implement real time Publish Subscribe features. We used it for allowing users to draw pixels collaboratively on a canvas.
- [`accessControlProvider`](https://refine.dev/docs/api-reference/core/providers/accessControl-provider/): used to implement authorization. We implemented a Role Based Access Control authorization for `editor` and `admin` roles.
- [`auditLogProvider`](https://refine.dev/docs/api-reference/core/providers/audit-log-provider/): used for logging resource mutations. We used it to log and display pixels drawing activities on a canvas.
- [`notificationProvider`](https://refine.dev/docs/api-reference/core/providers/notification-provider/): used for posting notifications for resource actions. We did not cover it, but used it inside our code.

There are more to **Refine** than what we have covered in this series. We have made great strides in covering these topics so far by going through the documentation, especially to understand the provider - hooks interactions.

We also covered supplementary **Supabase** anhd **Ant Design** packages. **Refine** has fantastic support for **Ant Design** components. And we have seen how **refine-antd** components complement data fetching by the data providers and help readily present the response data with hooks like `useSimpleList()`, `useTable()` and `useEditableTable()`.

We can always build on what we have covered so far. There are plenty of things that we can do moving froward, like customizing the layout, header, auth pages, how exactly the `notificationProvider` works, how to implement the `i18nProvider`, etc.

Please feel free to reach out to the **Refine** team or join the [**Refine** Discord channel](https://discord.gg/refine) to learn more and / or contribute!
