---
slug: /useRadioGroup
id: useRadioGroup
title: useRadioGroup
---

<!-- import basicUsage from '@site/static/img/use-checkboxgroup-basic.png' -->

The `useRadioGroup` hook allows you to manage an Ant Design [Radio.Group](https://ant.design/components/radio/#components-radio-demo-radiogroup-with-name) component when records in a resource needs to be used as radio options. All we have to do is pass the `radioGroupProps` it returns to the `<Radio.Group>` component. In addition, we can use the `queryResult` value it return to us.

Now let's examine what `useRadioGroup` does, with step-by-step examples. So let's start by suppose our `dataProvider` has an endpoint that returns languages as follows.

```ts title="https://refine-fake-rest.pankod.com/languages"
{
    [
        [
            {
                id: 1,
                title: "Turkish",
            },
            {
                id: 2,
                title: "English",
            },
            {
                id: 3,
                title: "German",
            },
        ],
    ];
}
```

## Basic Usage

Now let's see how we fetch this data and give it to `<Radio.Group>` component as `options`.

Refer to Ant Design [Radio.Group](https://ant.design/components/radio) component documentation for detailed info for `options`.

```tsx title="src/pages/posts/create.tsx"
import { Form, Radio, useRadioGroup } from "@pankod/refine";

export const PostCreate = (props) => {
    //highlight-start
    const { radioGroupProps } = useRadioGroup({
        resource: "tags",
    });
    //highlight-end

    return (
        <Form>
            ...
            <Form.Item label="Tags" name="tags">
                //highlight-next-line
                <Radio.Group {...radioGroupProps} />
            </Form.Item>
            ...
        <Form>
    );
};
```

<!-- <div>
    <img src={basicUsage} />
</div>
<br/> -->

As you can see, `useRadioGroup` fetches data from API with given `resource` endpoint name and then returns properly formatted `options` value for `<Radio.Group>` component.

`useRadioGroup` uses the `useList` hook for fetching data. Refer to [useList](#) hook for details.

## Optional Values

### `optionLabel` and `optionValue`

```tsx
const { radioGroupProps } = useRadioGroup({
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
const { radioGroupProps } = useRadioGroup({
    resource: "tags",
    //highlight-next-line
    filters: { isActive: true },
});
```

It allows us to add some filters while fetching the data. For example, if you want to list only active records.

### `sort`

```tsx
const { radioGroupProps } = useRadioGroup({
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
import { Form, useRadioGroup } from "@pankod/refine";
//highlight-next-line
import { ILanguage } from "interfaces";

export const PostCreate = (props) => {
    //highlight-next-line
    const { queryResult, defaultValueQueryResult } = useRadioGroup<ILanguage>({
        resource: "tags",
    });
};
```

Now, we expect the `queryResult` result to return according to `ILanguage` type.
