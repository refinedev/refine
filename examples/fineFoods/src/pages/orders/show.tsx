import {
    Row,
    Col,
    useShow,
    Show,
    Typography,
    NumberField,
    DateField,
    Icons,
    AntdList,
    Avatar,
    IResourceComponentsProps,
} from "@pankod/refine";

import { OrderStatus } from "components";
import { IOrder } from "interfaces";

const { Title, Text } = Typography;

export const OrderShow: React.FC<IResourceComponentsProps> = (props) => {
    const { queryResult } = useShow<IOrder>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show {...props} title="Order Detail" isLoading={isLoading}>
            {record && (
                <Row gutter={[16, 16]}>
                    <Col md={8}>
                        <Title underline level={3}>
                            Order
                        </Title>

                        <Title level={5}>Order Number</Title>
                        <Text>{record.orderNumber}</Text>

                        <Title level={5}>Status</Title>
                        <OrderStatus status={record.status.text} />

                        <Title level={5}>Amount</Title>
                        <NumberField
                            options={{
                                currency: "USD",
                                style: "currency",
                                notation: "compact",
                            }}
                            value={record.amount}
                        />

                        <Title level={5}>Created At</Title>
                        <DateField value={record.createdAt} format="LLL" />

                        <Title level={5}>Address</Title>
                        <Text>{record.adress.text}</Text>
                    </Col>

                    <Col md={8}>
                        <Title underline level={3}>
                            Products
                        </Title>

                        <AntdList
                            itemLayout="horizontal"
                            dataSource={record.products}
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
                        <Title underline level={3}>
                            User
                        </Title>

                        <Title level={5}>ID</Title>
                        <Text>{record.user.id}</Text>

                        <Title level={5}>Full Name</Title>
                        <Text>{record.user.fullName}</Text>

                        <Title level={5}>Gender</Title>
                        <Text>{record.user.gender}</Text>

                        <Title level={5}>Active</Title>
                        <Text>
                            {record.user.isActive ? (
                                <Icons.CheckCircleOutlined
                                    style={{ fontSize: 22, color: "#52C41A" }}
                                />
                            ) : (
                                <Icons.CloseOutlined
                                    style={{ fontSize: 22, color: "#F5222D" }}
                                />
                            )}
                        </Text>
                    </Col>

                    <Col md={4}>
                        <Title underline level={3}>
                            Store
                        </Title>

                        <Title level={5}>ID</Title>
                        <Text>{record.store.id}</Text>

                        <Title level={5}>Name</Title>
                        <Text>{record.store.title}</Text>

                        <Title level={5}>Active</Title>
                        <Text>
                            {record.store.isActive ? (
                                <Icons.CheckCircleOutlined
                                    style={{ fontSize: 22, color: "#52C41A" }}
                                />
                            ) : (
                                <Icons.CloseOutlined
                                    style={{ fontSize: 22, color: "#F5222D" }}
                                />
                            )}
                        </Text>
                    </Col>
                </Row>
            )}
        </Show>
    );
};
