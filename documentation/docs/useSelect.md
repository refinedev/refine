---
id: useSelect
title: useSelect
siderbar_label: useSelect
---

import basicUsage from '@site/static/img/use-select-basic-usage.png'
import search from '@site/static/img/use-select-search.png'

The `useSelect` hook allows you manage a Ant Design [Select](https://ant.design/components/select/) component. All we have to do is pass the `selectProps` it return to the `<Select>` component. In addition, we can use the `queryResult` and `defaultValueQueryResult` value it returns to us.

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
import { Form, useSelect } from "@pankod/refine";

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

As you can see, you only need to specify the `resource` name to give `options` to the `<Select`> component.

<div style={{textAlign: "center"}}>
    <img src={search} />
</div>
<br/>

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

Sets the default value of `<Select>` component. It uses `useMany` so `defaultValue` can be an array of strings like follows.

```ts
defaultValue: ["1", "2"],
```

Refer to [useMany](#) documentation for detailed usage.

### `optionLabel` and `optionValue`

```tsx
const { selectProps } = useSelect({
    resource: "categories",
    //highlight-start
    optionLabel = "title",
    optionValue = "id",
    //highlight-end
});
```

Allows you to change the values and appearance of your options. Default values are `optionLabel = "title"` and `optionValue = "id"`.

### `filters`

```tsx
const { selectProps } = useSelect({
    resource: "categories",
    optionLabel = "title",
    optionValue = "id",
    filters,
});
```

Filtereme işlemi örneği.

### `sort`

```tsx
const { selectProps } = useSelect({
    resource: "categories",
    optionLabel = "title",
    optionValue = "id",
    filters,
    sort,
});
```

Sort işlemi örnek.

### Basic Example

Select propsların select component'e verildiği bir örnek yapılabilir.
