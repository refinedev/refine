import { useState } from "react";

import { ZoomInOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import { Text } from "@/components";
import type { Audit } from "..";

export const ActionCell = ({ record }: { record: Audit }) => {
  const [opened, setOpened] = useState(false);

  const columns: ColumnsType<Audit["changes"][0]> = [
    {
      title: "Field",
      dataIndex: "field",
      key: "field",
      render: (value) => <Text strong>{value}</Text>,
      width: "20%",
    },
    {
      title: "New value",
      dataIndex: "to",
      key: "to",
    },
  ];

  if (record.action === "UPDATE") {
    columns.push({
      title: "Old value",
      dataIndex: "from",
      key: "from",
    });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
          icon={<ZoomInOutlined />}
          onClick={() => setOpened((prev) => !prev)}
        >
          Details
        </Button>
      </div>
      {opened && (
        <Modal
          open={opened}
          onOk={() => setOpened(false)}
          onCancel={() => setOpened(false)}
          style={{ minWidth: "60vw" }}
          bodyStyle={{
            maxHeight: "500px",
            overflow: "auto",
          }}
        >
          <Table
            dataSource={record.changes}
            pagination={false}
            rowKey="field"
            bordered
            size="small"
            scroll={{ x: true }}
            columns={columns}
          />
        </Modal>
      )}
    </div>
  );
};
