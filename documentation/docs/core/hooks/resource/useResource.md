---
id: useResource
title: useResource
---

`useResource` is used to get `resources` that are defined as property of the `<Refine>` component.

```ts
import { useResource } from "@pankod/refine-core";

const resources = useResource();
```

## API Reference

### Return value

| Description | Type                             |
| ----------- | -------------------------------- |
| Resources   | [`IResourceItem[]`](#interfaces) |

#### Interfaces

```ts
interface OptionsProps {
    label?: string;
    route?: string;
    [key: string]: any;
}

interface IResourceComponentsProps<TCrudData = any> {
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    canShow?: boolean;
    name?: string;
    initialData?: TCrudData;
    options?: OptionsProps;
}
interface IResourceComponents {
    list?: React.FunctionComponent<IResourceComponentsProps>;
    create?: React.FunctionComponent<IResourceComponentsProps>;
    edit?: React.FunctionComponent<IResourceComponentsProps>;
    show?: React.FunctionComponent<IResourceComponentsProps>;
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
}
```

> The `canCreate`, `canShow` and `canEdit` properties are defined automatically if the `create`, `show` and `edit` components are defined on the `resources` property in `<Refine>`.
