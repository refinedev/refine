---
slug: /useCheckboxGroup
id: useCheckboxGroup
title: useCheckboxGroup
---

import basicUsage from '@site/static/img/use-checkboxgroup-basic.png'

`useCheckboxGroup` hook allows you to manage an Ant Design [Checkbox.Group](https://ant.design/components/checkbox/#components-checkbox-demo-group) component when records in a resource needs to be used as checkbox options.

## Example

Let's examine what `useCheckboxGroup` does, with step-by-step examples. Suppose our `dataProvider` has an endpoint that returns tags as follows.

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
            <Form.Item label="Tags" name="tags">
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

All we have to do is pass the `checkboxGroupProps` it returns to the `<Checkbox.Group>` component.

`useCheckboxGroup` uses the `useList` hook for fetching data. Refer to [useList](#) hook for details.

## Options

### `resource`

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
    //highlight-next-line
    resource: "tags",
});
```

`resource` property determines API resource endpoint to fetch records from data provider. It returns properly configured `options` values for checkboxes.

Refer to Ant Design [Checkbox.Group](https://ant.design/components/checkbox) component documentation for detailed info for `options`.

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
    const { queryResult } = useCheckboxGroup<ITag>({
        resource: "tags",
    });
};
```

Now, we expect the `queryResult` result to return according to `ITag` type.

## API Reference

### Properties

| Property                                          | Description                               | Type     | Default   |
| ------------------------------------------------- | ----------------------------------------- | -------- | --------- |
| resource <div className="required">Required</div> | [`Resource`](#) for API data interactions | `string` |           |
| optionValue                                       | Set the option's value                    | `string` | `"id"`    |
| optionLabel                                       | Set the option's label value              | `string` | `"title"` |
| filters                                           | Add filters while fetching the data       | ``       |           |
| sort                                              | Allow us to sort the options              | ``       |           |

### Return values

| Property           | Description                     | Type                                                                            |
| ------------------ | ------------------------------- | ------------------------------------------------------------------------------- |
| checkboxGroupProps | Ant design checkbox group props | [`Checkbox Group`](https://ant.design/components/checkbox/#Checkbox-Group)      |
| queryResult        | Result of the query of a record | [`QueryObserverResult<T>`](https://react-query.tanstack.com/reference/useQuery) |
