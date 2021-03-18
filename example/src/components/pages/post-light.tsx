import * as React from "react";
import {
    List,
    Table,
    Column,
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
} from "readmin";

export const PostLightList = (props: any) => {
    const translate = useTranslate();
    const { tableProps } = useTable({
        initialPageSize: 20,
    });

    const {
        modalProps,
        formProps,
        saveButtonProps,
        show,
        close,
    } = useModalForm({ action: "edit" });

    const {
        modalProps: createModalProps,
        formProps: createFormProps,
        saveButtonProps: createSaveButtonProps,
        show: createModalShow,
    } = useModalForm({ action: "create" });

    const [itemId, setItemId] = React.useState<string | number>();

    return (
        <>
            <List {...props} isModalShown={createModalShow}>
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
                                        setItemId(record.id);
                                    }}
                                    size="small"
                                    recordItemId={record.id}
                                />
                                <DeleteButton
                                    size="small"
                                    recordItemId={record.id}
                                />
                                <ShowButton
                                    size="small"
                                    recordItemId={record.id}
                                />
                            </Space>
                        )}
                    />
                </Table>
            </List>
            <Modal {...modalProps} footer={null}>
                <Edit
                    {...props}
                    recordItemId={itemId}
                    onModalClose={close}
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
