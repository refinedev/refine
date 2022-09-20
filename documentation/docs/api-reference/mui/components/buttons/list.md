---
id: list-button
title: List
---

import listButton from '@site/static/img/guides-and-concepts/components/buttons/list/list-mui.png';

`<ListButton>` is using Material UI [`<Button>`](https://ant.design/components/button/) component. It uses the `list` method from [`useNavigation`](/core/hooks/navigation/useNavigation.md) under the hood. It can be useful when redirecting the app to the list page route of resource.

## Usage

```tsx title="src/pages/posts/show.tsx"
import { useShow } from "@pankod/refine-core";
// highlight-next-line
import { ListButton, Show, Typography, Stack } from "@pankod/refine-mui";

export const ShowPage: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show
            isLoading={isLoading}
            cardHeaderProps={{
                action: (
                    // highlight-start
                    <ListButton />
                    // highlight-end
                ),
            }}
        >
            <Stack gap="10px">
                <Typography fontWeight="bold">Id</Typography>
                <Typography>{record?.id}</Typography>
                <Typography fontWeight="bold">Title</Typography>
                <Typography>{record?.title}</Typography>
            </Stack>
        </Show>
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
    <img src={listButton} alt="Default list button" />
</div>
<br/>

:::note
The button text is defined automatically by **refine** based on _resource_ object name property.
:::

## Properties

### `resourceNameOrRouteName`

Redirection endpoint(`resourceNameOrRouteName/list`) is defined by `resourceNameOrRouteName` property. By default, `<ListButton>` uses `name` property of the resource object as the endpoint to redirect after clicking.

```tsx
import { ListButton } from "@pankod/refine-mui";

export const MyListComponent = () => {
    return <ListButton resourceNameOrRouteName="categories" />;
};
```

Clicking the button will trigger the `list` method of [`useNavigation`](/core/hooks/navigation/useNavigation.md) and then redirect to `/categories`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx
import { ListButton } from "@pankod/refine-mui";

export const MyListComponent = () => {
    return <ListButton hideText />;
};
```

### `ignoreAccessControlProvider`

It is used to skip access control for the button so that it doesn't check for access control. This is relevant only when an [`accessControlProvider`](/core/providers/accessControl-provider.md) is provided to [`<Refine/>`](/core/components/refine-config.md)

```tsx
import { ListButton } from "@pankod/refine-mui";

export const MyListComponent = () => {
    return <ListButton ignoreAccessControlProvider />;
};
```

## API Reference

### Properties

| Property                    | Description                                              | Type                                                              | Default                                                                                                               |
| --------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| props                       | [`ButtonProps`](https://mui.com/material-ui/api/button/) |                                                                   |
| resourceNameOrRouteName     | Determines which resource to use for redirection         | `string`                                                          | Resource name that it reads from route                                                                                |
| hideText                    | Allows to hide button text                               | `boolean`                                                         | `false`                                                                                                               |
| ignoreAccessControlProvider | Skip access control                                      | `boolean`                                                         | `false`                                                                                                               |
| children                    | Sets the button text                                     | `ReactNode`                                                       | Humanized resource name that it reads from route                                                                      |
| startIcon                   | Sets the icon component of button                        | `ReactNode`                                                       | [`<ListOutlinedIcon />`](https://mui.com/material-ui/material-icons/?query=List&theme=Outlined&selected=ListOutlined) |
| svgIconProps                | Allows to set icon props                                 | [`SvgIconProps`](https://mui.com/material-ui/api/svg-icon/#props) |                                                                                                                       |
| onClick                     | Sets the handler to handle click event                   | `(event) => void`                                                 | Triggers navigation for redirection to the list page of resource                                                      |
