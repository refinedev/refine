---
id: useSelect
title: useSelect
siderbar_label: useSelect
---

import basicUsage from '@site/static/img/use-select-basic-usage.png'
import search from '@site/static/img/use-select-search.png'

The `useSelect` hook allows you to manage an Ant Design [Select](https://ant.design/components/select/) component when records in a resource needs to be used as options. All we have to do is pass the `selectProps` it returns to the `<Select>` component. In addition, we can use the `queryResult` and `defaultValueQueryResult` value it returns to us.

Now let's examine what `useSelect` does, with step-by-step examples. So let's start by suppose our `dataProvider` has an endpoint that returns categories as follows.

```ts title="https://refine-fake-rest.pankod.com/categories"
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
        // ...
    ];
}
```

## Basic Usage

Now let's see how we fetch this data and give it to `<Select>` component as `options`.

Refer to Ant Design [Select](#) component documentation for detailed info for `options`.

```tsx title="src/pages/posts/create.tsx"
import { Form, Select, useSelect } from "@pankod/refine";

export const PostCreate = (props) => {
    //highlight-start
    const { selectProps } = useSelect({
        resource: "categories",
    });
    //highlight-end

    return (
        <Form>
            ...
            <Form.Item label="Category">
                //highlight-next-line
                <Select {...selectProps} />
            </Form.Item>
            ...
        <Form>
    );
};
```

<div style={{textAlign: "center"}}>
    <img src={basicUsage} />
</div>
<br/>

As you can see, `useSelect` fetches data from API with given `resource` endpoint name and then returns properly formatted `options` value for `<Select>` component.

<div style={{textAlign: "center"}}>
    <img src={search} />
</div>
<br/>

:::caution attention
By default, `refine` does the search using the `useList` hook and passes it to the search parameter. If you get a problem you should check your `getList` function in your Data Provider. If you want to change this behavior to make client-side filtering, you can examine [this](https://ant.design/components/select/#components-select-demo-search-sort) example.
:::

`useSelect` uses the `useList` hook for fetching data. Refer to [useList](#) hook for details.

## Optional Values

### `defaultValue`

```tsx
const { selectProps } = useSelect({
    resource: "categories",
    //highlight-next-line
    defaultValue: "1",
});
```

Adds extra `options` to `<Select>` component. It uses `useMany` so `defaultValue` can be an array of strings like follows.

```ts
defaultValue: ["1", "2"],
```

Refer to [useMany](#) documentation for detailed usage.

:::tip
Can use `defaultValue` property when edit a record in `<Edit>` component.
:::

### `optionLabel` and `optionValue`

```tsx
const { selectProps } = useSelect({
    resource: "categories",
    //highlight-start
    optionLabel: "title",
    optionValue: "id",
    //highlight-end
});
```

Allows you to change the values and appearance of your options. Default values are `optionLabel = "title"` and `optionValue = "id"`.

### `filters`

```tsx
const { selectProps } = useSelect({
    resource: "categories",
    //highlight-next-line
    filters: { isActive: true },
});
```

It allows us to add some filters while fetching the data. For example, if you want to list only active records.

### `sort`

```tsx
const { selectProps } = useSelect({
    resource: "categories",
    //highlight-start
    sort: {
        field: "title",
        order: "ascend",
    },
    //highlight-end
});
```

It allows us to sort the `options`. For example, if you want to sort your list according to `title` by ascending.

## Add Type

```tsx title="src/pages/posts/create.tsx"
import { Form, useSelect } from "@pankod/refine";
//highlight-next-line
import { ICategory } from "interfaces";

export const PostCreate = (props) => {
    //highlight-next-line
    const { queryResult, defaultValueQueryResult } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: ["1", "2"],
    });
};
```

Now, we expect the `queryResult` and `defaultValueQueryResult` result to return according to `ICategory` type.
