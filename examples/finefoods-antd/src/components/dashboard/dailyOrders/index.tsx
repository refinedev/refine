import { Column, ColumnConfig } from "@ant-design/charts";
import { useApiUrl, useCustom, useTranslate } from "@refinedev/core";
import { Typography } from "antd";
import { useMemo } from "react";

import { DecreaseIcon, IncreaseIcon } from "../../../components/icons";

import { ISalesChart } from "../../../interfaces";
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
        const config = {
            data: data?.data.data || [],
            padding: 0,
            paddingBottom: 5,
            height: 135,
            xField: "date",
            yField: "value",
            style: {
                maxWidth: 10,
                radiusTopLeft: 4,
                radiusTopRight: 4,
            },
            colorField: "rgba(255, 255, 255, 0.5)",
            //* here
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
            axis: {
                x: { label: null, line: null, tickLineWidth: 0 },
                y: { label: null, grid: null, tickLineWidth: 0 },
            },
        } as ColumnConfig;

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
            <Column {...config} />
        </DailyOrderWrapper>
    );
};
