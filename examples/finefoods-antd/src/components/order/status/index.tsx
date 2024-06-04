import {
  BellOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useTranslate } from "@refinedev/core";
import { Tag } from "antd";
import { BikeIcon, BikeWhiteIcon } from "../../icons";

type OrderStatusProps = {
  status: "Pending" | "Ready" | "On The Way" | "Delivered" | "Cancelled";
};

export const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
  const t = useTranslate();
  let color;
  let icon;

  switch (status) {
    case "Pending":
      color = "orange";
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon = <ClockCircleOutlined />;
      break;
    case "Ready":
      color = "cyan";
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon = <BellOutlined />;
      break;
    case "On The Way":
      color = "blue";
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon = <BikeWhiteIcon />;
      break;
    case "Delivered":
      color = "green";
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon = <CheckCircleOutlined />;
      break;
    case "Cancelled":
      color = "red";
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon = <CloseCircleOutlined />;
      break;
  }

  return (
    <Tag color={color} icon={icon}>
      {t(`enum.orderStatuses.${status}`)}
    </Tag>
  );
};
