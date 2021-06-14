---
id: clone-button
title: Clone
---

import tableUsage from '@site/static/img/guides-and-concepts/components/buttons/clone/usage.png';

`<CloneButton>` is using Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `clone` method from [useNavigation](#) under the hood. It can be useful for redirect the app to the create page with the record id route of `<Resource>`.

## Usage

```tsx
//highlight-next-line
import { List, Table, CloneButton, useTable } from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} key="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
                <Table.Column key="title" dataIndex="title" title="Title" />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(_value, record) => (
                        // highlight-next-line
                        <CloneButton size="small" recordItemId={record.id} />
                    )}
                />
            </Table>
        </List>
    );
};
```

```ts
export interface IPost {
    id: string;
    title: string;
}
```

Looks like this:

<div>
    <img src={tableUsage} alt="Default Clone Button" />
</div>

## Properties

### `recordItemId`

`recordItemId` is used to append the record id to the end of the route path.

```tsx
import { CloneButton } from "@pankod/refine";
export const MyCloneComponent = () => {
    return <CloneButton resourceName="posts" recordItemId="1" />;
};
```

Clicking the button will trigger the `clone` method of [`useNavigation`](#) and then redirect the app to `/resources/posts/create/1`.

:::note
`<CloneButton>` component reads the id information from the route by default.
:::

### `resourceName`

It is used to redirect the app to the `/create` endpoint of the given resource name. By default, the app redirects to a URL with `/create` defined by the name property of `<Resource>` component.

```tsx
import { CloneButton } from "@pankod/refine";
export const MyCloneComponent = () => {
    return <CloneButton resourceName="categories" recordItemId="2" />;
};
```

Clicking the button will trigger the `clone` method of [`useNavigation`](#) and then redirect the app to `/resources/categories/create/2`.

## API Reference

### Properties

| Property     | Description                                   | Type                                                                                                             | Default                                                         |
| ------------ | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| props        | Ant Design button props                       | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; recordItemId?: string; }` |                                                                 |
| resourceName | Determines which resource to use for redirect | `string`                                                                                                         | Resource name that it reads from route                          |
| recordItemId | Add `id` to the end of the URL                | `string`                                                                                                         | Record id that it reads from route                              |
| children     | Set the button text                           | `ReactNode`                                                                                                      | `"Clone"`                                                       |
| icon         | Set the icon component of button              | `ReactNode`                                                                                                      | [`<PlusSquareOutlined />`](https://ant.design/components/icon/) |
| onClick      | Set the handler to handle click event         | `(event) => void`                                                                                                | Triggers navigation for redirect to the create page of resource |
