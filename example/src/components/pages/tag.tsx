import React, { useEffect, useState } from "react";
import {
    List,
    Table,
    Create,
    Edit,
    Form,
    Input,
    Button,
    Collapse,
    useTranslate,
    useTable,
    EditButton,
    DeleteButton,
    Space,
    useForm,
    useDeleteMany,
    IResourceComponentsProps,
} from "@pankod/refine";

export const TagList: React.FC<IResourceComponentsProps>  = (props) => {
    const translate = useTranslate();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const { tableProps } = useTable({
        initialPageSize: 20,
    });

    const { mutate, isSuccess, isLoading } = useDeleteMany("tags");

    const start = () => {
        console.log("selectedRowKeys", selectedRowKeys);
    };

    useEffect(() => {
        setSelectedRowKeys([]);
        setLoading(false);
    }, [isSuccess]);

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading]);

    const onSelectChange = (selectedRowKeys: any) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <List {...props}>
            <div style={{ padding: "16px 8px" }}>
                <Button
                    type="primary"
                    onClick={start}
                    disabled={!hasSelected}
                    loading={loading}
                >
                    {translate("common:resources.tags.reload")}
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected
                        ? `Selected ${selectedRowKeys.length} items`
                        : ""}
                </span>
            </div>
            <Table
                {...tableProps}
                rowSelection={rowSelection}
                rowKey="id"
                pagination={{
                    ...tableProps.pagination,
                    position: ["bottomCenter"],
                    size: "small",
                }}
            >
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title={translate("common:resources.tags.fields.id")}
                />
                <Table.Column
                    key="title"
                    dataIndex="title"
                    title={translate("common:resources.tags.fields.title")}
                />
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title={translate("common:resources.tags.fields.image")}
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

export const TagCreate: React.FC<IResourceComponentsProps> = (props) => {
    const translate = useTranslate();
    const { formProps, saveButtonProps } = useForm();

    const { Panel } = Collapse;

    return (
        <Create {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
                <Collapse accordion defaultActiveKey={["1"]}>
                    <Panel header="Detail" key="1">
                        <Form.Item
                            label={translate(
                                "common:resources.tags.fields.title",
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
                    </Panel>
                </Collapse>
            </Form>
        </Create>
    );
};

export const TagEdit: React.FC<IResourceComponentsProps> = (props) => {
    const translate = useTranslate();
    const { formProps, saveButtonProps } = useForm();

    const { Panel } = Collapse;

    return (
        <Edit {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
                <Collapse accordion defaultActiveKey={["1"]}>
                    <Panel header="Detail" key="1">
                        <Form.Item
                            label={translate(
                                "common:resources.tags.fields.title",
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
                    </Panel>
                </Collapse>
            </Form>
        </Edit>
    );
};
