import React from "react";
import {
  BarChart,
  Legend,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { IChartDatum } from "../../interfaces";

interface DisplayBarChartPropsI {
  data: IChartDatum[];
}

export const formatDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  day: "numeric",
});

export const DisplayBarChart: React.FC<DisplayBarChartPropsI> = ({ data }) => {
  const transformedData = data.map(({ date, value }) => ({
    date: formatDate.format(new Date(date)),
    value,
  }));

  return (
    <ResponsiveContainer aspect={3.5}>
      <BarChart data={transformedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey="value" />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#ffce90" />
      </BarChart>
    </ResponsiveContainer>
  );
};
