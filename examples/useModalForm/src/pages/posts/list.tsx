import React, { useState } from "react";
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
    EditButton,
    ShowButton,
    useTable,
    useShow,
    useModalForm,
    IResourceComponentsProps,
} from "@pankod/refine";

import { IPost } from "interfaces";

const { Title, Text } = Typography;

export const PostList: React.FC<IResourceComponentsProps> = () => {
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
    const [visibleShowModal, setVisibleShowModal] = useState<boolean>(false);

    const { queryResult, showId, setShowId } = useShow<IPost>();

    const { data: showQueryResult, isLoading: showIsLoading } = queryResult;
    const record = showQueryResult?.data;

    return (
        <>
            <List
                createButtonProps={{
                    onClick: () => {
                        createModalShow();
                    },
                }}
            >
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="id" title="ID" />
                    <Table.Column dataIndex="title" title="Title" />
                    <Table.Column<IPost>
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        render={(_, record) => (
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
            <Modal {...createModalProps} footer={null} width={1000}>
                <Create
                    saveButtonProps={createSaveButtonProps}
                    pageHeaderProps={{
                        backIcon: false,
                    }}
                >
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
                                    {
                                        label: "Rejected",
                                        value: "rejected",
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Form>
                </Create>
            </Modal>
            <Modal {...editModalProps} footer={null} width={1000}>
                <Edit
                    recordItemId={editId}
                    saveButtonProps={{
                        ...editSaveButtonProps,
                        disabled: formLoading,
                    }}
                    deleteButtonProps={deleteButtonProps}
                    pageHeaderProps={{
                        backIcon: false,
                    }}
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
                                    {
                                        label: "Rejected",
                                        value: "rejected",
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
                width={1000}
            >
                <Show
                    isLoading={showIsLoading}
                    recordItemId={showId}
                    pageHeaderProps={{
                        backIcon: false,
                    }}
                >
                    <Title level={5}>Id</Title>
                    <Text>{record?.id}</Text>

                    <Title level={5}>Status</Title>
                    <Text>{record?.status}</Text>

                    <Title level={5}>Title</Title>
                    <Text>{record?.title}</Text>
                </Show>
            </Modal>
        </>
    );
};
