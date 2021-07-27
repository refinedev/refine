import { useMemo, useState } from "react";
import {
    Typography,
    useApiUrl,
    useCustom,
    DatePicker,
    NumberField,
    useTranslate,
} from "@pankod/refine";
import { Column, ColumnConfig } from "@ant-design/charts";
import dayjs, { Dayjs } from "dayjs";

import { ISalesChart } from "interfaces";
import styles from "./styles";

export const DailyRevenue: React.FC = () => {
    const t = useTranslate();
    const API_URL = useApiUrl();

    const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
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

    const { Title } = Typography;
    const { RangePicker } = DatePicker;

    const config = useMemo(() => {
        const config: ColumnConfig = {
            data: data?.data || [],
            loading: isLoading,
            isGroup: true,
            xField: "date",
            yField: "value",
            seriesField: "title",
            tooltip: {
                title: (date) => dayjs(date).format("LL"),
            },
            xAxis: {
                label: {
                    formatter: () => {
                        return null;
                    },
                },
            },
        };

        return config;
    }, [data]);

    return (
        <>
            <div style={styles.titleArea}>
                <Title level={5}>{t("dashboard:dailyRevenue.title")}</Title>
                <NumberField
                    style={styles.count}
                    options={{
                        currency: "USD",
                        style: "currency",
                        notation: "compact",
                    }}
                    value={total}
                />
            </div>

            <Column {...config} />

            <RangePicker
                size="small"
                value={dateRange}
                onChange={(values) => {
                    if (values && values[0] && values[1]) {
                        setDateRange([values[0], values[1]]);
                    }
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
