import { useTranslate, useUpdate } from "@pankod/refine-core";
import { Dropdown, Icons, Menu } from "@pankod/refine-antd";
import { IOrder } from "interfaces";

type OrderActionProps = {
    record: IOrder;
};

export const OrderActions: React.FC<OrderActionProps> = ({ record }) => {
    const t = useTranslate();
    const { mutate } = useUpdate();

    const moreMenu = (record: IOrder) => (
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
                disabled={record.status.text !== "Pending"}
                icon={
                    <Icons.CheckCircleOutlined
                        style={{
                            color: "#52c41a",
                            fontSize: 17,
                            fontWeight: 500,
                        }}
                    />
                }
                onClick={() => {
                    mutate({
                        resource: "orders",
                        id: record.id,
                        values: {
                            status: {
                                id: 2,
                                text: "Ready",
                            },
                        },
                    });
                }}
            >
                {t("buttons.accept")}
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
                disabled={
                    record.status.text === "Delivered" ||
                    record.status.text === "Cancelled"
                }
                onClick={() =>
                    mutate({
                        resource: "orders",
                        id: record.id,
                        values: {
                            status: {
                                id: 5,
                                text: "Cancelled",
                            },
                        },
                    })
                }
            >
                {t("buttons.reject")}
            </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={moreMenu(record)} trigger={["click"]}>
            <Icons.MoreOutlined
                onClick={(e) => e.stopPropagation()}
                style={{
                    fontSize: 24,
                }}
            />
        </Dropdown>
    );
};
