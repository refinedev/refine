import * as React from "react";
import {
    List,
    Table,
    useTranslate,
    DeleteButton,
    EditButton,
    Space,
    useTable,
    useForm,
    Create,
    Form,
    Input,
    getDefaultSortOrder,
    Edit,
    IResourceComponentsProps,
} from "@pankod/refine";

export interface ITags {
    title: string;
}

export const TagsList: React.FC<IResourceComponentsProps> = (props) => {
    const translate = useTranslate();
    const { tableProps, sorter } = useTable<ITags>({
        initialSorter: [
            {
                field: "title",
                order: "asc",
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

export const TagsCreate: React.FC<IResourceComponentsProps>  = (props) => {
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

export const TagsEdit: React.FC<IResourceComponentsProps>  = (props) => {
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
