---
id: show-button
title: Show
---

import showButton from '@site/static/img/guides-and-concepts/components/buttons/show/show-mui.png';

`<ShowButton>` uses Material UI [`<Button>`](https://ant.design/components/button/) component. It uses the `show` method from [`useNavigation`](/core/hooks/navigation/useNavigation.md) under the hood. It can be useful when redirecting the app to the show page with the record id route of resource.

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
    <img src={showButton} alt="Default show button" />
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

Clicking the button will trigger the `show` method of [`useNavigation`](/core/hooks/navigation/useNavigation.md) and then redirect the app to `/posts/show/1`.

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

Clicking the button will trigger the `show` method of [`useNavigation`](/core/hooks/navigation/useNavigation.md) and then redirect the app to `/categories/show/2`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx
import { ShowButton } from "@pankod/refine-mui";

export const MyShowComponent = () => {
    return <ShowButton hideText />;
};
```

### `ignoreAccessControlProvider`

It is used to skip access control for the button so that it doesn't check for access control. This is relevant only when an [`accessControlProvider`](/core/providers/accessControl-provider.md) is provided to [`<Refine/>`](/core/components/refine-config.md)

```tsx
import { ShowButton } from "@pankod/refine-mui";

export const MyShowComponent = () => {
    return <ShowButton ignoreAccessControlProvider />;
};
```

## API Reference

### Properties

| Property                    | Description                                      | Type                                                              | Default                                                                                                                          |
| --------------------------- | ------------------------------------------------ | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| props                       | Material UI button props                         | [`ButtonProps`](https://mui.com/material-ui/api/button/)          |                                                                                                                                  |
| resourceNameOrRouteName     | Determines which resource to use for redirection | `string`                                                          | Resource name that it reads from route                                                                                           |
| recordItemId                | Adds `id` to the end of the URL                  | [`BaseKey`](/core/interfaces.md#basekey)                          | Record id that it reads from route                                                                                               |
| hideText                    | Allows to hide button text                       | `boolean`                                                         | `false`                                                                                                                          |
| ignoreAccessControlProvider | Skip access control                              | `boolean`                                                         | `false`                                                                                                                          |
| children                    | Sets the button text                             | `ReactNode`                                                       | `"Show"`                                                                                                                         |
| startIcon                   | Sets the icon component of button                | `ReactNode`                                                       | [`<VisibilityOutlinedIcon />`](https://mui.com/material-ui/material-icons/?query=eye&theme=Outlined&selected=VisibilityOutlined) |
| svgIconProps                | Allows to set icon props                         | [`SvgIconProps`](https://mui.com/material-ui/api/svg-icon/#props) |                                                                                                                                  |
| onClick                     | Sets the handler to handle click event           | `(event) => void`                                                 | Triggers navigation for redirection to the show page of resource                                                                 |
