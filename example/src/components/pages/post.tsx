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
    useDeleteMany,
    useUpdateMany,
} from "@pankod/refine";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

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

export const PostList = (props: any) => {
    const translate = useTranslate();
    const { tableProps, sorter, filters } = useTable<IPost>({
        // permanentFilter: [
        //     {
        //         field: "createdAt",
        //         operator: "gte",
        //         value: "2021-05-17",
        //     },
        // ],
        initialSorter: [
            {
                field: "createdAt",
                order: "descend",
            },
        ],
    });

    const [selectedRowKeys, setSelectedRowKeys] = React.useState<
        (string | number)[]
    >([]);

    const {
        mutate,
        isSuccess,
        isLoading: deleteManyIsLoading,
    } = useUpdateMany<IPost>("posts");

    /*   const { mutate, isSuccess, isLoading: deleteManyIsLoading } = useDeleteMany<IPost>(
        "posts",
    );
     */
    const deleteSelectedItems = () => {
        mutate({
            ids: selectedRowKeys,
            values: {
                title: "necati33333333",
             /*    id: "f34c233c-e883-499d-aad7-2b39e9b0c9ac", */
                status: "draft",
             /*    id: "4fa734d9-349a-4524-b70b-0cd5c40c8dec", */
                content:
                    "Voluptatibus possimus ratione similique dolores mollitia sunt cupiditate omnis. Labore dolores voluptate earum eos odit vel veritatis ut cum. Modi est dignissimos. Temporibus culpa voluptates quia dicta vel. Provident quo soluta enim corrupti laudantium voluptates blanditiis culpa. Totam sint enim dolorum deleniti hic doloribus in.\n \rQui voluptatem eaque voluptas quibusdam beatae et. Consectetur assumenda velit possimus placeat est. Nemo fugiat laborum. Sit qui id ad ipsa qui quia quam unde. Sapiente eius earum qui. Deserunt distinctio qui.\n \rQui rerum eos. Natus qui maiores esse quia distinctio aut voluptatem quaerat. Non est hic itaque ea corporis qui in rerum et. Doloribus adipisci temporibus soluta. Quibusdam voluptatem commodi qui.\n \rError repellendus dolores magnam impedit cupiditate mollitia eum sunt harum. Ut quia eos modi. Vel non eos. Inventore aperiam eaque voluptas. Et consequuntur ipsum at sunt sit natus iste ratione expedita. Delectus itaque architecto fugiat sed explicabo.\n \rEt quia culpa praesentium voluptatibus quisquam earum veritatis distinctio ab. Nulla necessitatibus perspiciatis odio. Quo nobis maiores rerum adipisci culpa hic harum. Sit suscipit quidem. Et et sunt qui quo.\n \rMolestiae sunt vero. Quam vero itaque. Recusandae consequatur id. Dolor nobis qui et illum.\n \rQui hic ducimus et reiciendis. Suscipit quaerat vitae in voluptas qui sed. Pariatur ipsa consequuntur beatae placeat aliquid ratione eum quas repudiandae. Quis consequatur sequi reprehenderit exercitationem aut eaque rerum et laborum. Dolores libero tempora aperiam quo commodi et.\n \rImpedit veritatis consectetur corrupti nisi et quidem quia aut. Repellat sapiente est nemo illo numquam qui esse ut. Qui id consectetur quis magnam aut ut enim repellendus. Aspernatur sunt unde accusamus. Quo sed corrupti eos ratione totam iste. Omnis qui adipisci aut nemo repellendus non quis.\n \rAt aut non quod voluptatem similique. Molestiae autem tempore occaecati vel repellendus. Omnis architecto et doloremque qui aut.\n \rEa non non corporis sapiente. Autem fuga laborum tempore natus necessitatibus mollitia aut. Magni nulla ut est qui delectus. Repellendus ut nisi et quia quisquam qui.",
                slug: "necati22222222",
                images: [
                    {
                        uid: "rc-upload-0higiy05yt",
                        name: "random-image.jpg",
                        url: "https://picsum.photos/800",
                        type: "image/jpeg",
                        size: 141940,
                    },
                ],
                createdAt: "2021-05-21T13:24:17.049Z",
                updatedAt: "2021-05-21T13:29:12.744Z",
                category: {
                    id: "3307dec1-af04-4dd4-a88a-d55fdfb26256",
                    title: "Australia Navigate Borders",
                    createdAt: "2021-05-21T13:24:17.229Z",
                    updatedAt: "2021-05-21T13:24:17.229Z",
                },
                user: {
                    id: "9712de46-3864-47b4-a6bd-592c6cf9a17f",
                    firstName: "Antonietta",
                    lastName: "Shanahan",
                    email: "antonietta.Shanahan68@hotmail.com",
                    status: true,
                    createdAt: "2021-05-21T13:24:16.291Z",
                    updatedAt: "2021-05-21T13:24:16.291Z",
                },
                tags: [
                    {
                        id: "8b6ede0f-4695-451e-a996-97762a93bf05",
                        title: "card",
                        createdAt: "2021-05-21T13:24:16.316Z",
                        updatedAt: "2021-05-21T13:24:16.316Z",
                    },
                    {
                        id: "26355cd8-ebf7-47d8-bc30-d01b5ebe4f84",
                        title: "rhode Island",
                        createdAt: "2021-05-21T13:24:16.368Z",
                        updatedAt: "2021-05-21T13:24:16.368Z",
                    },
                    {
                        id: "74222c6d-fa8e-428e-9f65-f40a070c03e8",
                        title: "fantastic",
                        createdAt: "2021-05-21T13:24:16.460Z",
                        updatedAt: "2021-05-21T13:24:16.460Z",
                    },
                ],
            },
        });
    };

    React.useEffect(() => {
        if (isSuccess) {
            setSelectedRowKeys([]);
        }
    }, [isSuccess]);

    const onSelectChange = (selectedRowKeys: (string | number)[]) => {
        console.log({ selectedRowKeys });
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };

    const hasSelected = selectedRowKeys.length > 0;

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
            <ImportButton
                mapData={(item) => {
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
                }}
                batchSize={null}
            />
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
            <div style={{ padding: "16px 8px" }}>
                <Button
                    type="primary"
                    onClick={deleteSelectedItems}
                    disabled={!hasSelected}
                    loading={deleteManyIsLoading}
                >
                    {translate("common:resources.posts.deleteMany")}
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected
                        ? `Selected ${selectedRowKeys.length} items`
                        : ""}
                </span>
            </div>
            <Table<IPost>
                {...tableProps}
                rowSelection={rowSelection}
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
                    sorter={{
                        multiple: 1,
                    }}
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                />
                {/*  <Table.Column
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
                                    data?.data.find((item) => item.id === value)
                                        ?.title
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
                /> */}
                {/*  <Table.Column
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
            */}

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
    } = useStepsForm({
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
        queryResult,
    } = useStepsForm<IPost>({
        warnWhenUnsavedChanges: true,
        redirect: "list",
        mutationMode: "pessimistic",
    });

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect({
        resource: "categories",
        defaultValue: postData?.category.id,
    });

    const { selectProps: userSelectProps } = useSelect({
        resource: "users",
        optionLabel: "email",
        defaultValue: postData?.user.id,
    });

    const { selectProps: tagsSelectProps } = useSelect({
        resource: "tags",
        // TODO: tag interface
        defaultValue: postData?.tags.map((tag: { id: string }) => tag.id),
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
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show {...props} isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>

            <Title level={5}>Content</Title>
            <MarkdownField value={record?.content}></MarkdownField>
        </Show>
    );
};
