import type { Order } from "@/types";
import { Tag } from "antd";
import { createStyles } from "antd-style";
import { Bell, CheckCircle, Truck, XCircle } from "lucide-react";

type Props = {
  value?: Order["status"];
};

export const OrderStatus = ({ value }: Props) => {
  const { styles } = useStyles();

  let color;
  let icon;
  let text;

  switch (value) {
    case "CANCELLED":
      color = "red";
      text = "Cancelled";
      icon = (
        <XCircle
          style={{
            width: "16px",
            height: "16px",
          }}
        />
      );
      break;
    case "IN_DELIVERY":
      color = "blue";
      text = "In Delivery";
      icon = (
        <Truck
          style={{
            width: "16px",
            height: "16px",
          }}
        />
      );
      break;
    case "DELIVERED":
      color = "green";
      text = "Delivered";
      icon = (
        <CheckCircle
          style={{
            width: "16px",
            height: "16px",
          }}
        />
      );
      break;
    case "READY":
      color = "cyan";
      text = "Ready";
      icon = (
        <Bell
          style={{
            width: "16px",
            height: "16px",
          }}
        />
      );
      break;
    default:
      color = "red";
      text = "Cancelled";
      icon = (
        <XCircle
          style={{
            width: "16px",
            height: "16px",
          }}
        />
      );
      break;
  }

  return (
    <Tag color={color} icon={icon} className={styles.tag}>
      {text}
    </Tag>
  );
};

const useStyles = createStyles(() => {
  return {
    tag: {
      width: "fit-content",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "4px",
      padding: "4px 8px 4px 4px",
      borderRadius: "40px",
      margin: "0",
    },
  };
});
