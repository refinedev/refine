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
} from "@pankod/refine";
import dayjs from "dayjs";

import { OrderStatus } from "components";
import { IEvent, IOrder } from "interfaces";

import "./style.css";

const { useBreakpoint } = Grid;

export const OrderShow: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const screens = useBreakpoint();
    console.log({ screens });
    const { queryResult } = useShow<IOrder>();
    const { data, isFetching } = queryResult;
    const record = data?.data;

    console.log({ screens });
    console.log(Object.entries(screens));

    const currentBreakPoints = Object.entries(screens)
        .filter((screen) => !!screen[1])
        .map((screen) => screen[0]);

    console.log({ currentBreakPoints });

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
                        key="accept"
                        icon={<Icons.CheckCircleOutlined />}
                        type="primary"
                    >
                        Accept
                    </Button>,
                    <Button
                        key="reject"
                        danger
                        icon={<Icons.CloseCircleOutlined />}
                    >
                        Reject
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
