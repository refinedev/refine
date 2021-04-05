import * as React from "react";
import {
    List,
    Table,
    TextField,
    useTranslate,
    Create,
    Form,
    Input,
    Edit,
    Show,
    ShowSimple,
    useTable,
    EditButton,
    DeleteButton,
    ShowButton,
    Space,
    useForm,
    Modal,
    useModalForm,
    ExportButton,
    CreateButton,
    CloneButton,
} from "readmin";

export const PostLightList = (props: any) => {
    const translate = useTranslate();
    const { tableProps, sorter, filters } = useTable({
        initialPageSize: 20,
    });

    const {
        modalProps,
        formProps,
        saveButtonProps,
        show,
        deleteButtonProps,
        editId,
    } = useModalForm({
        action: "edit",
        mutationMode: "undoable",
    });

    const {
        modalProps: createModalProps,
        formProps: createFormProps,
        saveButtonProps: createSaveButtonProps,
        show: createModalShow,
    } = useModalForm({ action: "create" });

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
                    };
                }}
            />
            <CreateButton onClick={() => createModalShow()} />
        </Space>
    );

    return (
        <>
            <List
                {...props}
                isModalShown={createModalShow}
                actionButtons={actions}
            >
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
                        dataIndex="id"
                        title={translate("common:resources.posts.fields.id")}
                        key="id"
                        sorter={{
                            multiple: 3,
                        }}
                        defaultSortOrder="descend"
                    />
                    <Table.Column
                        dataIndex="title"
                        title={translate("common:resources.posts.fields.title")}
                        key="title"
                        render={(value) => <TextField value={value} />}
                        sorter={{
                            multiple: 1,
                        }}
                    />
                    <Table.Column
                        dataIndex="slug"
                        title={translate("common:resources.posts.fields.slug")}
                        key="slug"
                        render={(value) => <TextField value={value} />}
                        sorter={{
                            multiple: 2,
                        }}
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
                                <EditButton
                                    onClick={() => {
                                        show(record.id);
                                    }}
                                    size="small"
                                    recordItemId={record.id}
                                />
                                <DeleteButton
                                    size="small"
                                    recordItemId={record.id}
                                    mutationMode="undoable"
                                />
                                <ShowButton
                                    size="small"
                                    recordItemId={record.id}
                                />
                                <CloneButton
                                    onClick={() => {
                                        createModalShow(record.id);
                                    }}
                                />
                            </Space>
                        )}
                    />
                </Table>
            </List>
            <Modal {...modalProps} footer={null}>
                <Edit
                    {...props}
                    recordItemId={editId}
                    deleteButtonProps={deleteButtonProps}
                    saveButtonProps={saveButtonProps}
                >
                    <Form
                        {...formProps}
                        wrapperCol={{ span: 14 }}
                        layout="vertical"
                    >
                        <Form.Item
                            label={translate(
                                "common:resources.posts.fields.title",
                            )}
                            name="title"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Edit>
            </Modal>
            <Modal {...createModalProps} footer={null}>
                <Create {...props} saveButtonProps={createSaveButtonProps}>
                    <Form
                        {...createFormProps}
                        wrapperCol={{ span: 14 }}
                        layout="vertical"
                    >
                        <Form.Item
                            label={translate(
                                "common:resources.posts.fields.title",
                            )}
                            name="title"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Create>
            </Modal>
        </>
    );
};

export const PostLightCreate = (props: any) => {
    const translate = useTranslate();

    const { formProps, saveButtonProps } = useForm({});

    return (
        <Create {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
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
            </Form>
        </Create>
    );
};

export const PostLightEdit = (props: any) => {
    const translate = useTranslate();

    const { formProps, saveButtonProps } = useForm({});

    return (
        <Edit {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
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
            </Form>
        </Edit>
    );
};

export const PostLightShow = (props: any) => {
    return (
        <Show {...props}>
            <ShowSimple title="Post Title">
                <TextField renderRecordKey="title" />
            </ShowSimple>
        </Show>
    );
};
