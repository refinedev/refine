import { Typography, useApiUrl, useCustom, Row, Col } from "@pankod/refine";
import { Line } from "@ant-design/charts";
import { LineConfig } from "@ant-design/charts/es/line";
import dayjs from "dayjs";

import { ISalesChart } from "interfaces";
import { useEffect, useState } from "react";

export const SalesChart: React.FC = () => {
    const [total, setTotal] = useState(0);
    const API_URL = useApiUrl();
    const query = {
        start: dayjs().subtract(7, "days").startOf("day"),
        end: dayjs().startOf("day"),
    };

    const url = `${API_URL}/sales`;
    const { data, isLoading } = useCustom<ISalesChart[]>(url, "get", {
        query,
    });

    useEffect(() => {
        if (data) {
            setTotal(
                data.data.reduce((acc, item) => {
                    if (item.title === "Order Amount") {
                        return acc + item.value;
                    }
                    return acc;
                }, 0),
            );
        }
    }, [data]);

    const config: LineConfig = {
        data: data?.data || [],
        loading: isLoading,
        padding: "auto",
        xField: "date",
        yField: "value",
        seriesField: "title",
        xAxis: {
            label: {
                formatter: (value) => {
                    return dayjs(value).format("YYYY-MM-DD");
                },
            },
        },
    };

    const { Title } = Typography;

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return (
        <>
            <Row justify="space-between">
                <Col>
                    <Title level={5}>Total Sales</Title>
                </Col>
                <Col>
                    <Title level={2}>{formatter.format(total)}</Title>
                </Col>
            </Row>

            <Line {...config} />
        </>
    );
};
