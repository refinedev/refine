import { useNavigation, useTranslate } from "@pankod/refine-core";
import {
    Typography,
    useTable,
    Table,
    Avatar,
    Space,
    Tag,
    NumberField,
} from "@pankod/refine-antd";
import "./style.less";

import { OrderActions } from "components";

import { IOrder } from "interfaces";

const { Text, Paragraph } = Typography;

export const RecentOrders: React.FC = () => {
    const t = useTranslate();
    const { tableProps } = useTable<IOrder>({
        resource: "orders",
        initialSorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
        initialPageSize: 4,
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
            pagination={{ ...tableProps.pagination, simple: true }}
            showHeader={false}
            rowKey="id"
        >
            <Table.Column<IOrder>
                key="avatar"
                render={(_, record) => (
                    <Avatar
                        size={{
                            md: 60,
                            lg: 108,
                            xl: 132,
                            xxl: 144,
                        }}
                        src={record?.products[0]?.images[0].url}
                    />
                )}
            />
            <Table.Column<IOrder>
                className="recent-orders-col"
                key="summary"
                render={(_, record) => (
                    <div className="recent-orders-col__title">
                        <Text className="recent-orders-col__title--up" strong>
                            {record.products[0]?.name}
                        </Text>
                        <Paragraph
                            ellipsis={{
                                rows: 2,
                                tooltip: record.products[0]?.description,
                                symbol: <span>...</span>,
                            }}
                        >
                            {record.products[0]?.description}
                        </Paragraph>

                        <Text
                            strong
                            className="orderId"
                            onClick={() => {
                                show("orders", record.id);
                            }}
                        >
                            #{record.orderNumber}
                        </Text>
                    </div>
                )}
            />
            <Table.Column<IOrder>
                key="summary"
                className="recent-orders-col"
                render={(_, record) => (
                    <Space direction="vertical">
                        <Text
                            className="recent-orders-col__title--up"
                            strong
                        >{`${record.courier.name} ${record.courier.surname}`}</Text>
                        <Text>{record.adress.text}</Text>
                    </Space>
                )}
            />
            <Table.Column<IOrder>
                dataIndex="amount"
                render={(value, record) => (
                    <Space
                        size="large"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <NumberField
                            strong
                            className="recent-orders-col__title--up"
                            options={{
                                currency: "USD",
                                style: "currency",
                                notation: "standard",
                            }}
                            value={value / 100}
                        />
                        <Tag color="orange">
                            {t(`enum.orderStatuses.${record.status.text}`)}
                        </Tag>
                    </Space>
                )}
            />
            <Table.Column<IOrder>
                fixed="right"
                key="actions"
                align="center"
                render={(_, record) => <OrderActions record={record} />}
            />
        </Table>
    );
};
