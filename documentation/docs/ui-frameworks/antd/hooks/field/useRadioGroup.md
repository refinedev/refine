---
id: useRadioGroup
title: useRadioGroup
---

import basicUsage from '@site/static/img/hooks/useRadioGroup/basic-usage.png';

`useRadioGroup` hook allows you to manage an Ant Design [Radio.Group](https://ant.design/components/radio/#components-radio-demo-radiogroup-with-name) component when records in a resource needs to be used as radio options.

## Usage

We will demonstrate how to get data at `/languages` endpoint from the `https://api.fake-rest.refine.dev` REST API.

```ts title="https://api.fake-rest.refine.dev/languages"
{
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
    ];
}
```

```tsx  title="pages/posts/create.tsx"
import { Form, Radio, useRadioGroup } from "@pankod/refine-antd";

export const PostCreate = () => {
    // highlight-start
    const { radioGroupProps } = useRadioGroup<ILanguage>({
        resource: "languages",
    });
    // highlight-end

    return (
        <Form>
            <Form.Item label="Languages" name="languages">
                // highlight-next-line
                <Radio.Group {...radioGroupProps} />
            </Form.Item>
        </Form>
    );
};

interface ILanguage {
    id: string;
    title: string;
}
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={basicUsage} alt="Radio group" />
</div>
<br/>

All we have to do is pass the `radioGroupProps` it returns to the `<Radio.Group>` component.

`useRadioGroup` uses the `useList` hook for fetching data. [Refer to Ant Design `useList` hook for details. &#8594](/core/hooks/data/useList.md)

## Options

### `resource`

```tsx
const { radioGroupProps } = useRadioGroup({
    resource: "languages",
});
```

`resource` property determines API resource endpoint to fetch records from [`dataProvider`](/core/providers/data-provider.md). It returns properly configured `options` values for radio buttons.

[Refer to the Ant Design's `Radio.Group` component documentation for detailed info on `options`. &#8594](https://ant.design/components/radio)
### `defaultValue`

```tsx
const { selectProps } = useRadioGroup({
    resource: "languages",
// highlight-next-line
    defaultValue: 1,
});
```
The easiest way to selecting a default value for an radio button field is by passing in `defaultValue`.

### `optionLabel` and `optionValue`

```tsx
const { radioGroupProps } = useRadioGroup({
    resource: "languages",
    // highlight-start
    optionLabel: "title",
    optionValue: "id",
    // highlight-end
});
```

`optionLabel` and `optionValue` allows you to change the values and appearances of your options. Default values are `optionLabel = "title"` and `optionValue = "id"`.

### `filters`

```tsx
const { radioGroupProps } = useRadioGroup({
    resource: "languages",
// highlight-start
    filters: [
        {
            field: "title",
            operator: "eq",
            value: "German",
        },
    ],
// highlight-end
});
```

`filters` allows us to add filters while fetching the data. For example, if you want to list only the `titles` that are equal to `"German"` records.

### `sort`

```tsx
const { radioGroupProps } = useRadioGroup({
    resource: "languages",
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

`sort` allows us to sort the `options`. For example, if you want to sort your list according to `title` by ascending.

### `fetchSize`

```tsx
const { selectProps } = useRadioGroup({
    resource: "languages",
// highlight-next-line
    fetchSize: 20,
});
```

Amount of records to fetch in radio group buttons.
### `queryOptions`

```tsx
const { radioGroupProps } = useRadioGroup({
    resource: "languages",
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
| defaultValue                                                                                        | Sets the default value                                                              | [`BaseKey`](/core/interfaces.md#basekey)                                                         |           |
| optionValue                                                                                         | Sets the option's value                                                             | `string`                                                       | `"id"`    |
| optionLabel                                                                                         | Sets the option's label value                                                       | `string`                                                       | `"title"` |
| filters                                                                                             | Adds filters while fetching the data                                                | [`CrudFilters`](/core/interfaces.md#crudfilters)               |           |
| sort                                                                                                | Allows us to sort the options                                                       | [`CrudSorting`](/core/interfaces.md#crudsorting)               |           |
| fetchSize                                                                                           | Amount of records to fetch in radio group buttons.                                     | `number`                                                       | `undefined` |
| queryOptions                                                                                        | react-query [useQuery](https://react-query.tanstack.com/reference/useQuery) options | ` UseQueryOptions<GetListResponse<TData>, TError>`             |           |
| metaData                                                                                            | Metadata query for `dataProvider`                                                   | [`MetaDataQuery`](/core/interfaces.md#metadataquery) | {}        |
| [liveMode](/core/providers/live-provider.md#usage-in-a-hook)                                                                                            | Whether to update data automatically (`"auto"`) or not (`"manual"`) if a related live event is received. The "off" value is used to avoid creating a subscription. | [`"auto"` \| `"manual"` \| `"off"`](/core/interfaces.md#livemodeprops)       | `"off"`                             |
| liveParams                                                                                          | Params to pass to `liveProvider`'s `subscribe` method if `liveMode` is enabled.                                                                                     | [`{ ids?: string[]; [key: string]: any; }`](/core/interfaces.md#livemodeprops) | `undefined`                         |
| onLiveEvent                                                                                         | Callback to handle all related live events of this hook.                                                                                                                                   | [`(event: LiveEvent) => void`](/core/interfaces.md#livemodeprops)                           | `undefined`                                  |

### Return values

| Property        | Description                      | Type                                                                                          |
| --------------- | -------------------------------- | --------------------------------------------------------------------------------------------- |
| radioGroupProps | Ant design radio group props     | [`Radio Group`](https://ant.design/components/radio/#RadioGroup)                              |
| queryResult     | Results of the query of a record | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-use-radio-group-example-t9rwf?autoresize=1&fontsize=14&theme=dark&view=preview"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="refine-use-radio-group-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
