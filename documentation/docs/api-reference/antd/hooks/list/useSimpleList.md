---
id: useSimpleList
title: useSimpleList
---


By using `useSimpleList` you get props for your records from API in accordance with Ant Design `<List>` component. All features such as pagination, sorting come out of the box.

[Refer to Ant Design docs for `<List>` component information &#8594][header]

## Usage

Let's assume that the data we will show in the table comes from the endpoint as follows:

```json title="https://api.fake-rest.refine.dev/posts"
[
    {
        "id": 182,
        "title": "A aspernatur rerum molestiae.",
        "content": "Natus molestias incidunt voluptatibus. Libero delectus facilis...",
        "hit": 992123,
        "category": {
            "id": 1,
            "title": "Navigating"
        }
    },
    {
        "id": 989,
        "title": "A molestiae vel voluptatem enim.",
        "content": "Voluptas consequatur quia beatae. Ipsa est qui culpa deleniti...",
        "hit": 29876,
        "category": {
            "id": 2,
            "title": "Empowering"
        }
    }
]
```

If we want to make a listing page where we show the `title`, `content`, `hit` and `category.title` values:

```tsx
import {
    PageHeader,
    Typography,
    useMany,
    AntdList,
    useSimpleList,
    NumberField,
    Space,
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    const { Text } = Typography;

    // highlight-start
    const { listProps } = useSimpleList<IPost>({
        initialSorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
        pagination: {
            pageSize: 6,
        },
    });
    // highlight-end

    const categoryIds =
        listProps?.dataSource?.map((item) => item.category.id) ?? [];

    const { data } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    // highlight-start
    const renderItem = (item: IPost) => {
        const { title, hit, content } = item;

        const categoryTitle = data?.data.find(
            (category: ICategory) => category.id === item.category.id,
        )?.title;

        return (
            <AntdList.Item
                actions={[
                    <Space key={item.id} direction="vertical" align="end">
                        <NumberField
                            value={hit}
                            options={{
                                // @ts-ignore
                                notation: "compact",
                            }}
                        />
                        <Text>{categoryTitle}</Text>
                    </Space>,
                ]}
            >
                <AntdList.Item.Meta title={title} description={content} />
            </AntdList.Item>
        );
    };
    // highlight-end

    return (
        <PageHeader ghost={false} title="Posts">
            // highlight-next-line
            <AntdList {...listProps} renderItem={renderItem} />
        </PageHeader>
    );
};

interface IPost {
    id: number;
    title: string;
    content: string;
    hit: number;
    category: { id: number };
}

interface ICategory {
    id: number;
    title: string;
}
```

:::tip
You can use `AntdList.Item` and `AntdList.Item.Meta` like `<List>` component from [Ant Design][list]
:::


:::info
To disable pagination, you can set `hasPagination` property to `false` which is `true` by default. If `hasPagination` has been set to `false`, pagination elements will be hidden in the `<Table/>`. If you want to handle the pagination on the client-side you can override the `pagination` property in `tableProps`.
:::

<br/>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/hooks/useSimpleList/useSimpleList.png" alt="use simple list" />
</div>

## API

### Properties

<PropsTable module="@pankod/refine-antd/useSimpleList"/>

### Type Parameters

| Property         | Desription                                                      | Type                       | Default                    |
| ---------------- | --------------------------------------------------------------- | -------------------------- | -------------------------- |
| TData            | Result data of the mutation. Extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError           | Custom error object that extends [`HttpError`][httperror]       | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TSearchVariables | Antd form values                                                | `{}`                       | `{}`                       |

### Return values

| Property        | Description                                | Type                                                                                                                                                    |
| --------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| queryResult     | Result of the query of a record            | [`QueryObserverResult<{ data: TData }>`][usequery]                                                                                                      |
| searchFormProps | Ant design Form props                      | [`Form`][form]                                                                                                                                          |
| listProps       | Ant design List props                      | [`List`][list]                                                                                                                                          |
| filters         | Current filters state                      | [`CrudFilters`][crudfilters]                                                                                                                            |
| setFilters      | A function that accepts a new filter state | - `(filters: CrudFilters, behavior?: "merge" \| "replace" = "merge") => void` <br/> - `(setter: (previousFilters: CrudFilters) => CrudFilters) => void` |

[crudfilters]: /api-reference/core/interfaces.md#crudfilters
[crudsorting]: /api-reference/core/interfaces.md#crudsorting
[form]: https://ant.design/components/form/#API
[list]: https://ant.design/components/list/#API
[usequery]: https://react-query.tanstack.com/reference/useQuery
[list search]: /advanced-tutorials/search/list-search.md
[baserecord]: /api-reference/core/interfaces.md#baserecord
[httperror]: /api-reference/core/interfaces.md#httperror
[header]: https://ant.design/components/list/#header
[refine swl]: /api-reference/core/components/refine-config.md#syncwithlocation
