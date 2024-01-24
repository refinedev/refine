import { Pie, PieConfig } from "@ant-design/charts";
import React from "react";

interface ChartProps {
    data: {
        type: any; // eslint-disable-line
        value: any; // eslint-disable-line
    }[];
}

export const TaskChart: React.FC<ChartProps> = ({ data }) => {
    const config: PieConfig = {
        data: data,
        angleField: "value",
        colorField: "type",
        radius: 0.9,
        label: {
            text: "value",
            fontSize: 14,
            textAlign: "center",
            position: "inside",
            render: (_: string, datum: { value: number }) => {
                return `${datum.value}`;
            },
        },
        interaction: {
            elementHighlight: true,
        },
    };
    return <Pie {...config} />;
};
