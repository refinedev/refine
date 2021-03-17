import * as React from "react";
import {
    List,
    Table,
    Create,
    Edit,
    Form,
    Column,
    Input,
    useTranslate,
    DeleteButton,
    Button,
    EditButton,
    Space,
    useForm,
    useEditableTable,
    TextField,
} from "readmin";

export const CategoryList = (props: { resourceName: string }) => {
    const translate = useTranslate();
    const {
        tableProps,
        formProps,
        isEditing,
        saveEditButtonProps,
        editButtonProps,
        cancelButtonProps,
    } = useEditableTable({
        mutationModeProp: "undoable",
        initialPageSize: 10,
    })
    return (
        <List {...props}>
            <Form {...formProps}>
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
                        key="id"
                        dataIndex="id"
                        title={translate("common:resources.categories.fields.id")}
                    />
                    <Column
                        key="title"
                        dataIndex="title"
                        title={translate(
                            "common:resources.categories.fields.title",
                        )}
                        render={(value, record) => {
                            if (isEditing(record.id)) {
                                return (
                                    <Form.Item
                                        name="title"
                                        style={{ margin: 0 }}
                                    >
                                        <Input />
                                    </Form.Item>
                                );
                            }
                            return <TextField value={value} />;
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
                        ): React.ReactNode => {
                            if (isEditing(record.id)) {
                                return (
                                    <Space>
                                        <Button
                                            {...saveEditButtonProps}
                                            size="small"
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            {...cancelButtonProps}
                                            size="small"
                                        >
                                            Cancel
                                        </Button>
                                    </Space>
                                );
                            }
                            return (
                                <Space>
                                    <EditButton
                                        {...editButtonProps(record.id)}
                                        size="small"
                                    />
                                    <DeleteButton
                                        size="small"
                                        recordItemId={record.id}
                                    />
                                </Space>
                            );
                        }}
                    />
                </Table>
            </Form>
        </List>
    );
};

export const CategoryCreate = (props: any) => {
    const translate = useTranslate();

    const { formProps, saveButtonProps } = useForm({});

    return (
        <Create {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
                <Form.Item
                    label={translate("common:resources.categories.forms.title")}
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

export const CategoryEdit = (props: any) => {
    const translate = useTranslate();

    const { formProps, saveButtonProps } = useForm({});

    return (
        <Edit {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
                <Form.Item
                    label={translate("common:resources.categories.forms.title")}
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
