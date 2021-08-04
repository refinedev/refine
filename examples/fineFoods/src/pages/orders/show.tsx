import {
    Row,
    Col,
    useShow,
    IResourceComponentsProps,
    useTranslate,
    Button,
    Icons,
    Steps,
    PageHeader,
    Grid,
    useUpdate,
} from "@pankod/refine";
import dayjs from "dayjs";

import { OrderStatus } from "components";
import { IEvent, IOrder } from "interfaces";

import "./style.css";

const { useBreakpoint } = Grid;

export const OrderShow: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const screens = useBreakpoint();
    const { queryResult } = useShow<IOrder>();
    const { data, isFetching } = queryResult;
    const { mutate } = useUpdate();
    const record = data?.data;

    console.log({ record });

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

        return (
            <PageHeader
                className="pageHeader"
                ghost={false}
                onBack={() => window.history.back()}
                title={t("orders:fields.orderID")}
                subTitle={`#${record?.orderNumber}`}
                extra={[
                    <Button
                        disabled={record?.status.text !== "Pending"}
                        key="accept"
                        icon={<Icons.CheckCircleOutlined />}
                        type="primary"
                        onClick={() => {
                            if (record) {
                                mutate({
                                    resource: "orders",
                                    id: record?.id.toString(),
                                    values: {
                                        status: {
                                            id: 2,
                                            text: "Ready",
                                        },
                                    },
                                });
                            }
                        }}
                    >
                        {t("common:buttons.accept")}
                    </Button>,
                    <Button
                        disabled={record?.status.text === "Delivered"}
                        key="reject"
                        danger
                        icon={<Icons.CloseCircleOutlined />}
                        onClick={() => {
                            if (record) {
                                mutate({
                                    resource: "orders",
                                    id: record?.id.toString(),
                                    values: {
                                        status: {
                                            id: 5,
                                            text: "Cancelled",
                                        },
                                    },
                                });
                            }
                        }}
                    >
                        {t("common:buttons.reject")}
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
                            title={event.status}
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
            </PageHeader>
        );
    };

    return (
        <Row gutter={[16, 16]}>
            <Col sm={23} xs={24}>
                {record && renderOrderSteps()}
            </Col>
        </Row>
    );
};
