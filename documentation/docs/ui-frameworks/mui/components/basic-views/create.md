---
id: create
title: Create
---

import actionButtonsUsage from '@site/static/img/guides-and-concepts/basic-views/create/actionButtonUsageMui.png'
import cardHeaderPropsTitle from '@site/static/img/guides-and-concepts/basic-views/create/cardHeaderPropsTitle.png'

`<Create>` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.

We'll show what `<Create>` does using properties with examples.

## Properties

### `saveButtonProps`

`<Create>` component has a default button that submits the form. If you want to customize this button you can use the `saveButtonProps` property like the code below.

[Refer to the `<SaveButton>` documentation for detailed usage. &#8594](/ui-frameworks/mui/components/buttons/save.md)

```tsx
import { Create } from "@pankod/refine-mui";

export const CreatePage: React.FC = () => {
    return <Create saveButtonProps={{ size: "small" }}>...</Create>;
};
```

### `actionButtons`

`<Create>` uses the Material UI [`<CardActions>`](https://mui.com/material-ui/api/card-actions/#main-content) component. The children of the [`<CardActions>`](https://mui.com/material-ui/api/card-actions/#main-content) component shows [`<SaveButton>`](/ui-frameworks/mui/components/buttons/save.md) and [`<DeleteButton>`](/ui-frameworks/mui/components/buttons/delete.md) based on your resource definition in the`resources` property you pass to `<Refine>`. If you want to use other things instead of these buttons, you can use the `actionButton` property like the code below.

```tsx title="src/pages/posts/create.tsx"
// highlight-next-line
import { Create, Button } from "@pankod/refine-mui";

export const CreatePage: React.FC = () => {
    return (
        <Create
            // highlight-start
            actionButtons={
                <>
                    <Button>Custom Button 1</Button>
                    <Button>Custom Button 2</Button>
                </>
            }
            // highlight-end
        >
            ...
        </Create>
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
    <img src={actionButtonsUsage} alt="actionButton Usage" />
</div>
<br/>

### `cardProps`

`<Create>` uses the Material UI [`<Card>`](https://mui.com/material-ui/react-card/#main-content) components so you can customize with the props of `cardProps`.

### `cardHeaderProps`

`<Create>` uses the Material UI [`<CardHeader>`](https://mui.com/material-ui/api/card-header/) components so you can customize with the props of `cardHeaderProps`.

```tsx
// highlight-next-line
import { Create, Typography } from "@pankod/refine-mui";

export const CreatePage: React.FC = () => {
    return (
        <Create
            // highlight-start
            cardHeaderProps={{
                title: <Typography variant="h5">Custom Title</Typography>,
            }}
            // highlight-end
        >
            ...
        </Create>
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

`<Create>` uses the Material UI [`<CardContent>`](https://mui.com/material-ui/api/card-content/) components so you can customize with the props of `cardContentProps`.

### `cardActionsProps`

`<Create>` uses the Material UI [`<CardActions>`](https://mui.com/material-ui/api/card-actions/) components so you can customize with the props of `cardActionsProps`.

### `resource`

The `<Create>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<Create>` component in a custom page, you can use the `resource` prop.

[Refer to the custom pages documentation for detailed usage. &#8594](/guides-and-concepts/custom-pages.md)

```tsx
import { Refine } from "@pankod/refine-core";
import { Create } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-start
const CustomPage = () => {
    return <Create resource="posts">...</Create>;
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

| Property         | Description                             | Type                                                                      | Default                                                                        |
| ---------------- | --------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| saveButtonProps  | Adds props for `<SaveButton>`           | `{ disabled: boolean; onClick: () => void; loading: boolean; }`           | `<SaveButton>`                                                                 |
| actionButtons    | Passes the props for `<CardActions>`    | `React.ReactNode`                                                         | `<SaveButton>` and depending on your resource configuration (`canDelete` prop) |
| cardProps        | Passes the props for `<Card>`           | [`CardProps`](https://mui.com/material-ui/api/card/#props)                | `<SaveButton>` and depending on your resource configuration (`canDelete` prop) |
| cardHeaderProps  | Passes the props for `<CardHeader>`     | [`CardHeaderProps`](https://mui.com/material-ui/api/card-header/#props)   |                                                                                |
| cardContentProps | Passes the props for `<CardContent>`    | [`CardContentProps`](https://mui.com/material-ui/api/card-content/#props) |                                                                                |
| cardActionsProps | Passes the props for `<CardActions>`    | [`CardActionsProps`](https://mui.com/material-ui/api/card-actions/#props) |                                                                                |
| resource         | Resource name for API data interactions | `string`                                                                  | Resource name that it reads from the URL.                                      |
| isLoading        | Passes the props for `<SaveButton>`     | `boolean`                                                                 | false                                                                          |
