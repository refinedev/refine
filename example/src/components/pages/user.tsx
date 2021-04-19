import * as React from "react";

import {
    List,
    Edit,
    Create,
    Show,
    Table,
    EmailField,
    TagField,
    Form,
    Input,
    useTranslate,
    useTable,
    EditButton,
    DeleteButton,
    ShowButton,
    Space,
    useForm,
    Radio,
    useShow,
    Typography,
    Row,
    Col,
} from "refinejs";

const { Title, Text } = Typography;

export const UserList = (props: any) => {
    const translate = useTranslate();
    const { tableProps } = useTable({
        initialPageSize: 20,
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
                scroll={{
                    x: true,
                }}
            >
                <Table.Column
                    key="firstName"
                    dataIndex="firstName"
                    title={translate("common:resources.users.fields.firstName")}
                />
                <Table.Column
                    key="lastName"
                    dataIndex="lastName"
                    title={translate("common:resources.users.fields.lastName")}
                />
                <Table.Column
                    key="email"
                    dataIndex="email"
                    title={translate("common:resources.users.fields.email")}
                    render={(value) => <EmailField value={value} />}
                />
                <Table.Column
                    dataIndex="status"
                    title={translate("common:resources.users.fields.status")}
                    key="status"
                    render={(value) => <TagField value={value} />}
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
                            <ShowButton size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

export const UserEdit = (props: any) => {
    const translate = useTranslate();
    const { formProps, saveButtonProps } = useForm({});
    return (
        <Edit {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
                <Form
                    {...formProps}
                    wrapperCol={{ span: 14 }}
                    layout="vertical"
                >
                    <Form.Item
                        label={translate(
                            "common:resources.users.fields.firstName",
                        )}
                        name="firstName"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={translate(
                            "common:resources.users.fields.lastName",
                        )}
                        name="lastName"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={translate("common:resources.users.fields.email")}
                        name="email"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={translate(
                            "common:resources.users.fields.status",
                        )}
                        name="status"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Radio.Group>
                            <Radio value={true}>Enable</Radio>
                            <Radio value={false}>Disable</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Form>
        </Edit>
    );
};

export const UserCreate = (props: any) => {
    const translate = useTranslate();
    const { formProps, saveButtonProps } = useForm({});

    return (
        <Create
            {...props}
            saveButtonProps={saveButtonProps}
            submitOnEnter={false}
        >
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
                <Form.Item
                    label={translate("common:resources.users.fields.firstName")}
                    name="firstName"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={translate("common:resources.users.fields.lastName")}
                    name="lastName"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={translate("common:resources.users.fields.email")}
                    name="email"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={translate("common:resources.users.fields.status")}
                    name="status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Radio.Group>
                        <Radio value={true}>Enable</Radio>
                        <Radio value={false}>Disable</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Create>
    );
};

export const UserShow = (props: any) => {
    const { queryResult } = useShow({});
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show {...props} isLoading={isLoading}>
            <Row>
                <Col span={8}>
                    <Title level={5}>First Name</Title>
                    <Text>{record?.firstName}</Text>
                </Col>
                <Col span={8}>
                    <Title level={5}>Last Name</Title>
                    <Text>{record?.lastName}</Text>
                </Col>
                <Col span={8}>
                    <Title level={5}>Email</Title>
                    <Text>{record?.email}</Text>
                </Col>
            </Row>
        </Show>
    );
};
