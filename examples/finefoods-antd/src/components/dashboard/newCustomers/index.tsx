import { useMemo } from "react";
import { useApiUrl, useCustom, useTranslate } from "@refinedev/core";
import { ConfigProvider, theme, Typography } from "antd";
import { Column, ColumnConfig } from "@ant-design/charts";

import { IncreaseIcon, DecreaseIcon } from "../../../components/icons";

import { ISalesChart } from "../../../interfaces";
import { Header, HeaderNumbers, NewCustomersWrapper } from "./styled";

export const NewCustomers: React.FC = () => {
    const t = useTranslate();
    const API_URL = useApiUrl();

    const url = `${API_URL}/newCustomers`;
    const { data, isLoading } = useCustom<{
        data: ISalesChart[];
        total: number;
        trend: number;
    }>({ url, method: "get" });

    const { Text, Title } = Typography;

    const config = useMemo(() => {
        const config: ColumnConfig = {
            data: data?.data.data || [],
            padding: 0,
            paddingBottom: 5,
            xField: "date",
            yField: "value",
            style: {
                maxWidth: 10,
                radiusTopLeft: 4,
                radiusTopRight: 4,
            },
            colorField: "rgba(255, 255, 255, 0.5)",
            interaction: {
                tooltip: {
                    render: (
                        event: Event,
                        options: { items: { value: number }[] },
                    ) => {
                        return `<div style="font-size:16px; text-align: center; font-weight:600">${options.items[0].value}</div>`;
                    },
                },
            },
            axis: {
                x: { label: null, line: null, tickLineWidth: 0 },
                y: { label: null, grid: null, tickLineWidth: 0 },
            },
        };

        return config;
    }, [data]);

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}
        >
            <NewCustomersWrapper>
                <Header>
                    <Title level={3}>{t("dashboard.newCustomers.title")}</Title>
                    <HeaderNumbers>
                        <Text strong>{data?.data.total ?? 0}</Text>
                        <div>
                            <Text strong>{data?.data.trend ?? 0}%</Text>
                            {(data?.data?.trend ?? 0) > 0 ? (
                                <IncreaseIcon />
                            ) : (
                                <DecreaseIcon />
                            )}
                        </div>
                    </HeaderNumbers>
                </Header>
                <Column
                    style={{ padding: 0, height: 162 }}
                    appendPadding={10}
                    {...config}
                />
            </NewCustomersWrapper>
        </ConfigProvider>
    );
};
