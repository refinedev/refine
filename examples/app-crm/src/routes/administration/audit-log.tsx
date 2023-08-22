import { DateField, FilterDropdown, List, useTable } from "@refinedev/antd";
import { Avatar, DatePicker, Input, Radio, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { ActionCell } from "../../components/audit-log/action-cell";
import { Audit } from "../../interfaces/graphql";

export const AuditLogPage = () => {
    const { tableProps } = useTable<Audit>({
        meta: {
            fields: [
                "id",
                { user: ["name", "avatarUrl"] },
                "action",
                "targetEntity",
                "targetId",
                { changes: ["field", "from", "to"] },
                "createdAt",
            ],
        },
        filters: {
            initial: [
                { field: "user.name", value: "", operator: "contains" },
                { field: "createdAt", value: [], operator: "between" },
            ],
        },
        sorters: {
            initial: [{ field: "createdAt", order: "desc" }],
        },
    });

    return (
        <List>
            <Table
                className="audit-log-table"
                {...tableProps}
                rowKey="id"
                scroll={{ x: true }}
            >
                <Table.Column
                    dataIndex="user.name"
                    title="User"
                    width="15%"
                    filterIcon={<SearchOutlined />}
                    render={(_, record: Audit) => {
                        return (
                            <Space>
                                <Avatar
                                    src={record.user?.avatarUrl}
                                    alt={record.user?.name}
                                >
                                    {record.user?.name.charAt(0) ?? "U"}
                                </Avatar>
                                {record.user?.name || "N/A"}
                            </Space>
                        );
                    }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input />
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    dataIndex="action"
                    title="Action"
                    render={(_, record: Audit) => {
                        return <ActionCell record={record} />;
                    }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Radio.Group>
                                <Radio value="CREATE">Created</Radio>
                                <Radio value="UPDATE">Updated</Radio>
                                <Radio value="DELETE">Deleted</Radio>
                            </Radio.Group>
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title="Date & Time"
                    width="15%"
                    render={(value) => (
                        <DateField
                            style={{ verticalAlign: "middle" }}
                            value={value}
                            format="MM.DD.YYYY - hh:mm"
                        />
                    )}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <DatePicker.RangePicker />
                        </FilterDropdown>
                    )}
                    sorter
                />
            </Table>
        </List>
    );
};
