import {
    useTranslate,
    IResourceComponentsProps,
    useDelete,
    useNavigation,
} from "@pankod/refine-core";

import {
    List,
    Table,
    Avatar,
    useTable,
    Dropdown,
    Menu,
    Icons,
    Space,
    Typography,
} from "@pankod/refine-antd";

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

    const moreMenu = (id: number) => (
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
                {t("buttons.edit")}
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
                {t("buttons.delete")}
            </Menu.Item>
        </Menu>
    );

    return (
        <List>
            <Table
                {...tableProps}
                rowKey="id"
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
                    title={t("couriers.fields.name")}
                    render={(record) => (
                        <Space>
                            <Avatar size={74} src={record.avatar?.[0]?.url} />
                            <Typography.Text style={{ wordBreak: "inherit" }}>
                                {record.name} {record.surname}
                            </Typography.Text>
                        </Space>
                    )}
                />
                <Table.Column
                    dataIndex="gsm"
                    title={t("couriers.fields.gsm")}
                />
                <Table.Column
                    dataIndex="email"
                    title={t("couriers.fields.email")}
                />
                <Table.Column
                    dataIndex="address"
                    title={t("couriers.fields.address")}
                />
                <Table.Column<ICourier>
                    fixed="right"
                    title={t("table.actions")}
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
