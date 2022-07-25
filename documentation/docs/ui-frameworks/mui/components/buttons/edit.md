---
id: edit-button
title: Edit
---

import editButton from '@site/static/img/guides-and-concepts/components/buttons/edit/edit-mui.png';

`<EditButton>` uses Material UI [`<Button>`](https://mui.com/material-ui/react-button/) component. It uses the `edit` method from [`useNavigation`](/core/hooks/navigation/useNavigation.md) under the hood. It can be useful to redirect the app to the edit page route of resource.

## Usage

```tsx title="src/pages/posts/list.tsx"
import { useTable } from "@pankod/refine-core";

import {
    List,
    Table,
    // highlight-next-line
    EditButton,
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
                                <EditButton recordItemId={row.id} />
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
    <img src={editButton} alt="Default edit button" />
</div>

## Properties

### `resourceNameOrRouteName`

It is used to redirect the app to the `/edit` endpoint of the given resource name. By default, the app redirects to a URL with `/edit` defined by the name property of resource object.

```tsx
import { EditButton } from "@pankod/refine-mui";

export const MyEditComponent = () => {
    return <EditButton resourceNameOrRouteName="posts" recordItemId="2" />;
};
```

Clicking the button will trigger the `edit` method of [`useNavigation`](/core/hooks/navigation/useNavigation.md) and then redirect to `/posts/edit/2`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx
import { EditButton } from "@pankod/refine-mui";

export const MyEditComponent = () => {
    return <EditButton hideText />;
};
```

### `ignoreAccessControlProvider`

It is used to skip access control for the button so that it doesn't check for access control. This is relevant only when an [`accessControlProvider`](/core/providers/accessControl-provider.md) is provided to [`<Refine/>`](/core/components/refine-config.md)

```tsx
import { EditButton } from "@pankod/refine-mui";

export const MyListComponent = () => {
    return <EditButton ignoreAccessControlProvider />;
};
```

## API Reference

### Properties

| Property                    | Description                                      | Type                                                              | Default                                                                                                               |
| --------------------------- | ------------------------------------------------ | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| props                       | Material UI button props                         | [`ButtonProps`](https://mui.com/material-ui/api/button/)          |
| resourceNameOrRouteName     | Determines which resource to use for redirection | `string`                                                          | Resource name that it reads from route                                                                                |
| hideText                    | Allows to hide button text                       | `boolean`                                                         | `false`                                                                                                               |
| ignoreAccessControlProvider | Skip access control                              | `boolean`                                                         | `false`                                                                                                               |
| children                    | Sets the button text                             | `ReactNode`                                                       | `"Edit"`                                                                                                              |
| startIcon                   | Sets the icon component of button                | `ReactNode`                                                       | [`<EditOutlinedIcon />`](https://mui.com/material-ui/material-icons/?query=edit&theme=Outlined&selected=EditOutlined) |
| svgIconProps                | Allows to set icon props                         | [`SvgIconProps`](https://mui.com/material-ui/api/svg-icon/#props) |                                                                                                                       |
| onClick                     | Sets the handler to handle click event           | `(event) => void`                                                 | Triggers navigation for redirect to the edit page of resource                                                         |
