import { Typography } from "antd";
import { FC } from "react";

type PaginationTotalProps = {
  total: number;
  entityName: string;
};

export const PaginationTotal: FC<PaginationTotalProps> = ({
  total,
  entityName,
}) => {
  return (
    <Typography.Text
      type="secondary"
      style={{
        marginLeft: "16px",
      }}
    >
      <Typography.Text>{total}</Typography.Text> {entityName} in total
    </Typography.Text>
  );
};
