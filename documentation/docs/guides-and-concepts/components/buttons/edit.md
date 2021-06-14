---
id: edit-button
title: Edit
---

import tableUsage from '@site/static/img/guides-and-concepts/components/buttons/edit/usage.png';

`<EditButton>` is using Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `edit` method from [`useNavigation`](#) under the hood. It can be useful to redirect the app to the edit page with the record id route of `<Resource>`.

## Usage

```tsx
//highlight-next-line
import { List, Table, EditButton, useTable } from "@pankod/refine";

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
                    render={(_, record) => (
                        //highlight-next-line
                        <EditButton size="small" recordItemId={record.id} />
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
    <img  src={tableUsage} alt="Table usage for delete button" />
</div>

## Properties

### `recordItemId`

`recordItemId` is used to append the record id to the end of the route path.

```tsx
import { EditButton } from "@pankod/refine";

export const MyEditComponent = () => {
    return <EditButton resourceName="posts" recordItemId="1" />;
};
```

Clicking the button will trigger the `edit` method of [`useNavigation`](#) and then redirect the app to `/resources/posts/edit/1`.

:::note
`<EditButton>` component reads the id information from the route by default.
:::

### `resourceName`

It is used to redirect the app to the `/edit` endpoint of the given resource name. By default, the app redirects to a URL with `/edit` defined by the name property of `<Resource>` component.

```tsx
import { EditButton } from "@pankod/refine";

export const MyEditComponent = () => {
    return <EditButton resourceName="categories" recordItemId="2" />;
};
```

Clicking the button will trigger the `edit` method of [`useNavigation`](#) and then redirect the app to `/resources/categories/edit/2`.

## API Reference

### Properties

| Property     | Description                                   | Type                                                                                                             | Default                                                       |
| ------------ | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| props        | Ant Design button props                       | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; recordItemId?: string; }` |                                                               |
| resourceName | Determines which resource to use for redirect | `string`                                                                                                         | Resource name that it reads from route                             |
| recordItemId | Add `id` to the end of the URL                | `string`                                                                                                         | Record id that it reads from route                                 |
| children     | Set the button text                           | `ReactNode`                                                                                                      | `"Edit"`                                                      |
| icon         | Set the icon component of button              | `ReactNode`                                                                                                      | [`<EditOutlined />`](https://ant.design/components/icon/)     |
| onClick      | Set the handler to handle click event         | `(event) => void`                                                                                                | Triggers navigation for redirect to the edit page of resource |
