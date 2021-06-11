---
id: edit-button
title: Edit
---

import defaultUsage from '@site/static/img/guides-and-concepts/components/buttons/edit/default.png';

`<EditButton>` is using Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `edit` method from [`useNavigation`](#) under the hood. It can be useful to redirect the app to the edit page route of `<Resource>`.

## Usage

```tsx
import { EditButton } from "@pankod/refine";

export const MyEditComponent = () => {
    return <EditButton />;
};
```

Looks like this:

<div>
    <img  width="20%" src={defaultUsage} alt="Default Edit Button" />
</div>

## Properties

### `recordItemId`

`recordItemId` is used to append the record id to the end of the path. By default, it acquires the id parameter from the route.

```tsx
import { EditButton } from "@pankod/refine";

export const MyEditComponent = () => {
    return <EditButton resourceName="posts" id="1" />;
};
```

Clicking the button will trigger the `edit` method of [`useNavigation`](#) and then redirect the app to `/resources/posts/edit/1`.

### `resourceName`

It is used to redirect the app to the `/edit` endpoint of the given resource name. By default, the app redirects to a URL with `/edit` defined by the name property of `<Resource>` component.

```tsx
import { EditButton } from "@pankod/refine";

export const MyEditComponent = () => {
    return <EditButton resourceName="categories" id="2" />;
};
```

Clicking the button will trigger the `edit` method of [`useNavigation`](#) and then redirect the app to `/resources/categories/edit/2`.

## API Reference

### Properties

| Property     | Description                                   | Type                                                                                                             | Default                                                       |
| ------------ | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| props        | Ant Design button props                       | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; recordItemId?: string; }` |                                                               |
| resourceName | Determines which resource to use for redirect | `string`                                                                                                         | Resource name acquired from route                             |
| recordItemId | Add `id` to the end of the URL                | `string`                                                                                                         | Record id acquired from route                                 |
| children     | Set the button text                           | `ReactNode`                                                                                                      | `"Edit"`                                                      |
| icon         | Set the icon component of button              | `ReactNode`                                                                                                      | [`<EditOutlined />`](https://ant.design/components/icon/)     |
| onClick      | Set the handler to handle click event         | `(event) => void`                                                                                                | Triggers navigation for redirect to the edit page of resource |
