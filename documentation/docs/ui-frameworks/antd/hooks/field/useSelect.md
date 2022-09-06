---
id: useSelect
title: useSelect
---

import basicUsage from '@site/static/img/hooks/useSelect/basic-usage.png';
import search from '@site/static/img/hooks/useSelect/search.png';

`useSelect` hook allows you to manage an Ant Design [Select](https://ant.design/components/select/) component when records in a resource needs to be used as select options.

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
import { Form, Select, useSelect } from "@pankod/refine-antd";

export const PostCreate = () => {
// highlight-start
    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
    });
// highlight-end

    return (
        <Form>
            <Form.Item label="Categories" name="categories">
// highlight-next-line
                <Select {...selectProps} />
            </Form.Item>
        </Form>
    );
};

interface ICategory {
    id: number;
    title: string;
}
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={basicUsage} alt="Basic use of select box" />
</div>
<br/>

All we have to do is pass the `selectProps` it returns to the `<Select>` component.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={search} alt="Search functionality" />
</div>
<br/>

:::caution attention
By default, refine does the search using the `useList` hook and passes it to the search parameter. If you get a problem you should check your `getList` function in your Data Provider. If you want to change this behavior to make client-side filtering, you can examine [this](https://ant.design/components/select/#components-select-demo-search-sort) example.
:::

`useSelect` uses the `useList` hook for fetching data. [Refer to `useList` hook for details. &#8594](/core/hooks/data/useList.md)

## Options

### `resource`

```tsx
const { selectProps } = useSelect({
    resource: "categories",
});
```

`resource` property determines API resource endpoint to fetch records from [`dataProvider`](/core/providers/data-provider.md). It returns properly configured `options` values for select options.

[Refer to Ant Design `Select` component documentation for detailed info for `options`. &#8594](https://ant.design/components/select)

### `defaultValue`

```tsx
const { selectProps } = useSelect({
    resource: "categories",
// highlight-next-line
    defaultValue: "1",
});
```

Adds extra `options` to `<Select>` component. It uses `useMany` so `defaultValue` can be an array of strings like follows.

```ts
defaultValue: ["1", "2"],
```

[Refer to the `useMany` documentation for detailed usage. &#8594](/core/hooks/data/useMany.md)

:::tip
Can use `defaultValue` property when edit a record in `<Edit>` component.
:::

### `optionLabel` and `optionValue`

```tsx
const { selectProps } = useSelect({
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
const { selectProps } = useSelect({
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
const { selectProps } = useSelect({
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
const { selectProps } = useSelect({
    resource: "categories",
// highlight-next-line
    fetchSize: 20,
});
```

Amount of records to fetch in select box.

### `onSearch`

```tsx
const { selectProps } = useSelect({
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
If defined, it allows us to override the filters to use when fetching list of records. Thus, it . It should return [`CrudFilters`](/core/interfaces.md#crudfilters).

#### Client-side filtering

```tsx
const { selectProps } = useSelect({
    resource: "categories",
});

<Select
    {...selectProps}
// highlight-start
    onSearch={undefined}
    filterOption={true}
    optionFilterProp="label" // or "value"
// highlight-end
/>
```


### `queryOptions`

```tsx 
const { selectProps } = useSelect({
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
const { selectProps } = useSelect({
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

| Property                                          | Description                                                                         | Type                                                           | Default   |
| ------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------- |
| resource <div className="required">Required</div> | Resource name for API data interactions                                             | `string`                                                       |           |
| defaultValue                                      | Adds extra `options`                                                                | `string` \| `Array<string>`                                    |           |
| optionValue                                       | Set the option's value                                                              | `string`                                                       | `"id"`    |
| optionLabel                                       | Set the option's label value                                                        | `string`                                                       | `"title"` |
| filters                                           | Add filters while fetching the data                                                 | [`CrudFilters`](/core/interfaces.md#crudfilters)               |           |
| sort                                              | Allow us to sort the options                                                        | [`CrudSorting`](/core/interfaces.md#crudsorting)               |           |
| debounce                                          | The number of milliseconds to delay                                                 | `number`                                                       | 300       |
| queryOptions                                      | react-query [useQuery](https://react-query.tanstack.com/reference/useQuery) options | ` UseQueryOptions<GetListResponse<TData>, TError>`             |           |
| defaultValueQueryOptions                          | react-query [useQuery](https://react-query.tanstack.com/reference/useQuery) options | ` UseQueryOptions<GetManyResponse<TData>, TError>`             |           |
| fetchSize                                         | Amount of records to fetch in select box list.                                      | `number`                                                       | `undefined` |
| onSearch                                          | If defined, this callback allows us to override all filters for every search request.| `(value: string) => CrudFilters `\|` Promise<CrudFilters>`    | `undefined` |
| metaData                                          | Metadata query for `dataProvider`                                                   | [`MetaDataQuery`](/core/interfaces.md#metadataquery) | {}        |
| [liveMode](/core/providers/live-provider.md#usage-in-a-hook)                                                                                            | Whether to update data automatically (`"auto"`) or not (`"manual"`) if a related live event is received. The "off" value is used to avoid creating a subscription. | [`"auto"` \| `"manual"` \| `"off"`](/core/interfaces.md#livemodeprops)       | `"off"`                             |
| liveParams                                                                                          | Params to pass to `liveProvider`'s `subscribe` method if `liveMode` is enabled.                                                                                     | [`{ ids?: string[]; [key: string]: any; }`](/core/interfaces.md#livemodeprops) | `undefined`                         |
| onLiveEvent                                                                                         | Callback to handle all related live events of this hook.                                                                                                                                   | [`(event: LiveEvent) => void`](/core/interfaces.md#livemodeprops)                           | `undefined`                                  |

### Return values

| Property                   | Description                                    | Type                                                                                          |
| -------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| selectProps                | Ant design Select props                        | [`Select`](https://ant.design/components/select/#API)                                         |
| queryResult                | Result of the query of a record                | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |
| defaultValueQueryResult    | Result of the query of a `defaultValue` record | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |
| defaultValueQueryOnSuccess | Default value onSuccess method                 | `() => void`                                                                                  |

## Live StackBlitz Example

<iframe loading="lazy" src="https://stackblitz.com//github/pankod/refine/tree/master/examples/field/useSelect?embed=1&view=preview&theme=dark&preset=node"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-use-select-example"
></iframe>
