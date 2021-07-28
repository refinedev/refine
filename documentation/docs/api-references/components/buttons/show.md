---
id: show-button
title: Show
---

import tableUsage from '@site/static/img/guides-and-concepts/components/buttons/show/usage.png';

`<ShowButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `show` method from [useNavigation](#) under the hood. It can be useful when redirecting the app to the show page with the record id route of `<Resource>`.

## Usage

```tsx
//highlight-next-line
import { List, Table, ShowButton, useTable } from "@pankod/refine";

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
                        // highlight-next-line
                        <ShowButton size="small" recordItemId={record.id} />
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
    <img src={tableUsage} alt="Default Show Button" />
</div>

## Properties

### `recordItemId`

`recordItemId` is used to append the record id to the end of the route path.

```tsx
import { ShowButton } from "@pankod/refine";
export const MyShowComponent = () => {
    return <ShowButton resourceName="posts" recordItemId="1" />;
};
```

Clicking the button will trigger the `show` method of [`useNavigation`](#) and then redirect the app to `/resources/posts/show/1`.

:::note
`<ShowButton>` component reads the id information from the route by default.
:::

### `resourceName`

Redirection endpoint(`resourceName/show`) is defined by `resourceName` property. By default, <ShowButton> uses `name` property of the <Resource> component as an endpoint to redirect after clicking.

```tsx
import { ShowButton } from "@pankod/refine";
export const MyShowComponent = () => {
    return <ShowButton resourceName="categories" recordItemId="2" />;
};
```

Clicking the button will trigger the `show` method of [`useNavigation`](#) and then redirect the app to `/resources/categories/show/2`.

## API Reference

### Properties

| Property     | Description                                   | Type                                                                                                             | Default                                                       |
| ------------ | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| props        | Ant Design button properties                     | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; recordItemId?: string; }` |                                                               |
| resourceName | Determines which resource to use for redirection | `string`                                                                                                         | Resource name that it reads from route                        |
| recordItemId | Adds `id` to the end of the URL                | `string`                                                                                                         | Record id that it reads from route                            |
| children     | Sets the button text                           | `ReactNode`                                                                                                      | `"Show"`                                                      |
| icon         | Sets the icon component of button              | `ReactNode`                                                                                                      | [`<EyeOutlined />`](https://ant.design/components/icon/)      |
| onClick      | Sets the handler to handle click event         | `(event) => void`                                                                                                | Triggers navigation for redirection to the show page of resource |
