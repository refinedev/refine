import {
    useTranslate,
    IResourceComponentsProps,
    useNavigation,
    useShow,
} from "@pankod/refine-core";

import {
    List,
    Table,
    useTable,
    DateField,
    Dropdown,
    BooleanField,
    Menu,
    Icons,
    Avatar,
    useModal,
} from "@pankod/refine-antd";

const { FormOutlined } = Icons;

import { IStore } from "interfaces";
import { StoreProducts } from "components/store";

export const StoreList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IStore>();
    const { edit } = useNavigation();
    const { modalProps, show } = useModal();

    const t = useTranslate();

    const { queryResult, setShowId } = useShow<IStore>();

    const { data: showQueryResult } = queryResult;
    const record = showQueryResult?.data;

    const moreMenu = (id: number) => (
        <Menu mode="vertical">
            <Menu.Item
                key="1"
                style={{
                    fontSize: 15,
                    fontWeight: 500,
                }}
                icon={
                    <FormOutlined
                        style={{ color: "green", fontSize: "15px" }}
                    />
                }
                onClick={() => edit("stores", id)}
            >
                {t("buttons.edit")}
            </Menu.Item>
            <Menu.Item
                key="2"
                style={{
                    fontSize: 15,
                    fontWeight: 500,
                }}
                icon={
                    <FormOutlined
                        style={{ color: "green", fontSize: "15px" }}
                    />
                }
                onClick={() => {
                    show();
                    setShowId(id);
                }}
            >
                {t("stores.buttons.edit")}
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <List>
                <Table {...tableProps} rowKey="id">
                    <Table.Column
                        key="image"
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
                        dataIndex="id"
                        align="center"
                        title={t("stores.fields.id")}
                    />
                    <Table.Column
                        dataIndex="title"
                        title={t("stores.fields.title")}
                    />
                    <Table.Column
                        dataIndex="email"
                        title={t("stores.fields.email")}
                    />
                    <Table.Column
                        dataIndex="gsm"
                        title={t("stores.fields.gsm")}
                    />
                    <Table.Column
                        dataIndex={["address", "text"]}
                        title={t("stores.fields.address")}
                    />
                    <Table.Column
                        dataIndex="isActive"
                        title={t("stores.fields.isActive")}
                        align="center"
                        render={(value) => <BooleanField value={value} />}
                    />
                    <Table.Column
                        dataIndex="createdAt"
                        title={t("stores.fields.createdAt")}
                        render={(value) => (
                            <DateField value={value} format="LLL" />
                        )}
                        sorter
                    />
                    <Table.Column<IStore>
                        fixed="right"
                        title={t("table.actions")}
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
            {record && (
                <StoreProducts modalProps={modalProps} record={record} />
            )}
        </>
    );
};
