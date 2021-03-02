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
    useFileUploadState,
    useTranslate,
    useNotification,
} from "readmin";

import { ShowAside } from "../show";

export const PostList = (props: any) => {
    const translate = useTranslate();
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
                    title={translate("common:resources.posts.fields.id")}
                    key="id"
                    sorter={{
                        multiple: 3,
                    }}
                    defaultSortOrder="descend"
                />
                <Column
                    dataIndex="title"
                    title={translate("common:resources.posts.fields.title")}
                    key="title"
                    render={(value) => <TextField value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                />
                <Column
                    dataIndex="slug"
                    title={translate("common:resources.posts.fields.slug")}
                    key="slug"
                    render={(value) => <TextField value={value} />}
                    sorter={{
                        multiple: 2,
                    }}
                />
                <Column
                    dataIndex="categoryId"
                    title={translate("common:resources.posts.fields.category")}
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
                    title={translate("common:resources.posts.fields.status")}
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
    const apiUrl = useApiUrl();
    const translate = useTranslate();
    const notification = useNotification();

    const onSuccess = () => {
        notification.success({
            message: "Custom notification",
            description: "Custom notification",
        });
    };
    const onError = () => {
        notification.error({
            message: "Custom error",
            description: "Custom error",
        });
    };

    const { isLoading, onChange } = useFileUploadState();

    return (
        <Create
            {...props}
            onSuccessActions={onSuccess}
            onErrorActions={onError}
            saveButtonProps={{ disabled: isLoading }}
        >
            <Form wrapperCol={{ span: 14 }} layout="vertical">
                <Form.Item
                    label={translate("common:resources.posts.fields.title")}
                    name="title"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={translate("common:resources.posts.fields.url")}
                    name="slug"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={translate("common:resources.posts.fields.content")}
                    name="content"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label={translate("common:resources.posts.fields.status")}
                    name="status"
                    rules={[
                        {
                            required: false,
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
                    label={translate("common:resources.posts.fields.category")}
                    name="categoryId"
                    rules={[
                        {
                            required: false,
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
                    label={translate("common:resources.posts.fields.user")}
                    name="userId"
                    rules={[
                        {
                            required: false,
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
                    label={translate("common:resources.posts.fields.tags")}
                    name="tags"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Reference reference="tags" optionText="title">
                        <Select mode="multiple" />
                    </Reference>
                </Form.Item>

                <Form.Item
                    label={translate("common:resources.posts.fields.image")}
                >
                    <Form.Item
                        name="image"
                        valuePropName="fileList"
                        getValueFromEvent={normalizeFile}
                        noStyle
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Upload.Dragger
                            name="file"
                            action={`${apiUrl}/upload`}
                            listType="picture"
                            maxCount={5}
                            multiple
                            onChange={onChange}
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
    const translate = useTranslate();

    const { isLoading, onChange } = useFileUploadState();

    return (
        <Edit {...props} saveButtonProps={{ disabled: isLoading }}>
            <Form wrapperCol={{ span: 14 }} layout="vertical">
                <Form.Item
                    label={translate("common:resources.posts.fields.title")}
                    name="title"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={translate("common:resources.posts.fields.url")}
                    name="slug"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={translate("common:resources.posts.fields.content")}
                    name="content"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Markdown />
                </Form.Item>
                <Form.Item
                    label={translate("common:resources.posts.fields.status")}
                    name="status"
                    rules={[
                        {
                            required: false,
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
                    label={translate("common:resources.posts.fields.category")}
                    name="categoryId"
                    rules={[
                        {
                            required: false,
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
                    label={translate("common:resources.posts.fields.user")}
                    name="userId"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                    help="Autocomplete (search user email)"
                >
                    <Reference reference="users" optionText="email">
                        <Select showSearch />
                    </Reference>
                </Form.Item>
                <Form.Item
                    label={translate("common:resources.posts.fields.tags")}
                    name="tags"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Reference reference="tags" optionText="title">
                        <Select mode="multiple" />
                    </Reference>
                </Form.Item>
                <Form.Item
                    label={translate("common:resources.posts.fields.image")}
                >
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
                            maxCount={5}
                            multiple
                            onChange={onChange}
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
