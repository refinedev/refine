import React from "react";
import { Card, theme } from "antd";
import { PieChart, Pie, Cell, Label } from "recharts";
import { DollarOutlined } from "@ant-design/icons";

import { Text } from "./text";
import { currencyNumber } from "../utility/currency-number";

export const DashboardTotalRevenueChart: React.FC<{}> = () => {
    const { token } = theme.useToken();
    const data = [
        { name: "Expected", value: 7498654 },
        { name: "Realized", value: 5342041 },
    ];
    const COLORS = ["#CCCCCC", "#1677FF"];

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
                        data={data}
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
                                    71%
                                </text>
                            }
                        />
                        {data.map((entry, index) => (
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
                {data.map((item, index) => (
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

                        <Text size="md">{currencyNumber(item.value)}</Text>
                    </div>
                ))}
            </div>
        </Card>
    );
};
