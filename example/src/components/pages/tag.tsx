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
    AntdTable,
    useTranslate,
} from "readmin";

export const TagList = (props: any) => {
    const translate = useTranslate();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);

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
            AntdTable.SELECTION_ALL,
            AntdTable.SELECTION_INVERT,
            AntdTable.SELECTION_NONE,
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
                rowSelection={rowSelection}
                rowKey="id"
                pagination={{
                    pageSize: 20,
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
            </Table>
        </List>
    );
};

export const TagCreate = (props: any) => {
    const translate = useTranslate();

    const { Panel } = Collapse;

    return (
        <Create {...props}>
            <Form wrapperCol={{ span: 14 }} layout="vertical">
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

    const { Panel } = Collapse;

    return (
        <Edit {...props}>
            <Form wrapperCol={{ span: 14 }} layout="vertical">
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
