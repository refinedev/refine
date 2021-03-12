import React, { useState } from "react";
import {
    List,
    Table,
    Create,
    Edit,
    Form,
    Column,
    ImageField,
    ReferenceField,
    Input,
    Button,
    Collapse,
    useTranslate,
    useTable,
    EditButton,
    DeleteButton,
    Space,
    useForm,
} from "readmin";

export const TagList = (props: any) => {
    const translate = useTranslate();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const { tableProps } = useTable({
        initialPageSize: 20,
    });

    const start = () => {
        setLoading(true);

        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

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
                <Column
                    key="id"
                    dataIndex="id"
                    title={translate("common:resources.tags.fields.id")}
                />
                <Column
                    key="title"
                    dataIndex="title"
                    title={translate("common:resources.tags.fields.title")}
                />
                <Column
                    key="id"
                    dataIndex="id"
                    title={translate("common:resources.tags.fields.image")}
                    render={(value) => (
                        <ReferenceField resource="images" value={value}>
                            <ImageField
                                renderRecordKey="url"
                                imageTitle="meow"
                                width={200}
                            />
                        </ReferenceField>
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

export const TagCreate = (props: any) => {
    const translate = useTranslate();
    const { formProps, createProps } = useForm({});

    const { Panel } = Collapse;

    return (
        <Create {...props} {...createProps}>
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

export const TagEdit = (props: any) => {
    const translate = useTranslate();
    const { formProps, saveButtonProps } = useForm({});

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
