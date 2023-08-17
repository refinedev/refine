import React from "react";
import { Card, Button, theme } from "antd";
import { PieChart, Pie, Cell } from "recharts";
import { ProjectOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useCustom, useNavigation } from "@refinedev/core";

import { Text } from "../text";

type TaskStagesResponse = {
    taskStages: {
        nodes: {
            title: string;
            tasksAggregate: {
                count: {
                    id: number;
                };
            }[];
        }[];
    };
};

export const DashboardTasksChart: React.FC<{}> = () => {
    const { token } = theme.useToken();
    const { list } = useNavigation();
    const { data, isLoading, isError } = useCustom<TaskStagesResponse>({
        method: "post",
        url: "/graphql",
        meta: {
            rawQuery: `query {
                taskStages {
                  nodes {
                    title
                    tasksAggregate {
                      count {
                        id
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

    const { taskStages } = data.data;
    const tasksData = taskStages.nodes.map((stage) => ({
        title: stage.title,
        value: stage.tasksAggregate[0].count.id,
    }));

    const COLORS = [
        "#BAE0FF",
        "#69B1FF",
        "#1677FF",
        "#0958D9",
        "#10239E",
        "#061178",
        "#030852",
        "#03052E",
        "#000B0A",
        "#000000",
    ];

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
                <Button
                    onClick={() => list("kanban")}
                    icon={<RightCircleOutlined />}
                >
                    See kanban board
                </Button>
            }
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                }}
            >
                <PieChart width={272} height={231}>
                    <Pie
                        data={tasksData}
                        cx={132}
                        cy={110}
                        innerRadius={55}
                        outerRadius={110}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                    >
                        {tasksData.map((entry, index) => (
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
                    {tasksData.map((item, index) => (
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
                            <Text size="md">{item.title}</Text>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};
