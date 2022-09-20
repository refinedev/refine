---
id: show-button
title: Show
---

import showButton from '@site/static/img/guides-and-concepts/components/buttons/show/show.png';

`<ShowButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `show` method from [`useNavigation`](/core/hooks/navigation/useNavigation.md) under the hood. It can be useful when redirecting the app to the show page with the record id route of resource.

## Usage

```tsx
import {
    List,
    Table,
    useTable,
    // highlight-next-line
    ShowButton,
} from "@pankod/refine-antd";

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
                    render={(_, record) => (
                        // highlight-next-line
                        <ShowButton size="small" recordItemId={record.id} />
                    )}
                />
            </Table>
        </List>
    );
};

interface IPost {
    id: number;
    title: string;
}
```

Will look like this:

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={showButton} alt="Default show button" />
</div>

## Properties

### `recordItemId`

`recordItemId` is used to append the record id to the end of the route path.

```tsx 
import { ShowButton } from "@pankod/refine-antd";

export const MyShowComponent = () => {
    return <ShowButton resourceName="posts" recordItemId="1" />;
};
```

Clicking the button will trigger the `show` method of [`useNavigation`](/core/hooks/navigation/useNavigation.md) and then redirect the app to `/posts/show/1`.

:::note
`<ShowButton>` component reads the id information from the route by default.
:::

### `resourceNameOrRouteName`

Redirection endpoint(`resourceNameOrRouteName/show`) is defined by `resourceNameOrRouteName` property. By default, `<ShowButton>` uses `name` property of the resource object as an endpoint to redirect after clicking.

```tsx 
import { ShowButton } from "@pankod/refine-antd";

export const MyShowComponent = () => {
    return <ShowButton resourceNameOrRouteName="categories" recordItemId="2" />;
};
```

Clicking the button will trigger the `show` method of [`useNavigation`](/core/hooks/navigation/useNavigation.md) and then redirect the app to `/categories/show/2`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx 
import { ShowButton } from "@pankod/refine-antd";

export const MyShowComponent = () => {
    return <ShowButton hideText />;
};
```

### `ignoreAccessControlProvider`

It is used to skip access control for the button so that it doesn't check for access control. This is relevant only when an [`accessControlProvider`](/core/providers/accessControl-provider.md) is provided to [`<Refine/>`](/core/components/refine-config.md)

```tsx 
import { ListButton } from "@pankod/refine-antd";

export const MyListComponent = () => {
    return <ListButton ignoreAccessControlProvider />;
};
```

## API Reference

### Properties

| Property                                                                                                  | Description                                      | Type                                                                                                                                  | Default                                                          |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| props                                                                                                     | Ant Design button properties                     | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; recordItemId?: BaseKey; hideText?: boolean; }` |                                                                  |
| resourceNameOrRouteName                                                                                   | Determines which resource to use for redirection | `string`                                                                                                                              | Resource name that it reads from route                           |
| <div className="required-block"><div>resourceName</div> <div className=" required">deprecated</div></div> | Determines which resource to use for redirection | `string`                                                                                                                              | Resource name that it reads from route                           |
| recordItemId                                                                                              | Adds `id` to the end of the URL                  | [`BaseKey`](/core/interfaces.md#basekey)                                                                                              | Record id that it reads from route                               |
| hideText                                                                                                  | Allows to hide button text                       | `boolean`                                                                                                                             | `false`                                                          |
| ignoreAccessControlProvider                                                                               | Skip access control                              | `boolean`                                                                                                                             | `false`                                                          |
| children                                                                                                  | Sets the button text                             | `ReactNode`                                                                                                                           | `"Show"`                                                         |
| icon                                                                                                      | Sets the icon component of button                | `ReactNode`                                                                                                                           | [`<EyeOutlined />`](https://ant.design/components/icon/)         |
| onClick                                                                                                   | Sets the handler to handle click event           | `(event) => void`                                                                                                                     | Triggers navigation for redirection to the show page of resource |
