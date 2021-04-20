import * as React from "react";

import {
    List,
    Edit,
    Create,
    Show,
    Table,
    Drawer,
    EmailField,
    TagField,
    Form,
    Input,
    useTranslate,
    useDrawerForm,
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
} from "@pankod/refine";

const { Title, Text } = Typography;

export const UserList = (props: any) => {
    const translate = useTranslate();
    const { tableProps } = useTable({
        initialPageSize: 20,
    });

    const {
        formProps,
        drawerProps,
        show,
        editId,
        deleteButtonProps,
        saveButtonProps,
    } = useDrawerForm({
        action: "edit",
    });

    const {
        formProps: createFormProps,
        drawerProps: createDrawerProps,
        show: createShow,
        saveButtonProps: createSaveButtonProps,
    } = useDrawerForm({
        action: "create",
    });

    return (
        <>
            <List
                {...props}
                canCreate
                createButtonProps={{
                    onClick: () => {
                        createShow();
                    },
                }}
            >
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
                        title={translate(
                            "common:resources.users.fields.firstName",
                        )}
                    />
                    <Table.Column
                        key="lastName"
                        dataIndex="lastName"
                        title={translate(
                            "common:resources.users.fields.lastName",
                        )}
                    />
                    <Table.Column
                        key="email"
                        dataIndex="email"
                        title={translate("common:resources.users.fields.email")}
                        render={(value) => <EmailField value={value} />}
                    />
                    <Table.Column
                        dataIndex="status"
                        title={translate(
                            "common:resources.users.fields.status",
                        )}
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
                                <EditButton
                                    size="small"
                                    onClick={() => {
                                        show(record.id);
                                    }}
                                    recordItemId={record.id}
                                />
                                <DeleteButton
                                    size="small"
                                    recordItemId={record.id}
                                />
                                <ShowButton
                                    size="small"
                                    recordItemId={record.id}
                                />
                            </Space>
                        )}
                    />
                </Table>
            </List>
            <Drawer {...drawerProps}>
                <Edit
                    {...props}
                    recordItemId={editId}
                    deleteButtonProps={deleteButtonProps}
                    saveButtonProps={saveButtonProps}
                >
                    <Form
                        {...formProps}
                        wrapperCol={{ span: 24 }}
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
                            label={translate(
                                "common:resources.users.fields.email",
                            )}
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
                </Edit>
            </Drawer>
            <Drawer {...createDrawerProps}>
                <Create {...props} saveButtonProps={createSaveButtonProps}>
                    <Form
                        {...createFormProps}
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
                            label={translate(
                                "common:resources.users.fields.email",
                            )}
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
                </Create>
            </Drawer>
        </>
    );
};
