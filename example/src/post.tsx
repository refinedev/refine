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
    TextareaInput,
    SelectInput,
    ReferenceInput,
} from "readmin";

export const PostList = (props: any) => {
    return (
        <List {...props}>
            <Table>
                <Column key="id" title="ID" dataIndex="id" />
                <Column key="title" title="Title" dataIndex="title" />
                <Column
                    key="categoryId"
                    title="Category"
                    dataIndex="categoryId"
                />
                <Column key="status" title="Status" dataIndex="status" />
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
                    <TextInput />
                </FormItem>
                <FormItem
                    label="Url"
                    name="slug"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <TextInput />
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
                    <TextareaInput />
                </FormItem>
                <FormItem
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <SelectInput
                        defaultValue="active"
                        options={[
                            {
                                label: "Active",
                                value: "active",
                            },
                            {
                                label: "Draft",
                                value: "draft",
                            },
                        ]}
                    />
                </FormItem>
                <FormItem
                    label="Category"
                    name="categoryId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <ReferenceInput
                        reference="categories"
                        renderLabelColumn="title"
                    />
                </FormItem>
                <FormItem
                    label="User"
                    name="userId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    help="Autocomplete (search user email)"
                >
                    <ReferenceInput
                        showSearch
                        reference="users"
                        renderLabelColumn="email"
                    />
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
                    <TextInput />
                </FormItem>
                <FormItem
                    label="Url"
                    name="slug"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <TextInput />
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
                    <TextareaInput />
                </FormItem>
                <FormItem
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <SelectInput
                        defaultValue="active"
                        options={[
                            {
                                label: "Active",
                                value: "active",
                            },
                            {
                                label: "Draft",
                                value: "draft",
                            },
                        ]}
                    />
                </FormItem>
                <FormItem
                    label="Category"
                    name="categoryId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <ReferenceInput
                        reference="categories"
                        renderLabelColumn="title"
                    />
                </FormItem>
                <FormItem
                    label="User"
                    name="userId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    help="Autocomplete (search user email)"
                >
                    <ReferenceInput
                        showSearch
                        reference="users"
                        renderLabelColumn="email"
                    />
                </FormItem>
            </Form>
        </Edit>
    );
};
