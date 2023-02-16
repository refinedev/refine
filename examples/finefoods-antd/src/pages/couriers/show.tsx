import {
    useTranslate,
    IResourceComponentsProps,
    useShow,
    useNavigation,
    HttpError,
} from "@pankod/refine-core";

import {
    List,
    Table,
    useTable,
    Card,
    Icons,
    Button,
    Space,
    Row,
    Col,
    Grid,
    Typography,
    Rate,
    Avatar,
} from "@pankod/refine-antd";

import { ICourier, IOrder, IOrderFilterVariables } from "interfaces";

const { useBreakpoint } = Grid;

export const CourierShow: React.FC<IResourceComponentsProps> = () => {
    const { xl } = useBreakpoint();
    const { queryResult: courierQueryResult } = useShow<ICourier>();
    const courier = courierQueryResult.data?.data;

    const { tableProps } = useTable<IOrder, HttpError, IOrderFilterVariables>({
        resource: "reviews",
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
        permanentFilter: [
            {
                field: "order.courier.id",
                operator: "eq",
                value: courier?.id,
            },
        ],
        initialPageSize: 4,
        queryOptions: {
            enabled: courier !== undefined,
        },
        syncWithLocation: false,
    });

    const t = useTranslate();
    const { show } = useNavigation();

    return (
        <Row gutter={[16, 16]}>
            <Col xl={6} lg={24} xs={24}>
                <Card bordered={false} style={{ height: "100%" }}>
                    <Space
                        direction="vertical"
                        style={{ width: "100%", height: "100%" }}
                    >
                        <Space
                            direction="vertical"
                            style={{ textAlign: "center", width: "100%" }}
                        >
                            <Avatar
                                size={120}
                                src={courier?.avatar?.[0].url}
                            ></Avatar>
                            <Typography.Title level={3}>
                                {courier?.name} {courier?.surname}
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
                                <Icons.EnvironmentOutlined />{" "}
                                {courier?.store.title}
                            </Typography.Text>
                            <Typography.Text>
                                <Icons.PhoneOutlined /> {courier?.gsm}
                            </Typography.Text>
                            <Typography.Text>
                                <Icons.MailOutlined /> {courier?.email}
                            </Typography.Text>
                            <Typography.Text>
                                <Icons.BankOutlined /> {courier?.accountNumber}
                            </Typography.Text>
                            <Typography.Text>
                                <Icons.HomeOutlined /> {courier?.address}
                            </Typography.Text>
                            <Typography.Text>
                                <Icons.CarOutlined /> {courier?.licensePlate}
                            </Typography.Text>
                        </Space>
                    </Space>
                </Card>
            </Col>
            <Col xl={18} xs={24}>
                <List
                    title={t("reviews.reviews")}
                    headerProps={{
                        extra: <></>,
                    }}
                >
                    <Table {...tableProps} rowKey="id">
                        <Table.Column
                            dataIndex={["order", "id"]}
                            title={t("reviews.fields.orderId")}
                            render={(value) => (
                                <Button
                                    onClick={() => {
                                        show("orders", value);
                                    }}
                                    type="text"
                                >
                                    #{value}
                                </Button>
                            )}
                        />
                        <Table.Column
                            width={250}
                            dataIndex="comment"
                            title={t("reviews.fields.review")}
                        />
                        <Table.Column
                            dataIndex="star"
                            title={t("reviews.fields.rating")}
                            align="center"
                            render={(value) => (
                                <Space
                                    direction="vertical"
                                    style={{
                                        rowGap: 0,
                                    }}
                                >
                                    <Typography.Text
                                        style={{
                                            fontSize: 31,
                                            fontWeight: 800,
                                        }}
                                    >
                                        {value}
                                    </Typography.Text>
                                    <Rate
                                        character={<Icons.StarOutlined />}
                                        disabled
                                        value={value}
                                        style={{
                                            color: "#FA8C16",
                                        }}
                                    />
                                </Space>
                            )}
                        />
                    </Table>
                </List>
            </Col>
        </Row>
    );
};
