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
    Typography,
    useShow,
    ShowButton,
    Select,
} from "readmin";

const { Title, Text } = Typography;

export const UsersList = (props: IResourceComponentsProps) => {
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
                    dataIndex="username"
                    title="Username"
                    key="username"
                    render={(value) => <TextField value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                />

                <Table.Column
                    dataIndex="role"
                    title="Role"
                    key="role"
                    render={(value) => <TextField value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                />

                <Table.Column
                    dataIndex="isActive"
                    title="Active"
                    key="isActive"
                    render={(value) => <BooleanField value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title="Created At"
                    key="createdAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                />
                <Table.Column
                    dataIndex="updatedAt"
                    title="Updated At"
                    key="updatedAt"
                    render={(value) => <DateField format="LLL" value={value} />}
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
                                mutationMode="undoable"
                            />
                            <ShowButton size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

export const UsersCreate = (props: IResourceComponentsProps) => {
    const { formProps, saveButtonProps } = useForm({});

    const rolesOptions = [
        {
            label: "Admin",
            value: "admin",
        },
        {
            label: "Super Admin",
            value: "super-admin",
        },
        {
            label: "Editor",
            value: "editor",
        },
    ];

    return (
        <Create {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Role"
                    name="role"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select options={rolesOptions} />
                </Form.Item>
                <Form.Item
                    label="IsActive"
                    name="isActive"
                    valuePropName="checked"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Switch />
                </Form.Item>
            </Form>
        </Create>
    );
};

export const UsersEdit = (props: IResourceComponentsProps) => {
    const { formProps, saveButtonProps } = useForm({});

    return (
        <Edit {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Role"
                    name="role"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="IsActive"
                    name="isActive"
                    valuePropName="checked"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Switch />
                </Form.Item>
            </Form>
        </Edit>
    );
};

export const UsersShow = (props: IResourceComponentsProps) => {
    const {
        queryResult: { data, isLoading },
    } = useShow({});
    const record = data?.data;

    return (
        <Show {...props} isLoading={isLoading}>
            <Title level={5}>Username</Title>
            <Text>{record?.username}</Text>

            <Title level={5}>Role</Title>
            <Text>{record?.role}</Text>

            <Title level={5}>Active</Title>
            <BooleanField value={record?.isActive} />
        </Show>
    );
};
