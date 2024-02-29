import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineProps,
} from "recharts";

import { ChartTooltip } from "../chartTooltip";
import dayjs from "dayjs";

type Props = {
  data: LineProps["data"];
};

export const DailyRevenue = (props: Props) => {
  const data = props.data || [];

  return (
    <ResponsiveContainer width="99%">
      <LineChart
        data={data}
        margin={{ top: 30, right: 10, left: 10, bottom: 0 }}
      >
        <XAxis
          dataKey="date"
          tickFormatter={(value) => {
            if (data.length > 7) {
              return dayjs(value).format("MM/DD");
            }

            return dayjs(value).format("ddd");
          }}
        />
        <YAxis
          dataKey="value"
          tickFormatter={(value) => {
            return `$${Number(value) / 1000}k`;
          }}
        />
        <Line
          type="natural"
          dataKey="value"
          stroke="#2196F3"
          dot={false}
          strokeWidth={2}
        />
        <Tooltip
          content={
            <ChartTooltip
              valueFormatter={(value) =>
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(Number(value))
              }
              labelFormatter={(label) => dayjs(label).format("MMM D, YYYY")}
            />
          }
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
