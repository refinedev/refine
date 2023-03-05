import {
    useShow,
    HttpError,
    IResourceComponentsProps,
    useTranslate,
} from "@refinedev/core";

import {
    useTable,
    List,
    TextField,
    getDefaultSortOrder,
    NumberField,
    DateField,
} from "@refinedev/antd";

import {
    UserOutlined,
    PhoneOutlined,
    CalendarOutlined,
    CheckOutlined,
} from "@ant-design/icons";
import {
    Typography,
    Avatar,
    Row,
    Col,
    Card,
    Space,
    Table,
    Grid,
    Popover,
} from "antd";

import { OrderStatus } from "components";

import { IUser, IOrder, IOrderFilterVariables } from "interfaces";

const { useBreakpoint } = Grid;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const { xl } = useBreakpoint();
    const { queryResult } = useShow<IUser>();

    const { data } = queryResult;
    const user = data?.data;

    const { tableProps, sorter } = useTable<
        IOrder,
        HttpError,
        IOrderFilterVariables
    >({
        resource: "orders",
        initialSorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
        permanentFilter: [
            {
                field: "user.id",
                operator: "eq",
                value: user?.id,
            },
        ],
        initialPageSize: 4,
        queryOptions: {
            enabled: user !== undefined,
        },
        syncWithLocation: false,
    });

    return (
        <>
            <Row gutter={[16, 16]} style={{}}>
                <Col xl={6} lg={24} xs={24}>
                    <Card
                        bordered={false}
                        style={{
                            height: "100%",
                        }}
                    >
                        <Space
                            direction="vertical"
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "center",
                                    width: "100%",
                                }}
                            >
                                <Avatar
                                    size={120}
                                    src={user?.avatar?.[0].url}
                                ></Avatar>
                                <Typography.Title level={3}>
                                    {user?.firstName} {user?.lastName}
                                </Typography.Title>
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    width: "100%",
                                    textAlign: xl ? "unset" : "center",
                                }}
                            >
                                <Typography.Text>
                                    <UserOutlined />{" "}
                                    {t(`users.fields.gender.${user?.gender}`)}
                                </Typography.Text>
                                <Typography.Text>
                                    <PhoneOutlined /> {user?.gsm}
                                </Typography.Text>
                                <Typography.Text>
                                    <CalendarOutlined /> {user?.createdAt}
                                </Typography.Text>
                                <Typography.Text>
                                    <CheckOutlined />{" "}
                                    {user?.isActive
                                        ? t("users.fields.isActive.true")
                                        : t("users.fields.isActive.false")}
                                </Typography.Text>
                            </Space>
                        </Space>
                    </Card>
                </Col>
                <Col xl={18} xs={24}>
                    <List
                        title={t("orders.orders")}
                        headerProps={{
                            extra: <></>,
                        }}
                    >
                        <Table {...tableProps} rowKey="id">
                            <Table.Column
                                key="orderNumber"
                                dataIndex="orderNumber"
                                title={t("orders.fields.orderNumber")}
                                render={(value) => <TextField value={value} />}
                            />
                            <Table.Column
                                key="status.text"
                                dataIndex={["status", "text"]}
                                title={t("orders.fields.status")}
                                render={(value) => {
                                    return <OrderStatus status={value} />;
                                }}
                                defaultSortOrder={getDefaultSortOrder(
                                    "status",
                                    sorter,
                                )}
                                sorter
                            />
                            <Table.Column
                                align="right"
                                key="amount"
                                dataIndex="amount"
                                title={t("orders.fields.amount")}
                                defaultSortOrder={getDefaultSortOrder(
                                    "amount",
                                    sorter,
                                )}
                                sorter
                                render={(value) => {
                                    return (
                                        <NumberField
                                            options={{
                                                currency: "USD",
                                                style: "currency",
                                                notation: "compact",
                                            }}
                                            value={value}
                                        />
                                    );
                                }}
                            />
                            <Table.Column
                                key="store.id"
                                dataIndex={["store", "title"]}
                                title={t("orders.fields.store")}
                            />
                            <Table.Column
                                key="user.fullName"
                                dataIndex={["user", "fullName"]}
                                title={t("orders.fields.user")}
                            />
                            <Table.Column<IOrder>
                                key="products"
                                dataIndex="products"
                                title={t("orders.fields.products")}
                                render={(_, record) => (
                                    <Popover
                                        content={
                                            <ul>
                                                {record.products.map(
                                                    (product) => (
                                                        <li key={product.id}>
                                                            {product.name}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        }
                                        title="Products"
                                        trigger="hover"
                                    >
                                        {t("orders.fields.itemsAmount", {
                                            amount: record.products.length,
                                        })}
                                    </Popover>
                                )}
                            />
                            <Table.Column
                                key="createdAt"
                                dataIndex="createdAt"
                                title={t("orders.fields.createdAt")}
                                render={(value) => (
                                    <DateField value={value} format="LLL" />
                                )}
                                sorter
                                defaultSortOrder={getDefaultSortOrder(
                                    "createdAt",
                                    sorter,
                                )}
                            />
                        </Table>
                    </List>
                    <List
                        title={t("users.addresses.addresses")}
                        breadcrumb={null}
                        headerProps={{
                            extra: <></>,
                            style: {
                                marginTop: "1em",
                            },
                        }}
                    >
                        <Table pagination={false} dataSource={user?.addresses}>
                            <Table.Column
                                dataIndex="text"
                                title={t("users.addresses.address")}
                            />
                        </Table>
                    </List>
                </Col>
            </Row>
        </>
    );
};
