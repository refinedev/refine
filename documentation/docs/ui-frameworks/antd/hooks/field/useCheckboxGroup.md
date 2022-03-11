---
id: useCheckboxGroup
title: useCheckboxGroup
---

import basicUsage from '@site/static/img/hooks/useCheckboxGroup/basic.png';

`useCheckboxGroup` hook allows you to manage an Ant Design [Checkbox.Group](https://ant.design/components/checkbox/#components-checkbox-demo-group) component when records in a resource needs to be used as checkbox options.

## Usage

We will demonstrate how to get data at the `/tags` endpoint from the `https://api.fake-rest.refine.dev` REST API.

```ts title="https://api.fake-rest.refine.dev/tags"
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
    ];
}
```

```tsx  title="pages/posts/create.tsx"
import { Form, Checkbox, useCheckboxGroup } from "@pankod/refine-antd";

export const PostCreate: React.FC = () => {
    // highlight-start
    const { checkboxGroupProps } = useCheckboxGroup<ITag>({
        resource: "tags",
    });
    // highlight-end

    return (
        <Form>
            <Form.Item label="Tags" name="tags">
                // highlight-next-line
                <Checkbox.Group {...checkboxGroupProps} />
            </Form.Item>
        </Form>
    );
};

interface ITag {
    id: string;
    title: string;
}
```

<br/>

All we have to do is pass the `checkboxGroupProps` it returns to the `<Checkbox.Group>` component.
`useCheckboxGroup` uses the `useList` hook for fetching data. [Refer to `useList` hook for details. &#8594](/core/hooks/data/useList.md)

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={basicUsage} alt="Tags" />
</div>

## Options

### `resource`

```tsx 
const { checkboxGroupProps } = useCheckboxGroup({
    resource: "tags",
});
```

`resource` property determines which? API resource endpoint to fetch records from [`dataProvider`](/core/providers/data-provider.md). It returns properly configured `options` values for checkboxes.

[Refer to Ant Design Checkbox.Group component documentation for detailed info for `options`. &#8594](https://ant.design/components/checkbox)

### `defaultValue`

```tsx
const { selectProps } = useCheckboxGroup({
    resource: "languages",
// highlight-next-line
    defaultValue: [1, 2],
});
```
The easiest way to selecting a default values for checkbox fields is by passing in `defaultValue`.
### `optionLabel` and `optionValue`

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
    resource: "tags",
    // highlight-start
    optionLabel: "title",
    optionValue: "id",
    // highlight-end
});
```

`optionLabel` and `optionValue` allows you to change the values and appearances of your options. Default values are `optionLabel = "title"` and `optionValue = "id"`.

### `filters`

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
    resource: "tags",
    // highlight-start
    filters: [
        {
            field: "title",
            operator: "eq",
            value: "Driver Deposit",
        },
    ],
    // highlight-end
});
```

It allows us to add some filters while fetching the data. For example, if you want to list only the `titles` that are equal to `"Driver Deposit"` records.

### `sort`

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
    resource: "tags",
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
const { selectProps } = useCheckboxGroup({
    resource: "languages",
// highlight-next-line
    fetchSize: 20,
});
```

Amount of records to fetch in checkboxes.
### `queryOptions`

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
    resource: "tags",
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

## API Reference

### Properties

| Property                                                                                            | Description                                                                         | Type                                                           | Default   |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------- |
| <div className="required-block"><div>resource</div> <div className=" required">Required</div></div> | Resource name for API data interactions                                             | `string`                                                       |           |
| defaultValue                                                                                        | Sets the default value                                                              | [`BaseKey[]`](/core/interfaces.md#basekey)                       |           |
| optionValue                                                                                         | Sets the option's value                                                             | `string`                                                       | `"id"`    |
| optionLabel                                                                                         | Sets the option's label value                                                       | `string`                                                       | `"title"` |
| filters                                                                                             | Adds filters while fetching the data                                                | [`CrudFilters`](/core/interfaces.md#crudfilters)               |           |
| sort                                                                                                | Allows us to sort the options                                                       | [`CrudSorting`](/core/interfaces.md#crudsorting)               |           |
| queryOptions                                                                                        | react-query [useQuery](https://react-query.tanstack.com/reference/useQuery) options | ` UseQueryOptions<GetListResponse<TData>, TError>`             |           |
| metaData                                                                                            | Metadata query for `dataProvider`                                                   | [`MetaDataQuery`](/core/interfaces.md#metadataquery) | {}        |
| [liveMode](/core/providers/live-provider.md#usage-in-a-hook)                                                                                            | Whether to update data automatically (`"auto"`) or not (`"manual"`) if a related live event is received. The "off" value is used to avoid creating a subscription. | [`"auto"` \| `"manual"` \| `"off"`](/core/interfaces.md#livemodeprops)       | `"off"`                             |
| liveParams                                                                                          | Params to pass to `liveProvider`'s `subscribe` method if `liveMode` is enabled.                                                                                     | [`{ ids?: string[]; [key: string]: any; }`](/core/interfaces.md#livemodeprops) | `undefined`                         |
| onLiveEvent                                                                                         | Callback to handle all related live events of this hook.                                                                                                                                   | [`(event: LiveEvent) => void`](/core/interfaces.md#livemodeprops)                           | `undefined`                                  |

### Return values

| Property           | Description                          | Type                                                                                          |
| ------------------ | ------------------------------------ | --------------------------------------------------------------------------------------------- |
| checkboxGroupProps | Ant design checkbox group properties | [`Checkbox Group`](https://ant.design/components/checkbox/#Checkbox-Group)                    |
| queryResult        | Results of the query of a record     | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-use-checkbox-group-example-578v8?autoresize=1&fontsize=14&theme=dark&view=preview"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="refine-use-checkbox-group-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
