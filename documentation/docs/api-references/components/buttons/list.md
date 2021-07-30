---
id: list-button
title: List
---

import tableUsage from '@site/static/img/guides-and-concepts/components/buttons/list/usage.png';

`<ListButton>` is using Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `list` method from [`useNavigation`](api-references/hooks/navigation/useNavigation.md) under the hood. It can be useful when redirecting the app to the list page route of `<Resource>`.

## Usage

```tsx
import { 
    useShow,
    Show,
    Typography,
    //highlight-next-line
    ListButton
} from "@pankod/refine";

import { IPost } from "interfaces";

const { Title, Text } = Typography;

export const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        //highlight-next-line
        <Show isLoading={isLoading} pageHeaderProps={{ extra: <ListButton /> }}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>
        </Show>
    );
};
```

```ts
export interface IPost {
    id: string;
    title: string;
}
```

Will look like this:

<div>
    <img src={tableUsage} alt="Default List Button" />
</div>
<br/>

:::note
The button text is defined automatically by *refine* based on *`<Resource>`* component name property.
:::

## Properties

### `resourceName`

Redirection endpoint(`resourceName/list`) is defined by `resourceName` property. By default, `<ListButton>` uses `name` property of the `<Resource>` component as an endpoint to redirect after clicking.

```tsx
import { ListButton } from "@pankod/refine";

export const MyListComponent = () => {
    return <ListButton resourceName="categories" />;
};
```

Clicking the button will trigger the `list` method of [`useNavigation`](api-references/hooks/navigation/useNavigation.md) and then redirect to `/resources/categories`.

## API Reference

### Properties

| Property     | Description                                   | Type                                                                                      | Default                                                       |
| ------------ | --------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| props        | Ant Design button properties                    | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; }` |                                                               |
| resourceName | Determines which resource to use for redirection | `string`                                                                                  | Resource name that it reads from route                             |
| children     | Sets the button text                           | `ReactNode`                                                                               | Humanized resource name that it reads from route                   |
| icon         | Sets the icon component of button              | `ReactNode`                                                                               | [`<BarsOutlined />`](https://ant.design/components/icon/)     |
| onClick      | Sets the handler to handle click event         | `(event) => void`                                                                         | Triggers navigation for redirection to the list page of resource |
