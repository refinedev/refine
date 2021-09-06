---
id: table-search
title: Table Search
---

import searchForm from '@site/static/img/guides-and-concepts/table-search/form.jpg';

We can make extensive search / filter operations using the `useTable` hook on the listing pages.

First, we create a form by extracting `searchFormProps` from `useTable`. We will use this form for search / filtering.

```tsx twoslash title="pages/list.tsx" {1-3, 14, 19-33}
import {
    Form,
    Table,
    useTable,
    List,
    Button,
    DatePicker,
    Space,
    Input,
} from "@pankod/refine";

const { RangePicker } = DatePicker;

export const ListPage: React.FC = () => {
    const { searchFormProps } = useTable<IPost>();

    return (
        <List>
            <Space direction="vertical" size="large">
                <Form layout="inline" {...searchFormProps}>
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
                <Table>...</Table>
            </Space>
        </List>
    );

};

interface IPost {
    id: string;
    title: string;
    createdAt: string;
}
```

:::tip
We can give a space between the `Table` and the `Form` by using the `Space` component.
:::

<div style={{textAlign: "center"}}>
    <img src={searchForm} />
</div>

<br />

When the form is submitted, the `onSearch` method runs and we get the search form values. We have to return an object of type [`CrudFilters`](../../api-references/interfaces.md#crudfilters) for this method.

```tsx title="pages/list.tsx"
...
import { Dayjs } from "dayjs";

const { searchFormProps } = useTable<IPost, { title: string; createdAt: [Dayjs, Dayjs] }>({
    onSearch: (params) => {
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
...
```

:::important
`CrudFilters` types object has `field`, `operator` and `value` properties. These properties help us to filter in which field, with which operator, and with which data.
:::

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-table-filter-example-dfm67?autoresize=1&fontsize=14&module=%2Fsrc%2Fpages%2Fposts%2Flist.tsx&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-table-filter-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>