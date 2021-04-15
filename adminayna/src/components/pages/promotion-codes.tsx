import * as React from "react";

import {
    List,
    Create,
    Edit,
    Show,
    Form,
    TextField,
    BooleanField,
    Input,
    MarkdownField,
    Table,
    useTable,
    Space,
    EditButton,
    DeleteButton,
    CreateButton,
    ExportButton,
    DateField,
    useForm,
    Switch,
    IResourceComponentsProps,
    Select,
    useSelect,
} from "readmin";

import "react-mde/lib/styles/css/react-mde-all.css";

export const PromotionCodesList = (props: IResourceComponentsProps) => {
    const { tableProps, sorter, filters } = useTable({});

    const Actions = () => (
        <Space direction="horizontal">
            <ExportButton
                sorter={sorter}
                filters={filters}
                pageSize={100}
                maxItemCount={300}
                mapData={(item) => {
                    return {
                        id: item.id,
                        title: item.title,
                        slug: item.slug,
                        content: item.content,
                        status: item.status,
                    };
                }}
            />
            <CreateButton />
        </Space>
    );

    return (
        <List {...props} actionButtons={<Actions />}>
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
                    dataIndex="code"
                    title="Code"
                    key="code"
                    render={(value) => <TextField value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                />
                <Table.Column
                    dataIndex="status"
                    title="Status"
                    key="status"
                    render={(value) => <TextField value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                />

                <Table.Column
                    dataIndex="prize"
                    title="Prize Text"
                    key="prize"
                    render={(value) => <TextField value={value?.text ?? ""} />}
                    sorter={{
                        multiple: 1,
                    }}
                />

                <Table.Column
                    title={"Actions"}
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
                                mutationMode="optimistic"
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

export const PromotionCodesCreate = (props: IResourceComponentsProps) => {
    const { formProps, saveButtonProps } = useForm({});
    const prizesIdSelectProps = useSelect({
        resource: "prizes",
        optionLabel: "text",
    });

    const statusOptions = [
        {
            label: "Ready",
            value: "ready",
        },
        {
            label: "Waiting",
            value: "waiting",
        },
        {
            label: "Consumed",
            value: "consumed",
        },
    ];

    return (
        <Create {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
                <Form.Item
                    label="Code"
                    name="code"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select options={statusOptions} />
                </Form.Item>
                <Form.Item
                    label="Prize"
                    name={["prize", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...prizesIdSelectProps} />
                </Form.Item>
            </Form>
        </Create>
    );
};

export const PromotionCodesEdit = (props: IResourceComponentsProps) => {
    const { formProps, saveButtonProps } = useForm({});
    const prizesIdSelectProps = useSelect({
        resource: "prizes",
        optionLabel: "text",
    });

    const statusOptions = [
        {
            label: "Ready",
            value: "ready",
        },
        {
            label: "Waiting",
            value: "waiting",
        },
        {
            label: "Consumed",
            value: "consumed",
        },
    ];

    return (
        <Edit {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
                <Form.Item
                    label="Code"
                    name="code"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select options={statusOptions} />
                </Form.Item>
                <Form.Item
                    label="Prize"
                    name={["prize", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...prizesIdSelectProps} />
                </Form.Item>
            </Form>
        </Edit>
    );
};

export const PostShow = (props: any) => {
    return (
        <Show {...props}>
            {/* <ShowSimple title="Post Title">
                <TextField renderRecordKey="id" />
                <TextField renderRecordKey="title" />
                <MarkdownField renderRecordKey="content" />
            </ShowSimple> */}
        </Show>
    );
};
