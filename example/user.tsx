import * as React from 'react';
import { List, Table, Column } from '../.';

export const UserList = (props: any) => {
  return (
    <List {...props}>
      <Table>
        <Column key="id" title="ID" dataIndex="id" />
        <Column key="firstName" title="First Name" dataIndex="firstName" />
        <Column key="lastName" title="Last Name" dataIndex="lastName" />
        <Column key="email" title="Email" dataIndex="email" />
        <Column key="status" title="Status" dataIndex="status" />
      </Table>
    </List>
  );
};
