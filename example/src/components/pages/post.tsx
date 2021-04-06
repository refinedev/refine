import * as React from "react";

import {
    List,
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
    Table,
    useTable,
    Space,
    EditButton,
    DeleteButton,
    ShowButton,
    SaveButton,
    useStepsForm,
    CreateButton,
    ExportButton,
    CloneButton,
    getDefaultSortOrder,
    useBase64Upload,
} from "readmin";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

export const PostList = (props: any) => {
    const translate = useTranslate();
    const { tableProps, sorter, filters } = useTable({
        // permanentFilter: {
        //     categoryId: [50, 49],
        // },
        initialSorter: [
            {
                field: "title",
                order: "ascend",
            },
        ],
        initialFilter: {
            status: ["published"],
        },
    });

    const actions = (
        <Space direction="horizontal">
            <ExportButton
                sorter={sorter}
                filters={filters}
                pageSize={100}
                maxItemCount={300}
                mapData={(item) => {
                    return {
                        id: item.id,
                        title: item.title,
                        slug: item.slug,
                        content: item.content,
                        status: item.status,
                    };
                }}
            />
            <CreateButton />
        </Space>
    );

    return (
        <List {...props} actionButtons={actions}>
            <Table
                {...tableProps}
                rowKey="id"
                pagination={{
                    ...tableProps.pagination,
                    position: ["bottomCenter"],
                    size: "small",
                }}
            >
                <Table.Column
                    dataIndex="title"
                    title={translate("common:resources.posts.fields.title")}
                    key="title"
                    render={(value) => <TextField value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                />
                <Table.Column
                    dataIndex="slug"
                    title={translate("common:resources.posts.fields.slug")}
                    key="slug"
                    render={(value) => <TextField value={value} />}
                    sorter={{
                        multiple: 2,
                    }}
                    defaultSortOrder={getDefaultSortOrder("slug", sorter)}
                />
                <Table.Column
                    dataIndex="category"
                    title={translate("common:resources.posts.fields.category")}
                    key="category.id"
                    render={({ id }) => (
                        <ReferenceField resource="categories" value={id}>
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
                                    order: "ascend",
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
                <Table.Column
                    dataIndex="status"
                    title={translate(
                        "common:resources.posts.fields.status.title",
                    )}
                    key="status"
                    render={(value) => <TagField value={value} />}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Radio.Group>
                                <Radio value="published">
                                    {translate(
                                        "common:resources.posts.fields.status.published",
                                    )}
                                </Radio>
                                <Radio value="draft">
                                    {translate(
                                        "common:resources.posts.fields.status.draft",
                                    )}
                                </Radio>
                            </Radio.Group>
                        </FilterDropdown>
                    )}
                    defaultFilteredValue={["published"]}
                />
                <Table.Column
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
                            <CloneButton
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

export const PostCreate = (props: any) => {
    const { Step } = Steps;

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
        form,
    } = useStepsForm({
        warnWhenUnsavedChanges: true,
        defaultFormValues: () => {
            return {
                status: "published",
            };
        },
    });

    const { uploadedFiles, ...uploadProps } = useBase64Upload({
        maxCount: 3,
    });
    React.useEffect(() => {
        form &&
            form.setFieldsValue({
                base64Images: uploadedFiles,
            });
    }, [uploadedFiles]);

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
            <Form.Item
                label={translate("common:resources.posts.fields.status.title")}
                name="status"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    options={[
                        {
                            label: translate(
                                "common:resources.posts.fields.status.published",
                            ),
                            value: "published",
                        },
                        {
                            label: translate(
                                "common:resources.posts.fields.status.draft",
                            ),
                            value: "draft",
                        },
                    ]}
                />
            </Form.Item>
            <Form.Item label={translate("common:resources.posts.fields.image")}>
                <Form.Item
                    name="images"
                    valuePropName="fileList"
                    getValueFromEvent={normalizeFile}
                    noStyle
                >
                    <Upload.Dragger
                        name="file"
                        action={`${apiUrl}/media/upload`}
                        listType="picture"
                        maxCount={5}
                        multiple
                        onChange={onChange}
                    >
                        <p className="ant-upload-text">
                            {translate("common:upload.title")}
                        </p>
                        <p className="ant-upload-hint">
                            {translate("common:upload.description")}
                        </p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>

            <Form.Item label="Base64Images">
                <Form.Item
                    name="base64Images"
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
                        listType="picture"
                        multiple
                        {...uploadProps}
                    >
                        <p className="ant-upload-text">
                            {translate("common:upload.title")}
                        </p>
                        <p className="ant-upload-hint">
                            {translate("common:upload.description")}
                        </p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>
        </>,

        <>
            <Form.Item
                label={translate("common:resources.posts.fields.category")}
                name="category"
                rules={[
                    {
                        required: true,
                    },
                ]}
                valuePropName=""
                getValueFromEvent={(id) => {
                    return { id };
                }}
            >
                <Reference
                    reference="categories"
                    optionText="title"
                    sort={{
                        field: "title",
                        order: "ascend",
                    }}
                >
                    <Select showSearch />
                </Reference>
            </Form.Item>
            <Form.Item
                label={translate("common:resources.posts.fields.user")}
                name="user"
                rules={[
                    {
                        required: true,
                    },
                ]}
                help="Autocomplete (search user email)"
                valuePropName=""
                getValueFromEvent={(id) => {
                    return { id };
                }}
            >
                <Reference reference="users" optionText="email">
                    <Select showSearch />
                </Reference>
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
                        <SaveButton
                            style={{ marginRight: 10 }}
                            loading={isLoading || formLoading}
                            onClick={() => submit()}
                        />
                    )}
                </>
            }
        >
            <Steps {...stepsProps}>
                <Step title="Content" />
                <Step title="Relations" />
            </Steps>

            <div style={{ marginTop: 60 }}>
                <Form
                    {...formProps}
                    wrapperCol={{ span: 24 }}
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
    const { onChange, isLoading } = useFileUploadState();

    const {
        current,
        gotoStep,
        stepsProps,
        submit,
        formLoading,
        formProps,
        form,
        queryResult,
    } = useStepsForm({
        warnWhenUnsavedChanges: true,
        redirect: "list",
        mutationMode: "pessimistic",
    });

    const [base64Images, setBase64Images] = React.useState<any[]>([]);

    React.useEffect(() => {
        if (queryResult && queryResult.data) {
            const { data } = queryResult;
            setBase64Images(data.data.base64Images);
        }
    }, [queryResult]);

    const { uploadedFiles, ...uploadProps } = useBase64Upload({
        formData: base64Images,
        maxCount: 3,
    });
    React.useEffect(() => {
        form &&
            form.setFieldsValue({
                base64Images: uploadedFiles,
            });
    }, [uploadedFiles]);

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
            <Form.Item
                label={translate("common:resources.posts.fields.status.title")}
                name="status"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    options={[
                        {
                            label: translate(
                                "common:resources.posts.fields.status.published",
                            ),
                            value: "published",
                        },
                        {
                            label: translate(
                                "common:resources.posts.fields.status.draft",
                            ),
                            value: "draft",
                        },
                    ]}
                />
            </Form.Item>
            <Form.Item label={translate("common:resources.posts.fields.image")}>
                <Form.Item
                    name="images"
                    valuePropName="fileList"
                    getValueFromEvent={normalizeFile}
                    noStyle
                >
                    <Upload.Dragger
                        name="file"
                        action={`${apiUrl}/media/upload`}
                        listType="picture"
                        maxCount={5}
                        multiple
                        onChange={onChange}
                    >
                        <p className="ant-upload-text">
                            {translate("common:upload.title")}
                        </p>
                        <p className="ant-upload-hint">
                            {translate("common:upload.description")}
                        </p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>
            <Form.Item label="Base64Images">
                <Form.Item
                    name="base64Images"
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
                        listType="picture"
                        multiple
                        {...uploadProps}
                    >
                        <p className="ant-upload-text">
                            {translate("common:upload.title")}
                        </p>
                        <p className="ant-upload-hint">
                            {translate("common:upload.description")}
                        </p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>
        </>,

        <>
            <Form.Item
                label={translate("common:resources.posts.fields.category")}
                name="category"
                rules={[
                    {
                        required: true,
                    },
                ]}
                getValueProps={({ id }) => {
                    return { value: id };
                }}
                getValueFromEvent={(id) => {
                    return { id };
                }}
            >
                <Reference
                    reference="categories"
                    optionText="title"
                    sort={{
                        field: "title",
                        order: "ascend",
                    }}
                >
                    <Select showSearch />
                </Reference>
            </Form.Item>
            <Form.Item
                label={translate("common:resources.posts.fields.user")}
                name="user"
                rules={[
                    {
                        required: true,
                    },
                ]}
                getValueProps={({ id }) => {
                    return { value: id };
                }}
                getValueFromEvent={(id) => {
                    return { id };
                }}
                help="Autocomplete (search user email)"
            >
                <Reference reference="users" optionText="email">
                    <Select showSearch />
                </Reference>
            </Form.Item>
        </>,
    ];

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
                        <SaveButton
                            style={{ marginRight: 10 }}
                            loading={isLoading || formLoading}
                            onClick={() => submit()}
                            disabled={formLoading}
                        />
                    )}
                </>
            }
        >
            <Steps {...stepsProps}>
                <Step title="Content" />
                <Step title="Relations" />
            </Steps>

            <div style={{ marginTop: 60 }}>
                <Form
                    {...formProps}
                    wrapperCol={{ span: 24 }}
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
        <Show {...props}>
            <ShowSimple title="Post Title">
                <TextField renderRecordKey="id" />
                <TextField renderRecordKey="title" />
                <MarkdownField renderRecordKey="content" />
            </ShowSimple>
        </Show>
    );
};
