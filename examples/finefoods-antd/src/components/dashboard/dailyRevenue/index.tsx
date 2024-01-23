import { Line, LineConfig } from "@ant-design/charts";
import { NumberField } from "@refinedev/antd";
import { useApiUrl, useCustom, useTranslate } from "@refinedev/core";
import { Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";

import { DecreaseIcon, IncreaseIcon } from "../../../components/icons";

import { ISalesChart } from "../../../interfaces";
import {
    DailyRevenueWrapper,
    RangePicker,
    TitleAreNumber,
    TitleArea,
    TitleAreaAmount,
} from "./styled";

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
    const { data, isLoading } = useCustom<{
        data: ISalesChart[];
        total: number;
        trend: number;
    }>({
        url,
        method: "get",
        config: {
            query,
        },
    });

    const config = useMemo(() => {
        const config = {
            data: data?.data.data || [],
            padding: 0,
            paddingBottom: 25,
            xField: "date",
            yField: "value",
            shapeField: "smooth",
            style: {
                lineWidth: 4,
            },
            colorField: "rgba(255, 255, 255, 0.5)",
            axis: {
                x: { label: null, line: null },
                y: { label: null, grid: null },
            },
            // todo: problem here
            // interaction: {
            //     tooltip: {
            //         render: (event, options) => {
            //             console.log("R DATA: ", options.items[0].value);
            //             return (
            //                 <div
            //                     style={{
            //                         padding: "8px 4px",
            //                         fontSize: "16px",
            //                         fontWeight: 600,
            //                     }}
            //                 >
            //                     {options.items[0].value} $
            //                 </div>
            //             );
            //         },
            //     },
            // },
        } as LineConfig;

        return config;
    }, [data]);

    const disabledDate = (date: Dayjs) => date > dayjs();

    return (
        <DailyRevenueWrapper>
            <TitleArea>
                <TitleAreaAmount>
                    <Typography.Title level={3}>
                        {t("dashboard.dailyRevenue.title")}
                    </Typography.Title>
                    <TitleAreNumber>
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
                    </TitleAreNumber>
                </TitleAreaAmount>

                <RangePicker
                    size="small"
                    value={dateRange}
                    onChange={(values) => {
                        if (values && values[0] && values[1]) {
                            setDateRange([values[0], values[1]]);
                        }
                    }}
                    disabledDate={disabledDate}
                    style={{
                        float: "right",
                        color: "#fffff !important",
                        background: "rgba(255, 255, 255, 0.3)",
                    }}
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
            </TitleArea>
            <Line {...config} />
        </DailyRevenueWrapper>
    );
};
