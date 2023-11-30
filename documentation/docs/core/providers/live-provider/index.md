---
title: Live Provider
sidebar_label: Live Provider
---

## Overview

**Live Provider** is **Refine**'s built-in provider that enables real-time updates and interactions between the server and the client. **Refine** being agnostic as always allows you to integrate any solution of your choice

A live provider must include the following methods:

```ts
const liveProvider = {
    subscribe: ({ channel, params: { ids }, types, callback, meta }) => any,
    unsubscribe: (subscription) => void,
    publish?: ({ channel, type, payload, date, meta }) => void,
};
```

## Built-in Integrations

We have the following built-in integrations which you can use out-of-the-box.

**refine** includes some out-of-the-box live providers to use in your projects such as:

- **Ably** &#8594 [Source Code](https://github.com/refinedev/refine/blob/master/packages/ably/src/index.ts) - [Demo](https://codesandbox.io/embed/github/refinedev/refine/tree/master/examples/live-provider-ably/?view=preview&theme=dark&codemirror=1)
- **Supabase** &#8594 [Source Code](https://github.com/refinedev/refine/blob/master/packages/supabase/src/index.ts#L187)
- **Appwrite** &#8594 [Source Code](https://github.com/refinedev/refine/blob/master/packages/appwrite/src/index.ts#L252)
- **Hasura** &#8594 [Source Code](https://github.com/refinedev/refine/blob/master/packages/hasura/src/liveProvider/index.ts#L16)
- **Nhost** &#8594 [Source Code](https://github.com/refinedev/refine/blob/master/packages/nhost/src/liveProvider/index.ts#L16)

## Live Mode Options

To activate live features in **Refine**, you need to use the `liveMode` option.

**Global Configuration**: Add liveMode to the options prop of the `<Refine>` component. This sets it up for your entire application, and all hooks will automatically use this by default.

```tsx
<Refine
  liveProvider={liveProvider}
  options={
    // highlight-next-line
    { liveMode: "auto" }
  }
/>
```

**Hook-Specific Configuration**: Alternatively, you can apply liveMode directly to [integrated hooks](#integrated-hooks) individually for more precise control. This is useful if you don't want to apply live mode globally.

```tsx
useList({ liveMode: "auto" });
// or
useOne({ liveMode: "auto" });
```

**Priority Handling**: If you provide `liveMode` in both the `<Refine>` component and hooks, the config in the hook will take priority over the global `<Refine>` configuration.

### auto

Queries of related resources **will be invalidated** and **re-fetched** as new events from subscriptions are published.

For example, `posts` data of `useList` hook will be re-fetched when a new event is published for `posts` resource.

```tsx
const { data } = useList({ resource: "posts", liveMode: "auto" });
```

### manual

In `manual` mode, queries of the related resources **won't be invalidated**. Instead, the `onLiveEvent` function will be called when new events are published from the subscriptions.

`manual` mode can be used to prevent those

```tsx
const { data } = useList({
  liveMode: "manual",
  onLiveEvent: (event) => {
    console.log(event); // { channel: "resources/posts", type: "created", payload: { ids: ["1"] }, date: new Date() }
  },
});
```

### off

Disables live mode entirely.

## onLiveEvent

`onLiveEvent` is called when the new event(s) are published from the subscriptions.

```tsx
const { data } = useList({
  resource: "products",
  liveMode: "manual",
  // Called when new event(s) are published for `products` resource.
  onLiveEvent: (event) => {
    console.log(event); // { channel: "resources/posts", type: "created", payload: { ids: ["1"] }, date: new Date() }
  },
});
```

### With `<Refine>` component

When passed to the `<Refine>` component, `onLiveEvent` will be called for **every event** from any resource. It can be used for actions that are generally applicable to all events from active subscriptions.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";

import { liveProvider } from "./liveProvider";

const App: React.FC = () => {
  return (
    <Refine
      liveProvider={liveProvider}
      options={{ liveMode: "auto" }}
      onLiveEvent={(event) => {
        // Put your own logic based on event
      }}
    />
  );
};
```

## Integrated Hooks

Following hooks are supported by the **Live Provider** and will subscribe to their resource channels automatically.

### useList

```ts
useList({ resource: "posts" });

// Calls LiveProvider's `subscribe` method with following parameters:
{
    types: ["*"],
    channel: "resources/posts"
}
```

Since the following hooks are derivative of `useList` hook, they will subscribe to the same events.

| Package                | Hooks                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| @refinedev/core        | [useTable](/docs/api-reference/core/hooks/useTable), [useSelect](/docs/api-reference/core/hooks/useSelect/)                                                                                                                                                                                                                                                                                                                       |
| @refinedev/antd        | [useTable](/docs/api-reference/antd/hooks/table/useTable), [useEditableTable](/docs/api-reference/antd/hooks/table/useEditableTable.md), [useSelect](/docs/api-reference/antd/hooks/field/useSelect), [useSimpleList](/docs/api-reference/antd/hooks/list/useSimpleList.md), [useCheckboxGroup](/docs/api-reference/antd/hooks/field/useCheckboxGroup.md), [useRadioGroup](/docs/api-reference/antd/hooks/field/useRadioGroup.md) |
| @refinedev/react-table | [useTable](/docs/packages/documentation/react-table)                                                                                                                                                                                                                                                                                                                                                                              |
| @refinedev/mui         | [useDataGrid](/docs/api-reference/mui/hooks/useDataGrid/), [useAutoComplete](/docs/api-reference/mui/hooks/useAutoComplete)                                                                                                                                                                                                                                                                                                       |
| @refinedev/mantine     | [useSelect](/docs/api-reference/mantine/hooks/useSelect)                                                                                                                                                                                                                                                                                                                                                                          |

### `useOne`

```ts
useOne({ resource: "posts", id: "1" });


// Calls LiveProvider's `subscribe` method with following parameters:
{
    types: ["*"],
    channel: "resources/posts",
    params: { ids: ["1"] }
}
```

Since the following hooks are derivative of `useOne` hook, they will subscribe to the same events.

| Package            | Hooks                                                                                                                                                                                                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| @refinedev/core    | [useShow](/docs/api-reference/core/hooks/show/useShow.md), [useForm](/docs/api-reference/core/hooks/useForm/)                                                                                                                                                              |
| @refinedev/antd    | [useForm](/docs/api-reference/antd/hooks/form/useForm.md), [useModalForm](/docs/api-reference/antd/hooks/form/useModalForm.md), [useDrawerForm](/docs/api-reference/antd/hooks/form/useDrawerForm.md), [useStepsForm](/docs/api-reference/antd/hooks/form/useStepsForm.md) |
| @refinedev/mantine | [useForm](/docs/api-reference/mantine/hooks/form/useForm), [useDrawerForm](/docs/api-reference/mantine/hooks/form/useDrawerForm), [useModalForm](/docs/api-reference/mantine/hooks/form/useModalForm), [useStepsForm](/docs/api-reference/mantine/hooks/form/useStepsForm) |

### `useMany`

```ts
useMany({ resource: "posts", ids: ["1", "2"] });

// Calls LiveProvider's `subscribe` method with following parameters:
{
    types: ["*"],
    channel: "resources/posts"
    params: { ids: ["1", "2"] }
}
```

Since the following hooks are using `useMany` hook, they will subscribe to the same events.

| Package         | Hooks                                                  |
| --------------- | ------------------------------------------------------ |
| @refinedev/core | [useSelect](/docs/api-reference/core/hooks/useSelect/) |

## Publish Events from Hooks

**refine** publishes these events in the hooks. Let's see the usage of hooks and what kind of events are published:

### `useCreate`

```ts
const { mutate } = useCreate();

mutate({
  resource: "posts",
  values: {
    title: "New Post",
  },
});

// Calls Live Provider's publish method with following parameters:
{
    channel: `resources/posts`,
    type: "created",
    payload: {
        ids: ["id-of-created-post"]
    },
    date: new Date(),
}
```

### `useCreateMany`

```ts
const { mutate } = useCreateMany();

mutate({
  resource: "posts",
  values: [
    {
      title: "New Post",
    },
    {
      title: "Another New Post",
    },
  ],
});

// Calls Live Provider's publish method with following parameters:
{
    channel: `resources/posts`,
    type: "created",
    payload: {
        ids: ["id-of-new-post", "id-of-another-new-post"]
    },
    date: new Date(),
}
```

### `useDelete`

```ts
const { mutate } = useDelete();

mutate({
  resource: "posts",
  id: "1",
});

// Calls Live Provider's publish method with following parameters:
{
    channel: `resources/posts`,
    type: "deleted",
    payload: {
        ids: ["1"]
    },
    date: new Date(),
}
```

### `useDeleteMany`

```ts
const { mutate } = useDeleteMany();

mutate({
  resource: "posts",
  ids: ["1", "2"],
});

// Calls Live Provider's publish method with following parameters:
{
    channel: `resources/posts`,
    type: "deleted",
    payload: {
        ids: ["1", "2"]
    },
    date: new Date(),
}
```

### `useUpdate`

```ts
const { mutate } = useUpdate();

mutate({
  resource: "posts",
  id: "2",
  values: { title: "New Post Title" },
});

// Calls Live Provider's publish method with following parameters:
{
    channel: `resources/posts`,
    type: "updated",
    payload: {
        ids: ["1"]
    },
    date: new Date(),
}
```

### `useUpdateMany`

```ts
const { mutate } = useUpdateMany();

mutate({
  resource: "posts",
  ids: ["1", "2"],
  values: { title: "New Post Title" },
});

// Calls Live Provider's publish method with following parameters:
{
    channel: `resources/posts`,
    type: "updated",
    payload: {
        ids: ["1", "2"]
    },
    date: new Date(),
}
```

## Publishing Events from the Client Side

Publishing on the client side must be avoided generally. It's recommended to handle it on the server side.

Events published from the server must be in the following ways:

- When creating a record:

```ts
{
    channel: `resources/${resource}`,
    type: "created",
    payload: {
        ids: [id]
    },
    date: new Date(),
}
```

- When deleting a record:

```ts
{
    channel: `resources/${resource}`,
    type: "deleted",
    payload: {
        ids: [id]
    },
    date: new Date(),
}
```

- When updating a record:

```ts
{
    channel: `resources/${resource}`,
    type: "updated",
    payload: {
        ids: [id]
    },
    date: new Date(),
}
```
