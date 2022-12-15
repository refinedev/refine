---
id: show-button
title: Show
swizzle: true
---


`<ShowButton>` uses Material UI [`<Button>`](https://ant.design/components/button/) component. It uses the `show` method from [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) under the hood. It can be useful when redirecting the app to the show page with the record id route of resource.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Usage

```tsx title="src/pages/posts/list.tsx"
import { useTable } from "@pankod/refine-core";

import {
    List,
    Table,
    // highlight-next-line
    ShowButton,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@pankod/refine-mui";

export const PostList: React.FC = () => {
    const { tableQueryResult } = useTable<IPost>();

    const { data } = tableQueryResult;

    return (
        <List>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="center">
                                // highlight-next-line
                                <ShowButton recordItemId={row.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
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
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/components/buttons/show/show-mui.png" alt="Default show button" />
</div>

## Properties

### `recordItemId`

`recordItemId` is used to append the record id to the end of the route path.

```tsx
import { ShowButton } from "@pankod/refine-mui";

export const MyShowComponent = () => {
    return <ShowButton resourceName="posts" recordItemId="1" />;
};
```

Clicking the button will trigger the `show` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) and then redirect the app to `/posts/show/1`.

:::note
`<ShowButton>` component reads the id information from the route by default.
:::

### `resourceNameOrRouteName`

Redirection endpoint(`resourceNameOrRouteName/show`) is defined by `resourceNameOrRouteName` property. By default, `<ShowButton>` uses `name` property of the resource object as an endpoint to redirect after clicking.

```tsx
import { ShowButton } from "@pankod/refine-mui";

export const MyShowComponent = () => {
    return <ShowButton resourceNameOrRouteName="categories" recordItemId="2" />;
};
```

Clicking the button will trigger the `show` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) and then redirect the app to `/categories/show/2`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx
import { ShowButton } from "@pankod/refine-mui";

export const MyShowComponent = () => {
    return <ShowButton hideText />;
};
```

### `accessControl`

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/api-reference/core/providers/accessControl-provider.md) is provided to [`<Refine/>`](/api-reference/core/components/refine-config.md)

```tsx
import { ShowButton } from "@pankod/refine-mui";

export const MyListComponent = () => {
    return <ShowButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />;
};
```
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/ShowButton" />

:::tip External Props
It also accepts all props of Material UI [Button](https://mui.com/material-ui/api/button/).
:::        