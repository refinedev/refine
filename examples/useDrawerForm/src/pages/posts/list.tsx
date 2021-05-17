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
    Drawer,
    Space,
    Typography,
    TextField,
    MarkdownField,
    useTable,
    useShow,
    useDrawerForm,
    EditButton,
    ShowButton,
    RefreshButton,
    IResourceComponentsProps,
} from "@pankod/refine";

import { IPost } from "../../interfaces";

const { Title, Text } = Typography;

export const PostList = (props: IResourceComponentsProps) => {
    const { tableProps } = useTable<IPost>();

    // Create Drawer
    const {
        formProps: createFormProps,
        drawerProps: createDrawerProps,
        show: createDrawerShow,
        saveButtonProps: createSaveButtonProps,
    } = useDrawerForm<IPost>({
        action: "create",
    });

    // Edit Drawer
    const {
        formProps: editFormProps,
        drawerProps: editDrawerProps,
        show: editDrawerShow,
        saveButtonProps: editSaveButtonProps,
        deleteButtonProps,
        editId,
        formLoading,
    } = useDrawerForm<IPost>({
        action: "edit",
        warnWhenUnsavedChanges: true,
    });

    // Show Drawer
    const [visibleShowDrawer, setVisibleShowDrawer] = useState<boolean>(false);
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
                        createDrawerShow();
                    },
                }}
            >
                <Table {...tableProps} key="id">
                    <Table.Column key="id" dataIndex="id" title="ID" />
                    <Table.Column key="title" dataIndex="title" title="Title" />
                    <Table.Column<IPost>
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        render={(_value, record) => (
                            <Space>
                                <EditButton
                                    size="small"
                                    recordItemId={record.id}
                                    onClick={() => editDrawerShow(record.id)}
                                />
                                <ShowButton
                                    size="small"
                                    recordItemId={record.id}
                                    onClick={() => {
                                        setShowId(record.id);
                                        setVisibleShowDrawer(true);
                                    }}
                                />
                            </Space>
                        )}
                    />
                </Table>
            </List>
            <Drawer {...createDrawerProps}>
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
            </Drawer>
            <Drawer {...editDrawerProps}>
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
            </Drawer>
            <Drawer
                visible={visibleShowDrawer}
                onClose={() => setVisibleShowDrawer(false)}
                width="500"
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
            </Drawer>
        </>
    );
};
