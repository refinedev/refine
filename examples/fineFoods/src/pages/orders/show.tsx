import {
    Row,
    Col,
    useShow,
    Show,
    Typography,
    NumberField,
    DateField,
    BooleanField,
    AntdList,
    Avatar,
    Timeline,
    Card,
    IResourceComponentsProps,
    useTranslate,
    Button,
    Icons,
    Space,
} from "@pankod/refine";
import dayjs from "dayjs";

import { OrderStatus } from "components";
import { IEvent, IOrder } from "interfaces";

const { Title, Text } = Typography;

export const OrderShow: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const { queryResult } = useShow<IOrder>();
    const { data, isFetching } = queryResult;
    const record = data?.data;

    const renderOrderSteps = () => {
        return (
            <Card>
                <Row justify="space-between">
                    <Col
                        span={12}
                        /* style={{ alignItems: "flex-end" }} */ order={1}
                    >
                        <Row align="middle" justify="space-between">
                            <Text style={{ fontSize: 24, fontWeight: 800 }}>
                                {t("orders:fields.orderID")}
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: 700 }}>
                                #{record?.orderNumber}
                            </Text>
                            <OrderStatus
                                status={record?.status.text || "cancelled"}
                            />
                        </Row>
                    </Col>
                    <Col span={12} order={2}>
                        <Row justify="end" align="middle">
                            <Space>
                                <Button
                                    icon={<Icons.CheckCircleOutlined />}
                                    type="primary"
                                >
                                    Accept
                                </Button>

                                <Button
                                    danger
                                    icon={<Icons.CloseCircleOutlined />}
                                >
                                    Reject
                                </Button>
                            </Space>
                        </Row>
                    </Col>
                    <Col span={24} order={3}>
                        {" "}
                        <div className="3">3</div>
                    </Col>
                </Row>
            </Card>
        );
    };

    const Aside: React.FC = () => {
        if (!record) {
            return null;
        }

        return (
            <Timeline style={{ marginTop: 20 }}>
                {record?.events.map((event: IEvent, index: number) => (
                    <Timeline.Item key={index}>
                        <>
                            {event.name}
                            <small style={{ marginLeft: 10 }}>
                                ({dayjs(event.date).format("LLL")})
                            </small>
                        </>
                    </Timeline.Item>
                ))}
            </Timeline>
        );
    };

    return (
        <Row gutter={[16, 16]}>
            <Col lg={18} xs={24}>
                {record && renderOrderSteps()}
            </Col>
        </Row>
    );
};

{
    /* <Col md={8}>
<Title level={4}>{t("order:show.title")}</Title>
<Title level={5}>{t("order:fields.orderNumber")}</Title>
<Text>{record?.orderNumber}</Text>
<Title level={5}>{t("order:fields.status")}</Title>
<OrderStatus status={record?.status.text || "cancelled"} />
<Title level={5}>{t("order:fields.amount")}</Title>
<NumberField
    options={{
        currency: "USD",
        style: "currency",
        notation: "compact",
    }}
    value={record?.amount || 0}
/>
<Title level={5}>{t("order:fields.createdAt")}</Title>
<DateField value={record?.createdAt || ""} format="LLL" />
<Title level={5}>{t("order:fields.address")}</Title>
<Text>{record?.adress.text}</Text>
</Col>
 
<Col md={8}>
<Title level={4}>Products</Title>
 
<AntdList
    itemLayout="horizontal"
    dataSource={record?.products}
    renderItem={(item) => (
        <AntdList.Item>
            <AntdList.Item.Meta
                avatar={
                    <Avatar
                        src={item.images[0].url}
                        size="large"
                        shape="square"
                    />
                }
                title={item.name}
                description={
                    <NumberField
                        options={{
                            currency: "USD",
                            style: "currency",
                            notation: "compact",
                        }}
                        value={item.price}
                    />
                }
            />
        </AntdList.Item>
    )}
/>
</Col>
 
<Col md={4}>
<Title level={4}>User</Title>
 
<Title level={5}>ID</Title>
<Text>{record?.user.id}</Text>
 
<Title level={5}>Full Name</Title>
<Text>{record?.user.fullName}</Text>
 
<Title level={5}>Gender</Title>
<Text>{record?.user.gender}</Text>
 
<Title level={5}>Active</Title>
<Text>
    <BooleanField value={record?.user.isActive} />
</Text>
</Col>
 
<Col md={4}>
<Title level={4}>Store</Title>
 
<Title level={5}>ID</Title>
<Text>{record?.store.id}</Text>
 
<Title level={5}>Name</Title>
<Text>{record?.store.title}</Text>
 
<Title level={5}>Active</Title>
<Text>
    <BooleanField value={record?.store.isActive} />
</Text>
</Col> */
}
