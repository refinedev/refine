import React from "react";
import {
  useTable,
  List,
  Table,
  IResourceComponentsProps,
} from "@pankod/refine";

import { IAuthUser } from "interfaces";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<IAuthUser>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column dataIndex="id" title="ID" />
      </Table>
    </List>
  );
};
