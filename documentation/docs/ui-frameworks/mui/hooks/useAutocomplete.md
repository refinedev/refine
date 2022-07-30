---
id: useAutocomplete
title: useAutocomplete
---

import basicUsage from '@site/static/img/hooks/useSelect/mui/basic-usage.png';
import search from '@site/static/img/hooks/useSelect/mui/search.png';

The `useAutocomplete` hook is used to get data from the API and to manage the Material UI [`<Autocomplete>`][mui-autocomplete] component.

## Usage with React Hook Form (`@pankod/refine-react-hook-form`)

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
    ]
}
```

```tsx title="pages/posts/create.tsx"
import { HttpError } from "@pankod/refine-core";
import {
    Create,
    Box,
    //highlight-start
    Autocomplete,
    useAutocomplete,
    //highlight-end
    TextField,
} from "@pankod/refine-mui";
import { useForm, Controller } from "@pankod/refine-react-hook-form";

export const PostCreate = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading, queryResult },
        register,
        control,
        formState: { errors },
    } = useForm<IPost, HttpError, IPost & { category: ICategory }>();

    // highlight-start
    const { autocompleteProps } = useAutocomplete<ICategory>({
        resource: "categories",
    });
    // highlight-end

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box component="form">
                <Controller
                    control={control}
                    name="category"
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                        <Autocomplete
                            //highlight-next-line
                            {...autocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    autocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            item?.id?.toString(),
                                    )?.title ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option.id.toString() === value.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Category"
                                    margin="normal"
                                    variant="outlined"
                                    error={!!errors.category}
                                    helperText={errors.category?.message}
                                    required
                                />
                            )}
                        />
                    )}
                />
            </Box>
        </Create>
    );
};

interface ICategory {
    id: number;
    title: string;
}

export interface IPost {
    id: number;
    category: { id: number };
}

```

The use of `useAutocomplete` with [`useForm`](/packages/react-hook-form/useForm.md) is demonstrated in the code above. You can use the `useAutocomplete` hook independently of the `useForm`hook.

<div class="img-container" style={{"max-width": "500px"}}>
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={basicUsage} alt="Basic use of Autocomplete" />
</div>
<br/>

<div class="img-container" style={{"max-width": "500px"}}>
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={search} alt="Search functionality" />
</div>
<br/>

:::info
By default, refine does the search using the [`useList`](/core/hooks/data/useDelete.md) hook and passes it to the search parameter. If you get a problem you should check your `getList` function in your Data Provider. If you want to change this behavior to make client-side filtering, you can examine [this](https://mui.com/material-ui/react-autocomplete/#search-as-you-type) documentation.
:::

## Options

### `resource`

```tsx
const { autocompleteProps } = useAutocomplete({
    resource: "categories",
});
```

`resource` property determines API resource endpoint to fetch records from [`dataProvider`](/core/providers/data-provider.md). It returns properly configured `options` values for [`<Autocomplete>`](https://mui.com/material-ui/react-autocomplete/#main-content) options.

[Refer to Material UI `Autocomplete` component documentation for detailed info for `options`. &#8594](https://mui.com/material-ui/react-autocomplete/#options-structure)

### `defaultValue`

```tsx
const { autocompleteProps } = useAutocomplete({
    resource: "categories",
    // highlight-next-line
    defaultValue: "1",
});
```

Adds extra `options` to [`<Autocomplete>`](https://mui.com/material-ui/react-autocomplete/#main-content) component. It uses [`useMany`](/core/hooks/data/useMany.md) so `defaultValue` can be an array of strings like follows.

```ts
defaultValue: ["1", "2"],
```

[Refer to the `useMany` documentation for detailed usage. &#8594](/core/hooks/data/useMany.md)

:::tip
Can use `defaultValue` property when edit a record in `<Edit>` component.
:::

### `filters`

```tsx
const { autocompleteProps } = useAutocomplete({
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
const { autocompleteProps } = useAutocomplete({
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
const { autocompleteProps } = useAutocomplete({
    resource: "categories",
    // highlight-next-line
    fetchSize: 20,
});
```

Amount of records to fetch in the select box.

### `onSearch`

```tsx
const { autocompleteProps } = useAutocomplete({
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

If defined, it allows us to override the filters to use when fetching the list of records. Thus, it. It should return [`CrudFilters`](/core/interfaces.md#crudfilters).

### `queryOptions`

```tsx
const { autocompleteProps } = useAutocomplete({
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

When the `defaultValue` property is given, the [`useMany`](/core/hooks/data/useMany.md) data hook is called for the selected records. With this property, you can change the options of this query. If not given, the values given in `queryOptions` will be used.

```tsx
const { autocompleteProps } = useAutocomplete({
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

[mui-autocomplete]: https://mui.com/material-ui/react-autocomplete/

## API Reference

### Properties

| Property                                                     | Description                                                                                                                                                        | Type                                                                           | Default     |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ----------- |
| resource <div className="required">Required</div>            | Resource name for API data interactions                                                                                                                            | `string`                                                                       |             |
| defaultValue                                                 | Adds extra `options`                                                                                                                                               | `string` \| `Array<string>`                                                    |             |
| filters                                                      | Add filters while fetching the data                                                                                                                                | [`CrudFilters`](/core/interfaces.md#crudfilters)                               |             |
| sort                                                         | Allow us to sort the options                                                                                                                                       | [`CrudSorting`](/core/interfaces.md#crudsorting)                               |             |
| debounce                                                     | The number of milliseconds to delay                                                                                                                                | `number`                                                                       | 300         |
| queryOptions                                                 | react-query [useQuery](https://react-query.tanstack.com/reference/useQuery) options                                                                                | ` UseQueryOptions<GetListResponse<TData>, TError>`                             |             |
| defaultValueQueryOptions                                     | react-query [useQuery](https://react-query.tanstack.com/reference/useQuery) options                                                                                | ` UseQueryOptions<GetManyResponse<TData>, TError>`                             |             |
| fetchSize                                                    | Amount of records to fetch in select box list.                                                                                                                     | `number`                                                                       | `undefined` |
| onSearch                                                     | If defined, this callback allows us to override all filters for every search request.                                                                              | `(value: string) => CrudFilters `\|` Promise<CrudFilters>`                     | `undefined` |
| metaData                                                     | Metadata query for `dataProvider`                                                                                                                                  | [`MetaDataQuery`](/core/interfaces.md#metadataquery)                           | {}          |
| [liveMode](/core/providers/live-provider.md#usage-in-a-hook) | Whether to update data automatically (`"auto"`) or not (`"manual"`) if a related live event is received. The "off" value is used to avoid creating a subscription. | [`"auto"` \| `"manual"` \| `"off"`](/core/interfaces.md#livemodeprops)         | `"off"`     |
| liveParams                                                   | Params to pass to `liveProvider`'s `subscribe` method if `liveMode` is enabled.                                                                                    | [`{ ids?: string[]; [key: string]: any; }`](/core/interfaces.md#livemodeprops) | `undefined` |
| onLiveEvent                                                  | Callback to handle all related live events of this hook.                                                                                                           | [`(event: LiveEvent) => void`](/core/interfaces.md#livemodeprops)              | `undefined` |

### Return values

| Property                | Description                                    | Type                                                                                          |
| ----------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| autocompleteProps       | Material UI Autocomplete props                 | [`AutoCompleteReturnValues`](#autocompletereturnvalues)                                       |
| queryResult             | Result of the query of a record                | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |
| defaultValueQueryResult | Result of the query of a `defaultValue` record | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |

<br />

> #### AutoCompleteReturnValues
>
> | Property      | Description                                               | Type                                                                   |
> | ------------- | --------------------------------------------------------- | ---------------------------------------------------------------------- |
> | options       | Array of options                                          | `TData`                                                                |
> | loading       | Loading state                                             | `boolean`                                                              |
> | onInputChange | Callback fired when the input value changes               | `(event: React.SyntheticEvent, value: string, reason: string) => void` |
> | filterOptions | Determines the filtered options to be rendered on search. | `(options: TData, state: object) => TData`                             |

## Live StackBlitz Example

<iframe loading="lazy" src="https://stackblitz.com//github/pankod/refine/tree/master/examples/field/useSelect/mui?embed=1&view=preview&theme=dark&preset=node"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-use-select-example"
></iframe>
