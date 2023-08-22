import { useState } from "react";
import { DownCircleOutlined } from "@ant-design/icons";
import { TagProps, Space, Tag, Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";

import { Text } from "../text";
import { Audit, AuditChange } from "../../interfaces/graphql";

const getActionColor = (action: string): TagProps["color"] => {
    switch (action) {
        case "CREATE":
            return "green";
        case "UPDATE":
            return "cyan";
        case "DELETE":
            return "red";
        default:
            return "default";
    }
};

const getEntityId = (changes: Audit["changes"]) => {
    const idField = changes.find((change) => change.field === "id");

    if (idField) {
        return idField.to;
    }

    return "N/A";
};

export const ActionCell = ({ record }: { record: Audit }) => {
    const [opened, setOpened] = useState(false);

    const columns: ColumnsType<AuditChange> = [
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
                <Space>
                    <Tag color={getActionColor(record.action)}>
                        {record.action.charAt(0) +
                            record.action.slice(1).toLowerCase()}
                    </Tag>
                    <span>
                        <Text strong>{record.targetEntity}</Text> with id{" "}
                        <Text strong>{getEntityId(record.changes)}</Text>
                    </span>
                </Space>
                <Button
                    size="small"
                    icon={<DownCircleOutlined />}
                    onClick={() => setOpened((prev) => !prev)}
                >
                    Details
                </Button>
            </div>
            {opened && (
                <Table
                    dataSource={record.changes}
                    pagination={false}
                    rowKey="field"
                    bordered
                    size="small"
                    scroll={{ x: true }}
                    columns={columns}
                />
            )}
        </div>
    );
};
