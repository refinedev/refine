import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
    List,
    Table,
    Create,
    Edit,
    Form,
    Input,
    useFileUploadState,
    useTranslate,
    useTable,
    EditButton,
    ShowButton,
    Space,
    useForm,
    useModalForm,
    Modal,
    CloneButton,
    IResourceComponentsProps,
} from "@pankod/refine";

export const LandingList: React.FC<IResourceComponentsProps> = (props) => {
    const translate = useTranslate();
    const { tableProps } = useTable({
        initialPageSize: 20,
    });

    const { modalProps, formProps, show } = useModalForm({
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
                        sorter={{
                            multiple: 1,
                        }}
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
                                <CloneButton recordItemId={record.id} />
                            </Space>
                        )}
                    />
                </Table>
            </List>
            <Modal {...modalProps}>
                <Form
                    {...formProps}
                    wrapperCol={{ span: 14 }}
                    layout="vertical"
                >
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
            </Modal>
        </>
    );
};

export const LandingCreate: React.FC<IResourceComponentsProps> = (
    props: any,
) => {
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
                    initialValue=""
                >
                    <ReactQuill theme="snow" />
                </Form.Item>
            </Form>
        </Create>
    );
};

export const LandingEdit: React.FC<IResourceComponentsProps> = (props) => {
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
