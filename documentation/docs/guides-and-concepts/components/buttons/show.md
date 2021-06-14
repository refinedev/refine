---
id: show-button
title: Show
---

import tableUsage from '@site/static/img/guides-and-concepts/components/buttons/show/usage.png';

`<ShowButton>` is using Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `show` method from [useNavigation](#) under the hood. It can be useful for redirect the app to the show page with the record id route of `<Resource>`.

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
                    render={(_value, record) => (
                        // highlight-next-line
                        <ShowButton size="small" recordItemId={record.id} />
                    )}
                />
            </Table>
        </List>
    );
};
```

Looks like this:

<div>
    <img src={tableUsage} alt="Default Show Button" />
</div>

## Properties

### `recordItemId`

`recordItemId` is used to append the record id to the end of the path.

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

It is used to redirect the app to the `/show` endpoint of the given resource name. By default, the app redirects to a URL with `/show` defined by the name property of `<Resource>` component.

```tsx
import { ShowButton } from "@pankod/refine";
export const MyShowComponent = () => {
    return <ShowButton resourceName="categories" recordItemId="2" />;
};
```

Clicking the button will trigger the `show` method of [`useNavigation`](#) and then redirect the app to `/resources/categories/show/2`.

## API Reference

### Properties

| Property     | Description                                   | Type                                                                                                             | Default                                                         |
| ------------ | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| props        | Ant Design button props                       | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; recordItemId?: string; }` |                                                                 |
| resourceName | Determines which resource to use for redirect | `string`                                                                                                         | Resource name acquired from route                               |
| recordItemId | Add `id` to the end of the URL                | `string`                                                                                                         | Record id acquired from route                                   |
| children     | Set the button text                           | `ReactNode`                                                                                                      | `"Show"`                                                       |
| icon         | Set the icon component of button              | `ReactNode`                                                                                                      | [`<EyeOutlined />`](https://ant.design/components/icon/) |
| onClick      | Set the handler to handle click event         | `(event) => void`                                                                                                | Triggers navigation for redirect to the show page of resource |
