import React from "react";

import {
  CheckCircleOutlined,
  MinusCircleOutlined,
  PlayCircleFilled,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Tag, type TagProps } from "antd";

import type { ContactStatus } from "@/graphql/schema.types";

type Props = {
  status: ContactStatus;
};

export const ContactStatusTag = ({ status }: Props) => {
  let icon: React.ReactNode = null;
  let color: TagProps["color"] = undefined;

  switch (status) {
    case "NEW":
    case "CONTACTED":
    case "INTERESTED":
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon = <PlayCircleOutlined />;
      color = "cyan";
      break;
    case "UNQUALIFIED":
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon = <PlayCircleOutlined />;
      color = "red";
      break;
    case "QUALIFIED":
    case "NEGOTIATION":
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon = <PlayCircleFilled />;
      color = "green";
      break;
    case "LOST":
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon = <PlayCircleFilled />;
      color = "red";
      break;
    case "WON":
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon = <CheckCircleOutlined />;
      color = "green";
      break;
    case "CHURNED":
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon = <MinusCircleOutlined />;
      color = "red";
      break;

    default:
      break;
  }

  return (
    <Tag color={color} style={{ textTransform: "capitalize" }}>
      {icon} {status.toLowerCase()}
    </Tag>
  );
};
