import * as React from "react";
import { useHistory } from "react-router-dom";
import { SaveOutlined } from "@ant-design/icons";
// import { useStepsForm } from "sunflower-antd";

import {
    List,
    Column,
    Create,
    Edit,
    Show,
    Form,
    Steps,
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
    MarkdownField,
    normalizeFile,
    useApiUrl,
    useFileUploadState,
    useTranslate,
    Button,
    useCreate,
    Table,
    useTable,
    Space,
    EditButton,
    DeleteButton,
    ShowButton,
    useForm,
    useStepsForm,
} from "readmin";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { ShowAside } from "../show";

export const PostList = (props: any) => {
    const translate = useTranslate();
    const { tableProps } = useTable({
        // permanentFilter: {
        //     categoryId: [37, 20]
        // },
        initialSorter: [
            {
                field: "id",
                order: "descend",
            },
        ],
        initialFilter: {
            status: ["active"],
        },
    });

    return (
        <List {...props}>
            <Table
                {...tableProps}
                rowKey="id"
                pagination={{
                    ...tableProps.pagination,
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
                <Column
                    title={translate("common:table.actions", "Actions")}
                    dataIndex="actions"
                    key="actions"
                    render={(
                        _text: string | number,
                        record: {
                            id: string | number;
                        },
                    ): React.ReactNode => (
                        <Space>
                            <EditButton size="small" recordItemId={record.id} />
                            <DeleteButton
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

export const PostCreate = (props: any) => {
    const { Step } = Steps;
    const history = useHistory();

    const apiUrl = useApiUrl();
    const translate = useTranslate();

    const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
        "write",
    );
    const { isLoading, onChange } = useFileUploadState();

    const {
        current,
        gotoStep,
        stepsProps,
        submit,
        formLoading,
        formProps,
    } = useStepsForm();

    const formList = [
        <>
            <Form.Item
                label={translate("common:resources.posts.fields.title")}
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
                label={translate("common:resources.posts.fields.url")}
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
                label={translate("common:resources.posts.fields.content")}
                name="content"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <ReactMde
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    generateMarkdownPreview={(markdown) =>
                        Promise.resolve(<ReactMarkdown source={markdown} />)
                    }
                />
            </Form.Item>
        </>,

        <>
            <Form.Item
                label={translate("common:resources.posts.fields.status")}
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
                label={translate("common:resources.posts.fields.category")}
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
        </>,

        <>
            <Form.Item
                label={translate("common:resources.posts.fields.user")}
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
                label={translate("common:resources.posts.fields.tags")}
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
        </>,

        <>
            <Form.Item label={translate("common:resources.posts.fields.image")}>
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
        </>,
    ];

    return (
        <Create
            {...props}
            actionButtons={
                <>
                    {current > 0 && (
                        <Button
                            onClick={() => {
                                gotoStep(current - 1);
                            }}
                        >
                            {translate(
                                "common:resources.posts.forms.prevButton",
                            )}
                        </Button>
                    )}
                    {current < formList.length - 1 && (
                        <Button
                            onClick={() => {
                                gotoStep(current + 1);
                            }}
                        >
                            {translate(
                                "common:resources.posts.forms.nextButton",
                            )}
                        </Button>
                    )}
                    {current === formList.length - 1 && (
                        <Button
                            style={{ marginRight: 10 }}
                            type="primary"
                            icon={<SaveOutlined />}
                            loading={formLoading}
                            onClick={() => submit()}
                        >
                            {translate("common:buttons.save", "Save")}
                        </Button>
                    )}
                </>
            }
        >
            <Steps {...stepsProps}>
                <Step title="Description" />
                <Step title="Informations" />
                <Step title="Details" />
                <Step title="Image" />
            </Steps>

            <div style={{ marginTop: 60 }}>
                <Form
                    {...formProps}
                    wrapperCol={{ span: 14 }}
                    layout="vertical"
                >
                    {formList[current]}
                </Form>
            </div>
        </Create>
    );
};

export const PostEdit = (props: any) => {
    const { Step } = Steps;

    const apiUrl = useApiUrl();
    const translate = useTranslate();

    const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
        "write",
    );
    const { isLoading, onChange } = useFileUploadState();

    const formList = [
        <>
            <Form.Item
                label={translate("common:resources.posts.fields.title")}
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
                label={translate("common:resources.posts.fields.url")}
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
                label={translate("common:resources.posts.fields.content")}
                name="content"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <ReactMde
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    generateMarkdownPreview={(markdown) =>
                        Promise.resolve(<ReactMarkdown source={markdown} />)
                    }
                />
            </Form.Item>
        </>,

        <>
            <Form.Item
                label={translate("common:resources.posts.fields.status")}
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
                label={translate("common:resources.posts.fields.category")}
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
        </>,

        <>
            <Form.Item
                label={translate("common:resources.posts.fields.user")}
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
                label={translate("common:resources.posts.fields.tags")}
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
        </>,

        <>
            <Form.Item label={translate("common:resources.posts.fields.image")}>
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
        </>,
    ];

    const {
        current,
        gotoStep,
        stepsProps,
        submit,
        formLoading,
        formProps,
    } = useStepsForm();

    return (
        <Edit
            {...props}
            actionButtons={
                <>
                    {current > 0 && (
                        <Button onClick={() => gotoStep(current - 1)}>
                            {translate(
                                "common:resources.posts.forms.prevButton",
                            )}
                        </Button>
                    )}
                    {current < formList.length - 1 && (
                        <Button onClick={() => gotoStep(current + 1)}>
                            {translate(
                                "common:resources.posts.forms.nextButton",
                            )}
                        </Button>
                    )}
                    {current === formList.length - 1 && (
                        <Button
                            style={{ marginRight: 10 }}
                            type="primary"
                            icon={<SaveOutlined />}
                            loading={formLoading}
                            onClick={() => submit()}
                        >
                            {translate("common:buttons.save", "Save")}
                        </Button>
                    )}
                </>
            }
        >
            <Steps {...stepsProps}>
                <Step title="Description" />
                <Step title="Informations" />
                <Step title="Details" />
                <Step title="Image" />
            </Steps>

            <div style={{ marginTop: 60 }}>
                <Form
                    {...formProps}
                    wrapperCol={{ span: 14 }}
                    layout="vertical"
                >
                    {formList[current]}
                </Form>
            </div>
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
