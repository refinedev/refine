import { useMemo, useState } from "react";
import {
    Typography,
    useApiUrl,
    useCustom,
    Row,
    Col,
    DatePicker,
    NumberField,
    useTranslate,
} from "@pankod/refine";
import { Line, LineConfig } from "@ant-design/charts";
import dayjs, { Dayjs } from "dayjs";

import { ISalesChart } from "interfaces";

export const SalesChart: React.FC = () => {
    const t = useTranslate();
    const API_URL = useApiUrl();

    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
        dayjs().subtract(7, "days").startOf("day"),
        dayjs().startOf("day"),
    ]);
    const [start, end] = dateRange;

    const query = {
        start,
        end,
    };

    const url = `${API_URL}/sales`;
    const { data, isLoading } = useCustom<ISalesChart[]>(url, "get", {
        query,
    });

    const total = useMemo(
        () =>
            data?.data.reduce((acc, item) => {
                if (item.title === "Order Amount") {
                    return acc + item.value;
                }
                return acc;
            }, 0) || 0,
        [data],
    );

    const config = useMemo(() => {
        const config: LineConfig = {
            data: data?.data || [],
            loading: isLoading,
            animation: false,
            padding: "auto",
            xField: "date",
            yField: "value",
            seriesField: "title",
            tooltip: {
                title: (date) => dayjs(date).format("LL"),
            },
            xAxis: {
                label: {
                    formatter: (value) => {
                        return dayjs(value).format("YYYY-MM-DD");
                    },
                },
            },
        };

        return config;
    }, [data]);

    const { Title } = Typography;
    const { RangePicker } = DatePicker;

    return (
        <>
            <Row justify="space-between">
                <Col>
                    <Title level={5}>{t("dashboard:totalSales.title")}</Title>
                </Col>
                <Col>
                    <NumberField
                        style={{ fontSize: 56 }}
                        options={{
                            currency: "USD",
                            style: "currency",
                            notation: "compact",
                        }}
                        value={total}
                    />
                </Col>
            </Row>

            <Line {...config} />

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
                        dayjs()
                            .startOf("month")
                            .subtract(1, "month") as any as any,
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
