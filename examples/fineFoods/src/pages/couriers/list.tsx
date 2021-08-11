import {
    List,
    Table,
    Avatar,
    useTable,
    useTranslate,
    IResourceComponentsProps,
    Dropdown,
    Menu,
    Icons,
    Space,
    useDelete,
    useNavigation,
    Typography,
} from "@pankod/refine";

import { ICourier } from "interfaces";

export const CourierList: React.FC<IResourceComponentsProps> = () => {
    const { show, edit } = useNavigation();
    const t = useTranslate();

    const { tableProps } = useTable<ICourier>({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
    });

    const { mutate: mutateDelete } = useDelete();

    const moreMenu = (id: string) => (
        <Menu
            mode="vertical"
            onClick={({ domEvent }) => domEvent.stopPropagation()}
        >
            <Menu.Item
                key="accept"
                style={{
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                }}
                icon={
                    <Icons.EditOutlined
                        style={{
                            color: "#52c41a",
                            fontSize: 17,
                            fontWeight: 500,
                        }}
                    />
                }
                onClick={() => {
                    edit("couriers", id);
                }}
            >
                {t("common:buttons.edit")}
            </Menu.Item>
            <Menu.Item
                key="reject"
                style={{
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                }}
                icon={
                    <Icons.CloseCircleOutlined
                        style={{
                            color: "#EE2A1E",
                            fontSize: 17,
                        }}
                    />
                }
                onClick={() => {
                    mutateDelete({
                        resource: "couriers",
                        id,
                        mutationMode: "undoable",
                    });
                }}
            >
                {t("common:buttons.delete")}
            </Menu.Item>
        </Menu>
    );

    return (
        <List
            createButtonProps={{
                children: t("common:buttons.add").toUpperCase(),
            }}
            title={t("couriers:title")}
        >
            {/* <Drawer {...editDrawerProps} width={600}>
                <Edit
                    saveButtonProps={editSaveButtonProps}
                    deleteButtonProps={deleteButtonProps}
                    recordItemId={editId}
                >
                    <Form {...editFormProps} layout="vertical">
                        <Form.Item
                            label={t("couriers:fields.name")}
                            name="name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={t("couriers:fields.surname")}
                            name="surname"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={t("couriers:fields.gsm")}
                            name="gsm"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={t("couriers:fields.gender")}
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                options={[
                                    {
                                        label: "Male",
                                        value: "Male",
                                    },
                                    {
                                        label: "Female",
                                        value: "Female",
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label={t("couriers:fields.isActive")}
                            name="isActive"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            valuePropName="checked"
                        >
                            <Checkbox value={true}>
                                {t("couriers:fields.isActive")}
                            </Checkbox>
                        </Form.Item>
                        <Form.Item label={t("couriers:fields.avatar.label")}>
                            <Form.Item
                                name="avatar"
                                valuePropName="fileList"
                                getValueFromEvent={getValueFromEvent}
                                noStyle
                            >
                                <Upload.Dragger
                                    name="file"
                                    action={`${apiUrl}/media/upload`}
                                    listType="picture"
                                    maxCount={5}
                                    multiple
                                >
                                    <p className="ant-upload-text">
                                        {t(
                                            "couriers:fields:avatar.description",
                                        )}
                                    </p>
                                </Upload.Dragger>
                            </Form.Item>
                        </Form.Item>
                    </Form>
                </Edit>
            </Drawer> */}

            <Table
                {...tableProps}
                rowKey="id"
                scroll={{
                    x: true,
                }}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            show("couriers", record.id);
                        },
                    };
                }}
            >
                <Table.Column
                    key="name"
                    title={t("couriers:fields.name")}
                    render={(record) => (
                        <Space>
                            <Avatar size={74} src={record.avatar?.[0].url} />
                            <Typography.Text>
                                {record.name} {record.surname}
                            </Typography.Text>
                        </Space>
                    )}
                />
                <Table.Column
                    dataIndex="gsm"
                    title={t("couriers:fields.gsm")}
                />
                <Table.Column
                    dataIndex="email"
                    title={t("couriers:fields.email")}
                />
                <Table.Column
                    dataIndex="address"
                    title={t("couriers:fields.address")}
                />
                <Table.Column<ICourier>
                    fixed="right"
                    title={t("common:table.actions")}
                    dataIndex="actions"
                    key="actions"
                    render={(_, record) => (
                        <Dropdown
                            overlay={moreMenu(record.id)}
                            trigger={["click"]}
                        >
                            <Icons.MoreOutlined
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    fontSize: 24,
                                }}
                            />
                        </Dropdown>
                    )}
                />
            </Table>
        </List>
    );
};
