import { useEffect, useState } from "react";
import { Typography, useApiUrl, useCustom, DatePicker } from "@pankod/refine";
import { Column } from "@ant-design/charts";
import { ColumnConfig } from "@ant-design/charts/es/column";
import dayjs, { Dayjs } from "dayjs";

import { ISalesChart } from "interfaces";
import styles from "./styles";

export const DailyRevenue: React.FC = () => {
    const [total, setTotal] = useState(0);
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

    const { Title } = Typography;
    const { RangePicker } = DatePicker;

    const config: ColumnConfig = {
        data: data?.data || [],
        loading: isLoading,
        isGroup: true,
        xField: "date",
        yField: "value",
        seriesField: "title",
    };

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return (
        <>
            <div style={styles.titleArea}>
                <Title level={5}>Daily Revenue</Title>
                <span style={styles.count}>{formatter.format(total)}</span>
            </div>

            <Column {...config} />

            <RangePicker
                size="small"
                value={dateRange}
                onChange={(values) => {
                    setDateRange(values);
                }}
                style={{ float: "right", marginTop: 20 }}
                ranges={{
                    "This Week": [
                        dayjs().startOf("week"),
                        dayjs().endOf("week"),
                    ],
                    "Last Month": [
                        dayjs().startOf("month").subtract(1, "month"),
                        dayjs().endOf("month").subtract(1, "month"),
                    ],
                    "This Month": [
                        dayjs().startOf("month"),
                        dayjs().endOf("month"),
                    ],
                    "This Year": [
                        dayjs().startOf("year"),
                        dayjs().endOf("year"),
                    ],
                }}
                format="YYYY/MM/DD"
            />
        </>
    );
};
