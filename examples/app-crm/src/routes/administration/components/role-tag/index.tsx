import React, { type FC } from "react";

import { CrownOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import { Tag, type TagProps } from "antd";

import type { User } from "@/graphql/schema.types";

type Props = {
  role: User["role"];
};

export const RoleTag: FC<Props> = ({ role }) => {
  const variants: {
    [key in User["role"]]: {
      color: TagProps["color"];
      icon: React.ReactNode;
    };
  } = {
    ADMIN: {
      color: "red",
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon: <CrownOutlined />,
    },
    SALES_INTERN: {
      color: "blue",
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon: <UserOutlined />,
    },
    SALES_PERSON: {
      color: "geekblue",
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon: <UserOutlined />,
    },
    SALES_MANAGER: {
      color: "cyan",
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon: <StarOutlined />,
    },
  };

  const text = role.replace("_", " ").toLowerCase();

  return (
    <Tag
      style={{
        textTransform: "capitalize",
      }}
      color={variants[role].color}
      icon={variants[role].icon}
    >
      {text}
    </Tag>
  );
};
