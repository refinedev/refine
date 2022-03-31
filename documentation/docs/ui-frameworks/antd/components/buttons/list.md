---
id: list-button
title: List
---

import listButton from '@site/static/img/guides-and-concepts/components/buttons/list/list.png';

`<ListButton>` is using Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `list` method from [`useNavigation`](/core/hooks/navigation/useNavigation.md) under the hood. It can be useful when redirecting the app to the list page route of resource.

## Usage

```tsx
import { useShow } from "@pankod/refine-core";
import {
    Show,
    Typography,
    // highlight-next-line
    ListButton,
} from "@pankod/refine-antd";

const { Title, Text } = Typography;

export const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        // highlight-next-line
        <Show pageHeaderProps={{ extra: <ListButton /> }} isLoading={isLoading}>
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
import { ListButton } from "@pankod/refine-antd";

export const MyListComponent = () => {
    return <ListButton resourceNameOrRouteName="categories" />;
};
```

Clicking the button will trigger the `list` method of [`useNavigation`](/core/hooks/navigation/useNavigation.md) and then redirect to `/categories`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx 
import { ListButton } from "@pankod/refine-antd";

export const MyListComponent = () => {
    return <ListButton hideText />;
};
```

### `ignoreAccessControlProvider`

It is used to skip access control for the button so that it doesn't check for access control. This is relevant only when an [`accessControlProvider`](/core/providers/accessControl-provider.md) is provided to [`<Refine/>`](/core/components/refine-config.md)

```tsx 
import { ListButton } from "@pankod/refine-antd";

export const MyListComponent = () => {
    return <ListButton ignoreAccessControlProvider />;
};
```

## API Reference

### Properties

| Property                                                                                                  | Description                                      | Type                                                                                                          | Default                                                          |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| props                                                                                                     | Ant Design button properties                     | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; hideText?: boolean; }` |                                                                  |
| resourceNameOrRouteName                                                                                   | Determines which resource to use for redirection | `string`                                                                                                      | Resource name that it reads from route                           |
| <div className="required-block"><div>resourceName</div> <div className=" required">deprecated</div></div> | Determines which resource to use for redirection | `string`                                                                                                      | Resource name that it reads from route                           |
| hideText                                                                                                  | Allows to hide button text                       | `boolean`                                                                                                     | `false`                                                          |
| ignoreAccessControlProvider                                                                               | Skip access control                              | `boolean`                                                                                                     | `false`                                                          |
| children                                                                                                  | Sets the button text                             | `ReactNode`                                                                                                   | Humanized resource name that it reads from route                 |
| icon                                                                                                      | Sets the icon component of button                | `ReactNode`                                                                                                   | [`<BarsOutlined />`](https://ant.design/components/icon/)        |
| onClick                                                                                                   | Sets the handler to handle click event           | `(event) => void`                                                                                             | Triggers navigation for redirection to the list page of resource |
