---
id: create-button
title: Create
---

import createButton from '@site/static/img/guides-and-concepts/components/buttons/create/create-mui.png';

`<CreateButton>` uses Material UI [`<Button>`](https://mui.com/material-ui/react-button/) component. It uses the `create` method from [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) under the hood. It can be useful to redirect the app to the create page route of resource.

## Usage

```tsx title="src/pages/posts/list.tsx"
import { useTable } from "@pankod/refine-core";

import {
    List,
    Table,
    // highlight-next-line
    CreateButton,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@pankod/refine-mui";

export const PostList: React.FC = () => {
    const { tableQueryResult } = useTable<IPost>();

    const { data } = tableQueryResult;

    return (
        // highlight-next-line
        <List cardHeaderProps={{ action: <CreateButton /> }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.data.map((row) => (
                        <TableRow key={row.title}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell component="th" scope="row">
                                {row.title}
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
    <img src={createButton} alt="Default create button" />
</div>

## Properties

### `resourceNameOrRouteName`

It is used to redirect the app to the `/create` endpoint of the given resource name. By default, the app redirects to a URL with `/create` defined by the name property of resource object.

```tsx
import { CreateButton } from "@pankod/refine-mui";

export const MyCreateComponent = () => {
    return <CreateButton resourceNameOrRouteName="posts" />;
};
```

Clicking the button will trigger the `create` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) and then redirect to `/posts/create`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx
import { CreateButton } from "@pankod/refine-mui";

export const MyCreateComponent = () => {
    return <CreateButton hideText />;
};
```

### `accessControl`

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/api-reference/core/providers/accessControl-provider.md) is provided to [`<Refine/>`](/api-reference/core/components/refine-config.md)

```tsx
import { CreateButton } from "@pankod/refine-mui";

export const MyListComponent = () => {
    return <CreateButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />;
};
```

## API Reference

### Properties

| Property                    | Description                                      | Type                                                              | Default                                                                                                                       |
| --------------------------- | ------------------------------------------------ | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| props                       | Material UI button props                         | [`ButtonProps`](https://mui.com/material-ui/api/button/)          |
| resourceNameOrRouteName     | Determines which resource to use for redirection | `string`                                                          | Resource name that it reads from route                                                                                        |
| hideText                    | Allows to hide button text                       | `boolean`                                                         | `false`                                                                                                                       |
| ignoreAccessControlProvider | Skip access control                              | `boolean`                                                         | `false`                                                                                                                       |
| children                    | Sets the button text                             | `ReactNode`                                                       | `"Create"`                                                                                                                    |
| startIcon                   | Sets the icon component of button                | `ReactNode`                                                       | [`<AddBoxOutlinedIcon />`](https://mui.com/material-ui/material-icons/?query=add+box&theme=Outlined&selected=AddBoxOutlined/) |
| svgIconProps                | Allows to set icon props                         | [`SvgIconProps`](https://mui.com/material-ui/api/svg-icon/#props) |                                                                                                                               |
| onClick                     | Sets the handler to handle click event           | `(event) => void`                                                 | Triggers navigation for redirect to the create page of resource                                                               |
