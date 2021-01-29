import React from "react";
import { List, Column, Table, Create, Form, FormItem, Input } from "readmin";

export const PostList = (props: any) => {
    return (
        <List {...props}>
            <Table>
                <Column key="id" title="ID" dataIndex="id" />
                <Column key="title" title="Title" dataIndex="title" />
                <Column
                    key="slug"
                    title="Slug"
                    dataIndex="slug"
                    render={(text: any, record: any) => (
                        <div>
                            <p>{text}</p>
                            <p>{record.title}</p>
                        </div>
                    )}
                />
            </Table>
        </List>
    );
};

export const PostCreate = (props: any) => {
    return (
        <Create {...props}>
            <Form>
                <FormItem
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input />
                </FormItem>
            </Form>
        </Create>
    );
};
