---
id: delete-button
title: Delete
---

import defaultUsage from '@site/static/img/guides-and-concepts/components/buttons/delete/default.gif';

`<DeleteButton>` is using Ant Design's [`<Button>`](https://ant.design/components/button/) and [`<Popconfirm>`](https://ant.design/components/popconfirm/) components. To prevent instant deletion when clicked a pop confirms pops up and asks for confirmation. When confirmed it execustes `useDelete` method provided by you dataProvider.

## Usage

```tsx
import { DeleteButton } from "@pankod/refine";

export const MyDeleteComponent = () => {
    return <DeleteButton />;
};
```

Looks like this:

<div>
    <img  width="30%" src={defaultUsage} alt="Default Delete Button" />
</div>

<!-- ## Properties

### `recordItemId`

`recordItemId` allows us to manage which data is Deleteed.

```tsx
import { DeleteButton } from "@pankod/refine";

export const MyDeleteComponent = () => {
    return <DeleteButton resourceName="posts" recordItemId="1" />;
};
```

Clicking the button will trigger the `useOne` method and then the record whose resource is "post" and whose id is "1" fetches.

:::note
`<DeleteButton>` component reads the id information from the route by default.
:::

### `resourceName`

`resourceName` allows us to manage which resource is Deleteed.

```tsx
import { DeleteButton } from "@pankod/refine";

export const MyDeleteComponent = () => {
    return <DeleteButton resourceName="categories" recordItemId="2" />;
};
```

Clicking the button will trigger the `useOne` method and then the record whose resource is "categories" and whose id is "2" fetches.

:::note
`<DeleteButton>` component reads the resource name from the route by default.
:::

## API Reference

### Properties

| Property     | Description                                  | Type                                                                                                             | Default                                                   |
| ------------ | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| props        | Ant Design button props                      | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; recordItemId?: string; }` |                                                           |
| resourceName | Determines which resource to use for Delete | `string`                                                                                                         | Resource name acquired from route                         |
| recordItemId | Determines which id to use for Delete       | `string`                                                                                                         | Record id acquired from route                             |
| children     | Set the button text                          | `ReactNode`                                                                                                      | `"Delete"`                                               |
| icon         | Set the icon component of button             | `ReactNode`                                                                                                      | [`<RedoOutlined />`](https://ant.design/components/icon/) |
| onClick      | Set the handler to handle click event        | `(event) => void`                                                                                                | trigger the `useOne` method for Delete                   | -->
