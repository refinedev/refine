---
id: useTable
title: useTable
---

import tableSorting from '@site/static/img/table-sorting.gif';

`useTable` kullanarak, backendden gelen veriyi tablo halinde gösterebilirsiniz ve loading, sayfalama, sıralama, filtreleme gibi özellikleri kolaylıkla implemente edebilirsiniz. `useTable`, Ant Design [`<Table>`](https://ant.design/components/table/) componentinde kullanılabilen proplar döndürür.

## Basit Kullanım

Örneğin, `id`, `title` ve `content` değerlerini gösterdiğimiz bir listeleme sayfası yapmak istersek:

```tsx title="/src/interfaces/index.d.ts"
export interface IPost {
    id: string;
    title: string;
    content: string;
}
```

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

```ts
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

