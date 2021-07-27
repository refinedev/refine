import { useState, useMemo } from "react";
import {
    Typography,
    Row,
    Col,
    DatePicker,
    useApiUrl,
    useCustom,
    useTranslate,
} from "@pankod/refine";
import { RadialBar, RadialBarConfig } from "@ant-design/charts";
import dayjs, { Dayjs } from "dayjs";

import { IOrderChart } from "interfaces";

export const OrdersChart: React.FC = () => {
    const t = useTranslate();

    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
        dayjs().subtract(7, "days").startOf("day"),
        dayjs().startOf("day"),
    ]);

    const API_URL = useApiUrl();
    const [start, end] = dateRange;

    const query = {
        start,
        end,
    };

    const url = `${API_URL}/orderStatusChart`;
    const { data, isLoading } = useCustom<IOrderChart[]>(url, "get", {
        query,
    });

    const config: RadialBarConfig = {
        width: 400,
        height: 300,
        data: [],
        loading: isLoading,
        animation: false,
        xField: "status",
        yField: "count",
        radius: 0.8,
        innerRadius: 0.2,
        colorField: "status",
        color: (_ref: any) => {
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
                default:
                    return "#F5222D";
            }
        },
    };

    const { Title } = Typography;
    const { RangePicker } = DatePicker;

    const waitingStatus = ["waiting", "ready", "on the way"];
    const deliveredStatus = ["delivered", "could not be delivered"];

    const chartConfig = useMemo(() => {
        return {
            waiting: {
                ...config,
                data:
                    data?.data.filter((item) =>
                        waitingStatus.includes(item.status),
                    ) || [],
            },
            delivered: {
                ...config,
                data:
                    data?.data.filter((item) =>
                        deliveredStatus.includes(item.status),
                    ) || [],
            },
        };
    }, [data]);

    return (
        <>
            <Title level={5}>{t("dashboard:orders.title")}</Title>
            <Row>
                <Col md={12}>
                    <RadialBar {...chartConfig.waiting} />
                </Col>
                <Col md={12}>
                    <RadialBar {...chartConfig.delivered} />
                </Col>
            </Row>

            <RangePicker
                value={dateRange as any}
                onChange={(values) => {
                    setDateRange(values as any);
                }}
                style={{ float: "right", marginTop: 20 }}
                ranges={{
                    "This Week": [
                        dayjs().startOf("week") as any,
                        dayjs().endOf("week") as any,
                    ],
                    "Last Month": [
                        dayjs().startOf("month").subtract(1, "month") as any,
                        dayjs().endOf("month").subtract(1, "month") as any,
                    ],
                    "This Month": [
                        dayjs().startOf("month") as any,
                        dayjs().endOf("month") as any,
                    ],
                    "This Year": [
                        dayjs().startOf("year") as any,
                        dayjs().endOf("year") as any,
                    ],
                }}
                format="YYYY/MM/DD"
            />
        </>
    );
};
