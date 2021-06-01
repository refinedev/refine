---
slug: /table-search
id: tableSearch
title: Table Search
---

import searchForm from '@site/static/img/tableSearch-form.jpg';


We can make extensive search / filter operations using the `useTable` hook on the listing pages.

First, we create a form by extracting `formProps` from` useTable`. We will use this form for search / filtering.

```tsx
import { Form, Button, DatePicker, Space } from "@pankod/refine";

const { RangePicker } = DatePicker;

const { formProps } = useTable<IPost>();

<Space direction="vertical" size="large">
    <Form layout="inline" {...formProps}>
        <Form.Item label="Title" name="title">
            <Input placeholder="Title" />
        </Form.Item>

        <Form.Item label="Created At" name="createdAt">
            <RangePicker />
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit">
                Search
            </Button>
        </Form.Item>
    </Form>
    <Table>
    ...
    </Table>
</Space>
```

:::tip
We can give a space between the `Table` and the `Form` by using the `Space` component.
:::

<div style={{textAlign: "center"}}>
    <img src={searchForm} />
</div>

<br />

When the form is submitted, the `onSearch` method runs and we get the search form values. We have to return an object of type [`CrudFilters`](interfaces.md#crudfilters) for this method.

```tsx
import { useTable } from "@pankod/refine";
import { Dayjs } from "dayjs";


export interface IPost {
    title: string;
    createdAt: string;
}

const { formProps } = useTable<IPost>({
    onSearch: (params: { title: string; createdAt: [Dayjs, Dayjs] }) => {
        const filters: CrudFilters = [];
        const { title, createdAt } = params;

        if (title) {
            filters.push({
                field: "title",
                operator: "contains",
                value: title,
            });
        }

        if (createdAt) {
            filters.push(
                {
                    field: "createdAt",
                    operator: "gte",
                    value: createdAt[0].toISOString(),
                },
                {
                    field: "createdAt",
                    operator: "lte",
                    value: createdAt[1].toISOString(),
                },
            );
        }

        return filters;
    },

});
```
:::important
`CrudFilters` types object has `field`, `operator` and `value` properties. These properties help us to filter in which field, with which operator, and with which data.
:::
