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
    Modal,
    Space,
    Typography,
    TextField,
    MarkdownField,
    useTable,
    useShow,
    useModalForm,
    EditButton,
    ShowButton,
    RefreshButton,
    IResourceComponentsProps,
} from "@pankod/refine";

import { IPost } from "../../interfaces";

const { Title, Text } = Typography;

export const PostList = (props: IResourceComponentsProps) => {
    const { tableProps } = useTable<IPost>();

    // Create Modal
    const {
        modalProps: createModalProps,
        formProps: createFormProps,
        saveButtonProps: createSaveButtonProps,
        show: createModalShow,
    } = useModalForm<IPost>({
        action: "create",
    });

    // Edit Modal
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

    // Show Modal
    const [visibleShowModal, setVisibleShowModal] = React.useState<boolean>(
        false,
    );

    const { queryResult, showId, setShowId } = useShow<IPost>();

    const { data: showQueryResult, isLoading: showIsLoading } = queryResult;
    const record = showQueryResult?.data;

    return (
        <>
            <List
                {...props}
                canCreate
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
                    </Form>
                </Create>
            </Modal>
            <Modal {...editModalProps} footer={null}>
                <Edit
                    {...props}
                    recordItemId={editId}
                    saveButtonProps={{
                        ...editSaveButtonProps,
                        disabled: formLoading,
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

                    <Title level={5}>Content</Title>
                    <MarkdownField
                        value={record?.content ?? "Cannot found content"}
                    />
                </Show>
            </Modal>
        </>
    );
};
