import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
    List,
    Table,
    Create,
    Edit,
    Show,
    Form,
    TextField,
    Input,
    ShowSimple,
    useFileUploadState,
    useTranslate,
    RichtextField,
    useTable,
    EditButton,
    ShowButton,
    Space,
    useForm,
    useModalForm,
    Modal,
} from "readmin";

export const LandingList = (props: any) => {
    const translate = useTranslate();
    const { isLoading } = useFileUploadState();
    const { tableProps } = useTable({
        initialPageSize: 20,
    });

    const {
        modalProps,
        formProps,
        saveButtonProps,
        show,
        close,
        editId,
        deleteButtonProps,
        formLoading,
    } = useModalForm({
        action: "edit",
        mutationMode: "pessimistic",
        warnWhenUnsavedChanges: true,
    });

    return (
        <>
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
                                    size="small"
                                    onClick={() => {
                                        show(record.id);
                                    }}
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
                    recordItemId={editId}
                    onModalClose={close}
                    saveButtonProps={{
                        ...saveButtonProps,
                        disabled: isLoading || formLoading,
                    }}
                    deleteButtonProps={deleteButtonProps}
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
                        <Form.Item
                            label={translate(
                                "common:resources.posts.fields.content",
                            )}
                            name="content"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            initialValue=""
                        >
                            <ReactQuill theme="snow" />
                        </Form.Item>
                    </Form>
                </Edit>
            </Modal>
        </>
    );
};

export const LandingCreate = (props: any) => {
    const translate = useTranslate();

    const { formProps, saveButtonProps } = useForm({
        submitOnEnter: false,
    });

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
                <Form.Item
                    label={translate("common:resources.posts.fields.content")}
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <ReactQuill theme="snow" />
                </Form.Item>
            </Form>
        </Create>
    );
};

export const LandingEdit = (props: any) => {
    const translate = useTranslate();
    const { isLoading } = useFileUploadState();
    const { formProps, saveButtonProps, formLoading } = useForm({
        submitOnEnter: false,
    });

    return (
        <Edit
            {...props}
            saveButtonProps={{
                ...saveButtonProps,
                disabled: isLoading || formLoading,
            }}
        >
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
                <Form.Item
                    label={translate("common:resources.posts.fields.content")}
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    initialValue=""
                >
                    <ReactQuill theme="snow" />
                </Form.Item>
            </Form>
        </Edit>
    );
};

export const LandingShow = (props: any) => {
    return (
        <Show {...props}>
            <ShowSimple title="Landing Title">
                <TextField renderRecordKey="id" />
                <TextField renderRecordKey="title" />
                <RichtextField renderRecordKey="content" />
            </ShowSimple>
        </Show>
    );
};
