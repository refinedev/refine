---
id: delete-button
title: Delete
---

import deleteButton from '@site/static/img/guides-and-concepts/components/buttons/delete/delete-mui.png';
import confirmation from '@site/static/img/guides-and-concepts/components/buttons/delete/confirmation-mui.gif';

`<DeleteButton>` uses Material UI [`<LoadingButton>`](https://mui.com/material-ui/api/loading-button/#main-content) and [`<Dialog>`](https://mui.com/material-ui/react-dialog/) components.
When you try to delete something, a pop-up shows up and asks for confirmation. When confirmed it executes the [`useDelete`](/core/hooks/data/useDelete.md) method provided by your [`dataProvider`](/core/providers/data-provider.md).

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
    <img src={deleteButton} alt="Default delete button" />
</div>
<br />

When clicked, it opens the confirmation window like this:

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={confirmation} alt="Confirmation window" />
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

Clicking the button will trigger the [`useDelete`](/core/hooks/data/useDelete.md) method and then the record whose resource is `post` and whose id is `1` gets deleted.

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

[Refer to the mutation mode docs for further information. &#8594](guides-and-concepts/mutation-mode.md)

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

### `ignoreAccessControlProvider`

It is used to skip access control for the button so that it doesn't check for access control. This is relevant only when an [`accessControlProvider`](/core/providers/accessControl-provider.md) is provided to [`<Refine/>`](/core/components/refine-config.md)

```tsx
import { DeleteButton } from "@pankod/refine-mui";

export const MyListComponent = () => {
    return <DeleteButton ignoreAccessControlProvider />;
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

### Properties

| Property                    | Description                                                                                  | Type                                                                                                                      | Default                                                                                                                           |
| --------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| props                       | Material UI button properties                                                                | [`ButtonProps`](https://mui.com/material-ui/api/button/) & [`DeleteButtonProps`](/core/interfaces.md#delete-button-props) |                                                                                                                                   |
| resourceNameOrRouteName     | Determines which resource to use for redirection                                             | `string`                                                                                                                  | Resource name that it reads from route                                                                                            |
| recordItemId                | Determines which id to use for deletion                                                      | [`BaseKey`](/core/interfaces.md#basekey)                                                                                  | Record id that it reads from route                                                                                                |
| onSuccess                   | Called when [mutation](https://react-query.tanstack.com/reference/useMutation) is successful | `(value: DeleteOneResponse) => void`                                                                                      |                                                                                                                                   |
| mutationMode                | Determines when mutations are executed.                                                      | `"pessimistic"` \| `"optimistic"` \| `"undoable"`                                                                         |                                                                                                                                   |
| hideText                    | Allows to hide button text                                                                   | `boolean`                                                                                                                 | `false`                                                                                                                           |
| confirmTitle                | The title of the confirmation box                                                            | `string`                                                                                                                  | `"Are you sure?"`                                                                                                                 |
| confirmOkText               | The text of the Confirm button                                                               | `string`                                                                                                                  | `"Delete"`                                                                                                                        |
| confirmCancelText           | The text of the Cancel button                                                                | `string`                                                                                                                  | `"Cancel"`                                                                                                                        |
| children                    | Sets the button text                                                                         | `ReactNode`                                                                                                               | `"Delete"`                                                                                                                        |
| ignoreAccessControlProvider | Skip access control                                                                          | `boolean`                                                                                                                 | `false`                                                                                                                           |
| startIcon                   | Sets the icon component of button                                                            | `ReactNode`                                                                                                               | [`<DeleteOutlineIcon />`](https://mui.com/material-ui/material-icons/?query=delete&theme=Outlined&selected=DeleteOutlineOutlined) |
| svgIconProps                | Allows to set icon props                                                                     | [`SvgIconProps`](https://mui.com/material-ui/api/svg-icon/#props)                                                         |                                                                                                                                   |
| metaData                    | Metadata query for `dataProvider`                                                            | [`MetaDataQuery`](/core/interfaces.md#metadataquery)                                                                      | {}                                                                                                                                |
