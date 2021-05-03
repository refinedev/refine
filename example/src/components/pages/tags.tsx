import * as React from "react";
import {
    List,
    Table,
    useTranslate,
    DeleteButton,
    EditButton,
    Space,
    useTable,
    TextField,
    useForm,
    Create,
    Form,
    Input,
    getDefaultSortOrder,
    Edit,
} from "@pankod/refine";

export interface ITags {
    title: string;
}

export const TagsList = (props: any) => {
    const translate = useTranslate();
    const { tableProps, sorter } = useTable<ITags>({
        initialSorter: [
            {
                field: "title",
                order: "ascend",
            },
        ],
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
                <Table.Column
                    key="title"
                    dataIndex="title"
                    title={translate("common:resources.tags.fields.title")}
                    render={(value) => <TextField value={value} />}
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                    sorter
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
                            <EditButton size="small" recordItemId={record.id} />
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

export const TagsCreate = (props: any) => {
    const translate = useTranslate();

    const { formProps, saveButtonProps } = useForm<ITags>();

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

export const TagsEdit = (props: any) => {
    const translate = useTranslate();

    const { formProps, saveButtonProps } = useForm();

    return (
        <Edit {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
                <Form.Item
                    label={translate("common:resources.tags.forms.title")}
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
