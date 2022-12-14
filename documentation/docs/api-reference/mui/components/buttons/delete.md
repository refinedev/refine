---
id: delete-button
title: Delete
swizzle: true
---


`<DeleteButton>` uses Material UI [`<LoadingButton>`](https://mui.com/material-ui/api/loading-button/#main-content) and [`<Dialog>`](https://mui.com/material-ui/react-dialog/) components.
When you try to delete something, a pop-up shows up and asks for confirmation. When confirmed it executes the [`useDelete`](/api-reference/core/hooks/data/useDelete.md) method provided by your [`dataProvider`](/api-reference/core/providers/data-provider.md).

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Usage

```tsx
import { useTable } from "@pankod/refine-core";

import {
    List,
    Table,
    // highlight-next-line
    DeleteButton,
    TableHead,ev
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
                                //highlight-start
                                <DeleteButton
                                    recordItemId={row.id}
                                />
                                //highlight-end
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
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/components/buttons/delete/delete-mui.png" alt="Default delete button" />
</div>
<br />

When clicked, it opens the confirmation window like this:

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/components/buttons/delete/confirmation-mui.gif" alt="Confirmation window" />
</div>

## Properties

### `recordItemId`

`recordItemId` allows us to manage which record will be deleted.

```tsx
import { DeleteButton } from "@pankod/refine-mui";

export const MyDeleteComponent = () => {
    return <DeleteButton resourceNameOrRouteName="posts" recordItemId="1" />;
};
```

Clicking the button will trigger the [`useDelete`](/api-reference/core/hooks/data/useDelete.md) method and then the record whose resource is `post` and whose id is `1` gets deleted.

:::note
**`<DeleteButton>`** component reads the id information from the route by default.
:::

### `onSuccess`

`onSuccess` can be used if you want to do anything on the result returned after the delete request.

For example, let's `console.log` after deletion:

```tsx title="src/pages/posts/list.tsx"
import { useTable } from "@pankod/refine-core";

import {
    List,
    Table,
    // highlight-next-line
    DeleteButton,
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
                                <DeleteButton
                                    recordItemId={record.id}
                                    // highlight-start
                                    onSuccess={(value) => {
                                        console.log(value);
                                    }}
                                    // highlight-end
                                />
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

### `mutationMode`

Determines which mode mutation will have while executing `<DeleteButton>`.

[Refer to the mutation mode docs for further information. &#8594](/advanced-tutorials/mutation-mode.md)

```tsx
import { useTable } from "@pankod/refine-core";

import {
    List,
    Table,
    // highlight-next-line
    DeleteButton,
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
                                <DeleteButton
                                    recordItemId={row.id}
                                    // highlight-next-line
                                    mutationMode="undoable"
                                />
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

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx
import { DeleteButton } from "@pankod/refine-mui";

export const MyDeleteComponent = () => {
    return <DeleteButton hideText />;
};
```

### `accessControl`

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/api-reference/core/providers/accessControl-provider.md) is provided to [`<Refine/>`](/api-reference/core/components/refine-config.md)

```tsx
import { DeleteButton } from "@pankod/refine-mui";

export const MyListComponent = () => {
    return <DeleteButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />;
};
```

## How to override confirm texts?

You can change the text that appears when you confirm a transaction with `confirmTitle` prop, as well as what ok and cancel buttons text look like with `confirmOkText` and `confirmCancelText` props.

```tsx
import { DeleteButton } from "@pankod/refine-mui";

export const MyDeleteComponent = () => {
    return (
        <DeleteButton
            confirmTitle="Title"
            confirmOkText="Ok Text"
            confirmCancelText="Delete Text"
        />
    );
};
```

## API Reference

### Props

<PropsTable module="@pankod/refine-mui/DeleteButton" />

:::tip External Props
It also accepts all props of Material UI [Button](https://mui.com/material-ui/react-button/).
:::