import React from "react";
import { Card, Button, theme } from "antd";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { DollarOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useCustom } from "@refinedev/core";
import dayjs from "dayjs";

import { Text } from "../text";

type YearlyDealGroupedResponse = {
    yearlyDealGrouped: {
        nodes: {
            title: string;
            dealsAggregate: {
                groupBy: {
                    closeDateMonth: number;
                    closeDateYear: number;
                };
                sum: {
                    value: number;
                };
            }[];
        }[];
    };
};

export const DashboardDealsChart: React.FC<{}> = () => {
    const { token } = theme.useToken();
    const { data, isLoading, isError } = useCustom<YearlyDealGroupedResponse>({
        method: "post",
        url: "/graphql",
        meta: {
            rawQuery: `query {
                yearlyDealGrouped: dealStages(filter: { title: { in: ["WON", "LOST"] } }) {
                    nodes {
                      title
                      dealsAggregate {
                        groupBy {
                          closeDateMonth
                          closeDateYear
                        }
                        sum {
                          value
                        }
                      }
                    }
                  }
              }              
            `,
        },
    });

    if (isError) {
        // TODO: handle error message
        return null;
    }

    if (isLoading) {
        // TODO: handle loading state (skeleton)
        return null;
    }

    const { yearlyDealGrouped } = data.data;
    const dealsData: {
        id: number;
        title: string;
        won: number;
        lost: number;
    }[] = [];
    yearlyDealGrouped.nodes.forEach((stage) => {
        stage.dealsAggregate.forEach((deal) => {
            const { closeDateMonth, closeDateYear } = deal.groupBy;
            const date = dayjs(`${closeDateYear}-${closeDateMonth}-01`);
            const id = date.unix();
            const title = date.format("MMM YYYY");

            const index = dealsData.findIndex((d: any) => d.title === title);
            if (index === -1) {
                dealsData.push({
                    id,
                    title,
                    won: stage.title === "WON" ? deal.sum.value : 0,
                    lost: stage.title === "LOST" ? deal.sum.value : 0,
                });
            } else {
                dealsData[index] = {
                    ...dealsData[index],
                    won:
                        stage.title === "WON"
                            ? dealsData[index].won + deal.sum.value
                            : dealsData[index].won,
                    lost:
                        stage.title === "LOST"
                            ? dealsData[index].lost + deal.sum.value
                            : dealsData[index].lost,
                };
            }
        });
    });

    // sort by date
    dealsData.sort((a, b) => a.id - b.id);

    return (
        <Card
            title={
                <span>
                    <DollarOutlined style={{ color: token.colorPrimary }} />
                    <Text size="sm" style={{ marginLeft: ".5rem" }}>
                        Deals
                    </Text>
                </span>
            }
            extra={
                <Button icon={<RightCircleOutlined />}>
                    See sales pipeline
                </Button>
            }
        >
            <ResponsiveContainer width="100%" height={350}>
                <BarChart
                    data={dealsData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="1" />
                    <XAxis dataKey="title" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="won" fill="#73D13D" />
                    <Bar dataKey="lost" fill="#FF4D4F" />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};
