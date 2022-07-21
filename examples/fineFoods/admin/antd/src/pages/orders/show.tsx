import { ReactNode } from "react";
import {
    useShow,
    IResourceComponentsProps,
    useTranslate,
    useUpdate,
} from "@pankod/refine-core";
import {
    Row,
    Col,
    Button,
    Icons,
    Steps,
    PageHeader,
    Grid,
    Space,
    Avatar,
    Typography,
    Card,
    Table,
    List,
    Skeleton,
    Icon,
} from "@pankod/refine-antd";

import GoogleMapReact from "google-map-react";
import dayjs from "dayjs";

import { MapMarker } from "components/map";
import { BikeWhiteIcon, UserIcon, CourierIcon } from "components/icons";
import { useOrderCustomKbarActions } from "hooks";
import { IEvent, IOrder, IProduct } from "interfaces";

import "./style.less";

const { useBreakpoint } = Grid;
const { Text } = Typography;

export const OrderShow: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const screens = useBreakpoint();
    const { queryResult } = useShow<IOrder>();
    const { data } = queryResult;
    const { mutate } = useUpdate();
    const record = data?.data;

    const canAcceptOrder = record?.status.text === "Pending";
    const canRejectOrder =
        record?.status.text === "Pending" ||
        record?.status.text === "Ready" ||
        record?.status.text === "On The Way";

    const currentBreakPoints = Object.entries(screens)
        .filter((screen) => !!screen[1])
        .map((screen) => screen[0]);

    const renderOrderSteps = () => {
        const notFinishedCurrentStep = (event: IEvent, index: number) =>
            event.status !== "Cancelled" &&
            event.status !== "Delivered" &&
            record?.events.findIndex(
                (el) => el.status === record?.status?.text,
            ) === index;

        const stepStatus = (event: IEvent, index: number) => {
            if (!event.date) return "wait";
            if (event.status === "Cancelled") return "error";
            if (notFinishedCurrentStep(event, index)) return "process";
            return "finish";
        };

        const handleMutate = (status: { id: number; text: string }) => {
            if (record) {
                mutate({
                    resource: "orders",
                    id: record.id.toString(),
                    values: {
                        status,
                    },
                });
            }
        };

        useOrderCustomKbarActions(record);

        return (
            <PageHeader
                className="pageHeader"
                ghost={false}
                onBack={() => window.history.back()}
                title={t("orders.fields.orderID")}
                subTitle={`#${record?.orderNumber ?? ""}`}
                extra={[
                    <Button
                        disabled={!canAcceptOrder}
                        key="accept"
                        icon={<Icons.CheckCircleOutlined />}
                        type="primary"
                        onClick={() =>
                            handleMutate({
                                id: 2,
                                text: "Ready",
                            })
                        }
                    >
                        {t("buttons.accept")}
                    </Button>,
                    <Button
                        disabled={!canRejectOrder}
                        key="reject"
                        danger
                        icon={<Icons.CloseCircleOutlined />}
                        onClick={() =>
                            handleMutate({
                                id: 5,
                                text: "Cancelled",
                            })
                        }
                    >
                        {t("buttons.reject")}
                    </Button>,
                ]}
            >
                <Steps
                    direction={
                        currentBreakPoints.includes("lg")
                            ? "horizontal"
                            : "vertical"
                    }
                    current={record?.events.findIndex(
                        (el) => el.status === record?.status?.text,
                    )}
                >
                    {record?.events.map((event: IEvent, index: number) => (
                        <Steps.Step
                            status={stepStatus(event, index)}
                            key={index}
                            title={t(`enum.orderStatuses.${event.status}`)}
                            icon={
                                notFinishedCurrentStep(event, index) && (
                                    <Icons.LoadingOutlined />
                                )
                            }
                            description={
                                event.date && dayjs(event.date).format("L LT")
                            }
                        />
                    ))}
                </Steps>
                {!record && <Skeleton paragraph={{ rows: 1 }} />}
            </PageHeader>
        );
    };

    const courierInfoBox = (text: string, icon: ReactNode, value?: string) => (
        <div className="courier-infoBox">
            {icon}
            <div className="text">
                <Text style={{ color: "#ffffff" }}>{text.toUpperCase()}</Text>
                <Text style={{ color: "#ffffff" }}>{value}</Text>
            </div>
        </div>
    );

    const renderCourierInfo = () => (
        <Card>
            <Row justify="center">
                <Col xl={12} lg={10}>
                    <div className="courier">
                        <Avatar
                            size={108}
                            src={record?.courier.avatar[0].url}
                        />
                        <div className="info-text">
                            <Text style={{ fontSize: 16 }}>COURIER</Text>
                            <Text
                                style={{
                                    fontSize: 22,
                                    fontWeight: 800,
                                }}
                            >
                                {record?.courier.name} {record?.courier.surname}
                            </Text>
                            <Text>ID #{record?.courier.id}</Text>
                        </div>
                    </div>
                </Col>

                <Col xl={12} lg={14} md={24} className="courier-box-container">
                    {courierInfoBox(
                        t("orders.courier.phone"),
                        <Icons.MobileOutlined
                            className="mobile"
                            style={{ color: "#ffff", fontSize: 32 }}
                        />,
                        record?.courier.gsm,
                    )}
                    {courierInfoBox(
                        t("orders.courier.deliveryTime"),
                        <Icon
                            className="mobile"
                            component={BikeWhiteIcon}
                            style={{ color: "#ffff", fontSize: 32 }}
                        />,
                        "15:05",
                    )}
                </Col>
            </Row>
        </Card>
    );

    const renderDeliverables = () => (
        <List
            pageHeaderProps={{ style: { marginTop: 20 } }}
            title={
                <Text style={{ fontSize: 22, fontWeight: 800 }}>
                    {t("orders.deliverables.deliverables")}
                </Text>
            }
        >
            <Table
                pagination={false}
                dataSource={record?.products}
                footer={(_data) => (
                    <div className="product-footer">
                        <Text>{t("orders.deliverables.mainTotal")}</Text>
                        <Text>{record?.amount}$</Text>
                    </div>
                )}
            >
                <Table.Column<IProduct>
                    defaultSortOrder="descend"
                    sorter={(a: IProduct, b: IProduct) =>
                        a.name > b.name ? 1 : -1
                    }
                    dataIndex="name"
                    title={t("orders.deliverables.fields.items")}
                    render={(value, record) => (
                        <div className="product">
                            <Avatar
                                size={{
                                    md: 60,
                                    lg: 108,
                                    xl: 108,
                                    xxl: 108,
                                }}
                                src={record.images[0].url}
                            />
                            <div className="product-text">
                                <Text style={{ fontSize: 22, fontWeight: 800 }}>
                                    {value}
                                </Text>
                                <Text>#{record.id}</Text>
                            </div>
                        </div>
                    )}
                />
                <Table.Column
                    title={t("orders.deliverables.fields.quantity")}
                    dataIndex="quantity"
                    render={() => (
                        <Text style={{ fontWeight: 800 }}>{"1x"}</Text>
                    )}
                />
                <Table.Column
                    defaultSortOrder="descend"
                    sorter={(a: IProduct, b: IProduct) => a.price - b.price}
                    dataIndex="price"
                    title={t("orders.deliverables.fields.price")}
                    render={(value) => (
                        <Text style={{ fontWeight: 800 }}>{value}</Text>
                    )}
                />
                <Table.Column
                    defaultSortOrder="descend"
                    sorter={(a: IProduct, b: IProduct) => a.price - b.price}
                    dataIndex="price"
                    title={t("orders.deliverables.fields.total")}
                    render={(value) => (
                        <Text style={{ fontWeight: 800 }}>{value}</Text>
                    )}
                />
            </Table>
        </List>
    );

    return (
        <>
            <Space size={20} direction="vertical" style={{ width: "100%" }}>
                {renderOrderSteps()}
                <div style={{ height: "500px", width: "100%" }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{
                            key: process.env.REACT_APP_MAP_ID,
                        }}
                        defaultCenter={{
                            lat: 40.73061,
                            lng: -73.935242,
                        }}
                        defaultZoom={9}
                    >
                        <MapMarker
                            key={`user-marker-${record?.user.id}`}
                            lat={record?.adress.coordinate[0]}
                            lng={record?.adress.coordinate[1]}
                        >
                            <UserIcon />
                        </MapMarker>
                        <MapMarker
                            key={`store-marker-${record?.store.id}`}
                            lat={record?.store.address.coordinate[0]}
                            lng={record?.store.address.coordinate[1]}
                        >
                            <CourierIcon />
                        </MapMarker>
                    </GoogleMapReact>
                </div>
                {renderCourierInfo()}
            </Space>
            {renderDeliverables()}
        </>
    );
};
