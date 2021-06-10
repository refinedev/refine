---
id: create-button
title: Create
---

import defaultUsage from '@site/static/img/guides-and-concepts/components/buttons/create/default.png';

Create button is an Ant Design [`<Button>`](https://ant.design/components/button/) component. It uses the `create` method from [`useNavigation`](#) under the hood. It can be useful when you want to redirect to the create page of `<Resource>`.

## Usage

```tsx
import { CreateButton } from "@pankod/refine";

export const MyCreateComponent = () => {
    return <CreateButton />;
};
```

Looks like this:

<div>
    <img  width="20%" src={defaultUsage} alt="Default Create Button" />
</div>

## Properties

### `resourceName`

It is used to redirect the app to the `/create` endpoint of the given resource name. By default, the app redirects to a URL with `/create` defined by the name property of `<Resource>` component

```tsx
import { CreateButton } from "@pankod/refine";

export const MyCreateComponent = () => {
    return <CreateButton resourceName="posts" />;
};
```

Clicking the button will trigger the `create` method of [`useNavigation`](#) and then redirect to `/resources/posts/create`.

## API Reference

### Properties

| Property     | Description                                   | Type                                                                                      | Default                                                                                                 |
| ------------ | --------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| props        | Ant Design button props                       | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; }` |                                                                                                         |
| resourceName | Determines which resource to use for redirect | `string`                                                                                  | Resource name acquired from route                                                                       |
| children     | Set the button text                           | `ReactNode`                                                                               | `"Create"`                                                                                              |
| icon         | Set the icon component of button              | `ReactNode`                                                                               | [`<PlusSquareOutlined />`](https://ant.design/components/icon/)                                         |
| onClick      | Set the handler to handle click event         | `(event) => void`                                                                         | Executes `useNavigation` `create` method like this: `create(resourceName ?? routeResourceName, "push")` |
