import * as React from "react";
import {
    List,
    Table,
    useTranslate,
    Create,
    Form,
    Input,
    Edit,
    useTable,
    EditButton,
    DeleteButton,
    ShowButton,
    Space,
    useForm,
    useExport,
    Modal,
    useModalForm,
    ExportButton,
    CreateButton,
    CloneButton,
    IResourceComponentsProps,
} from "@pankod/refine";

export const PostLightList: React.FC<IResourceComponentsProps> = (props) => {
    const translate = useTranslate();
    const { tableProps, sorter, filters } = useTable({
        initialPageSize: 20,
    });

    const { modalProps, formProps, show } = useModalForm({
        action: "edit",
        mutationMode: "undoable",
    });

    const {
        modalProps: createModalProps,
        formProps: createFormProps,
        show: createModalShow,
    } = useModalForm({ action: "create" });

    const { triggerExport, loading } = useExport({
        sorter,
        filters,
        pageSize: 100,
        maxItemCount: 300,
        mapData: (item) => {
            return {
                id: item.id,
                title: item.title,
                slug: item.slug,
            };
        },
    });

    const actions = (
        <Space direction="horizontal">
            <ExportButton loading={loading} onClick={triggerExport} />
            <CreateButton onClick={() => createModalShow()} />
        </Space>
    );

    return (
        <>
            <List
                {...props}
                pageHeaderProps={{
                    extra: actions,
                }}
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
                        sorter={{
                            multiple: 1,
                        }}
                    />
                    <Table.Column
                        dataIndex="slug"
                        title={translate("common:resources.posts.fields.slug")}
                        key="slug"
                        sorter={{
                            multiple: 2,
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
                </Form>
            </Modal>
            <Modal {...createModalProps}>
                <Form
                    {...createFormProps}
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
                </Form>
            </Modal>
        </>
    );
};

export const PostLightCreate: React.FC<IResourceComponentsProps> = (
    props: any,
) => {
    const translate = useTranslate();

    const { formProps, saveButtonProps } = useForm();

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

    const { formProps, saveButtonProps } = useForm();

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
