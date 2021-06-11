---
id: clone-button
title: Clone
---

import defaultUsage from '@site/static/img/guides-and-concepts/components/buttons/clone/default.png';

`<CloneButton>` is using Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `clone` method from [useNavigation](#) under the hood. It can be useful for redirect the app to the create page with the record id route of `<Resource>`.

## Usage

```tsx
import { CloneButton } from "@pankod/refine";

export const MyCloneComponent = () => {
    return <CloneButton />;
};
```

Looks like this:

<div>
    <img  width="20%" src={defaultUsage} alt="Default Clone Button" />
</div>

## Properties

### `recordItemId`

`recordItemId` is used to append the record id to the end of the path.

```tsx
import { CloneButton } from "@pankod/refine";
export const MyCloneComponent = () => {
    return <CloneButton resourceName="posts" recordItemId="1" />;
};
```

Clicking the button will trigger the `clone` method of [`useNavigation`](#) and then redirect the app to `/resources/posts/create/1`.

:::note
`<CloneButton>` component reads the id information from the route by default.
:::

### `resourceName`

It is used to redirect the app to the `/create` endpoint of the given resource name. By default, the app redirects to a URL with `/create` defined by the name property of `<Resource>` component.

```tsx
import { CloneButton } from "@pankod/refine";
export const MyCloneComponent = () => {
    return <CloneButton resourceName="categories" recordItemId="2" />;
};
```

Clicking the button will trigger the `clone` method of [`useNavigation`](#) and then redirect the app to `/resources/categories/create/2`.

## API Reference

### Properties

| Property     | Description                                   | Type                                                                                                             | Default                                                         |
| ------------ | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| props        | Ant Design button props                       | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; recordItemId?: string; }` |                                                                 |
| resourceName | Determines which resource to use for redirect | `string`                                                                                                         | Resource name acquired from route                               |
| recordItemId | Add `id` to the end of the URL                | `string`                                                                                                         | Record id acquired from route                                   |
| children     | Set the button text                           | `ReactNode`                                                                                                      | `"Clone"`                                                       |
| icon         | Set the icon component of button              | `ReactNode`                                                                                                      | [`<PlusSquareOutlined />`](https://ant.design/components/icon/) |
| onClick      | Set the handler to handle click event         | `(event) => void`                                                                                                | Triggers navigation for redirect to the create page of resource |
