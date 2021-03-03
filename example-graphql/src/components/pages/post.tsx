import * as React from "react";
import {
    List,
    Table,
    Column,
    Create,
    Edit,
    Show,
    Form,
    Reference,
    ReferenceField,
    TextField,
    TagField,
    FilterDropdown,
    Select,
    Radio,
    Input,
    Upload,
    ShowSimple,
    Markdown,
    MarkdownField,
    normalizeFile,
    useApiUrl,
} from "readmin";

import { ShowAside } from "../show";

export const PostList = (props: any) => {
    return (
        <List {...props}>
            <Table
                rowKey="id"
                pagination={{
                    pageSize: 5,
                    position: ["bottomCenter"],
                    size: "small",
                }}
            >
                <Column
                    dataIndex="id"
                    title="ID"
                    key="id"
                    sorter
                    defaultSortOrder="ascend"
                />
                <Column
                    dataIndex="title"
                    title="Title"
                    key="title"
                    render={(value) => <TextField value={value} />}
                    sorter
                />
                <Column
                    dataIndex="views"
                    title="Views"
                    key="views"
                    render={(value) => <TextField value={value} />}
                    sorter
                />
                <Column
                    dataIndex="User.name"
                    title="User"
                    key="userName"
                    render={(value, record) => {
                        return (
                            <TextField
                                record={record.User}
                                renderRecordKey="name"
                            />
                        );
                    }}
                    sorter
                />
            </Table>
        </List>
    );
};

export const PostCreate = (props: any) => {
    const apiUrl = useApiUrl();

    return (
        <Create {...props}>
            <Form wrapperCol={{ span: 14 }} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Url"
                    name="slug"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
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
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="categoryId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Reference
                        reference="categories"
                        optionText="title"
                        sort={{
                            field: "title",
                            order: "asc",
                        }}
                    >
                        <Select />
                    </Reference>
                </Form.Item>
                <Form.Item
                    label="User"
                    name="userId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    help="Autocomplete (search user email)"
                >
                    <Reference
                        reference="users"
                        optionText="email"
                        sort={{
                            field: "email",
                            order: "asc",
                        }}
                    >
                        <Select showSearch />
                    </Reference>
                </Form.Item>
                <Form.Item
                    label="Tags"
                    name="tags"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Reference reference="tags" optionText="title">
                        <Select mode="multiple" />
                    </Reference>
                </Form.Item>

                <Form.Item label="Image">
                    <Form.Item
                        name="image"
                        valuePropName="fileList"
                        getValueFromEvent={normalizeFile}
                        noStyle
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Upload.Dragger
                            name="file"
                            action={`${apiUrl}/upload`}
                            listType="picture"
                            maxCount={1}
                        >
                            <p className="ant-upload-text">
                                Click or drag file to this area to upload
                            </p>
                            <p className="ant-upload-hint">
                                Support for a single upload.
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Create>
    );
};

export const PostEdit = (props: any) => {
    const apiUrl = useApiUrl();

    return (
        <Edit {...props}>
            <Form wrapperCol={{ span: 14 }} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Url"
                    name="slug"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Markdown />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
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
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="categoryId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Reference
                        reference="categories"
                        optionText="title"
                        sort={{
                            field: "title",
                            order: "asc",
                        }}
                    >
                        <Select showSearch />
                    </Reference>
                </Form.Item>
                <Form.Item
                    label="User"
                    name="userId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    help="Autocomplete (search user email)"
                >
                    <Reference reference="users" optionText="email">
                        <Select showSearch />
                    </Reference>
                </Form.Item>
                <Form.Item
                    label="Tags"
                    name="tags"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Reference reference="tags" optionText="title">
                        <Select mode="multiple" />
                    </Reference>
                </Form.Item>
                <Form.Item label="Image">
                    <Form.Item
                        name="image"
                        valuePropName="fileList"
                        getValueFromEvent={normalizeFile}
                        noStyle
                    >
                        <Upload.Dragger
                            name="file"
                            action={`${apiUrl}/upload`}
                            listType="picture"
                            maxCount={1}
                        >
                            <p className="ant-upload-text">
                                Click or drag file to this area to upload
                            </p>
                            <p className="ant-upload-hint">
                                Support for a single upload.
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Edit>
    );
};

export const PostShow = (props: any) => {
    return (
        <Show {...props} aside={ShowAside}>
            <ShowSimple title="Post Title">
                <TextField renderRecordKey="id" />
                <TextField renderRecordKey="title" />
                <TextField renderRecordKey="userId" />
                <MarkdownField renderRecordKey="content" />
            </ShowSimple>
        </Show>
    );
};
