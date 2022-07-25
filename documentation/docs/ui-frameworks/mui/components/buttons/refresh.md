---
id: refresh-button
title: Refresh
---

import refreshButton from '@site/static/img/guides-and-concepts/components/buttons/refresh/refresh-mui.png';

`<RefreshButton>` uses Material UI [`<Button>`](https://mui.com/material-ui/react-button/) component to update the data shown on the page via the [`useOne`](/core/hooks/data/useOne.md) method provided by your [`dataProvider`](/core/providers/data-provider.md).

## Usage

```tsx title="src/pages/posts/show.tsx"
import { useShow } from "@pankod/refine-core";
// highlight-next-line
import { Show, Typography, Stack, RefreshButton } from "@pankod/refine-mui";

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
                    <RefreshButton />
                    // highlight-end
                ),
            }}
        >
            <Typography fontWeight="bold">Id</Typography>
            <Typography>{record?.id}</Typography>
            <Typography fontWeight="bold">Title</Typography>
            <Typography>{record?.title}</Typography>
        </Show>
    );
};

interface IPost {
    id: number;
    title: string;
}
```

Will Look like this:

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={refreshButton} alt="Default refresh button" />
</div>

## Properties

### `recordItemId`

`recordItemId` allows us to manage which data is going to be refreshed.

```tsx
import { RefreshButton } from "@pankod/refine-mui";

export const MyRefreshComponent = () => {
    return <RefreshButton resourceName="posts" recordItemId="1" />;
};
```

Clicking the button will trigger the [`useOne`](/core/hooks/data/useOne.md) method and then fetches the record whose resource is "post" and whose id is "1".

:::note
`<RefreshButton>` component reads the id information from the route by default.
:::

### `resourceNameOrRouteName`

`resourceNameOrRouteName` allows us to manage which resource is going to be refreshed.

```tsx
import { RefreshButton } from "@pankod/refine-mui";

export const MyRefreshComponent = () => {
    return (
        <RefreshButton resourceNameOrRouteName="categories" recordItemId="2" />
    );
};
```

Clicking the button will trigger the [`useOne`](/core/hooks/data/useOne.md) method and then fetches the record whose resource is "categories" and whose id is "2".

:::note
`<RefreshButton>` component reads the resource name from the route by default.
:::

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx
import { RefreshButton } from "@pankod/refine-mui";

export const MyRefreshComponent = () => {
    return <RefreshButton hideText />;
};
```

## API Reference

### Properties

| Property                | Description                                                                                        | Type                                                              | Default                                                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| props                   | [`ButtonProps`](https://mui.com/material-ui/api/button/)                                           |                                                                   |
| resourceNameOrRouteName | Determines which resource to use for redirection                                                   | `string`                                                          | Resource name that it reads from route                                                                                         |
| hideText                | Allows to hide button text                                                                         | `boolean`                                                         | `false`                                                                                                                        |
| recordItemId            | Determines which id to use for refresh                                                             | [`BaseKey`](/core/interfaces.md#basekey)                          | Record id that it reads from route                                                                                             |
| dataProviderName        | If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use. | `string`                                                          | `default`                                                                                                                      |
| metaData                | Metadata query for `dataProvider`                                                                  | [`MetaDataQuery`](/core/interfaces.md#metadataquery)              | {}                                                                                                                             |
| children                | Sets the button text                                                                               | `ReactNode`                                                       | Humanized resource name that it reads from route                                                                               |
| startIcon               | Sets the icon component of button                                                                  | `ReactNode`                                                       | [`<RefreshOutlinedIcon />`](https://mui.com/material-ui/material-icons/?theme=Outlined&query=Refresh&selected=RefreshOutlined) |
| svgIconProps            | Allows to set icon props                                                                           | [`SvgIconProps`](https://mui.com/material-ui/api/svg-icon/#props) |                                                                                                                                |
| onClick                 | Sets the handler to handle click event                                                             | `(event) => void`                                                 | Triggers navigation for redirection to the list page of resource                                                               |
