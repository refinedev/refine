import type { Customer } from "@/types";
import { Tag } from "antd";
import { createStyles } from "antd-style";
import { CheckCircle, PauseCircle } from "lucide-react";

type Props = {
  value?: Customer["status"];
};

export const CustomerStatus = ({ value }: Props) => {
  const { styles } = useStyles();

  let color;
  let icon;
  let text;

  switch (value) {
    case "ACTIVE":
      color = "green";
      text = "Active";
      icon = (
        <CheckCircle
          style={{
            width: "16px",
            height: "16px",
          }}
        />
      );
      break;
    case "IDLE":
      color = "red";
      text = "IDLE";
      icon = (
        <PauseCircle
          style={{
            width: "16px",
            height: "16px",
          }}
        />
      );
      break;

    default:
      color = "red";
      text = "IDLE";
      icon = (
        <PauseCircle
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
      width: "max-content",
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
