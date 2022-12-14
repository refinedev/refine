---
id: useSelect
title: useSelect
---

```tsx live shared
const { default: dataProvider } = RefineSimpleRest;

setRefineProps({
    Sider: () => null,
    dataProvider: dataProvider("https://api.fake-rest.refine.dev"),
});

const Wrapper = ({ children }) => {
    return (
        <RefineMantine.MantineProvider
            theme={RefineMantine.LightTheme}
            withNormalizeCSS
            withGlobalStyles
        >
            <RefineMantine.Global
                styles={{ body: { WebkitFontSmoothing: "auto" } }}
            />
            {children}
        </RefineMantine.MantineProvider>
    );
};
```

`useSelect` hook allows you to manage an Mantine [Select](https://mantine.dev/core/select/) component when records in a resource needs to be used as select options.

## Usage

We'll demonstrate how to get data at `/categories` endpoint from `https://api.fake-rest.refine.dev` REST API and use it as select options. Also, you'll see how to use `Select` component with `useSelect` hook and `useForm` hook.

```tsx live url=http://localhost:3000/posts/create previewHeight=420px
setInitialRoutes(["/posts/create"]);

import { Refine } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create, Select, useForm, useSelect } from "@pankod/refine-mantine";

const PostCreate: React.FC = () => {
    const { getInputProps, onSubmit } = useForm({
        initialValues: {
            category: {
                id: "",
            },
        },
    });

    //highlight-start
    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
    });
    //highlight-end

    return (
        <Create
            saveButtonProps={{
                onClick: onSubmit((values) => console.log(values)),
            }}
        >
            <Select
                label="Category"
                placeholder="Pick one"
                withinPortal
                {...getInputProps("category.id")}
                // highlight-next-line
                {...selectProps}
            />
        </Create>
    );
};
// visible-block-end

const App = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            Layout={Layout}
            resources={[{ name: "posts", create: PostCreate }]}
        />
    );
};

render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

All we have to do is pass the `selectProps` it returns to the `<Select>` component.

:::caution attention
By default, refine does the search using the `useList` hook and passes it to the search parameter. If you get a problem you should check your `getList` function in your Data Provider. If you want to change this behavior to make client-side filtering, you can examine [this](https://mantine.dev/core/select/#custom-item-component) example.
:::

`useSelect` uses the `useList` hook for fetching data. [Refer to `useList` hook for details. &#8594](/api-reference/core/hooks/data/useList.md)

## Options

### `resource`

```tsx
const { selectProps } = useSelect({
    resource: "categories",
});
```

`resource` property determines API resource endpoint to fetch records from [`dataProvider`](/api-reference/core/providers/data-provider.md). It returns properly configured `options` values for select options.

[Refer to Mantine `Select` component documentation for detailed info for `options`. &#8594](https://mantine.dev/core/select/)

### `defaultValue`

```tsx
const { selectProps } = useSelect({
    resource: "categories",
    // highlight-next-line
    defaultValue: 1,
});
```

Adds extra `options` to `<Select>` component. It uses `useMany` so `defaultValue` can be an array of strings like follows.

```ts
defaultValue: [1, 2],
```

[Refer to the `useMany` documentation for detailed usage. &#8594](/api-reference/core/hooks/data/useMany.md)

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

### `pagination`

Allows us to set page and items per page values.

For example imagine that we have 1000 post records:

```ts
const { selectProps } = useSelect({
    resource: "categories",
    // highlight-next-line
    pagination: { current: 3, pageSize: 8 },
});
```

> Listing will start from page 3 showing 8 records.

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

If defined, it allows us to override the filters to use when fetching list of records. Thus, it . It should return [`CrudFilters`](/api-reference/core/interfaces.md#crudfilters).

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
/>;
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

<PropsTable module="@pankod/refine-mantine/useSelect"  />

### Return values

| Property                | Description                                    | Type                                                                                          |
| ----------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| selectProps             | Mantine Select props                           | [`SelectPropsType`](#selectpropstype)                                                         |
| queryResult             | Result of the query of a record                | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |
| defaultValueQueryResult | Result of the query of a `defaultValue` record | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |

<br />

> #### SelectPropsType
>
> | Property                     | Description                                                             | Type                       |
> | ---------------------------- | ----------------------------------------------------------------------- | -------------------------- |
> | data                         | Select data used to renderer items in dropdown                          | `(string \| SelectItem)[]` |
> | searchable                   | Set to true to enable search                                            | `boolean`                  |
> | onSearchChange               | Called each time search value changes                                   | `(query: string) => void`  |
> | filterDataOnExactSearchMatch | Should data be filtered when search value exactly matches selected item | `boolean`                  |

## Example

<StackblitzExample path="base-mantine" />
