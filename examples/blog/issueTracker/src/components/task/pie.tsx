import React from "react";
import { Pie } from "@ant-design/charts";

interface ChartProps {
  data: {
    type: any;
    value: any;
  }[];
}

export const TaskChart: React.FC<ChartProps> = ({ data }) => {
  var config = {
    data: data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: function content(_ref: any) {
        var percent = _ref.percent;
        return "".concat((percent * 100).toFixed(0), "%");
      },
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [{ type: "element-active" }],
  };
  return <Pie {...config} />;
};
