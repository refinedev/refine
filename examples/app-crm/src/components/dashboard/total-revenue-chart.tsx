import React from "react";
import { Card, theme } from "antd";
import { PieChart, Pie, Cell, Label } from "recharts";
import { DollarOutlined } from "@ant-design/icons";
import { useCustom } from "@refinedev/core";

import { Text } from "../text";
import { currencyNumber } from "../../utilities/currency-number";

type DealRevenueResponse = {
    realizationRevenueSum: {
        nodes: {
            title: string;
            dealsAggregate: {
                sum: {
                    value: number;
                };
            }[];
        }[];
    };
    expectedRevenueSum: {
        nodes: {
            title: string;
            dealsAggregate: {
                sum: {
                    value: number;
                };
            }[];
        }[];
    };
};

export const DashboardTotalRevenueChart: React.FC<{}> = () => {
    const { token } = theme.useToken();
    const { data, isError } = useCustom<DealRevenueResponse>({
        method: "post",
        url: "/graphql",
        meta: {
            rawQuery: `query Dashboard {
                expectedRevenueSum: dealStages(filter: { title: { eq: "WON" } }) {
                    nodes {
                    title
                    dealsAggregate {
                        sum {
                            value
                            }
                        }
                    }
                }
                realizationRevenueSum: dealStages(
                    filter: { title: { notIn: ["WON", "LOST"] } }
                ) {
                    nodes {
                    title
                    dealsAggregate {
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
        console.error("Error fetching dashboard data", isError);
        return null;
    }

    const COLORS = ["#CCCCCC", "#1677FF"];
    const totalRealizationRevenue = data?.data.realizationRevenueSum.nodes.map(
        (item) => item.dealsAggregate[0].sum.value,
    )[0];
    const totalExpectedRevenue = data?.data.expectedRevenueSum.nodes.map(
        (item) => item.dealsAggregate[0].sum.value,
    )[0];

    const totalRevenue = [
        {
            name: "Expected",
            value: totalExpectedRevenue,
        },
        {
            name: "Realization",
            value: totalRealizationRevenue,
        },
    ];

    return (
        <Card
            style={{ height: "100%" }}
            bodyStyle={{ padding: "3rem" }}
            title={
                <span>
                    <DollarOutlined style={{ color: token.colorPrimary }} />
                    <Text size="sm" style={{ marginLeft: ".5rem" }}>
                        Total revenue (yearly)
                    </Text>
                </span>
            }
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "3rem",
                }}
            >
                <PieChart width={180} height={180}>
                    <Pie
                        data={totalRevenue}
                        cx={90}
                        cy={90}
                        innerRadius={65}
                        outerRadius={85}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                    >
                        <Label
                            x={63}
                            y={90}
                            value="71%"
                            content={
                                <text
                                    style={{
                                        fontSize: ".8rem",
                                        fontWeight: "400",
                                    }}
                                >
                                    Realization
                                </text>
                            }
                        />
                        <Label
                            x={77}
                            y={120}
                            value="71%"
                            content={
                                <text
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "400",
                                    }}
                                >
                                    %
                                    {totalRealizationRevenue &&
                                        totalExpectedRevenue &&
                                        Math.round(
                                            (totalRealizationRevenue /
                                                totalExpectedRevenue) *
                                                100,
                                        )}
                                </text>
                            }
                        />
                        {totalRevenue.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                }}
            >
                {totalRevenue.map((item, index) => (
                    <div key={index}>
                        <div>
                            <span
                                style={{
                                    display: "inline-block",
                                    width: ".5rem",
                                    height: ".5rem",
                                    backgroundColor:
                                        COLORS[index % COLORS.length],
                                    marginRight: ".5rem",
                                }}
                            />
                            <Text size="xs">{item.name}</Text>
                        </div>

                        <Text size="md">
                            {item.value && currencyNumber(item.value)}
                        </Text>
                    </div>
                ))}
            </div>
        </Card>
    );
};
