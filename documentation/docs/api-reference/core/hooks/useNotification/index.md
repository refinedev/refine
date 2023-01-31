---
title: useNotification
siderbar_label: useNotification
source: https://github.com/refinedev/refine/blob/next/packages/core/src/hooks/notification/useNotification/index.ts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

It can be used to `open` or `close` notification at any time. It returns the `open` and `close` method from [`notificationProvider`](/docs/api-reference/core/providers/notification-provider/) under the hood.


<!-- > This feature is only available if you use a [`Notification Provider`](/api-reference/core/providers/notification-provider.md) -->

If you're looking for a complete notification infrastructure, **refine** has out-of-the-box support for the libraries below:

<Tabs
  defaultValue="antd"
  values={[ 
    {label: 'Antd Design', value: 'antd'}, 
    {label: 'Material UI', value: 'mui'},
    {label: 'Mantine', value: 'mantine'},
    {label: 'Chakra UI', value: 'chakra'},
    {label: 'Custom', value: 'custom'}, 
  ]}>

  <TabItem value="custom">

  Create a custom notification provider by following the [guide](/docs/api-reference/core/providers/notification-provider/#creating-an-notificationprovider).

  </TabItem>

  <TabItem value="antd">

  ```tsx
  import { notificationProvider} from "@pankod/refine-antd";

  return (
    <Refine
      //...
      notificationProvider={notificationProvider}
    />
  );
  ```
  </TabItem>

  <TabItem value="mui">

  ```tsx
  import { notificationProvider} from "@pankod/refine-mui";

  return (
    <Refine
      //...
      notificationProvider={notificationProvider}
    />
  );
  ```
  </TabItem>

  <TabItem value="mantine">

  ```tsx
  import { notificationProvider} from "@pankod/refine-mantine";

  return (
    <Refine
      //...
      notificationProvider={notificationProvider}
    />
  );
  ```
  </TabItem>

  <TabItem value="chakra">

  ```tsx
  import { notificationProvider} from "@pankod/refine-chakra";

  return (
    <Refine
      //...
      notificationProvider={notificationProvider}
    />
  );
  ```
  </TabItem>
</Tabs>

## Basic Usage

Here is a basic example of how to use `useNotification` hook.

*TODO: Add example*

## Properties
### `open`

You can call this method to open a new notification box.

```tsx
const { open } = useNotification();

open?.({
    type: "success", // "success" | "error" | "progress"
    message: "Success",
    description: "This is a success message",
});
```
> Refer to the [`Open Notification Params`](/docs/api-reference/core/interfaceReferences/#open-notification-params) interface for more information →

### `close`

You can close a notification with a `key`.

```tsx
const { close } = useNotification();

close?.("notification-key");
```
> Refer to the [`Close Notification Params`](/docs/api-reference/core/interfaceReferences/#close-notification-params) interface for more information →

:::info
You must pass a `key` to the `open` method. This key is used to close the notification.
:::


## FAQ
### How to use a undoable notification?

It should be `type=progress` to show undoable notifications. A function can then be triggered.




## API Reference
### Return Values

| Property | Description               | Type                                                                                                   |
| -------- | ------------------------- | ------------------------------------------------------------------------------------------------------ |
| open     | Open Notification Params  | [`Open Notification Params`](/docs/api-reference/core/interfaceReferences/#open-notification-params)   |
| close    | Close Notification Params | [`Close Notification Params`](/docs/api-reference/core/interfaceReferences/#close-notification-params) |
