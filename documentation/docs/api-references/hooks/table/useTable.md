---
id: useTable
title: useTable
---

import tableSorting from '@site/static/img/hooks/useTable/table-sorting.gif';
import filters from '@site/static/img/hooks/useTable/filters.gif';

By using useTable, you are able to get properties that are compatible with Ant Design [`<Table>`](https://ant.design/components/table/) component. All features such as sorting, filtering and pagination comes as out of box. 

## Basic usage 

Lets say that the data we are going to show on the table came like this from the endpoint:

```json title="https://api.fake-rest.refine.dev/posts"
[
    {
        "id": 182,
        "title": "A aspernatur rerum molestiae.",
        "content": "Natus molestias incidunt voluptatibus. Libero delectus facilis...",
        "status": "published"
    },
    {
        "id": 989,
        "title": "A molestiae vel voluptatem enim.",
        "content": "Voluptas consequatur quia beatae. Ipsa est qui culpa deleniti...",
        "status": "draft",
        "createdAt": "2020-01-28T02:57:58.892Z"
    }
]
```

In this case, an interface like this should be enough for us : 

```tsx title="/src/interfaces/index.d.ts"
export interface IPost {
    id: string;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
}
```

If we want to make a sorting page where we show the `id`, `title` and `content` values:

```tsx title="/src/pages/posts/list.tsx"
import { List, Table, TextField, useTable } from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    //highlight-next-line
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            //highlight-start
            <Table {...tableProps} key="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
                <Table.Column key="title" dataIndex="title" title="Title" />
                <Table.Column
                    key="content"
                    dataIndex="content"
                    title="Content"
                />
            </Table>
            //highlight-end
        </List>
    );
};
```

:::tip
In a page in `<Resource>` given to `<Refine>` component, `useTable` decides which sources are going to be show automatially.
If you want to show the data that comes from the endpoint of another `resource` . You can do so with the `resource: string` option in the option object that the `useTable(options)` hook takes.
If the `resource` option is given, `syncWithLocation` will not work.

`useTable` uses `useMany` while pulling data from the given resource.
:::

## Listing

If we want to give a column the sorting property, the corresponding `<Table.Column>` component must be given the [sorter](https://ant.design/components/table/#components-table-demo-head) property.

```tsx title="/src/pages/posts/list.tsx"
import { List, Table, TextField, useTable } from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} key="id">
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title="ID"
                    render={(value) => <TextField value={value} />}
                    //highlight-next-line
                    sorter
                />
                <Table.Column
                    key="title"
                    dataIndex="title"
                    title="Title"
                    render={(value) => <TextField value={value} />}
                    //highlight-next-line
                    sorter={{ multiple: 1 }}
                />
                <Table.Column
                    key="content"
                    dataIndex="content"
                    title="Content"
                />
            </Table>
        </List>
    );
};
```

:::tip
When using multiple sorting, `multiple` value we had given to the `sorter` property specifies the priority of this column in sorting.
:::

<div style={{textAlign: "center"}}>
    <img src={tableSorting} />
</div>

### Initial sort status

```ts title="/src/pages/posts/list.tsx"
const { tableProps, sorter } = useTable<IPost>({
    initialSorter: [
        {
            field: "title",
            order: "asc",
        },
    ],
});
```

By using `initialSorter` setting, you can select which `field` is going to start with which sorting status (`"asc"` or `"desc"`).

## Filtering

Every `post` that comes from endpoint has a `status` value. This value can either be `published` or `draft`. We can show the `status` value with a Ant Design `<TagField>:

```tsx title="/src/pages/posts/list.tsx"
...
<Table.Column
    dataIndex="status"
    title="Status"
    key="status"
    render={(value) => <TagField value={value} />}
/>
...
```

We can use the `filterDropdown` property to make filtering based on the `status` value. In order to do this, we need to put the filtering form inside the `<FilterDropdown>` component and pass the properties coming to the function to these component's properties:

```tsx title="/src/pages/posts/list.tsx"
import {
    List,
    Table,
    Radio,
    //highlight-start
    FilterDropdown,
    TagField,
    //highlight-end
    useTable,
    getDefaultSortOrder,
} from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps, sorter } = useTable<IPost>({
        initialSorter: [
            {
                field: "title",
                order: "asc",
            },
        ],
    });

    return (
        <List>
            <Table {...tableProps} key="id">
                <Table.Column key="id" dataIndex="id" title="ID" sorter />
                <Table.Column
                    key="title"
                    dataIndex="title"
                    title="Title"
                    sorter={{ multiple: 2 }}
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                />
                <Table.Column
                    key="content"
                    dataIndex="content"
                    title="Content"
                    sorter={{ multiple: 1 }}
                />
                <Table.Column
                    dataIndex="status"
                    title="Status"
                    key="status"
                    render={(value) => <TagField value={value} />}
                    //highlight-start
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Radio.Group>
                                <Radio value="published">Published</Radio>
                                <Radio value="draft">Draft</Radio>
                                <Radio value="rejected">Rejected</Radio>
                            </Radio.Group>
                        </FilterDropdown>
                    )}
                    //highlight-end
                />
            </Table>
        </List>
    );
};
```

<div style={{textAlign: "center"}}>
    <img src={filters} />
</div>

### Default filter value

In order to set a default filter value, you can use the `initialFilter` option of the `useTable(options)` hook.
```ts title="/src/pages/posts/list.tsx"
...
const { tableProps, sorter, filters } = useTable<IPost>({
    initialSorter: [
        {
            field: "title",
            order: "asc",
        },
    ],
    initialFilter: [
        {
            field: "status",
            operator: "eq",
            value: "draft",
        },
    ],
});
...
```

If you give default filter values, `defaultFilteredValue` property needs to be properly given to the relevant `<Table.Column>` components so that those filter fields come with default values when the page is opened.

```tsx title="/src/pages/posts/list.tsx"
import {
    List,
    Table,
    Radio,
    FilterDropdown,
    TagField,
    //highlight-next-line
    getDefaultFilter,
    useTable,
    getDefaultSortOrder,
} from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    //highlight-start
    const { tableProps, sorter, filters } = useTable<IPost>({
        initialSorter: [
            {
                field: "title",
                order: "asc",
            },
        ],
        initialFilter: [
            {
                field: "status",
                operator: "eq",
                value: "draft",
            },
        ],
    });
    //highlight-end

    return (
        <List>
            <Table {...tableProps} key="id">
                <Table.Column key="id" dataIndex="id" title="ID" sorter />
                <Table.Column
                    key="title"
                    dataIndex="title"
                    title="Title"
                    sorter={{ multiple: 2 }}
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                />
                <Table.Column
                    key="content"
                    dataIndex="content"
                    title="Content"
                    sorter={{ multiple: 1 }}
                />
                <Table.Column
                    dataIndex="status"
                    title="Status"
                    key="status"
                    render={(value) => <TagField value={value} />}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Radio.Group>
                                <Radio value="published">Published</Radio>
                                <Radio value="draft">Draft</Radio>
                                <Radio value="rejected">Rejected</Radio>
                            </Radio.Group>
                        </FilterDropdown>
                    )}
                    //highlight-next-line
                    defaultFilteredValue={getDefaultFilter("status", filters)}
                />
            </Table>
        </List>
    );
};
```

:::tip
Filters we give to `initialFilter` are default filters. In order to prevent filters from being changed, `permanentFilter` must be used instead of `initialFilter`.
:::

## API

| Key              | Description                                                                                                                                                     | Type                                             |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| permanentFilter  | Default and unchangeable filter.                                                                                                                            | [`CrudFilters`](../../interfaces.md#crudfilters) | If not given, its taken from the context.                                                                              | `string`                                         |
| initialCurrent   | Initial page index.                                                                                                                                       | `number`                                         |
| initialPageSize  | Number of records shown per initial number of   pages.                                                                                                                | `number`                                         |
| initialSorter    | Initial sorting.                                                                                                                                            | [`CrudSorting`](../../interfaces.md#crudsorting) |
| initialFilter    | Initial 
filtering.                                                                                                                                          | [`CrudFilters`](../../interfaces.md#crudfilters) |
| syncWithLocation | Sortings, filters, page index and records shown per page are tracked by browser history.                                       | `boolean`                                        |
| onSearch         | When the search form is submitted, it creates the 'CrudFilters' object. Refer to [search form](../../../guides-and-concepts/table/table-search.md) to learn how to create a search form. | `Function`                                       |

### Return values

| Property         | Description                              | Type                                                                                                                                         |
| ---------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| tableQueryResult | Result of the `react-query`'s `useQuery` | [`QueryObserverResult<{`<br/>` data: TData[];`<br/>` total: number; },`<br/>` TError>`](https://react-query.tanstack.com/reference/useQuery) |

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-use-table-example-ule39?autoresize=1&fontsize=14&module=%2Fsrc%2Fpages%2Fposts%2Flist.tsx&theme=dark&view=preview"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="refine-use-table-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
