import * as React from "react";
import {
    List,
    Table,
    Create,
    Edit,
    Form,
    FormItem,
    TextInput,
    Column,
    useSetLocale,
} from "readmin";

export const CategoryList = (props: { resourceName: string }) => {
    const setLocal = useSetLocale();
    return (
        <List {...props}>
            <button type="button" onClick={() => setLocal("fr")}>
                fr
            </button>
            <button type="button" onClick={() => setLocal("en")}>
                en
            </button>
            <Table
                rowKey="id"
                pagination={{
                    pageSize: 20,
                    position: ["bottomCenter"],
                    size: "small",
                }}
            >
                <Column key="id" dataIndex="id" title="ID" />
                <Column key="title" dataIndex="title" title="Title" />
            </Table>
        </List>
    );
};

export const CategoryCreate = (props: any) => {
    return (
        <Create {...props}>
            <Form wrapperCol={{ span: 14 }} layout="vertical">
                <FormItem
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <TextInput />
                </FormItem>
            </Form>
        </Create>
    );
};

export const CategoryEdit = (props: any) => {
    return (
        <Edit {...props}>
            <Form wrapperCol={{ span: 14 }} layout="vertical">
                <FormItem
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <TextInput />
                </FormItem>
            </Form>
        </Edit>
    );
};
