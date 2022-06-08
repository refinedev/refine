---
id: list
title: List
sidebar_label: List
---

import cardHeaderPropsTitle from '@site/static/img/guides-and-concepts/basic-views/list/cardHeaderPropsTitle.png'

`<List>` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like a create button or giving the page titles.

We will show what `<List>` does using properties with examples.

## Properties

### `canCreate` and `createButtonProps`

`canCreate` allows us to add the create button inside the `<List>` component. If resource is passed a create component, **refine** adds the create button by default. If you want to customize this button you can use `createButtonProps` property like the code below.

Create button redirects to the create page of the resource according to the value it reads from the URL.

```tsx title="src/pages/posts/list.tsx"
import { usePermissions } from "@pankod/refine-core";
// highlight-next-line
import { List } from "@pankod/refine-mui";

export const ListPage: React.FC = () => {
    const { data } = usePermissions<string>();

    return (
        <List
            // highlight-start
            canCreate={data === "admin"}
            createButtonProps={{ size: "small" }}
            // highlight-end
        >
            ...
        </List>
    );
};
```

[Refer to the `usePermission` documentation for detailed usage. &#8594](/core/hooks/auth/usePermissions.md)

### `cardProps`

`<List>` uses the Material UI [`<Card>`](https://mui.com/material-ui/react-card/#main-content) components so you can customize with the props of `cardProps`.

### `cardHeaderProps`

`<List>` uses the Material UI [`<CardHeader>`](https://mui.com/material-ui/api/card-header/) components so you can customize with the props of `cardHeaderProps`.

```tsx title="src/pages/posts/create.tsx"
// highlight-next-line
import { List, Typography } from "@pankod/refine-mui";

export const CreatePage: React.FC = () => {
    return (
        <List
            // highlight-start
            cardHeaderProps={{
                title: <Typography variant="h5">Custom Title</Typography>,
            }}
            // highlight-end
        >
            ...
        </List>
    );
};
```

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={cardHeaderPropsTitle} alt="Card Header Props Usage" />
</div>
<br/>

### `cardContentProps`

`<List>` uses the Material UI [`<CardContent>`](https://mui.com/material-ui/api/card-content/) components so you can customize with the props of `cardContentProps`.

### `resource`

The `<List>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<List>` component in a custom page, you can use the `resource` prop.

[Refer to the custom pages documentation for detailed usage. &#8594](/guides-and-concepts/custom-pages.md)

```tsx
import { Refine } from "@pankod/refine-core";
import { List } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-start
const CustomPage = () => {
    return <List resource="posts">...</List>;
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

## API Reference

### Properties

| Property          | Description                             | Type                                                                      | Default                                                                        |
| ----------------- | --------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| canCreate         | Adds a create button                    | `React.ReactNode`                                                         | `<SaveButton>` and depending on your resource configuration (`canDelete` prop) |
| createButtonProps | Adds props for create button            | `{ disabled: boolean; onClick: () => void; loading: boolean; }`           | `<SaveButton>`                                                                 |
| cardProps         | Passes the props for `<Card>`           | [`CardProps`](https://mui.com/material-ui/api/card/#props)                | `<SaveButton>` and depending on your resource configuration (`canDelete` prop) |
| cardHeaderProps   | Passes the props for `<CardHeader>`     | [`CardHeaderProps`](https://mui.com/material-ui/api/card-header/#props)   |                                                                                |
| cardContentProps  | Passes the props for `<CardContent>`    | [`CardContentProps`](https://mui.com/material-ui/api/card-content/#props) |                                                                                |
| resource          | Resource name for API data interactions | `string`                                                                  | Resource name that it reads from the URL.                                      |
