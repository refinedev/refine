---
"@refinedev/inferencer": minor
---

## `meta` property for inferencer components

Added `meta` property to the inferencer components. This allows you to pass `meta` to the data hooks included in the inferencer's generated code. This is useful when your data provider relies on the `meta` property which made `@refinedev/inferencer` unusable before. Now you will be able to pass `meta` properties and generate code that will work with your data provider.

`meta` property of the inferencer components has a nested structure unlike the rest of the refine codebase. This is because the inferencer components are designed to infer the relational data as well which may require different `meta` values for each of their methods (such as `getList` and `getOne`).

### Type

```tsx
<AntdListInferencer
    meta={{
        [resourceNameOrIdentifier: string]: {
            [methodName: "default" | "getList" | "getMany" | "getOne" | "update"]: Record<string, unknown>,
        }
    }}
/>
```

`default` is the default `meta` value for all the methods. In the absence of a specific `meta` value for a method for a resource, the `default` value will be used.

### Example Usage

```tsx
<AntdListInferencer
    meta={{
        posts: {
            getList: {
                fields: [
                    "id",
                    "title",
                    "content",
                    "category_id",
                    "created_at",
                ],
            },
        },
        categories: {
            default: {
                fields: ["id", "title"],
            },
        },
    }}
/>
```

## Using the appropriate method to infer the relational data

The inferencer components were using the `getOne` method of the data providers to infer the relational field data in a record. This has a chance of breaking the generated code and the preview if the data provider implements a `getMany` and `getOne` in a different manner which may not be compatible with each other. 

In the generated code, fields with multiple values are handled via `useMany` hook but the inference was using the `getOne` method regardless of the field's cardinality. This has been fixed and the inferencer components will now use the `getMany` method for fields with multiple values and `getOne` method for fields with single values.

## Redesigned code viewer components

Updated the code viewers components and the bottom buttons and unified the design. The code viewers now use the same components.

## Sortable actions in Material UI list inferencer

Fixed the actions column in the Material UI list inferencer to be sortable.

## Repeated relational fields

Added a check for repeated relational fields and excluded the duplicate fields from the generated code according to the context of the inferencer. In `list` and `show` actions fields with displayable values are preferred over the fields with relational values. In `edit` and `create` actions, fields with relational values are preferred over the fields with displayable values.

For example, if a `posts` resource item has both `category_id` (`number` or `string`) and `category` (record with key `title` and `id`) fields. The `list` and `show` actions will use the `category` field and the `edit` and `create` actions will use the `category_id` field.