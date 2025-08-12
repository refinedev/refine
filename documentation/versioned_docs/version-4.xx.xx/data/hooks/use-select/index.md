---
title: useSelect
siderbar_label: useSelect
source: packages/core/src/hooks/useSelect/index.ts
---

import BasicUsageLivePreview from "./\_basic-usage-live-preview.md";
import OnSearchLivePreview from "./\_on-search-live-preview.md";
import SortLivePreview from "./\_sort-live-preview.md";
import DefaultValueLivePreview from "./\_default-value-live-preview.md";

`useSelect` hook allows you to manage any `select` (like a [Html `<select>` tag](https://www.w3schools.com/tags/tag_select.asp), [React Select](https://react-select.com/home), etc...) component. Since it is designed as headless, It expects you to handle the UI.

This hook uses the `useList` hook for fetching data.

:::simple Derivatives and Extended Versions

If you're looking for a complete select library, Refine has out-of-the-box support for the libraries below:

- [Ant Design Select](https://ant.design/components/select) (for Ant Design users) - [Documentation](/docs/ui-integrations/ant-design/hooks/use-select) - [Example](https://github.com/refinedev/refine/tree/main/examples/field-antd-use-select-basic)
- [Material UI Autocomplete](https://mui.com/material-ui/react-autocomplete) (for Material UI users) - [Documentation](/docs/ui-integrations/material-ui/hooks/use-auto-complete)
- [Mantine Select](https://mantine.dev/core/select/) (for Mantine users) - [Documentation](/docs/ui-integrations/mantine/hooks/use-select)

:::

> For more information, refer to the [useList hook→](/docs/data/hooks/use-list)

## Usage

Here is a basic example of how to use `useSelect` hook.

<BasicUsageLivePreview />

## Realtime Updates

> [`LiveProvider`](/docs/realtime/live-provider) is required for this prop to work.

When `useSelect` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. It is useful when you want to subscribe to the live updates.

## Properties

### resource <PropTag required />

It will be passed to the `getList` method from the `dataProvider` as parameter via the `useList` hook. The parameter is usually used as an API endpoint path. It all depends on how to handle the `resource` in the `getList` method.

```tsx
useSelect({
  resource: "categories",
});
```

> For more information, refer to the [creating a data provider&#8594](/docs/data/data-provider)

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/docs/core/refine-component#identifier)

### optionLabel and optionValue

Allows you to change the `value` and `label` of your options.
Default values are `optionLabel = "title"` and `optionValue = "id"`

```tsx
useSelect<ICategory>({
    resource: "products",
    optionLabel: "name"
    optionValue: "productId"
});
```

These properties also supports nested property access with [Object path](https://lodash.com/docs/4.17.15#get) syntax.

```tsx
const { options } = useSelect({
  resource: "categories",
  optionLabel: "nested.title",
  optionValue: "nested.id",
});
```

It's also possible to pass function to these props. These functions will receive `item` argument.

```tsx
const { options } = useSelect({
  optionLabel: (item) => `${item.firstName} ${item.lastName}`,
  optionValue: (item) => item.id,
});
```

### searchField

Can be used to specify which field will be searched with value given to `onSearch` function.

```tsx
const { onSearch } = useSelect({ searchField: "name" });

onSearch("John"); // Searches by `name` field with value John.
```

By default, it uses `optionLabel`'s value, if `optionLabel` is a string. Uses `title` field otherwise.

```tsx
// When `optionLabel` is string.
const { onSearch } = useSelect({ optionLabel: "name" });

onSearch("John"); // Searches by `name` field with value John.

// When `optionLabel` is function.
const { onSearch } = useSelect({
  optionLabel: (item) => `${item.id} - ${item.name}`,
});

onSearch("John"); // Searches by `title` field with value John.
```

### sorters

It allows to show the options in the desired order. `sorters` will be passed to the `getList` method from the `dataProvider` as parameter via the `useList` hook. It is used to send sort query parameters to the API.

```tsx
useSelect({
  sorters: [
    {
      field: "title",
      order: "asc",
    },
  ],
});
```

<SortLivePreview />

> For more information, refer to the [`CrudSorting` interface &#8594](/docs/core/interface-references#crudsorting)

### filters

It is used to show options by filtering them. `filters` will be passed to the `getList` method from the `dataProvider` as parameter via the `useList` hook. It is used to send filter query parameters to the API.

```tsx
useSelect({
  filter: [
    {
      field: "isActive",
      operator: "eq",
      value: true,
    },
  ],
});
```

> For more information, refer to the [`CrudFilters` interface &#8594](/docs/core/interface-references#crudfilters)

### defaultValue

Allows to make options selected by default. Adds extra options to `<select>` component. In some cases like there are many entries for the `<select>` and pagination is required, `defaultValue` may not be present in the current visible options and this can break the `<select>` component. To avoid such cases, A separate `useMany` query is sent to the backend with the `defaultValue` and appended to the options of `<select>`, ensuring the default values exist in the current options array. Since it uses `useMany` to query the necessary data, the `defaultValue` can be a single value or an array of values like the following:

```tsx
useSelect({
  defaultValue: 1, // or [1, 2]
});
```

### selectedOptionsOrder

`selectedOptionsOrder` allows us to sort `selectedOptions` on `defaultValue`. It can be:

- `"in-place"`: sort `selectedOptions` at the bottom. It is by default.
- `"selected-first"`: sort `selectedOptions` at the top.

```tsx
useSelect({
  defaultValue: 1, // or [1, 2]
  selectedOptionsOrder: "selected-first", // in-place | selected-first
});
```

> For more information, refer to the [`useMany` documentation&#8594](/docs/data/hooks/use-many)

### debounce

It allows us to `debounce` the `onSearch` function.

```tsx
useSelect({
  resource: "categories",
  debounce: 500,
});
```

### queryOptions

`queryOptions` is used to pass additional options to the `useQuery` hook. It is useful when you want to pass additional options to the `useQuery` hook.

```tsx
useSelect({
  queryOptions: {
    retry: 3,
  },
});
```

> For more information, refer to the [`useQuery` documentation&#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

### pagination

`pagination` will be passed to the `getList` method from the `dataProvider` as parameter. It is used to send pagination query parameters to the API.

#### current

You can pass the `current` page number to the `pagination` property.

```tsx
useSelect({
  pagination: {
    current: 2,
  },
});
```

#### pageSize

You can pass the `pageSize` to the `pagination` property.

```tsx
useSelect({
  pagination: {
    pageSize: 20,
  },
});
```

#### mode

Is used to determine whether to use server-side pagination or not. It can be `"off"`, `"client"` or `"server"`

```tsx
useSelect({
  pagination: {
    mode: "off",
  },
});
```

### defaultValueQueryOptions

When the `defaultValue` property is given, the `useMany` data hook is called for the selected records. With this property, you can change the options of this query. If not given, the values given in `queryOptions` will be used.

```tsx
const { options } = useSelect({
  resource: "categories",
  defaultValueQueryOptions: {
    onSuccess: (data) => {
      console.log("triggers when on query return on success");
    },
  },
});
```

### onSearch

It allows us to `AutoComplete` the `options`.

<OnSearchLivePreview />

:::simple Implementation Tips

- The HTML select tag does not natively support AutoComplete. If AutoComplete is desired, it can be used with [React Select](https://react-select.com/async) or [use-select](https://github.com/tannerlinsley/use-select).
- If `onSearch` is used, it will override the existing `filters`.
- For more information, refer to the [`CrudFilters` interface &#8594](/docs/core/interface-references#crudfilters)

:::

### meta

`meta` is a special property that can be used to pass additional information to data provider methods for the following purposes:

- Customizing the data provider methods for specific use cases.
- Generating GraphQL queries using plain JavaScript Objects (JSON).

In the following example, we pass the `headers` property in the `meta` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
useSelect({
  // highlight-start
  meta: {
    headers: { "x-meta-data": "true" },
  },
  // highlight-end
});

const myDataProvider = {
  //...
  getList: async ({
    resource,
    pagination,
    sorters,
    filters,
    // highlight-next-line
    meta,
  }) => {
    // highlight-next-line
    const headers = meta?.headers ?? {};
    const url = `${apiUrl}/${resource}`;
    //...
    //...
    // highlight-next-line
    const { data, headers } = await httpClient.get(`${url}`, { headers });
    return {
      data,
    };
  },
  //...
};
```

> For more information, refer to the [`meta` section of the General Concepts documentation &#8594](/docs/guides-concepts/general-concepts/#meta-concept)

### dataProviderName

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. It is useful when you have a different data provider for different resources.

```tsx
useSelect({
  dataProviderName: "second-data-provider",
});
```

### successNotification

> [`NotificationProvider`](/docs/notification/notification-provider) is required for this prop to work.

After data is fetched successfully, `useSelect` can call `open` function from `NotificationProvider` to show a success notification. With this prop, you can customize the success notification.

```tsx
useSelect({
  successNotification: (data, values, resource) => {
    return {
      message: `${data.title} Successfully fetched.`,
      description: "Success with no errors",
      type: "success",
    };
  },
});
```

### errorNotification

> [`NotificationProvider`](/docs/notification/notification-provider) is required for this prop to work.

After data fetching is failed, `useSelect` will call `open` function from `NotificationProvider` to show a error notification. With this prop, you can customize the error notification.

```tsx
useSelect({
  errorNotification: (data, values, resource) => {
    return {
      message: `Something went wrong when getting ${data.id}`,
      description: "Error",
      type: "error",
    };
  },
});
```

### liveMode

> [`LiveProvider`](/docs/realtime/live-provider) is required for this prop to work.

Determines whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.
For more information about live mode, please check [Live / Realtime](/docs/realtime/live-provider#livemode) page.

```tsx
useSelect({
  liveMode: "auto",
});
```

### onLiveEvent

> [`LiveProvider`](/docs/realtime/live-provider) is required for this prop to work.

The callback function that is executed when new events from a subscription are arrived.

```tsx
useSelect({
  onLiveEvent: (event) => {
    console.log(event);
  },
});
```

### liveParams

> [`LiveProvider`](/docs/realtime/live-provider) is required for this prop to work.

Params to pass to liveProvider's [subscribe](/docs/realtime/live-provider#subscribe) method.

### overtimeOptions

If you want loading overtime for the request, you can pass the `overtimeOptions` prop to the this hook. It is useful when you want to show a loading indicator when the request takes too long.
`interval` is the time interval in milliseconds. `onInterval` is the function that will be called on each interval.

Return `overtime` object from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useSelect({
  //...
  overtimeOptions: {
    interval: 1000,
    onInterval(elapsedInterval) {
      console.log(elapsedInterval);
    },
  },
});

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...

// You can use it like this:
{
  elapsedTime >= 4000 && <div>this takes a bit longer than expected</div>;
}
```

### ~~sort~~ <PropTag deprecated />

Use `sorters` instead.

### ~~hasPagination~~ <PropTag deprecated />

Use `pagination.mode` instead.

## FAQ

### How to get all the data without pagination?

You may want to get all the data without pagination. In this case you should use the [`hasPagination`](/docs/data/hooks/use-select#haspagination) prop. The data provider must have the appropriate implementation in order to use this feature.

### How to add search to options (Autocomplete)?

[`onSearch`](/docs/data/hooks/use-select#onsearch) is a function that is used to set the search value. It is useful when you want to search for a specific value. A simple example of this is shown below.

<OnSearchLivePreview />

### How to ensure `defaultValue` is included in the options?

In some cases we only have `id`, it may be necessary to show it selected in the selection box. This hook sends the request via [`useMany`](/docs/data/hooks/use-many), gets the data and marks it as selected.

<DefaultValueLivePreview />

### How to change the `label` and `value` properties in options?

[`optionLabel` and `optionValue`](/docs/data/hooks/use-select#optionlabel-and-optionvalue) are used to change the value of your options.
The default values are `optionsLabel="title"` and `optionsValue="id"`.

To change to `name` and `categoryId`;

```tsx
useSelect({
  optionLabel: "name",
  optionValue: "categoryId",
});
```

### Can I create the options manually?

Sometimes it may not be enough to create `optionLabel` and `optionValue` options. In this case we create options with `query`.

```tsx
const { query } = useSelect({
  resource: "categories",
});

const options = query.data?.data.map((item) => ({
  label: item.name,
  value: item.id,
}));

return (
  <select>
    {options?.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/core/useSelect"  />

### Type Parameters

| Property     | Description                                                                                                                                                         | Type                       | Default                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError       | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TData        | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |

### Return values

| Property          | Description                                    | Type                                                                                                         |
| ----------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| options           | It returns possible options                    | `{ label: string; value: string }`                                                                           |
| query             | Result of the query of a record                | [`QueryObserverResult<{ data: TData; error: TError }>`](https://react-query.tanstack.com/reference/useQuery) |
| defaultValueQuery | Result of the query of a `defaultValue` record | [`QueryObserverResult<{ data: TData; error: TError }>`](https://react-query.tanstack.com/reference/useQuery) |
| onSearch          | A function to set the search value             | `onSearch: (value: string) => void`                                                                          |
| overtime          | Overtime loading props                         | `{ elapsedTime?: number }`                                                                                   |

## Example

<CodeSandboxExample path="core-use-select" />

[baserecord]: /docs/core/interface-references#baserecord
[httperror]: /docs/core/interface-references#httperror
