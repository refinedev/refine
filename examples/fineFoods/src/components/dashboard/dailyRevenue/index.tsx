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

import { IncreaseIcon, DecreaseIcon } from "components/icons";

import { ISalesChart } from "interfaces";
import "./style.less";

export const DailyRevenue: React.FC = () => {
    const t = useTranslate();
    const API_URL = useApiUrl();

    const [dateRange, setDateRange] = useState<Dayjs>(dayjs().startOf("month"));

    const [start, end] = [dateRange.startOf("month"), dateRange.endOf("month")];

    const query = {
        start,
        end,
    };

    const url = `${API_URL}/dailyRevenue`;
    const { data, isLoading } = useCustom<{
        data: ISalesChart[];
        total: number;
        trend: number;
    }>(url, "get", {
        query,
    });

    const config = useMemo(() => {
        const config: LineConfig = {
            data: data?.data.data || [],
            loading: isLoading,
            padding: "auto",
            xField: "date",
            yField: "value",
            tooltip: {
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

    const disabledDate = (date: Dayjs) => date > dayjs().endOf("month");

    return (
        <div className="daily-revenue-wrapper">
            <div className="title-area">
                <div className="title-area__amount">
                    <Typography.Title level={3}>
                        {t("dashboard.dailyRevenue.title")}
                    </Typography.Title>
                    <div className="title-area__number">
                        <NumberField
                            style={{ fontSize: 36 }}
                            strong
                            options={{
                                currency: "USD",
                                style: "currency",
                                notation: "compact",
                            }}
                            value={data?.data.total ?? 0}
                        />
                        {(data?.data?.trend ?? 0) > 0 ? (
                            <IncreaseIcon />
                        ) : (
                            <DecreaseIcon />
                        )}
                    </div>
                </div>

                <DatePicker
                    className="range-picker"
                    size="small"
                    picker="month"
                    value={dateRange}
                    onChange={(date) => {
                        if (date) {
                            setDateRange(date);
                        }
                    }}
                    style={{
                        float: "right",
                        color: "#fffff !important",
                        background: "rgba(255, 255, 255, 0.3)",
                    }}
                    disabledDate={disabledDate}
                />
            </div>
            <Line padding={0} appendPadding={10} height={162} {...config} />
        </div>
    );
};
