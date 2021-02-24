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
    ShowSimple,
} from "readmin";

import { ShowAside } from "../showAside";

export const PostList = (props: any) => {
    return (
        <List {...props}>
            <Table
                rowKey="id"
                pagination={{
                    pageSize: 20,
                    position: ["bottomCenter"],
                    size: "small",
                }}
            >
                <Column
                    dataIndex="id"
                    title="ID"
                    key="id"
                    sorter={{
                        multiple: 3,
                    }}
                    defaultSortOrder="descend"
                />
                <Column
                    dataIndex="title"
                    title="Title"
                    key="title"
                    render={(value) => <TextField value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                />
                <Column
                    dataIndex="slug"
                    title="Slug"
                    key="slug"
                    render={(value) => <TextField value={value} />}
                    sorter={{
                        multiple: 2,
                    }}
                />
                <Column
                    dataIndex="categoryId"
                    title="Category"
                    key="categoryId"
                    render={(value) => (
                        <ReferenceField resource="categories" value={value}>
                            <TextField renderRecordKey="title" />
                        </ReferenceField>
                    )}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Reference
                                reference="categories"
                                optionText="title"
                                sort={{
                                    field: "title",
                                    order: "asc",
                                }}
                            >
                                <Select
                                    style={{ minWidth: 200 }}
                                    showSearch
                                    mode="multiple"
                                    placeholder="Select Category"
                                />
                            </Reference>
                        </FilterDropdown>
                    )}
                />
                <Column
                    dataIndex="status"
                    title="Status"
                    key="status"
                    render={(value) => <TagField value={value} />}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Radio.Group>
                                <Radio value="active">Active</Radio>
                                <Radio value="draft">Draft</Radio>
                            </Radio.Group>
                        </FilterDropdown>
                    )}
                    defaultFilteredValue={["active"]}
                />
            </Table>
        </List>
    );
};

export const PostCreate = (props: any) => {
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
            </Form>
        </Create>
    );
};

export const PostEdit = (props: any) => {
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
            </Form>
        </Edit>
    );
};

export const PostShow = (props: any) => {
    return (
        <Show {...props} aside={ShowAside}>
            <ShowSimple>
                <TextField renderRecordKey="id" />
                <TextField renderRecordKey="title" />
                <TextField renderRecordKey="userId" />
            </ShowSimple>
        </Show>
    );
};
