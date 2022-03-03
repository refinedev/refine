---
id: useSelect
title: useSelect
description: useSelect hook API references of @pankod/refine-core
---

import basicUsage from '@site/static/img/core/useSelect/useSelect.png';

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

```tsx  title="pages/posts/create.tsx"
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
    id: string;
    title: string;
}
```

`useSelect` uses the `useList` hook for fetching data. [Refer to `useList` hook for details. &#8594](/core/hooks/data/useList.md)

## Options

### `resource`

```tsx
const { options } = useSelect({
    resource: "categories",
});
```

`resource` property determines API resource endpoint to fetch records from [`dataProvider`](/core/providers/data-provider.md). It returns properly configured `options` values for select options.

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

[Refer to the `useMany` documentation for detailed usage. &#8594](/core/hooks/data/useMany.md)

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

If defined, it allows us to override the filters to use when fetching list of records. Thus, it . It should return [`CrudFilters`](/core/interfaces.md#crudfilters).

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

| Property                                                     | Description                                                                                                                                                        | Type                                                                           | Default     |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ----------- |
| resource <div className="required">Required</div>            | Resource name for API data interactions                                                                                                                            | `string`                                                                       |             |
| defaultValue                                                 | Adds extra `options`                                                                                                                                               | [`BaseKey`](/core/interfaces.md#basekey)  \| [`BaseKey[]`](/core/interfaces.md#basekey)                                                    |             |
| optionValue                                                  | Set the option's value                                                                                                                                             | `string`                                                                       | `"id"`      |
| optionLabel                                                  | Set the option's label value                                                                                                                                       | `string`                                                                       | `"title"`   |
| filters                                                      | Add filters while fetching the data                                                                                                                                | [`CrudFilters`](/core/interfaces.md#crudfilters)                               |             |
| sort                                                         | Allow us to sort the options                                                                                                                                       | [`CrudSorting`](/core/interfaces.md#crudsorting)                               |             |
| debounce                                                     | The number of milliseconds to delay                                                                                                                                | `number`                                                                       | 300         |
| queryOptions                                                 | react-query [useQuery](https://react-query.tanstack.com/reference/useQuery) options                                                                                | ` UseQueryOptions<GetListResponse<TData>, TError>`                             |             |
| defaultValueQueryOptions                                     | react-query [useQuery](https://react-query.tanstack.com/reference/useQuery) options                                                                                | ` UseQueryOptions<GetManyResponse<TData>, TError>`                             |             |
| fetchSize                                                    | Amount of records to fetch in select box list.                                                                                                                     | `number`                                                                       | `undefined` |
| onSearch                                                     | If defined, this callback allows us to override all filters for every search request.                                                                              | `(value: string) => CrudFilters `\|` Promise<CrudFilters>`                     | `undefined` |
| metaData                                                     | Metadata query for `dataProvider`                                                                                                                                  | [`MetaDataQuery`](/core/interfaces.md#metadataquery)                           | {}          |
| dataProviderName                                             | If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.                                                                 | `string`                                                                       | `default`   |
| [liveMode](/core/providers/live-provider.md#usage-in-a-hook) | Whether to update data automatically (`"auto"`) or not (`"manual"`) if a related live event is received. The "off" value is used to avoid creating a subscription. | [`"auto"` \| `"manual"` \| `"off"`](/core/interfaces.md#livemodeprops)         | `"off"`     |
| liveParams                                                   | Params to pass to `liveProvider`'s `subscribe` method if `liveMode` is enabled.                                                                                    | [`{ ids?: BaseKey[]; [key: string]: any; }`](/core/interfaces.md#livemodeprops) | `undefined` |
| onLiveEvent                                                  | Callback to handle all related live events of this hook.                                                                                                           | [`(event: LiveEvent) => void`](/core/interfaces.md#livemodeprops)              | `undefined` |

### Return values

| Property                   | Description                                    | Type                                                                                          |
| -------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| options                    | It returns possible options                    | `{ label: string; value: string }`                                                            |
| queryResult                | Result of the query of a record                | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |
| defaultValueQueryResult    | Result of the query of a `defaultValue` record | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |
| defaultValueQueryOnSuccess | Default value onSuccess method                 | `() => void`                                                                                  |

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-core-use-select-18cdm?autoresize=1&fontsize=14&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-use-select-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>