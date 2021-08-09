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

export const DailyOrders: React.FC = () => {
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
                marker: { fill: "#D94BF2" },
                customContent: (title, data) => {
                    return `<div style="padding: 8px 4px; font-size:16px; color:#fff !important; font-weight:600">${data[0]?.value} $</div>`;
                },
                domStyles: {
                    "g2-tooltip": {
                        background: "rgba(255, 255, 255, 0.3)",
                        boxShadow: "unset",
                    },
                },
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
            lineStyle: {
                lineWidth: 4,
                stroke: "white",
            },
        };

        return config;
    }, [data]);

    console.log({ config });

    return (
        <div style={{ height: 222 }}>
            <div className="title-area">
                <Text
                    style={{
                        fontWeight: 800,
                        fontSize: 24,
                    }}
                >
                    {t("dashboard:dailyOrders.title")}
                </Text>

                <div className="number">
                    <NumberField
                        style={{
                            fontSize: 36,
                            fontWeight: 900,
                        }}
                        options={{
                            currency: "USD",
                            style: "currency",
                            notation: "compact",
                        }}
                        value={total}
                    />
                    <img src="images/increase.svg" />
                    {/* <img src="images/decrease.svg" /> */}
                </div>
            </div>
            <Line
                padding={0}
                appendPadding={10}
                height={162}
                autoFit={false}
                {...config}
            />
        </div>
    );
};
