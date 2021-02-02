import React from "react";
import {
    List,
    Column,
    Table,
    Create,
    Edit,
    Form,
    FormItem,
    Input,
    Textarea,
} from "readmin";

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
                    // render={(text: any, record: any) => (
                    //     <div>
                    //         <p>{text}</p>
                    //         <p>{record.title}</p>
                    //     </div>
                    // )}
                />
            </Table>
        </List>
    );
};

export const PostCreate = (props: any) => {
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
                <FormItem
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Textarea />
                </FormItem>
            </Form>
        </Create>
    );
};

export const PostEdit = (props: any) => {
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
                    <Input />
                </FormItem>
                <FormItem
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Textarea />
                </FormItem>
            </Form>
        </Edit>
    );
};
