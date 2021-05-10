---
id: useTable
title: useTable
---

import tableSorting from '@site/static/img/table-sorting.gif';
import filters from '@site/static/img/filters.gif';

`useTable` kullanarak, backendden gelen veriyi Ant Design [`<Table>`](https://ant.design/components/table/) componentine göre uygun formatlanmış proplar elde ederek tablo halinde gösterebilir ve loading, sayfalama, sıralama, filtreleme gibi özellikleri kolaylıkla implemente edebilirsiniz.`

:::tip 
`useTable`, verdiğiniz kaynağın verilerini çekerken `useMany` kullanır.
:::

## Basit Kullanım

Tabloda göstereceğimiz verinin endpointten şu şekilde geldiğini varsayalım:

```json title="Example GET https://refine-fake-rest.pankod.com/posts"
[
    {
        "id": 182,
        "title": "A aspernatur rerum molestiae.",
        "slug": "doloremque-animi-saepe",
        "content": "Natus molestias incidunt voluptatibus. Libero delectus facilis. Voluptates minus eius adipisci a. Voluptas voluptates distinctio et voluptatem omnis distinctio. Et ab cupiditate itaque inventore. Est possimus maxime dolores maxime ut rerum occaecati dolores. Totam voluptas incidunt. Et blanditiis iure dolorem. Laboriosam repellendus voluptatem nostrum qui voluptatem aspernatur repellat cupiditate dolorem. Nisi voluptatum qui illum exercitationem minima ut quo.",
        "category": {
            "id": 43
        },
        "user": {
            "id": 36
        },
        "status": "published",
        "createdAt": "2021-03-23T01:40:50.921Z",
        "image": [],
        "tags": [
            17,
            4
        ]
    },
    {
        "id": 989,
        "title": "A molestiae vel voluptatem enim.",
        "slug": "dolore-quas-et",
        "content": "Voluptas consequatur quia beatae. Ipsa est qui culpa deleniti. Voluptate distinctio est qui voluptatibus repellat incidunt. Qui sunt reprehenderit aliquid delectus illum aspernatur ad rem. Qui dicta voluptatibus reprehenderit provident minus aut consequatur aliquid impedit. Eligendi repudiandae consequatur eum officia sunt. Rerum tempora beatae exercitationem. Recusandae deleniti soluta cumque ut amet consectetur. Animi quisquam ut iure aut minima sint rerum velit quam. Ipsum in ratione aut quia maxime dignissimos dolores.",
        "category": {
            "id": 17
        },
        "user": {
            "id": 21
        },
        "status": "draft",
        "createdAt": "2020-01-28T02:57:58.892Z",
        "image": [],
        "tags": [
            49,
            5,
            41
        ]
    },
]
```

O halde şöyle bir arayüz bizim için yeterli olur:

```tsx title="/src/interfaces/index.d.ts"
interface IPost {
    title: string;
    slug: string;
    status: "published" | "draft";
    createdAt: string;
    category: ICategory;
    user: {
        id: string;
    };
    tags: [{ id: string }];
}
```

`id`, `title` ve `content` değerlerini gösterdiğimiz bir listeleme sayfası yapmak istersek:

```tsx title="/src/pages/posts/list.tsx"
import {
    List,
    Table,
    TextField,
    useTable,
    IResourceComponentsProps,
} from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList = (props: IResourceComponentsProps) => {
    //highlight-next-line
    const { tableProps } = useTable<IPost>();

    return (
        <List {...props}>
            //highlight-start
            <Table {...tableProps} key="id">
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title="ID"
                />
                <Table.Column
                    key="title"
                    dataIndex="title"
                    title="Title"
                />
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

`<Table.Column>` componentinin `dataIndex` propuna verilen değer, endpointten dönen verilerde, o sütunda gösterilecek olan değerin anahtarının adıdır.

:::tip
`<Admin>` componentine verilen `<Resource>` üzerindeki bir sayfada, `useTable` hangi kaynağın gösterileceğinin çıkarımını otomatik olarak yapar. Başka bir kaynağın verilerini göstermek isterseniz, `useTable(options)` hookunun aldığı opsiyon nesnesindeki `resource: string` opsiyonu ile başka bir `resource`a ait endpointten gelen verileri gösterebilirsiniz.
:::

## Sıralama

Bir sütuna sıralama özelliği eklemek için, ilgili `<Table.Column>` componentine `sorter` propu verilir.

```tsx title="/src/pages/posts/list.tsx"
import {
    List,
    Table,
    TextField,
    useTable,
    IResourceComponentsProps,
} from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList = (props: IResourceComponentsProps) => {
    const { tableProps } = useTable<IPost>();

    return (
        <List {...props}>
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

`sorter` propuna verdiğimiz `multiple` değeri, çoklu sıralama yapıldığında, bu sütunun sıralamadaki önceliğini belirtir.

<div style={{textAlign: "center"}}>
    <img src={tableSorting} />
</div>

### Başlangıç sıralama durumu

```ts title="/src/pages/posts/list.tsx"
const { tableProps, sorter } = useTable<IPost>({
    initialSorter: [
        {
            field: "title",
            order: "ascend",
        },
    ],
});
```

`initialSorter` ayarı ile, hangi `field`ın hangi sıralama durumuyla başlayacağını (`"ascend"`, `"descend"`, `undefined`) seçebilirsiniz.

## Filtreleme

Endpointten gelen her `post` bir `status` değerine sahip. Bu değer `published` ya da `draft` olabilir. `status` değerini bir Ant Design `<TagField>` ile gösterebiliriz: 

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

Bu değer üzerinden filtreleme yapabilmek için, `filterDropdown` propunu kullanabiliriz. Filtreleme formunu `<FilterDropdown>` componenti içine almalıyız ve fonksiyona gelen propları bu componentin proplarına aktarmalıyız:

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
    IResourceComponentsProps,
    getDefaultSortOrder,
} from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList = (props: IResourceComponentsProps) => {
    //highlight-next-line
    const { tableProps, sorter } = useTable<IPost>({
        initialSorter: [
            {
                field: "title",
                order: "ascend",
            },
        ],
    });

    return (
        <List {...props}>
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
                //highlight-start
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
                            </Radio.Group>
                        </FilterDropdown>
                    )}
                />
                //highlight-end
            </Table>
        </List>
    );
};
```

<div style={{textAlign: "center"}}>
    <img src={filters} />
</div>

### Varsayılan Filtre Değeri

Varsayılan filtre değeri vermek için, `useTable(options)` hookunun, `initialFilter` opsiyonunu kullanabilirsiniz.

```ts title="/src/pages/posts/list.tsx"
...
const { tableProps, sorter, filters } = useTable<IPost>({
    initialSorter: [
        {
            field: "title",
            order: "ascend",
        },
    ],
    initialFilter: {
        status: ["draft"],
    },
});
...
```

Eğer varsayılan filtre değerleri verirseniz, sayfa açıldığında o filtre alanlarının varsayılan değerler ile gelmesi için, ilgili `<Table.Column>` componentlerine `defaultFilteredValue` propunun uygun şekilde verilmesi gerekir.

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
    IResourceComponentsProps,
    getDefaultSortOrder,
} from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList = (props: IResourceComponentsProps) => {
    //highlight-start
    const { tableProps, sorter, filters } = useTable<IPost>({
        initialSorter: [
            {
                field: "title",
                order: "ascend",
            },
        ],
        initialFilter: {
            status: ["draft"],
        },
    });
    //highlight-end

    return (
        <List {...props}>
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
