---
id: create-button
title: Create Button
---

Create button is an Ant Design [`<Button>`](https://ant.design/components/button/) component. It uses the `create` method from [`useNavigation`](#) under the hood. It can be useful when you want to redirect create page of resource.

## Properties

### `resourceName`

It is used to redirect to the create page of resource you want, if this property is not passed, it redirects to the create page of resource it reads from the url.

```tsx
import { CreateButton } from "@pankod/refine";

export const MyCreateComponent = () => {
    return <CreateButton resourceName="custom resource" />;
};
```

## API Reference

### Properties

| Property     | Description                                   | Type                                                                                      | Default                                                         |
| ------------ | --------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| props        | Ant desing button props                       | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; }` |                                                                 |
| resourceName | Determines which resource to use for redirect | `string`                                                                                  | Resource name that it reads from the url                        |
| children     | Set the button text                           | `ReactNode`                                                                               | `"Create"`                                                      |
| icon         | Set the icon component of button              | `ReactNode`                                                                               | [`<PlusSquareOutlined />`](https://ant.design/components/icon/) |
