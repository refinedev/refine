---
id: clone-button
title: Clone
---

import tableUsage from '@site/static/img/guides-and-concepts/components/buttons/clone/usage.png';

`<CloneButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `clone` method from [useNavigation](#) under the hood. 
It can be useful when redirecting the app to the create page with the record id route of `<Resource>`.

## Usage

```tsx
import {
    List,
    Table,
    useTable
    //highlight-next-line
    CloneButton,
} from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(_, record) => (
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

Will look like this:

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
**`<CloneButton>`** component reads the id information from the route by default.
:::

### `resourceName`

It is used to redirect the app to the `/create` endpoint of the given resource name. By default, the app redirects to a URL with `/create` defined by the name property of the `<Resource>` component.

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
| resourceName | Determines which resource to use for redirection | `string`                                                                                                         | Resource name that it reads from route                          |
| recordItemId | Adds `id` to the end of the URL                | `string`                                                                                                         | Record id that it reads from route                              |
| children     | Sets the button text                           | `ReactNode`                                                                                                      | `"Clone"`                                                       |
| icon         | Sets the icon component of button              | `ReactNode`                                                                                                      | [`<PlusSquareOutlined />`](https://ant.design/components/icon/) |
| onClick      | Sets the handler to handle click event         | `(event) => void`                                                                                                | Triggers navigation for redirection to the create page of resource |
