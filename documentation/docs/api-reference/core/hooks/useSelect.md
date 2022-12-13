---
id: useSelect
title: useSelect
description: useSelect hook API references of @pankod/refine-core
---

`useSelect` hook allows you to manage any `select` (like a [Html `<select>` tag](https://www.w3schools.com/tags/tag_select.asp), [React Select](https://react-select.com/home), etc...) component. Since it is designed as headless, It expects you to handle the UI.

## Usage

We'll demonstrate how to get data at `/categories` endpoint from `https://api.fake-rest.refine.dev` REST API.

```ts title="https://api.fake-rest.refine.dev/categories"
{
    [
        {
            id: 1,
            title: "E-business",
        },
        {
            id: 2,
            title: "Virtual Invoice Avon",
        },
        {
            id: 3,
            title: "Unbranded",
        },
    ];
}
```

```tsx title="pages/posts/create.tsx"
// highlight-next-line
import { useSelect } from "@pankod/refine-core";

export const DummyList = () => {
    // highlight-start
    const { options } = useSelect<ICategory>({
        resource: "categories",
    });
    // highlight-end

    return (
        <select>
            // highlight-start
            {options?.map((category) => (
                <option key={category.value} value={category.value}>
                    {category.label}
                </option>
            ))}
            // highlight-end
        </select>
    );
};

interface ICategory {
    id: number;
    title: string;
}
```

`useSelect` uses the `useList` hook for fetching data. [Refer to `useList` hook for details. &#8594](/api-reference/core/hooks/data/useList.md)

## Options

### `resource`

```tsx
const { options } = useSelect({
    resource: "categories",
});
```

`resource` property determines API resource endpoint to fetch records from [`dataProvider`](/api-reference/core/providers/data-provider.md). It returns properly configured `options` values for select options.

### `defaultValue`

```tsx
const { options } = useSelect({
    resource: "categories",
    // highlight-next-line
    defaultValue: "1",
});
```

Adds extra `options` to `<select>` component. It uses `useMany` so `defaultValue` can be an array of strings like follows.

```ts
defaultValue: ["1", "2"],
```

[Refer to the `useMany` documentation for detailed usage. &#8594](/api-reference/core/hooks/data/useMany.md)

:::tip
Can use `defaultValue` property when edit a record in `Edit` page.
:::

### `optionLabel` and `optionValue`

```tsx
const { options } = useSelect({
    resource: "categories",
    // highlight-start
    optionLabel: "title",
    optionValue: "id",
    // highlight-end
});
```

Allows you to change the values and appearance of your options. Default values are `optionLabel = "title"` and `optionValue = "id"`.

:::tip

Supports use with `optionLabel` and `optionValue` [Object path](https://lodash.com/docs/4.17.15#get) syntax.

```tsx
const { options } = useSelect({
    resource: "categories",
    // highlight-start
    optionLabel: "nested.title",
    optionValue: "nested.id",
    // highlight-end
});
```

:::

### `filters`

```tsx
const { options } = useSelect({
    resource: "categories",
    // highlight-start
    filters: [
        {
            field: "isActive",
            operator: "eq",
            value: true,
        },
    ],
    // highlight-end
});
```

It allows us to add some filters while fetching the data. For example, if you want to list only the active records.

### `sort`

```tsx
const { options } = useSelect({
    resource: "categories",
    // highlight-start
    sort: [
        {
            field: "title",
            order: "asc",
        },
    ],
    // highlight-end
});
```

It allows us to sort the `options`. For example, if you want to sort your list according to `title` by ascending.

### `fetchSize`

```tsx
const { options } = useSelect({
    resource: "categories",
    // highlight-next-line
    fetchSize: 20,
});
```

Amount of records to fetch in select box.

### `onSearch`

It allows us to `AutoComplete` the `options`.

```tsx
const { options } = useSelect({
    resource: "categories",
    // highlight-start
    onSearch: (value) => [
        {
            field: "title",
            operator: "containss",
            value,
        },
    ],
    // highlight-end
});
```

:::tip
The HTML select tag does not natively support AutoComplete. If AutoComplete is desired, it can be used with [React Select](https://react-select.com/async) or [use-select](https://github.com/tannerlinsley/use-select).
:::

If defined, it allows us to override the filters to use when fetching list of records. Thus, it . It should return [`CrudFilters`](/api-reference/core/interfaces.md#crudfilters).

### `queryOptions`

```tsx
const { options } = useSelect({
    resource: "categories",
    // highlight-start
    queryOptions: {
        onError: () => {
            console.log("triggers when on query return Error");
        },
    },
    // highlight-end
});
```

[useQuery](https://react-query.tanstack.com/reference/useQuery) options can be set by passing `queryOptions` property.

### `defaultValueQueryOptions`

When the `defaultValue` property is given, the `useMany` data hook is called for the selected records. With this property, you can change the options of this query. If not given, the values given in queryOptions will be used.

```tsx
const { options } = useSelect({
    resource: "categories",
    // highlight-start
    defaultValueQueryOptions: {
        onSuccess: (data) => {
            console.log("triggers when on query return on success");
        },
    },
    // highlight-end
});
```

[useQuery](https://react-query.tanstack.com/reference/useQuery) options for default value query can be set by passing `queryOptions` property.

## API Reference

### Properties

<PropsTable module="@pankod/refine-core/useSelect"  />

### Return values

| Property                   | Description                                    | Type                                                                                          |
| -------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| options                    | It returns possible options                    | `{ label: string; value: string }`                                                            |
| queryResult                | Result of the query of a record                | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |
| defaultValueQueryResult    | Result of the query of a `defaultValue` record | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |
| defaultValueQueryOnSuccess | Default value onSuccess method                 | `() => void`                                                                                  |

## Example

<StackblitzExample path="core-use-select" />
