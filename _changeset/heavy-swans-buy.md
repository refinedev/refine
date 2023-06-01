---
"@refinedev/antd": minor
---

Updated the `useForm`, `useModalForm`, `useDrawerForm` and `useStepsForm` to accept `queryMeta` and `mutationMeta` properties of the `useForm` hook of `@refinedev/core`. These properties are used to pass specific meta values to the query or mutation. This is useful when you have overlapping values in your data provider's `getOne` and `update` methods. For example, you may want to change the `method` of the mutation to `PATCH` but if you pass it in the `meta` property, you'll end up changing the method of the `getOne` request as well.

`queryMeta` and `mutationMeta` has precedence over `meta`. This means that if you have the same property in `queryMeta` and `meta`, the value in `queryMeta` will be used.

**Usage**

```tsx
import { useForm } from "@refinedev/core";

export const MyEditPage = () => {
    const form = useForm({
        // this is passed both to the mutation and the query requests
        meta: {
            myValue: "myValue"
        },
        // this is only passed to the query request
        queryMeta: {
            propertyOnlyWorksForQuery: "propertyOnlyWorksForQuery"
        },
        // this is only passed to the mutation request
        mutationMeta: {
            propertyOnlyWorksForMutation: "propertyOnlyWorksForMutation"
        }
    })
}
```


