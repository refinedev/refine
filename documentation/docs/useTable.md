---
id: useTable
title: useTable
---

`useTable` kullanarak, backendden gelen veriyi tablo halinde gösterebilirsiniz ve loading, sayfalama, sıralama, filtreleme gibi özellikleri kolaylıkla implemente edebilirsiniz. `useTable`, Ant Design [`<Table>`](https://ant.design/components/table/) componentinde kullanılabilen proplar döndürür.

# Örnek

Örneğin, `id` ve `title` değerleri gösterdiğimiz bir listeleme sayfası yapmak istersek:

```tsx title="/src/interfaces/index.d.ts"
export interface IPost {
    id: string;
    title: string;
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
    const { tableProps } = useTable<IPost>();

    return (
        <List {...props}>
            //highlight-start
            <Table {...tableProps} key="id">
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title="ID"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    key="title"
                    dataIndex="title"
                    title="Title"
                    render={(value) => <TextField value={value} />}
                />
            </Table>
            //highlight-end
        </List>
    );
};
```

`<Table.Column>` componentinin `dataIndex` propuna verilen değer, endpointten dönen verilerde, o sütunda gösterilecek olan değerin anahtarının adıdır. 
