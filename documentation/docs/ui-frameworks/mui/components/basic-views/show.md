---
id: show
title: Show
---

import cardHeaderProps from '@site/static/img/guides-and-concepts/basic-views/show/cardHeaderProps.png'
import actionButtonsUsage from '@site/static/img/guides-and-concepts/basic-views/show/actionButtonsUsageMui.png'

`<Show>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a refresh button or giving title to the page.

We will show what `<Show>` does using properties with examples.

## Properties

### `canDelete` and `canEdit`

`canDelete` and `canEdit` allows us to add the delete and edit buttons inside the `<Show>` component. If the resource has `canDelete` or `canEdit` property refine adds the buttons by default.

When clicked on, delete button executes the [`useDelete`](/core/hooks/data/useDelete.md) method provided by the [`dataProvider`](/core/providers/data-provider.md) and the edit button redirects the user to the record edit page.

Refer to the [`<DeleteButton>`](/ui-frameworks/mui/components/buttons/delete.md) and the [`<EditButton>`](/ui-frameworks/mui/components/buttons/edit.md) documentation for detailed usage.

```tsx title="src/pages/posts/show.tsx"
import { usePermissions } from "@pankod/refine-core";
// highlight-next-line
import { Show } from "@pankod/refine-mui";

export const ShowPage: React.FC = () => {
    const { data } = usePermissions<string>();

    return (
        <Show
            // highlight-next-line
            canDelete={data === "admin"}
            // highlight-next-line
            canEdit={data === "editor" || data === "admin"}
        >
            ...
        </Show>
    );
};
```

[Refer to the `usePermission` documentation for detailed usage. &#8594](/core/hooks/auth/usePermissions.md)

### `actionButtons`

`<Show>` uses the Material UI [`<CardActions>`](https://mui.com/material-ui/api/card-actions/#main-content) component. By default,The children of the [`<CardActions>`](https://mui.com/material-ui/api/card-actions/#main-content) component shows nothing in the `<Show>` component.

```tsx title="src/pages/posts/show.tsx"
// highlight-next-line
import { Show, Button } from "@pankod/refine-mui";

export const ShowPage: React.FC = () => {
    return (
        <Show
            // highlight-start
            actionButtons={
                <>
                    <Button type="primary">Custom Button 1</Button>
                    <Button type="default">Custom Button 2</Button>
                </>
            }
            // highlight-end
        >
            ...
        </Show>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={actionButtonsUsage} alt="actionButton Usage" />
</div>
<br/>

### `cardProps`

`<Show>` uses the Material UI [`<Card>`](https://mui.com/material-ui/react-card/#main-content) components so you can customize with the props of `cardProps`.

### `cardHeaderProps`

`<Show>` uses the Material UI [`<CardHeader>`](https://mui.com/material-ui/api/card-header/) components so you can customize with the props of `cardHeaderProps`.

```tsx title="src/pages/posts/show.tsx"
import { useShow } from "@pankod/refine-core";
// highlight-next-line
import { Show, Typography, Stack } from "@pankod/refine-mui";

export const ShowPage: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show
            isLoading={isLoading}
            // highlight-start
            cardHeaderProps={{
                title: <Typography variant="h5">Custom Title</Typography>,
            }}
            // highlight-end
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
    id: string;
    title: string;
}
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={cardHeaderProps} alt="cardHeaderProps Usage" />
</div>
<br/>

### `cardContentProps`

`<Show>` uses the Material UI [`<CardContent>`](https://mui.com/material-ui/api/card-content/) components so you can customize with the props of `cardContentProps`.

### `cardActionsProps`

`<Show>` uses the Material UI [`<CardActions>`](https://mui.com/material-ui/api/card-actions/) components so you can customize with the props of `cardActionsProps`.

### `recordItemId`

`<Show>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL (when used on a custom page, modal or drawer).

```tsx title="src/pages/posts/show.tsx"
import { useState } from "react";
import { useShow } from "@pankod/refine-core";
// highlight-next-line
import { Show, Dialog, ShowButton } from "@pankod/refine-mui";

export const ShowPage: React.FC = () => {
    const [visibleShowDialog, setVisibleShowDialog] = useState<boolean>(false);

    const { queryResult, showId, setShowId } = useShow();
    const { data, isLoading } = queryResult;

    return (
        <>
            <ShowButton
                size="small"
                onClick={() => {
                    setShowId(data?.data.id);
                    setVisibleShowDialog(true);
                }}
            />
            <Dialog
                open={visibleShowDialog}
                onClose={() => setVisibleShowDialog(false)}
            >
                // highlight-next-line
                <Show recordItemId={showId} isLoading={isLoading}></Show>
            </Dialog>
        </>
    );
};
```

:::note
`<Show>` component needs the `id` information for [`<RefreshButton>`](/ui-frameworks/mui/components/buttons/refresh.md) to work properly.
:::

### `resource`

The `<Show>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<Show>` component in a custom page, you can use the `resource` property.

[Refer to the custom pages documentation for detailed usage. &#8594](/guides-and-concepts/custom-pages.md)

```tsx title="src/app.tsx"
import { Refine } from "@pankod/refine-core";
import { Show } from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

// highlight-start
const CustomPage = () => {
    return (
        <Show resource="posts" recordItemId="postId">
            ...
        </Show>
    );
};
// highlight-end

export const App: React.FC = () => {
    return (
        <Refine
            routerProvider={{
                ...routerProvider,
                // highlight-start
                routes: [
                    {
                        element: <CustomPage />,
                        path: "/custom",
                    },
                ],
                // highlight-end
            }}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev/")}
            resources={[{ name: "posts" }]}
        />
    );
};
```

:::caution
The `<Show>` component needs the `id` information for work properly, so if you use the `<Show>` component in custom pages, you should pass the `recordItemId` property.
:::

## API Reference

### Properties

| Property         | Description                             | Type                                                                      | Default                                                                        |
| ---------------- | --------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| canDelete        | Adds a `<DeleteButton>`                 | `boolean`                                                                 | If the resource has `canDelete` prop it is `true` else `false`                 |
| canEdit          | Adds an `<EditButton>`                  | `boolean`                                                                 | If the resource has `canEdit` prop it is `true` else `false`                   |
| actionButtons    | Passes the props for `<CardActions>`    | `React.ReactNode`                                                         | `<SaveButton>` and depending on your resource configuration (`canDelete` prop) |
| cardProps        | Passes the props for `<Card>`           | [`CardProps`](https://mui.com/material-ui/api/card/#props)                | `<SaveButton>` and depending on your resource configuration (`canDelete` prop) |
| cardHeaderProps  | Passes the props for `<CardHeader>`     | [`CardHeaderProps`](https://mui.com/material-ui/api/card-header/#props)   |                                                                                |
| cardContentProps | Passes the props for `<CardContent>`    | [`CardContentProps`](https://mui.com/material-ui/api/card-content/#props) |                                                                                |
| cardActionsProps | Passes the props for `<CardActions>`    | [`CardActionsProps`](https://mui.com/material-ui/api/card-actions/#props) |                                                                                |
| recordItemId     | The record id for `<RefreshButton>`     | [`BaseKey`](/core/interfaces.md#basekey)                                  |                                                                                |
| resource         | Resource name for API data interactions | `string`                                                                  | Resource name that it reads from the URL.                                      |
| isLoading        | Passes the props for `<RefreshButton>`  | `boolean`                                                                 | false                                                                          |
