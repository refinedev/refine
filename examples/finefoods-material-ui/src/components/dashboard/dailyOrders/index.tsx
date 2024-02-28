import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip } from "../chartTooltip";
import dayjs from "dayjs";

type Props = {
  data: any[];
};

export const DailyOrders = (props: Props) => {
  return (
    <ResponsiveContainer width="99%">
      <BarChart
        data={props.data}
        barSize={15}
        margin={{ top: 30, right: 10, left: -15, bottom: 0 }}
      >
        <XAxis
          dataKey="date"
          tickFormatter={(value) => {
            if (props.data.length > 7) {
              return dayjs(value).format("MM/DD");
            }

            return dayjs(value).format("ddd");
          }}
        />
        <YAxis dataKey="value" />
        <Bar type="natural" dataKey="value" fill="#2196F3" />
        <Tooltip
          cursor={{
            fill: "rgba(255, 255, 255, 0.2)",
            radius: 4,
          }}
          content={
            <ChartTooltip
              labelFormatter={(label) => dayjs(label).format("MMM D, YYYY")}
            />
          }
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
