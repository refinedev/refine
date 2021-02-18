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
} from "readmin";

export const TagList = (props: any) => {
    return (
        <List {...props}>
            <Table>
                <Column key="id" dataIndex="id" title="ID" />
                <Column key="title" dataIndex="title" title="Title" />
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
