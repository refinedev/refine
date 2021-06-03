import * as React from "react";
import {
    List,
    Table,
    Create,
    Edit,
    Form,
    Input,
    useTranslate,
    DeleteButton,
    Button,
    EditButton,
    SaveButton,
    Space,
    useForm,
    useEditableTable,
    IResourceComponentsProps,
    TextField,
    ExportButton,
    ImportButton,
    CreateButton,
    DateField,
    getDefaultSortOrder,
    HttpError,
} from "@pankod/refine";

export interface ICategory {
    id: string;
    title: string;
}

export const CategoryList: React.FC<IResourceComponentsProps> = (props) => {
    const translate = useTranslate();
    const {
        tableProps,
        sorter,
        filters,
        formProps,
        isEditing,
        saveButtonProps,
        editButtonProps,
        cancelButtonProps,
        setEditId,
    } = useEditableTable<ICategory, HttpError, ICategory>({
        initialSorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
    });

    const Actions: React.FC = () => (
        <Space direction="horizontal">
            <ExportButton
                sorter={sorter}
                filters={filters}
                pageSize={100}
                maxItemCount={300}
            />
            <ImportButton />
            <CreateButton />
        </Space>
    );

    return (
        <List
            {...props}
            pageHeaderProps={{
                extra: <Actions />,
            }}
        >
            <Form {...formProps}>
                <Table
                    {...tableProps}
                    rowKey="id"
                    pagination={{
                        ...tableProps.pagination,
                        position: ["bottomCenter"],
                        size: "small",
                    }}
                    onRow={(record) => ({
                        onClick: (event: any) => {
                            if (event.target.nodeName === "TD") {
                                setEditId && setEditId(record.id);
                            }
                        },
                    })}
                >
                    <Table.Column
                        key="title"
                        dataIndex="title"
                        title={translate(
                            "common:resources.categories.fields.title",
                        )}
                        render={(value, data: any) => {
                            if (isEditing(data.id)) {
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
                    <Table.Column
                        dataIndex="createdAt"
                        title={translate(
                            "common:resources.categories.fields.createdAt",
                        )}
                        key="createdAt"
                        render={(value) => (
                            <DateField format="LLL" value={value} />
                        )}
                        sorter={{
                            multiple: 1,
                        }}
                        defaultSortOrder={getDefaultSortOrder(
                            "createdAt",
                            sorter,
                        )}
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
                        ): React.ReactNode => {
                            if (isEditing(record.id)) {
                                return (
                                    <Space>
                                        <SaveButton
                                            {...saveButtonProps}
                                            size="small"
                                        />
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

export const CategoryCreate: React.FC<IResourceComponentsProps> = (props) => {
    const translate = useTranslate();

    const { formProps, saveButtonProps } = useForm<
        ICategory,
        HttpError,
        { title: string }
    >();

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

export const CategoryEdit: React.FC<IResourceComponentsProps> = (props) => {
    const translate = useTranslate();

    const { formProps, saveButtonProps } = useForm<
        ICategory,
        HttpError,
        { title: string }
    >();

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
