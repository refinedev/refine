import * as React from "react";

import {
    List,
    Create,
    Edit,
    Show,
    Form,
    Steps,
    TextField,
    TagField,
    FilterDropdown,
    Select,
    Radio,
    Input,
    Upload,
    MarkdownField,
    getValueFromEvent,
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
    getDefaultFilter,
    DateField,
    ImportButton,
    useShow,
    Typography,
    useSelect,
    useMany,
    IResourceComponentsProps,
    useImport,
    useCreate,
} from "@pankod/refine";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";
import { Aside } from "../aside";

const { Title, Text } = Typography;

interface IPost {
    title: string;
    slug: string;
    status: "published" | "draft" | "rejected";
    createdAt: string;
    category: ICategory;
    user: {
        id: string;
    };
    tags: [{ id: string }];
}

interface ICategory {
    id: string;
    title: string;
}

export const PostList: React.FC<IResourceComponentsProps> = (props) => {
    const translate = useTranslate();

    const importProps = useImport({
        mapData: (item) => {
            return {
                title: item.title,
                content: item.content,
                status: item.status,
                category: {
                    id: item.categoryId,
                },
                user: {
                    id: item.userId,
                },
            };
        },
    });

    const { tableProps, sorter, filters } = useTable<IPost>({
        initialCurrent: 3,
        initialPageSize: 50,
        initialSorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
    });

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];

    const { data, isLoading } = useMany<ICategory>("categories", categoryIds, {
        enabled: categoryIds.length > 0,
    });

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        optionLabel: "title",
        optionValue: "id",
        defaultValue: getDefaultFilter("category.id", filters),
    });

    const extra = (
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
                        categoryId: item.category.id,
                        userId: item.user?.id,
                    };
                }}
            />
            <ImportButton {...importProps} />
            <CreateButton />
        </Space>
    );

    return (
        <List
            {...props}
            pageHeaderProps={{
                extra,
            }}
        >
            <Table<IPost>
                {...tableProps}
                key="id"
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
                    sorter={{
                        multiple: 1,
                    }}
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                />
                <Table.Column
                    dataIndex="slug"
                    title={translate("common:resources.posts.fields.slug")}
                    key="slug"
                />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title={translate("common:resources.posts.fields.category")}
                    key="category.id"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    data?.data.find(
                                        (item: ICategory) => item.id === value,
                                    )?.title
                                }
                            />
                        );
                    }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...categorySelectProps}
                            />
                        </FilterDropdown>
                    )}
                    defaultFilteredValue={getDefaultFilter(
                        "category.id",
                        filters,
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
                                <Radio value="rejected">
                                    {translate(
                                        "common:resources.posts.fields.status.rejected",
                                    )}
                                </Radio>
                            </Radio.Group>
                        </FilterDropdown>
                    )}
                    defaultFilteredValue={getDefaultFilter("status", filters)}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title={translate("common:resources.posts.fields.createdAt")}
                    key="createdAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                    sorter={{
                        multiple: 2,
                    }}
                    defaultSortOrder={getDefaultSortOrder("createdAt", sorter)}
                />
                <Table.Column
                    title={translate("common:table.actions", "Actions")}
                    dataIndex="actions"
                    key="actions"
                    render={(
                        _text: string,
                        record: {
                            id: string;
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

export const PostCreate: React.FC<IResourceComponentsProps> = () => {
    const { Step } = Steps;

    const apiUrl = useApiUrl();
    const translate = useTranslate();

    const [selectedTab, setSelectedTab] =
        React.useState<"write" | "preview">("write");
    const { isLoading, onChange } = useFileUploadState();

    const { current, gotoStep, stepsProps, submit, formLoading, formProps } =
        useStepsForm({
            warnWhenUnsavedChanges: true,
            defaultFormValues: () => {
                return {
                    status: "published",
                };
            },
        });

    const { selectProps: categorySelectProps } = useSelect({
        resource: "categories",
    });

    const { selectProps: userSelectProps } = useSelect({
        resource: "users",
        optionLabel: "email",
    });

    const { selectProps: tagsSelectProps } = useSelect({
        resource: "tags",
    });

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
                        {
                            label: translate(
                                "common:resources.posts.fields.status.rejected",
                            ),
                            value: "rejected",
                        },
                    ]}
                />
            </Form.Item>
            <Form.Item label={translate("common:resources.posts.fields.image")}>
                <Form.Item
                    name="images"
                    valuePropName="fileList"
                    getValueFromEvent={getValueFromEvent}
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
        </>,

        <>
            <Form.Item
                label={translate("common:resources.posts.fields.category")}
                name={["category", "id"]}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select {...categorySelectProps} />
            </Form.Item>
            <Form.Item
                label={translate("common:resources.posts.fields.user")}
                name={["name", "id"]}
                rules={[
                    {
                        required: true,
                    },
                ]}
                help="Autocomplete (search user email)"
            >
                <Select {...userSelectProps} />
            </Form.Item>
            <Form.Item
                label={translate("common:resources.posts.fields.tags")}
                name="tags"
                rules={[
                    {
                        required: true,
                    },
                ]}
                // TODO: tags interface
                getValueProps={(tags?: { id: string }[]) => {
                    return { value: tags?.map((tag) => tag.id) };
                }}
                getValueFromEvent={(args: string[]) => {
                    return args.map((item) => ({
                        id: item,
                    }));
                }}
            >
                <Select mode="multiple" {...tagsSelectProps} />
            </Form.Item>
        </>,
    ];

    return (
        <Create
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
            Aside={() => <Aside />}
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

export const PostEdit: React.FC<IResourceComponentsProps> = (props) => {
    const { Step } = Steps;

    const apiUrl = useApiUrl();
    const translate = useTranslate();

    const [selectedTab, setSelectedTab] =
        React.useState<"write" | "preview">("write");
    const { onChange, isLoading } = useFileUploadState();

    const {
        current,
        gotoStep,
        stepsProps,
        submit,
        formLoading,
        formProps,
        queryResult,
    } = useStepsForm<IPost>({
        warnWhenUnsavedChanges: true,
        redirect: "list",
        mutationMode: "pessimistic",
    });

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect({
        resource: "categories",
        defaultValue: postData?.category?.id,
    });

    const { selectProps: userSelectProps } = useSelect({
        resource: "users",
        optionLabel: "email",
        defaultValue: postData?.user?.id,
    });

    const { selectProps: tagsSelectProps } = useSelect({
        resource: "tags",
        // TODO: tag interface
        defaultValue: postData?.tags?.map((tag: { id: string }) => tag.id),
    });

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
                        {
                            label: translate(
                                "common:resources.posts.fields.status.rejected",
                            ),
                            value: "rejected",
                        },
                    ]}
                />
            </Form.Item>
            <Form.Item label={translate("common:resources.posts.fields.image")}>
                <Form.Item
                    name="images"
                    valuePropName="fileList"
                    getValueFromEvent={getValueFromEvent}
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
        </>,

        <>
            <Form.Item
                label={translate("common:resources.posts.fields.category")}
                name={["category", "id"]}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    mode="multiple"
                    placeholder="Select Category"
                    {...categorySelectProps}
                />
            </Form.Item>
            <Form.Item
                label={translate("common:resources.posts.fields.user")}
                name={["user", "id"]}
                rules={[
                    {
                        required: true,
                    },
                ]}
                help="Autocomplete (search user email)"
            >
                <Select {...userSelectProps} />
            </Form.Item>
            <Form.Item
                label={translate("common:resources.posts.fields.tags")}
                name="tags"
                rules={[
                    {
                        required: true,
                    },
                ]}
                // TODO: Tags Interface
                getValueProps={(tags?: { id: string }[]) => {
                    return { value: tags?.map((tag) => tag.id) };
                }}
                getValueFromEvent={(args: string[]) => {
                    return args.map((item) => ({
                        id: item,
                    }));
                }}
            >
                <Select mode="multiple" {...tagsSelectProps} />
            </Form.Item>
        </>,
    ];

    return (
        <Edit
            {...props}
            canDelete
            Aside={() => <Aside />}
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

export const PostShow: React.FC<IResourceComponentsProps> = (props) => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>

            <Title level={5}>Content</Title>
            <MarkdownField value={record?.content}></MarkdownField>
        </Show>
    );
};
