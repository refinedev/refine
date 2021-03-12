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
    useTable,
    DeleteButton,
    Space,
    useForm,
} from "readmin";

export const CategoryList = (props: { resourceName: string }) => {
    const translate = useTranslate();
    const { tableProps } = useTable({
        initialPageSize: 10,
    });
    return (
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
                            <DeleteButton
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

export const CategoryCreate = (props: any) => {
    const translate = useTranslate();

    const { formProps, createProps } = useForm({});

    return (
        <Create {...props} {...createProps}>
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

    const { formProps, editProps } = useForm({});

    return (
        <Edit {...props} {...editProps}>
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
