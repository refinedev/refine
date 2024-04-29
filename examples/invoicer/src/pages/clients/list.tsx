import { CreateButton, List, useTable } from "@refinedev/antd";
import { IAccounts } from "../../interfaces";
import { Table } from "antd";
import { PropsWithChildren } from "react";
import { useGo } from "@refinedev/core";

export const ClientsPageList = ({ children }: PropsWithChildren) => {
  const go = useGo();

  const { tableProps } = useTable<IAccounts>({
    queryOptions: { enabled: false },
  });

  return (
    <>
      <List
        title="Clients"
        headerButtons={() => {
          return (
            <CreateButton
              size="large"
              onClick={() =>
                go({
                  to: { resource: "clients", action: "create" },
                  options: { keepQuery: true },
                })
              }
            >
              Add new client
            </CreateButton>
          );
        }}
      >
        <Table {...tableProps}>
          <Table.Column title="ID" dataIndex="id" key="id" />
          <Table.Column title="Title" dataIndex="title" key="title" />
          <Table.Column title="Name" dataIndex="name" key="name" />
          <Table.Column title="Email" dataIndex="email" key="email" />
          <Table.Column title="Income" dataIndex="income" key="income" />
          <Table.Column title="Phone" dataIndex="phone" key="phone" />
        </Table>
      </List>
      {children}
    </>
  );
};
