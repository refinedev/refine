import React from "react";
import { Card, Button, theme } from "antd";
import { PieChart, Pie, Cell } from "recharts";
import { ProjectOutlined, RightCircleOutlined } from "@ant-design/icons";

import { Text } from "./text";

export const DashboardTasksChart: React.FC<{
    data: { title: string; value: number }[];
}> = ({ data = [] }) => {
    const { token } = theme.useToken();
    const COLORS = ["#BAE0FF", "#69B1FF", "#1677FF", "#0958D9", "#10239E"];

    return (
        <Card
            title={
                <span>
                    <ProjectOutlined style={{ color: token.colorPrimary }} />
                    <Text size="sm" style={{ marginLeft: ".5rem" }}>
                        Tasks
                    </Text>
                </span>
            }
            extra={
                <Button icon={<RightCircleOutlined />}>See kanban board</Button>
            }
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                }}
            >
                <PieChart width={272} height={248}>
                    <Pie
                        data={data}
                        cx={132}
                        cy={120}
                        innerRadius={60}
                        outerRadius={120}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                </PieChart>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        paddingTop: "2rem",
                        paddingBottom: "2rem",
                    }}
                >
                    {data.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: 8,
                            }}
                        >
                            <div
                                style={{
                                    width: 8,
                                    height: 8,
                                    backgroundColor: COLORS[index],
                                    marginRight: ".5rem",
                                }}
                            />
                            <Text size="md">{item.name}</Text>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};
