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
} from "@pankod/refine";
import dayjs from "dayjs";

import { OrderStatus } from "components";
import { IEvent, IOrder } from "interfaces";

export const OrderShow: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const { queryResult } = useShow<IOrder>();
    const { data, isFetching } = queryResult;
    const record = data?.data;

    console.log({ record });

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
            <Col xs={23}>{record && renderOrderSteps()}</Col>
        </Row>
    );
};
