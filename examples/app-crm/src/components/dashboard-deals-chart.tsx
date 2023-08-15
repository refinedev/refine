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

import { Text } from "./text";

export const DashboardDealsChart: React.FC<{}> = () => {
    const { token } = theme.useToken();
    const data = [
        {
            name: "Sep",
            won: 85,
            lost: 5,
        },
        {
            name: "Oct",
            won: 80,
            lost: 10,
        },
        {
            name: "Nov",
            won: 70,
            lost: 20,
        },
        {
            name: "Dec",
            won: 60,
            lost: 30,
        },
        {
            name: "Jan",
            won: 50,
            lost: 40,
        },
        {
            name: "Feb",
            won: 40,

            lost: 50,
        },
        {
            name: "Mar",
            won: 30,
            lost: 60,
        },
        {
            name: "Apr",
            won: 20,
            lost: 70,
        },
        {
            name: "May",
            won: 10,
            lost: 80,
        },
        {
            name: "Jun",
            won: 5,
            lost: 85,
        },
        {
            name: "Jul",
            won: 0,
            lost: 90,
        },
        {
            name: "Aug",
            won: 10,
            lost: 80,
        },
    ];

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
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="1" />
                    <XAxis dataKey="name" />
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
