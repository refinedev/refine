---
id: refresh-button
title: Refresh
---

import defaultUsage from '@site/static/img/guides-and-concepts/components/buttons/refresh/default.png';

`<RefreshButton>` is using Ant Design's [`<Button>`](https://ant.design/components/button/) component. It executes the [`useOne`](../../hooks/data/useOne.md) method provided by your dataProvider.

## Usage

```tsx
import { RefreshButton } from "@pankod/refine";

export const MyRefreshComponent = () => {
    return <RefreshButton />;
};
```

Looks like this:

<div>
    <img  width="20%" src={defaultUsage} alt="Default Refresh Button" />
</div>

## Properties

### `recordItemId`

`recordItemId` allows us to manage which data is refreshed.

```tsx
import { RefreshButton } from "@pankod/refine";

export const MyRefreshComponent = () => {
    return <RefreshButton resourceName="posts" recordItemId="1" />;
};
```

Clicking the button will trigger the `useOne` method and then the record whose resource is "post" and whose id is "1" fetches.

:::note
`<RefreshButton>` component reads the id information from the route by default.
:::

### `resourceName`

`resourceName` allows us to manage which resource is refreshed.

```tsx
import { RefreshButton } from "@pankod/refine";

export const MyRefreshComponent = () => {
    return <RefreshButton resourceName="categories" recordItemId="2" />;
};
```

Clicking the button will trigger the `useOne` method and then the record whose resource is "categories" and whose id is "2" fetches.

:::note
`<RefreshButton>` component reads the resource name from the route by default.
:::

## API Reference

### Properties

| Property     | Description                                  | Type                                                                                                             | Default                                                   |
| ------------ | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| props        | Ant Design button props                      | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; recordItemId?: string; }` |                                                           |
| resourceName | Determines which resource to use for refresh | `string`                                                                                                         | Resource name acquired from route                         |
| recordItemId | Determines which id to use for refresh       | `string`                                                                                                         | Record id acquired from route                             |
| children     | Set the button text                          | `ReactNode`                                                                                                      | `"Refresh"`                                               |
| icon         | Set the icon component of button             | `ReactNode`                                                                                                      | [`<RedoOutlined />`](https://ant.design/components/icon/) |
| onClick      | Set the handler to handle click event        | `(event) => void`                                                                                                | trigger the `useOne` method for refresh                   |
