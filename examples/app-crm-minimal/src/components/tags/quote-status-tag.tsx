import React from "react";

import {
  CheckCircleOutlined,
  ExpandOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";

import type { QuoteStatus } from "@/graphql/schema.types";

const variant: Record<
  QuoteStatus,
  { color: string; icon: React.ReactElement }
> = {
  DRAFT: {
    color: "blue",
    // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
    icon: <ExpandOutlined />,
  },
  SENT: {
    color: "cyan",
    // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
    icon: <SendOutlined />,
  },
  ACCEPTED: {
    color: "green",
    // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
    icon: <CheckCircleOutlined />,
  },
};

type Props = {
  status: QuoteStatus;
};

export const QuoteStatusTag = ({ status }: Props) => {
  return (
    <Tag
      style={{
        textTransform: "capitalize",
      }}
      color={variant[status].color}
      icon={variant[status].icon}
    >
      {status.toLowerCase()}
    </Tag>
  );
};
