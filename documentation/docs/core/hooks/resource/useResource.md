---
id: useResource
title: useResource
---

`useResource` is used to get `resources` that are defined as property of the `<Refine>` component and it also returns the `resource`, `resourceName` and `id` values ​​that it reads from the root with the props you provide.

```ts
import { useResource } from "@pankod/refine-core";

const { resources, resource,  resourceName, id } = useResource({
        resourceName,
        resourceNameOrRouteName
        recordItemId,
    });
```

## API Reference

### Properties

| Key                   | Description                                                                                                                                                        | Type                                                        | Default                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| resourceNameOrRouteName                                                                                   | Determines which resource to use for redirection | `string`                                                                                                                              | Resource name that it reads from route                           |
| <div className="required-block"><div>resourceName</div> <div className=" required">deprecated</div></div> | Determines which resource to use for redirection | `string`                                                                                                                              | Resource name that it reads from route                           |
| recordItemId                                                                                              | Adds `id` to the end of the URL                  | [`BaseKey`](/core/interfaces.md#basekey)                                                                                              | Record id that it reads from route                               |

### Return value

| Description | Type                             |
| ----------- | -------------------------------- |
| resources   | [`IResourceItem[]`](#interfaces) |
| resource   | [`IResourceItem`](#interfaces) |
| resourceName   | `string` |
| id   | [`BaseKey`](/core/interfaces.md#basekey) |


#### Interfaces

```ts
type OptionsProps<TExtends = { [key: string]: any }> = TExtends & {
    label?: string;
    route?: string;
}

interface IResourceComponentsProps<TCrudData = any, TOptionsPropsExtends = { [key: string]: any }> {
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    canShow?: boolean;
    name?: string;
    initialData?: TCrudData;
    options?: OptionsProps<TOptionsPropsExtends>;
}

interface IResourceComponents {
    list?: React.FunctionComponent<IResourceComponentsProps<any, any>>;
    create?: React.FunctionComponent<IResourceComponentsProps<any, any>>;
    edit?: React.FunctionComponent<IResourceComponentsProps<any, any>>;
    show?: React.FunctionComponent<IResourceComponentsProps<any, any>>;
}

interface IResourceItem extends IResourceComponents {
    name: string;
    label?: string;
    route?: string;
    icon?: ReactNode;
    canCreate?: boolean;
    canEdit?: boolean;
    canShow?: boolean;
    canDelete?: boolean;
    options?: OptionsProps;
    parentName?: string;
}
```

> The `canCreate`, `canShow` and `canEdit` properties are defined automatically if the `create`, `show` and `edit` components are defined on the `resources` property in `<Refine>`.
