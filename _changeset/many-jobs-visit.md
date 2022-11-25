---
"@pankod/refine-inferencer": minor
---

Initial release of the **Inferencer** package.

This package provides series of components per each UI integration to generate **list**, **show** and **edit** pages for your resources. The fields and their representation are inferred from your resource's API response. Code is generated and presented with a preview and option to copy and edit in your project. 

**Note:** It's highly advised to only use this package in development environments. While generating the sample code, multiple requests are made to the API and the result might not be the best application for your data.

## Usage

Components for UI integrations are exported in sub directories. For example, to use the components for Ant Design integration, you can import them like this:

```tsx
import { AntdListInferencer, AntdShowInferencer, AntdEditInferencer } from "@pankod/refine-inferencer/antd"
```

After importing the component, you can directly use it in `<Refine/>` component's `resources` prop.

```tsx
    <Refine
        resources={[
            {
                name: "posts",
                list: AntdListInferencer,
                show: AntdShowInferencer,
                edit: AntdEditInferencer,
            }
        ]}
    />

```

**Tip:** Relation data is only handled if the resource is present in the `resources` array. For example, if you have a `posts` resource with a `users` relation, you need to add `users` resource to the `resources` array as well. Otherwise, inferencer will try to show the relation data as a simple field like string or a number. 