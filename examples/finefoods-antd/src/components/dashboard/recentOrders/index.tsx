import { useNavigation } from "@refinedev/core";
import { NumberField, useTable } from "@refinedev/antd";
import { Typography, Table, theme, Space } from "antd";

import { OrderActions } from "../../../components";

import { IOrder } from "../../../interfaces";
import { useStyles } from "./styled";
import { getUniqueListWithCount } from "../../../utils";

export const RecentOrders: React.FC = () => {
    const { token } = theme.useToken();
    const { styles } = useStyles();

    const { tableProps } = useTable<IOrder>({
        resource: "orders",
        initialSorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
        initialPageSize: 10,
        permanentFilter: [
            {
                field: "status.text",
                operator: "eq",
                value: "Pending",
            },
        ],
        syncWithLocation: false,
    });

    const { show } = useNavigation();

    return (
        <Table
            {...tableProps}
            pagination={{
                ...tableProps.pagination,
                hideOnSinglePage: true,
                showSizeChanger: false,
                className: styles.pagination,
            }}
            showHeader={false}
            rowKey="id"
        >
            <Table.Column<IOrder>
                dataIndex="orderNumber"
                className={styles.column}
                render={(orderId) => (
                    <Typography.Link
                        strong
                        onClick={() => show("orders", orderId)}
                        style={{
                            whiteSpace: "nowrap",
                            color: token.colorTextHeading,
                        }}
                    >
                        #{orderId}
                    </Typography.Link>
                )}
            />
            <Table.Column<IOrder>
                dataIndex="id"
                className={styles.column}
                render={(_, record) => {
                    return (
                        <Space
                            size={0}
                            direction="vertical"
                            style={{
                                maxWidth: 220,
                            }}
                        >
                            <Typography.Text
                                style={{
                                    fontSize: 14,
                                }}
                            >
                                {record?.user?.firstName}{" "}
                                {record?.user?.lastName}
                            </Typography.Text>
                            <Typography.Text
                                ellipsis
                                style={{
                                    fontSize: 12,
                                }}
                                type="secondary"
                            >
                                {record?.user?.addresses?.[0]?.text}
                            </Typography.Text>
                        </Space>
                    );
                }}
            />
            <Table.Column<IOrder>
                dataIndex="products"
                className={styles.column}
                render={(products: IOrder["products"]) => {
                    if (!products.length) {
                        return <Typography.Text>-</Typography.Text>;
                    }

                    const uniqueProducts = getUniqueListWithCount<
                        IOrder["products"][number]
                    >({ list: products, field: "id" });

                    return (
                        <Space size={0} direction="vertical">
                            {uniqueProducts.map((product) => (
                                <div key={product.id}>
                                    <Typography.Text>
                                        {product.name}{" "}
                                    </Typography.Text>
                                    <Typography.Text type="secondary">
                                        x{product.count}
                                    </Typography.Text>
                                </div>
                            ))}
                        </Space>
                    );
                }}
            />
            <Table.Column<IOrder>
                dataIndex="amount"
                className={styles.column}
                align="end"
                render={(amount) => {
                    return (
                        <NumberField
                            value={amount / 100}
                            style={{
                                whiteSpace: "nowrap",
                            }}
                            options={{
                                style: "currency",
                                currency: "USD",
                            }}
                        />
                    );
                }}
            />
            <Table.Column<IOrder>
                fixed="right"
                key="actions"
                className={styles.column}
                align="end"
                render={(_, record) => <OrderActions record={record} />}
            />
        </Table>
    );
};
