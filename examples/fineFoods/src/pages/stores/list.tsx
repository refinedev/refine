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
    useNavigation,
    useModal,
    Modal,
    useShow,
} from "@pankod/refine";

import { IStore } from "interfaces";
import { ProductEdit } from "./";

export const StoreList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IStore>();
    const { edit } = useNavigation();
    const { modalProps, show } = useModal();

    const t = useTranslate();

    const { queryResult, setShowId } = useShow<IStore>();

    const { data: showQueryResult } = queryResult;
    const record = showQueryResult?.data;

    const moreMenu = (id: string) => (
        <Menu mode="vertical">
            <Menu.Item
                key="1"
                style={{
                    fontSize: 15,
                    fontWeight: 500,
                }}
                icon={<Icons.EditOutlined />}
                onClick={() => edit("stores", id)}
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
                onClick={() => {
                    show();
                    setShowId(id);
                }}
            >
                {t("stores:buttons.editProducts")}
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <List>
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
                        render={(value) => (
                            <DateField value={value} format="LLL" />
                        )}
                        sorter
                    />
                    <Table.Column<IStore>
                        fixed="right"
                        title={t("common:table.actions")}
                        dataIndex="actions"
                        key="actions"
                        align="center"
                        render={(_, record) => (
                            <Dropdown
                                overlay={moreMenu(record.id)}
                                trigger={["click"]}
                            >
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
            <Modal {...modalProps} width={1000} footer={null}>
                <ProductEdit record={record} />
            </Modal>
        </>
    );
};
