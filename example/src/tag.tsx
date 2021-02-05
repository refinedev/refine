import React from "react";
import {
    List,
    Column,
    Table,
    Create,
    Edit,
    Form,
    FormItem,
    TextInput,
} from "readmin";

export const TagList = (props: any) => {
    return (
        <List {...props}>
            <Table>
                <Column key="id" title="ID" dataIndex="id" />
                <Column key="title" title="Title" dataIndex="title" />
            </Table>
        </List>
    );
};

export const TagCreate = (props: any) => {
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

export const TagEdit = (props: any) => {
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
