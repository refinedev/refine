import * as React from 'react';
import { List, Table, TextField } from 'readmin';

export const UserList = (props: any) => {
  return (
    <List {...props}>
      <Table>
        <TextField source="id" title="ID" />
        <TextField source="firstName" title="First Name" />
        <TextField source="lastName" title="Last Name" />
        <TextField source="status" title="Status" />
      </Table>
    </List>
  );
};
