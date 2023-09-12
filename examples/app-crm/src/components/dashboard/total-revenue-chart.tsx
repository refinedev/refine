import React from "react";
import { Card, Skeleton, Space } from "antd";
import { Gauge, GaugeConfig } from "@ant-design/plots";
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
    const { data, isError, error, isLoading } = useCustom<DealRevenueResponse>({
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
        console.error("Error fetching dashboard data", error);
        return null;
    }

    const totalRealizationRevenue = data?.data.realizationRevenueSum.nodes.map(
        (item) => item.dealsAggregate[0].sum.value,
    )[0];
    const totalExpectedRevenue = data?.data.expectedRevenueSum.nodes.map(
        (item) => item.dealsAggregate[0].sum.value,
    )[0];
    const realizationPercentageOfExpected =
        totalRealizationRevenue && totalExpectedRevenue
            ? (totalRealizationRevenue / totalExpectedRevenue) * 100
            : 0;

    const config: GaugeConfig = {
        animation: isLoading ? false : true,
        supportCSSTransform: true,
        // antd expects a percentage value between 0 and 1
        percent: realizationPercentageOfExpected / 100,
        range: {
            color: "l(0) 0:#D9F7BE 1:#52C41A",
        },
        axis: {
            tickLine: {
                style: {
                    stroke: "#BFBFBF",
                },
            },
            label: {
                formatter(v) {
                    return Number(v) * 100;
                },
            },
            subTickLine: {
                count: 3,
            },
        },
        indicator: {
            pointer: {
                style: {
                    fontSize: 4,
                    stroke: "#BFBFBF",
                    lineWidth: 2,
                },
            },
            pin: {
                style: {
                    r: 8,
                    lineWidth: 2,
                    stroke: "#BFBFBF",
                },
            },
        },
        statistic: {
            content: {
                formatter: (datum) => {
                    return (datum?.percent * 100).toFixed(2) + "%";
                },
                style: {
                    color: "rgba(0,0,0,0.85)",
                    fontWeight: 500,
                    fontSize: "24px",
                },
            },
        },
    };

    return (
        <Card
            style={{ height: "100%" }}
            bodyStyle={{
                padding: "0 32px 32px 32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
            headStyle={{ padding: "16px" }}
            title={
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <DollarOutlined />
                    <Text size="sm">Total revenue (yearly)</Text>
                </div>
            }
        >
            <Gauge {...config} padding={0} width={280} height={280} />

            <div
                style={{
                    display: "flex",
                    gap: "32px",
                }}
            >
                <Space direction="vertical" size={0}>
                    <Text size="xs" className="secondary">
                        Expected
                    </Text>
                    {!isLoading ? (
                        <Text
                            size="md"
                            className="primary"
                            style={{
                                minWidth: "100px",
                            }}
                        >
                            {currencyNumber(totalExpectedRevenue || 0)}
                        </Text>
                    ) : (
                        <Skeleton.Button
                            style={{
                                width: "100px",
                                height: "16px",
                                marginTop: "6px",
                            }}
                            active={true}
                        />
                    )}
                </Space>
                <Space direction="vertical" size={0}>
                    <Text size="xs" className="secondary">
                        Realized
                    </Text>
                    {!isLoading ? (
                        <Text
                            size="md"
                            className="primary"
                            style={{
                                minWidth: "100px",
                            }}
                        >
                            {currencyNumber(totalRealizationRevenue || 0)}
                        </Text>
                    ) : (
                        <Skeleton.Button
                            style={{
                                width: "100px",
                                height: "16px",
                                marginTop: "6px",
                            }}
                            active={true}
                        />
                    )}
                </Space>
            </div>
        </Card>
    );
};
