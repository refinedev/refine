import { useMemo } from "react";
import { useApiUrl, useCustom, useTranslate } from "@pankod/refine-core";
import { Typography } from "@pankod/refine-antd";
import { Column } from "@ant-design/charts";
import { ColumnConfig } from "@ant-design/plots/lib/components/column";

import { IncreaseIcon, DecreaseIcon } from "components/icons";

import { ISalesChart } from "interfaces";
import { DailyOrderWrapper, TitleAreNumber, TitleArea } from "./styled";

export const DailyOrders: React.FC = () => {
    const t = useTranslate();
    const API_URL = useApiUrl();

    const url = `${API_URL}/dailyOrders`;
    const { data, isLoading } = useCustom<{
        data: ISalesChart[];
        total: number;
        trend: number;
    }>({ url, method: "get" });

    const { Text, Title } = Typography;

    const config = useMemo(() => {
        const config: ColumnConfig = {
            data: data?.data.data || [],
            loading: isLoading,
            padding: 0,
            xField: "date",
            yField: "value",
            maxColumnWidth: 16,
            columnStyle: {
                radius: [4, 4, 0, 0],
            },
            color: "rgba(255, 255, 255, 0.5)",
            tooltip: {
                customContent: (title, data) => {
                    return `<div style="padding: 8px 4px; font-size:16px; font-weight:600">${data[0]?.value}</div>`;
                },
            },

            xAxis: {
                label: null,
                line: null,
                tickLine: null,
            },
            yAxis: {
                label: null,
                grid: null,
                tickLine: null,
            },
        };

        return config;
    }, [data]);

    return (
        <DailyOrderWrapper>
            <TitleArea>
                <Title level={3}>{t("dashboard.dailyOrders.title")}</Title>
                <TitleAreNumber>
                    <Text strong>{data?.data.total ?? 0} </Text>

                    {(data?.data?.trend ?? 0) > 0 ? (
                        <IncreaseIcon />
                    ) : (
                        <DecreaseIcon />
                    )}
                </TitleAreNumber>
            </TitleArea>
            <Column
                style={{ padding: 0, height: 135 }}
                appendPadding={10}
                {...config}
            />
        </DailyOrderWrapper>
    );
};
