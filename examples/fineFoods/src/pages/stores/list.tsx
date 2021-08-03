import {
    List,
    Table,
    useTable,
    useTranslate,
    IResourceComponentsProps,
    DateField,
    Dropdown,
    BooleanField,
    Menu,
    Icons,
    Avatar,
} from "@pankod/refine";

import { IStore } from "interfaces";

export const StoreList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IStore>();

    const t = useTranslate();

    const moreMenu = () => (
        <Menu mode="vertical">
            <Menu.Item
                key="1"
                style={{
                    fontSize: 15,
                    fontWeight: 500,
                }}
                icon={<Icons.EditOutlined />}
            >
                {t("common:buttons.edit")}
            </Menu.Item>
            <Menu.Item
                key="2"
                style={{
                    fontSize: 15,
                    fontWeight: 500,
                }}
                icon={<Icons.EditOutlined />}
            >
                {t("stores:buttons.editProducts")}
            </Menu.Item>
        </Menu>
    );

    return (
        <List title={t("stores:title")}>
            <Table
                {...tableProps}
                rowKey="id"
                scroll={{
                    x: true,
                }}
            >
                <Table.Column
                    key="image"
                    title={t("stores:fields.image")}
                    align="center"
                    render={() => (
                        <Avatar
                            src="/images/default-store-img.png"
                            alt="Default Store Image"
                            size={64}
                        />
                    )}
                />
                <Table.Column
                    dataIndex="title"
                    title={t("stores:fields.title")}
                />
                <Table.Column
                    dataIndex="id"
                    align="center"
                    title={t("stores:fields.id")}
                />
                <Table.Column
                    dataIndex="isActive"
                    title={t("stores:fields.isActive")}
                    align="center"
                    render={(value) => <BooleanField value={value} />}
                />
                <Table.Column
                    dataIndex={["address", "text"]}
                    title={t("stores:fields.address")}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title={t("stores:fields.createdAt")}
                    render={(value) => <DateField value={value} format="LLL" />}
                    sorter
                />
                <Table.Column<IStore>
                    fixed="right"
                    title={t("common:table.actions")}
                    dataIndex="actions"
                    key="actions"
                    align="center"
                    render={() => (
                        <Dropdown overlay={moreMenu()} trigger={["click"]}>
                            <Icons.MoreOutlined
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
