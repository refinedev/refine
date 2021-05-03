import React from "react";
import {
    List,
    Create,
    Edit,
    Show,
    Table,
    Form,
    Select,
    Input,
    TextField,
    useTable,
    IResourceComponentsProps,
    Space,
    EditButton,
    ShowButton,
    useMany,
    useShow,
    useSelect,
    useModalForm,
    Modal,
    useOne,
    RefreshButton,
    Typography,
    MarkdownField,
} from "@pankod/refine";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IPost, ICategory } from "../../interfaces";

const { Title, Text } = Typography;

export const PostList = (props: IResourceComponentsProps) => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>("categories", categoryIds, {
        enabled: categoryIds.length > 0,
    });

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
        "write",
    );

    const [visibleShowModal, setVisibleShowModal] = React.useState<boolean>(
        false,
    );

    const {
        modalProps: createModalProps,
        formProps: createFormProps,
        saveButtonProps: createSaveButtonProps,
        show: createModalShow,
    } = useModalForm<IPost>({
        action: "create",
    });

    const {
        modalProps: editModalProps,
        formProps: editFormProps,
        saveButtonProps: editSaveButtonProps,
        show: editModalShow,
        editId,
        deleteButtonProps,
        formLoading,
    } = useModalForm<IPost>({
        action: "edit",
        warnWhenUnsavedChanges: true,
    });

    const { queryResult, showId, setShowId } = useShow<IPost>();

    const { data: showQueryResult, isLoading: showIsLoading } = queryResult;
    const record = showQueryResult?.data;

    const {
        data: categoryData,
        isLoading: categoryIsLoading,
    } = useOne<ICategory>("categories", record?.category.id ?? "", {
        enabled: !!record,
    });

    return (
        <>
            <List
                {...props}
                createButtonProps={{
                    onClick: () => {
                        createModalShow();
                    },
                }}
            >
                <Table {...tableProps} key="id">
                    <Table.Column
                        key="id"
                        dataIndex="id"
                        title="ID"
                        render={(value) => <TextField value={value} />}
                    />
                    <Table.Column
                        key="title"
                        dataIndex="title"
                        title="Title"
                        render={(value) => <TextField value={value} />}
                    />
                    <Table.Column
                        dataIndex={["category", "id"]}
                        key="category.id"
                        title="Category"
                        render={(value) => {
                            if (isLoading) {
                                return <TextField value="Loading..." />;
                            }

                            return (
                                <TextField
                                    value={
                                        data?.data.find(
                                            (item) => item.id === value,
                                        )?.title
                                    }
                                />
                            );
                        }}
                    />
                    <Table.Column<IPost>
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        render={(_value, record) => (
                            <Space>
                                <EditButton
                                    size="small"
                                    recordItemId={record.id}
                                    onClick={() => editModalShow(record.id)}
                                />
                                <ShowButton
                                    size="small"
                                    recordItemId={record.id}
                                    onClick={() => {
                                        setShowId(record.id);
                                        setVisibleShowModal(true);
                                    }}
                                />
                            </Space>
                        )}
                    />
                </Table>
            </List>
            <Modal {...createModalProps} footer={null}>
                <Create {...props} saveButtonProps={createSaveButtonProps}>
                    <Form {...createFormProps} layout="vertical">
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
                            label="Category"
                            name={["category", "id"]}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                showSearch
                                filterOption={false}
                                {...categorySelectProps}
                            />
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
                                options={[
                                    {
                                        label: "Published",
                                        value: "published",
                                    },
                                    {
                                        label: "Draft",
                                        value: "draft",
                                    },
                                ]}
                            />
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
                            <ReactMde
                                selectedTab={selectedTab}
                                onTabChange={setSelectedTab}
                                generateMarkdownPreview={(markdown) =>
                                    Promise.resolve(
                                        <ReactMarkdown>
                                            {markdown}
                                        </ReactMarkdown>,
                                    )
                                }
                            />
                        </Form.Item>
                    </Form>
                </Create>
            </Modal>
            <Modal {...editModalProps} footer={null}>
                <Edit
                    {...props}
                    recordItemId={editId}
                    saveButtonProps={{
                        ...editSaveButtonProps,
                        disabled: isLoading || formLoading,
                    }}
                    deleteButtonProps={deleteButtonProps}
                >
                    <Form {...editFormProps} layout="vertical">
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
                            label="Category"
                            name={["category", "id"]}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                showSearch
                                filterOption={false}
                                {...categorySelectProps}
                            />
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
                                options={[
                                    {
                                        label: "Published",
                                        value: "published",
                                    },
                                    {
                                        label: "Draft",
                                        value: "draft",
                                    },
                                ]}
                            />
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
                            <ReactMde
                                selectedTab={selectedTab}
                                onTabChange={setSelectedTab}
                                generateMarkdownPreview={(markdown) =>
                                    Promise.resolve(
                                        <ReactMarkdown>
                                            {markdown}
                                        </ReactMarkdown>,
                                    )
                                }
                            />
                        </Form.Item>
                    </Form>
                </Edit>
            </Modal>
            <Modal
                visible={visibleShowModal}
                onCancel={() => setVisibleShowModal(false)}
            >
                <Show
                    {...props}
                    isLoading={showIsLoading}
                    actionButtons={<RefreshButton recordItemId={showId} />}
                >
                    <Title level={5}>Id</Title>
                    <Text>{record?.id}</Text>

                    <Title level={5}>Title</Title>
                    <Text>{record?.title}</Text>

                    <Title level={5}>Category</Title>
                    <Text>
                        {categoryIsLoading
                            ? "Loading..."
                            : categoryData?.data.title}
                    </Text>

                    <Title level={5}>Content</Title>
                    <MarkdownField
                        value={record?.content ?? "Cannot found content"}
                    />
                </Show>
            </Modal>
        </>
    );
};
