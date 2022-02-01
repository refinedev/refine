---
id: notification-provider
title: Notification Provider
---

**refine** let's you set a notification API by providing the `notificationProvider` property to the `<Refine>` component.


`notificationProvider` is an object with methods that **refine** uses when necessary. They also can be accessed with [`useNotification`](/core/hooks/useNotification.md) hook.

An `notificationProvider` must include following methods:


```tsx
const notificationProvider = {
    show: () => {},
    close: () => {},
};
```

:::tip
If you are using Ant Design you can use `notificationProvider` exported from `@pankod/refine-antd` package. It is compatible with Ant Design's [`notification`](https://ant.design/components/notification/#header) component.

```tsx
import { notificationProvider } from "@pankod/refine-antd";

<Refine
    ...
    notificationProvider={notificationProvider}
/>
```
:::

## Usage

To use `notificationProvider` in refine, we have to pass the authProvider to the `<Refine />` component.

```tsx
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

//highlight-start
const notificationProvider = {
    open: () => {},
    close: () => {},
};
//highlight-end

const App = () => {
    return (
        <Refine
            //highlight-next-line
            notificationProvider={notificationProvider}
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
        />
    );
};
```

By default, refine doesn't require `notificationProvider` configuration.

If an `notificationProvider` property is not provided, **refine** will use the default `notificationProvider`. This default `notificationProvider` lets the app work without an notification.
If your app doesn't require `notification`, no further setup is necessary for the app to work.


## Creating an `notificationProvider`

We will build a simple `notificationProvider` from scratch to show the logic of how `notificationProvider` methods interact with the app. For this, we will use the [`react-toastify`](https://github.com/fkhadra/react-toastify) package, which is very **popular** in the **React Ecosystem**.


### `open`

**refine** calls this method when it wants to open a notification. It also helps you to get the right notification by sending some parameters to the **refine** open method. For example, `message`, `description`, etc...

Here we open a **notification** with [`react-toastify`](https://github.com/fkhadra/react-toastify).

```tsx
import { toast } from "react-toastify";

const notificationProvider = {
    open: ({ message, key, type }) => {
        toast(message, {
            toastId: key,
            type,
        });
    },
};

```

`open` method will be accessible via [`useNotification`](/core/hooks/useNotification.md) hook.

```tsx
import { useNotification } from "@pankod/refine-core";

const { open } = useNotification();

open({
    message: "Hey",
    description: "I <3 Refine",
    key: "unique-id"
});
```

