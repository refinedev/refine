---
slug: /useCheckboxGroup
id: useCheckboxGroup
title: useCheckboxGroup
---

import basicUsage from '@site/static/img/use-checkboxgroup-basic.png'

The `useCheckboxGroup` hook allows you to manage an Ant Design [Checkbox.Group](https://ant.design/components/checkbox/#components-checkbox-demo-group) component when records in a resource needs to be used as checkbox options. All we have to do is pass the `checkboxGroupProps` it returns to the `<Checkbox.Group>` component. In addition, we can use the `queryResult` and `defaultValueQueryResult` value it returns to us.

Now let's examine what `useCheckboxGroup` does, with step-by-step examples. So let's start by suppose our `dataProvider` has an endpoint that returns tags as follows.

```ts title="https://refine-fake-rest.pankod.com/tags"
{
    [
        {
            id: 1,
            title: "Driver Deposit",
        },
        {
            id: 2,
            title: "Index Compatible Synergistic",
        },
        {
            id: 3,
            title: "Plum",
        },
        // ...
    ];
}
```

## Basic Usage

Now let's see how we fetch this data and give it to `<Checkbox.Group>` component as `options`.

Refer to Ant Design [Checkbox.Group](https://ant.design/components/checkbox) component documentation for detailed info for `options`.

```tsx title="src/pages/posts/create.tsx"
import { Form, Checkbox, useCheckboxGroup } from "@pankod/refine";

export const PostCreate = (props) => {
    //highlight-start
    const { checkboxGroupProps } = useCheckboxGroup({
        resource: "tags",
    });
    //highlight-end

    return (
        <Form>
            ...
            <Form.Item label="Tags" name={["tags"]}>
                //highlight-next-line
                <Checkbox.Group {...checkboxGroupProps} />
            </Form.Item>
            ...
        <Form>
    );
};
```

<div>
    <img src={basicUsage} />
</div>
<br/>

As you can see, `useCheckboxGroup` fetches data from API with given `resource` endpoint name and then returns properly formatted `options` value for `<Checkbox.Group>` component.

`useCheckboxGroup` uses the `useList` hook for fetching data. Refer to [useList](#) hook for details.

## Optional Values

### `defaultValue`

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
    resource: "tags",
    //highlight-next-line
    defaultValue: "1",
});
```

Adds extra `options` to `<Checkbox.Group>` component. It uses `useMany` so `defaultValue` can be an array of strings like follows.

```ts
defaultValue: ["1", "2"],
```

Refer to [useMany](#) documentation for detailed usage.

:::tip
Can use `defaultValue` property when edit a record in `<Edit>` component.
:::

### `optionLabel` and `optionValue`

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
    resource: "tags",
    //highlight-start
    optionLabel: "title",
    optionValue: "id",
    //highlight-end
});
```

Allows you to change the values and appearance of your options. Default values are `optionLabel = "title"` and `optionValue = "id"`.

### `filters`

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
    resource: "tags",
    //highlight-next-line
    filters: { isActive: true },
});
```

It allows us to add some filters while fetching the data. For example, if you want to list only active records.

### `sort`

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
    resource: "tags",
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
import { Form, useCheckboxGroup } from "@pankod/refine";
//highlight-next-line
import { ITag } from "interfaces";

export const PostCreate = (props) => {
    //highlight-next-line
    const { queryResult, defaultValueQueryResult } = useCheckboxGroup<ITag>({
        resource: "tags",
        defaultValue: ["1", "2"],
    });
};
```

Now, we expect the `queryResult` and `defaultValueQueryResult` result to return according to `ITag` type.
