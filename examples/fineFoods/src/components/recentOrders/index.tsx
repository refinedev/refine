import {
    Typography,
    useTranslate,
    useTable,
    Table,
    Avatar,
    Space,
    Tag,
    NumberField,
} from "@pankod/refine";

import { OrderActions } from "components";

import { IOrder } from "interfaces";

const { Text, Paragraph } = Typography;

export const RecentOrders: React.FC = () => {
    const { tableProps } = useTable<IOrder>({
        resource: "orders",
        initialSorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
        initialPageSize: 6,
        initialFilter: [
            {
                field: "status.text",
                operator: "eq",
                value: "Pending",
            },
        ],
    });

    console.log({ tableProps });
    return (
        <Table
            {...tableProps}
            showHeader={false}
            scroll={{
                x: true,
            }}
        >
            <Table.Column<IOrder>
                key="avatar"
                render={(_, record) => (
                    <Avatar
                        size={{
                            md: 60,
                            lg: 108,
                            xl: 108,
                            xxl: 108,
                        }}
                        src={record.products[0].images[0].url}
                    />
                )}
            />
            <Table.Column<IOrder>
                key="summary"
                render={(_, record) => (
                    <Space direction="vertical">
                        <Text strong>{record.products[0].name}</Text>
                        <Paragraph ellipsis={{ rows: 2, expandable: true }}>
                            {record.products[0].description}
                        </Paragraph>
                        <Text>#{record.orderNumber}</Text>
                    </Space>
                )}
            />
            <Table.Column<IOrder>
                key="summary"
                render={(_, record) => (
                    <Space direction="vertical">
                        <Text
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
                            options={{
                                currency: "USD",
                                style: "currency",
                                notation: "standard",
                            }}
                            value={value / 100}
                        />
                        <Tag color="orange">{record.status.text}</Tag>
                    </Space>
                )}
            />
            <Table.Column<IOrder>
                fixed="right"
                key="actions"
                align="center"
                render={(_value, record) => <OrderActions record={record} />}
            />
        </Table>
    );
};
