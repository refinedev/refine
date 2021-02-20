import * as React from "react";
import {
    List,
    Table,
    Column,
    Create,
    Edit,
    Form,
    FormItem,
    TextInput,
    TextareaInput,
    SelectInput,
    ReferenceInput,
    ReferenceField,
    TextField,
    TagField,
    ImageField,
    FilterDropdown,
    RadioInput,
    RadioGroupInput,
} from "readmin";

export const PostList = (props: any) => {
    return (
        <List {...props}>
            <Table rowKey="id">
                <Column dataIndex="id" title="ID" key="id" />
                <Column
                    key="image"
                    title="Image"
                    dataIndex="image"
                    render={(value) => (
                        <ImageField
                            value={value}
                            title="Image"
                            imageTitle="meow"
                            width={100}
                            data-testid="image"
                        />
                    )}
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
                            <TextField value renderRecordKey="title" />
                        </ReferenceField>
                    )}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <ReferenceInput
                                reference="categories"
                                optionText="title"
                                sort={{
                                    field: "title",
                                    order: "asc",
                                }}
                            >
                                <SelectInput
                                    style={{ minWidth: 200 }}
                                    showSearch
                                    mode="multiple"
                                    placeholder="Select Category"
                                />
                            </ReferenceInput>
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
                            <RadioGroupInput>
                                <RadioInput value="active">Active</RadioInput>
                                <RadioInput value="draft">Draft</RadioInput>
                            </RadioGroupInput>
                        </FilterDropdown>
                    )}
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
                        optionText="title"
                        sort={{
                            field: "title",
                            order: "asc",
                        }}
                    >
                        <SelectInput />
                    </ReferenceInput>
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
                        reference="users"
                        optionText="email"
                        sort={{
                            field: "email",
                            order: "asc",
                        }}
                    >
                        <SelectInput showSearch />
                    </ReferenceInput>
                </FormItem>
                <FormItem
                    label="Tags"
                    name="tags"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <ReferenceInput reference="tags" optionText="title">
                        <SelectInput mode="multiple" />
                    </ReferenceInput>
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
                        optionText="title"
                        sort={{
                            field: "title",
                            order: "asc",
                        }}
                    >
                        <SelectInput showSearch />
                    </ReferenceInput>
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
                    <ReferenceInput reference="users" optionText="email">
                        <SelectInput showSearch />
                    </ReferenceInput>
                </FormItem>
                <FormItem
                    label="Tags"
                    name="tags"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <ReferenceInput reference="tags" optionText="title">
                        <SelectInput mode="multiple" />
                    </ReferenceInput>
                </FormItem>
            </Form>
        </Edit>
    );
};
