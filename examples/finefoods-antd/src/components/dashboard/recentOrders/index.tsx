import { useNavigation } from "@refinedev/core";
import { NumberField, useTable } from "@refinedev/antd";
import { Typography, Table, theme, Space } from "antd";

import { OrderActions } from "../../../components";

import { IOrder } from "../../../interfaces";
import { useConfigProvider } from "../../../context";
import { useStyles } from "./styled";

export const RecentOrders: React.FC = () => {
    const { token } = theme.useToken();
    const { mode } = useConfigProvider();
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
                        <Space size={0} direction="vertical">
                            <Typography.Text
                                style={{
                                    fontSize: 14,
                                }}
                            >
                                {record?.user?.firstName}{" "}
                                {record?.user?.lastName}
                            </Typography.Text>
                            <Typography.Text
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

                    // unique products with count
                    const uniqueProducts = products.reduce((acc, product) => {
                        if (!acc[product.id]) {
                            acc[product.id] = {
                                ...product,
                                count: 1,
                            };
                        } else {
                            acc[product.id].count += 1;
                        }
                        return acc;
                    }, {} as Record<string, IOrder["products"][number] & { count: number }>);

                    return (
                        <Space size={0} direction="vertical">
                            {Object.values(uniqueProducts).map((product) => (
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
                render={(_, record) => (
                    <div className={styles.actions}>
                        <OrderActions record={record} />
                    </div>
                )}
            />
        </Table>
    );
};
