import type { FC } from "react";

import type { GetFieldsFromList } from "@refinedev/nestjs-query";

import { PlusCircleOutlined } from "@ant-design/icons";
import { Space, Tooltip } from "antd";

import type { UsersSelectQuery } from "@/graphql/types";

import { CustomAvatar } from "../custom-avatar";

type Props = {
  userOne: GetFieldsFromList<UsersSelectQuery>;
  userTwo: GetFieldsFromList<UsersSelectQuery>;
};

export const Participants: FC<Props> = ({ userOne, userTwo }) => {
  return (
    <Space
      size={4}
      style={{
        textTransform: "uppercase",
      }}
    >
      <Tooltip title={userOne.name}>
        <CustomAvatar
          size="small"
          src={userOne.avatarUrl}
          name={userOne.name}
        />
      </Tooltip>
      {/* @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66 */}
      <PlusCircleOutlined className="xs tertiary" />
      <Tooltip title={userTwo.name}>
        <CustomAvatar
          size="small"
          src={userTwo.avatarUrl}
          name={userTwo.name}
        />
      </Tooltip>
    </Space>
  );
};
