---
id: useSimpleList
title: useSimpleList
---

import useSimpleList from '@site/static/img/guides-and-concepts/hooks/useSimpleList/useSimpleList.png';


By using `useSimpleList` you get props for your records from API in accordance with Ant Design `<List>`component. All features such as pagination, sorting come out of the box.

[Refer to Ant Design docs for `<List>`component information &#8594](https://ant.design/components/list/#header)

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

Then an interface like this would suffice for us:

```tsx title="/src/interfaces/index.d.ts"
export interface IPost {
    id: string;
    title: string;
    content: string;
    hit: number;
    category: ICategory;
}

export interface ICategory {
    id: string;
    title: string;
}
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
} from "@pankod/refine";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC = () => {
    const { Text } = Typography;

    //highlight-start
    const { listProps } = useSimpleList<IPost>({
        sorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
        pagination: {
            pageSize: 6,
        },
    });
    //highlight-end

    const categoryIds =
        listProps?.dataSource?.map((item) => item.category.id) ?? [];

    const { data } = useMany<ICategory>("categories", categoryIds, {
        enabled: categoryIds.length > 0,
    });

    const renderItem = (item: IPost) => {
        const { title, hit, content } = item;

        const categoryTitle = data?.data.find(
            (category: ICategory) => category.id === item.category.id,
        )?.title;

        return (
            //highlight-start
            <AntdList.Item
                actions={[
                    <Space key={item.id} direction="vertical" align="end">
                        <Space>
                            <NumberField
                                value={hit}
                                options={{
                                    notation: "compact",
                                }}
                            />
                        </Space>
                        <Text>{categoryTitle}</Text>
                    </Space>,
                ]}
            >
                <AntdList.Item.Meta title={title} description={content} />
            </AntdList.Item>
            //highlight-end
        );
    };

    return (
        <PageHeader title="Posts">
            //highlight-next-line
            <AntdList {...listProps} renderItem={renderItem} />
        </PageHeader>
    );
};
```

:::tip
You can use `AntdList.Item` and `AntdList.Item.Meta` like `<List>` component from [Ant Design](https://ant.design/components/list/#API)
:::

<br/>
<div style={{textAlign: "center"}}>
    <img src={useSimpleList} />
</div>


## API

| Key       | Description                                                  | Type                                                     | Default                                  |
| --------- | ------------------------------------------------------------ | -------------------------------------------------------- | ---------------------------------------- |
| resource  | The resource to list the data                                | `string` \| `undefined`                                  | Resource name that it reads from the url |
| sorter    | Allows to sort records by speficified order and field        | [`CrudSorting`](interfaces.md#crudsorting)\| `undefined` |                                          |
| filter    | Allows you to filter queries using refine's filter operators | [`CrudFilters`](interfaces.md#crudfilters)\| `undefined` |                                          |
| listProps | Ant Design `<List>` props                                    | [`listProps`](https://ant.design/components/list/#API)   |                                          |
