---
id: refresh-button
title: Refresh
---


`<RefreshButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component to update the data shown on the page via the [`useOne`](api-references/hooks/data/useOne.md) method provided by your [`dataProvider`](api-references/providers/data-provider.md).

## Usage

```tsx
import {
    // highlight-next-line
    RefreshButton,
    useShow,
    Show,
    Typography,
} from "@pankod/refine";

const { Title, Text } = Typography;

export const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show
            isLoading={isLoading}
            // highlight-next-line
            pageHeaderProps={{ extra: <RefreshButton /> }}
        >
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>
        </Show>
    );
};

interface IPost {
    id: string;
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
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/components/buttons/refresh/refresh.png" alt="Default refresh button" />
</div>

## Properties

### `recordItemId`

`recordItemId` allows us to manage which data is going to be refreshed.

```tsx 
import { RefreshButton } from "@pankod/refine";

export const MyRefreshComponent = () => {
    return <RefreshButton resourceName="posts" recordItemId="1" />;
};
```

Clicking the button will trigger the [`useOne`](api-references/hooks/data/useOne.md) method and then fetches the record whose resource is "post" and whose id is "1".

:::note
`<RefreshButton>` component reads the id information from the route by default.
:::

### `resourceName`

`resourceName` allows us to manage which resource is going to be refreshed.

```tsx 
import { RefreshButton } from "@pankod/refine";

export const MyRefreshComponent = () => {
    return <RefreshButton resourceName="categories" recordItemId="2" />;
};
```

Clicking the button will trigger the [`useOne`](api-references/hooks/data/useOne.md) method and then fetches the record whose resource is "categories" and whose id is "2".

:::note
`<RefreshButton>` component reads the resource name from the route by default.
:::

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx 
import { RefreshButton } from "@pankod/refine";

export const MyRefreshComponent = () => {
    return <RefreshButton hideText />;
};
```

## API Reference

### Properties

| Property     | Description                                  | Type                                                                                                                                 | Default                                                                        |
| ------------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| props        | Ant Design button props                      | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; recordItemId?: string; hideText?: boolean; }` |                                                                                |
| resourceName | Determines which resource to use for refresh | `string`                                                                                                                             | Resource name that it reads from route                                         |
| recordItemId | Determines which id to use for refresh       | `string`                                                                                                                             | Record id that it reads from route                                             |
| hideText     | Allows to hide button text                   | `boolean`                                                                                                                            | `false`                                                                        |
| children     | Sets the button text                         | `ReactNode`                                                                                                                          | `"Refresh"`                                                                    |
| icon         | Sets the icon component of button            | `ReactNode`                                                                                                                          | [`<RedoOutlined />`](https://ant.design/components/icon/)                      |
| onClick      | Sets the handler to handle the click event   | `(event) => void`                                                                                                                    | trigger the [`useOne`](api-references/hooks/data/useOne.md) method for refresh |
| metaData     | Metadata query for `dataProvider`            | [`MetaDataQuery`](/api-references/interfaces.md#metadataquery)                                                                     | {}                                                                             |
