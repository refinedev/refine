---
id: useNotification
title: useNotification
---

It can be used to `open` or `close` notification at any time. It returns the `open` and `close` method from [`notificationProvider`](/core/providers/notification-provider.md) under the hood.

## Usage

```tsx
import { useNotification } from "@pankod/refine-core";

const { open, close } = useNotification();
```

:::caution
This hook can only be used if [`notificationProvider`](/core/providers/notification-provider.md) is provided. 
:::

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