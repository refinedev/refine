---
id: useEditableTable
title: useEditableTable
---

import editButton from '@site/static/img/hooks/useEditableTable/edit-button.gif';
import rowClickEdit from '@site/static/img/hooks/useEditableTable/row-click-edit.gif';

`useEditableTable`, [`useTable`](useTable.md)ın sağladığı özelliklerin üzerine, tablo üzerinde düzenleme özelliğini kolaylıkla implemente edebilmenizi sağlar. `useEditableTable`, Ant Design'ın [`<Table>`](https://ant.design/components/table/) ve [`<Form>`](https://ant.design/components/form/) componentlerinde kullanılabilen proplar döndürür.

## Butonlarla Düzenleme

Örneğin, `id` ve `title` değerlerini gösterdiğimiz aşağıdaki `Post` verisini listeleme sayfası yapmak istersek:

```tsx title="/interfaces/index.d.ts"
export interface IPost {
    id: string;
    title: string;
}
```

Bu kez, düzenleme özelliğini ekleyebilmek için, `<Table>` componentini bir `<Form>` componenti ile kaplamamız ve `useEditableTable`dan gelen propları ilgili componentlere aktarmamız gerekiyor:

```tsx title="/pages/posts/list.tsx"
import { List, Table, TextField, useTable } from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    //highlight-next-line
    const { tableProps, formProps } = useEditableTable<IPost>();

    return (
        <List>
            //highlight-start
            <Form {...formProps}>
                <Table {...tableProps} key="id">
                    <Table.Column key="id" dataIndex="id" title="ID" />
                    <Table.Column key="title" dataIndex="title" title="Title" />
                </Table>
                //highlight-end
            </Form>
        </List>
    );
};
```

Düzenleme butonları için bir sütun ekleyelim:

```tsx title="/pages/posts/list.tsx"
import {
    List,
    Table,
    Form,
    //highlight-start
    Space,
    Button,
    SaveButton,
    EditButton,
    //highlight-end
    useEditableTable,
} from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const {
        tableProps,
        formProps,
        //highlight-start
        isEditing,
        saveButtonProps,
        cancelButtonProps,
        editButtonProps,
        //highlight-end
    } = useEditableTable<IPost>();

    return (
        <List>
            <Form {...formProps}>
                <Table {...tableProps} key="id">
                    <Table.Column key="id" dataIndex="id" title="ID" />
                    <Table.Column key="title" dataIndex="title" title="Title" />
                    //highlight-start
                    <Table.Column<IPost>
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        render={(_text, record) => {
                            if (isEditing(record.id)) {
                                return (
                                    <Space>
                                        <SaveButton
                                            {...saveButtonProps}
                                            size="small"
                                        />
                                        <Button
                                            {...cancelButtonProps}
                                            size="small"
                                        >
                                            Cancel
                                        </Button>
                                    </Space>
                                );
                            }
                            return (
                                <Space>
                                    <EditButton
                                        {...editButtonProps(record.id)}
                                        size="small"
                                    />
                                </Space>
                            );
                        }}
                    />
                    //highlight-end
                </Table>
            </Form>
        </List>
    );
};
```

:::tip
`useEditableTable`dan dönen `isEditing` fonksiyonu, bir satırın o an düzenleme modunda olup olmadığını kontrol edebilmemizi sağlar.
:::

Şimdiye kadar düzenlenebilir halde değil. Düzenleme olabilecek sütunları, `isEditing` kullanarak şartlı render ile, eğer orada şu an bir düzenleme yapılıyorsa, içinde bir `<Form.Item>` ile göstermeliyiz:

```tsx title="/pages/posts/list.tsx"
import {
    List,
    Table,
    Form,
    Space,
    Button,
    SaveButton,
    EditButton,
    //highlight-start
    Input,
    TextField,
    //highlight-end
    useEditableTable,
} from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const {
        tableProps,
        formProps,
        isEditing,
        saveButtonProps,
        cancelButtonProps,
        editButtonProps,
    } = useEditableTable<IPost>();

    return (
        <List>
            <Form {...formProps}>
                <Table {...tableProps} key="id">
                    <Table.Column key="id" dataIndex="id" title="ID" />
                    <Table.Column<IPost>
                        key="title"
                        dataIndex="title"
                        title="Title"
                        //highlight-start
                        render={(value, data: any) => {
                            if (isEditing(data.id)) {
                                return (
                                    <Form.Item
                                        name="title"
                                        style={{ margin: 0 }}
                                    >
                                        <Input />
                                    </Form.Item>
                                );
                            }
                            return <TextField value={value} />;
                        }}
                        //highlight-end
                    />
                    <Table.Column<IPost>
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        render={(_text, record) => {
                            if (isEditing(record.id)) {
                                return (
                                    <Space>
                                        <SaveButton
                                            {...saveButtonProps}
                                            size="small"
                                        />
                                        <Button
                                            {...cancelButtonProps}
                                            size="small"
                                        >
                                            Cancel
                                        </Button>
                                    </Space>
                                );
                            }
                            return (
                                <Space>
                                    <EditButton
                                        {...editButtonProps(record.id)}
                                        size="small"
                                    />
                                </Space>
                            );
                        }}
                    />
                </Table>
            </Form>
        </List>
    );
};
```

Bu sayede, kullanıcı bir düzenleme butonuna tıkladığında, `isEditing(satırId)` ilgili satır için `true` döndürecek, düzenleme yapılan satırlarda `<TextInput>` componenti görüntülenecektir. Düzenleme bittiğinde, `<SaveButton>`a tıklanarak yeni değer kaydedilebilir.

:::tip
`<Table.Column>` componentine özel `render` propu vererek, o sütundaki veriyi istediğiniz şekilde renderleyebilirsiniz.

[<Table.Column\> hakkında daha fazla bilgi için Ant Design dökümantasyonuna başvurun >](https://ant.design/components/table/#Column)
:::

<div style={{textAlign: "center"}}>
    <img src={editButton} />
</div>

## Satıra Tıklayarak Düzenleme

`useEditableTable`dan dönen `setEditId` fonksiyonu ile programatik olarak, `id` değeri verilen bir satır, düzenleme moduna alınabilir.

Satıra tıklandığında satırı düzenleme moduna almak için, `<Table>` componentinin `onRow` propundan faydalanılabilir. `onRow` propuna verilen fonksiyon, satırlara her tıklandığında, hangi satıra tıklandığı bilgisi ile tekrar çağırılır.

Satıra tıklandığında, `setEditId` kullanarak o satırı düzenleme moduna alabiliriz:

```tsx title="/pages/posts/list.tsx"
import {
    List,
    Table,
    Form,
    Input,
    TextField,
    useEditableTable,
} from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const {
        tableProps,
        formProps,
        isEditing,
        //highlight-next-line
        setEditId,
    } = useEditableTable<IPost>();

    return (
        <List>
            <Form {...formProps}>
                <Table
                    {...tableProps}
                    key="id"
                    //highlight-start
                    onRow={(record) => ({
                        onClick: (event: any) => {
                            if (event.target.nodeName === "TD") {
                                setEditId && setEditId(record.id);
                            }
                        },
                    })}
                    //highlight-end
                >
                    <Table.Column key="id" dataIndex="id" title="ID" />
                    <Table.Column<IPost>
                        key="title"
                        dataIndex="title"
                        title="Title"
                        render={(value, data: any) => {
                            if (isEditing(data.id)) {
                                return (
                                    <Form.Item
                                        name="title"
                                        style={{ margin: 0 }}
                                    >
                                        <Input />
                                    </Form.Item>
                                );
                            }
                            return <TextField value={value} />;
                        }}
                    />
                </Table>
            </Form>
        </List>
    );
};
```

<div style={{textAlign: "center"}}>
    <img src={rowClickEdit} />
</div>


## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-use-editable-table-example-id4g3?autoresize=1&fontsize=14&module=%2Fsrc%2Fpages%2Fposts%2Flist.tsx&theme=dark&view=preview"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="refine-use-editable-table-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>