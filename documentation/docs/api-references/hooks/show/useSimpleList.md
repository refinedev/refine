---
id: useSimpleList
title: useSimpleList
---

import useSimpleList from '@site/static/img/guides-and-concepts/hooks/useSimpleList/useSimpleList.png';

By using `useSimpleList` you get props for your records from API in accordance with Ant Design `<List>` component. All features such as pagination, sorting come out of the box.

[Refer to Ant Design docs for `<List>` component information &#8594][Header]

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

```tsx twoslash {13-23, 44-59, 65}
import {
    PageHeader,
    Typography,
    useMany,
    AntdList,
    useSimpleList,
    NumberField,
    Space,
} from "@pankod/refine";

export const PostList: React.FC = () => {
    const { Text } = Typography;

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

    const categoryIds =
        listProps?.dataSource?.map((item) => item.category.id) ?? [];

    const { data } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

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

    return (
        <PageHeader ghost={false} title="Posts">
            <AntdList {...listProps} renderItem={renderItem} />
        </PageHeader>
    );
};

interface IPost {
    id: string;
    title: string;
    content: string;
    hit: number;
    category: ICategory;
}

interface ICategory {
    id: string;
    title: string;
}
```

:::tip
You can use `AntdList.Item` and `AntdList.Item.Meta` like `<List>` component from [Ant Design][List]
:::

<br/>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={useSimpleList} alt="use simple list" />
</div>

## API

### Properties

| Key              | Description                                                                                                             | Type                                          | Default                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------ |
| resource         | The resource to list the data                                                                                           | `string` \| `undefined`                       | Resource name that it reads from the url                                             |
| permanentFilter  | Default and unchangeable filter                                                                                         | [`CrudFilters`][CrudFilters]                  | `[]`                                                                                 |
| initialSorter    | Allows to sort records by speficified order and field                                                                   | [`CrudSorting`][CrudSorting]                  |                                                                                      |
| initialFilter    | Allows to filter records by speficified order and field                                                                 | [`CrudFilters`][CrudFilters]                  |                                                                                      |
| listProps        | Ant Design `<List>` props                                                                                               | [`listProps`][List]                           |                                                                                      |
| syncWithLocation | Sortings, filters, page index and records shown per page are tracked by browser history                                 | `boolean`                                     | Value set in [Refine][Refine swl]. If a custom resource is given, it will be `false` |
| onSearch         | When the search form is submitted, it creates the 'CrudFilters' object. See here to create a [search form][List Search] | `Function`                                    |                                                                                      |
| queryOptions     | `react-query`'s `useQuery` options                                                                                      | ` UseQueryOptions<{ data: TData[] }, TError>` |

### Type Parameters

| Property         | Desription                                                      | Type                       | Default                    |
| ---------------- | --------------------------------------------------------------- | -------------------------- | -------------------------- |
| TData            | Result data of the mutation. Extends [`BaseRecord`][BaseRecord] | [`BaseRecord`][BaseRecord] | [`BaseRecord`][BaseRecord] |
| TError           | Custom error object that extends [`HttpError`][HttpError]       | [`HttpError`][HttpError]   | [`HttpError`][HttpError]   |
| TSearchVariables | Antd form values                                                | `{}`                       | `{}`                       |

### Return values

| Property        | Description                     | Type                                               |
| --------------- | ------------------------------- | -------------------------------------------------- |
| queryResult     | Result of the query of a record | [`QueryObserverResult<{ data: TData }>`][useQuery] |
| searchFormProps | Ant design Form props           | [`Form`][Form]                                     |
| listProps       | Ant design List props           | [`List`][List]                                     |
| filters         | Current filters state           | [`CrudFilters`][CrudFilters]                       |

[CrudFilters]: /api-references/interfaces.md#crudfilters
[CrudSorting]: /api-references/interfaces.md#crudsorting
[Form]: https://ant.design/components/form/#API
[List]: https://ant.design/components/list/#API
[useQuery]: https://react-query.tanstack.com/reference/useQuery
[List Search]: /guides-and-concepts/search/list-search.md
[BaseRecord]: /api-references/interfaces.md#baserecord
[HttpError]: /api-references/interfaces.md#httperror
[Header]: https://ant.design/components/list/#header
[Refine swl]: /api-references/components/refine-config.md#syncwithlocation
