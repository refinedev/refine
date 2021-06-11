---
id: list-button
title: List
---

import defaultUsage from '@site/static/img/guides-and-concepts/components/buttons/list/default.png';

`<ListButton>` is using Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `list` method from [useNavigation](#) under the hood. It can be useful to redirect the app to the list page route of `<Resource>`.

## Usage

```tsx
import { ListButton } from "@pankod/refine";

export const MyListComponent = () => {
    return <ListButton />;
};
```

Looks like this:

<div>
    <img  width="20%" src={defaultUsage} alt="Default List Button" />
</div>
<br/>

:::note
Since `<ListButton>` is used in the "posts" resource, its text is "Posts".
:::

## Properties

### `resourceName`

It is used to redirect the app to the endpoint of the given resource name. By default, the app redirects to defined by the name property of `<Resource>` component.

```tsx
import { ListButton } from "@pankod/refine";

export const MyListComponent = () => {
    return <ListButton resourceName="categories" />;
};
```

Clicking the button will trigger the `List` method of [`useNavigation`](#) and then redirect to `/resources/categories`.

## API Reference

### Properties

| Property     | Description                                   | Type                                                                                      | Default                                                       |
| ------------ | --------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| props        | Ant Design button props                       | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; }` |                                                               |
| resourceName | Determines which resource to use for redirect | `string`                                                                                  | Resource name acquired from route                             |
| children     | Set the button text                           | `ReactNode`                                                                               | Humanized resource name acquired from route                   |
| icon         | Set the icon component of button              | `ReactNode`                                                                               | [`<BarsOutlined />`](https://ant.design/components/icon/)     |
| onClick      | Set the handler to handle click event         | `(event) => void`                                                                         | Triggers navigation for redirect to the list page of resource |
