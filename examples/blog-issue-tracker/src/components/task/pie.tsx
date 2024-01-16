import { Pie, PieConfig } from "@ant-design/charts";
import React from "react";

interface ChartProps {
    data: {
        type: any; // eslint-disable-line
        value: any; // eslint-disable-line
    }[];
}

export const TaskChart: React.FC<ChartProps> = ({ data }) => {
    const config = {
        data: data,
        angleField: "value",
        colorField: "type",
        radius: 0.9,
        label: {
            text: "value",
            fontSize: 14,
            textAlign: "center",
            position: "inside",
            render: (_, datum) => `${datum.value}`,
            // render: (_, datum) => {
            //     const percent = (datum.value / data.length) * 100;
            //     console.log("percent: ", percent);
            //     return `${percent.toFixed(2)} %`;
            // },
        },
        interaction: {
            tooltip: true,
            elementHighlight: true,
        },
    } as PieConfig;
    return <Pie {...config} />;
};
