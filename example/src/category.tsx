import React from "react";
import { List, Table, Column, Create, Form, FormItem, Input } from "readmin";

export const CategoryList = (props: any) => {
    return (
        <List {...props}>
            <Table>
                <Column key="id" title="ID" dataIndex="id" />
                <Column key="title" title="Title" dataIndex="title" />
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
                    <Input />
                </FormItem>
            </Form>
        </Create>
    );
};
