import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { IChartDatum } from "../../interfaces";
import { formatDate } from "./DisplayBarChart";

interface RevenueChartPropsI {
  data: IChartDatum[];
}

export const RevenueChart: React.FC<RevenueChartPropsI> = ({ data }) => {
  const transformedData = data.map(({ date, value }) => ({
    date: formatDate.format(new Date(date)),
    value
  }));

  return (
    <ResponsiveContainer aspect={3.5}>
      <AreaChart data={transformedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey="value" />
        <Tooltip label="Daily Revenue" />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#cfeafc" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
