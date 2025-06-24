import React from "react";
import { List } from "@refinedev/antd";
import { Table } from "antd";

export const FeedbackList: React.FC = () => {
  const data = [
    { id: 1, message: "Great service!", user: "Alice" },
    { id: 2, message: "Loved the food!", user: "Bob" },
    { id: 3, message: "Quick delivery", user: "Charlie" },
  ];

  return (
    <List title="Feedbacks">
      <Table dataSource={data} rowKey="id" pagination={false}>
        <Table.Column dataIndex="id" title="ID" key="id" />
        <Table.Column dataIndex="message" title="Message" key="message" />
        <Table.Column dataIndex="user" title="User" key="user" />
      </Table>
    </List>
  );
};
