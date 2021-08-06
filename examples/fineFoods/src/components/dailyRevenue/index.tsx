import { useMemo, useState } from "react";
import {
    Typography,
    useApiUrl,
    useCustom,
    DatePicker,
    NumberField,
    useTranslate,
} from "@pankod/refine";
import { Line, LineConfig } from "@ant-design/charts";
import dayjs, { Dayjs } from "dayjs";

import { ISalesChart } from "interfaces";
import "./style.css";

export const DailyRevenue: React.FC = () => {
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

    const url = `${API_URL}/dailyRevenue`;
    const { data, isLoading } = useCustom<ISalesChart[]>(url, "get", {
        query,
    });

    const total = useMemo(
        () =>
            data?.data.reduce((acc, item) => {
                return acc + item.value;
            }, 0) || 0,
        [data],
    );

    const { Text } = Typography;
    const { RangePicker } = DatePicker;

    const config = useMemo(() => {
        const config: LineConfig = {
            data: data?.data || [],
            loading: isLoading,
            padding: "auto",
            xField: "date",
            yField: "value",
            // seriesField: "title",
            tooltip: {
                title: (date) => dayjs(date).format("LL"),
                showCrosshairs: false,
            },
            xAxis: {
                label: null,
                line: null,
            },
            yAxis: {
                label: null,
                grid: null,
            },
            smooth: true,

            // animation: false,
        };

        return config;
    }, [data]);

    console.log({ config });

    return (
        <div style={{ height: 222 }}>
            <div className="title-area">
                <div className="amount">
                    <Text style={{ fontWeight: 800, fontSize: 24 }}>
                        {t("dashboard:dailyRevenue.title")}
                    </Text>
                    <NumberField
                        style={{ fontSize: 36, fontWeight: 900 }}
                        options={{
                            currency: "USD",
                            style: "currency",
                            notation: "compact",
                        }}
                        value={total}
                    />
                </div>
                <div>datepicker</div>

                {/* <RangePicker
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
                /> */}
            </div>
            <Line
                renderer="svg"
                padding={0}
                height={162}
                autoFit={false}
                {...config}
            />
        </div>
    );
};
