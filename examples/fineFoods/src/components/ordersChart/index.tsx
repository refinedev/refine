import { Typography, Row, Col, useList } from "@pankod/refine";
import { RadialBar } from "@ant-design/charts";
import { RadialBarConfig } from "@ant-design/charts/es/radialBar";

import { IOrderChart } from "interfaces";

export const OrdersChart: React.FC = () => {
    const { data, isLoading } = useList<IOrderChart>("orderChart");

    const config: RadialBarConfig = {
        width: 400,
        height: 300,
        data: data?.data,
        loading: isLoading,
        xField: "status",
        yField: "count",
        radius: 0.8,
        innerRadius: 0.2,
        colorField: "status",
        color: function color(_ref) {
            const status = _ref.status;

            switch (status) {
                case "waiting":
                    return "#F39800";
                case "ready":
                    return "#B033AB";
                case "on the way":
                    return "#1890FF";
                case "delivered":
                    return "#52C41A";
                case "could not be delivered":
                    return "#F5222D";
            }
        },
    };

    const { Title } = Typography;

    const waitingStatus = ["waiting", "ready", "on the way"];
    const deliveredStatus = ["delivered", "could not be delivered"];

    return (
        <>
            <Title level={5}>Orders</Title>
            <Row>
                <Col md={12}>
                    <RadialBar
                        {...config}
                        data={config.data.filter((item) =>
                            deliveredStatus.includes(item.status),
                        )}
                    />
                </Col>
                <Col md={12}>
                    <RadialBar
                        {...config}
                        data={config.data.filter((item) =>
                            waitingStatus.includes(item.status),
                        )}
                    />
                </Col>
            </Row>
        </>
    );
};
