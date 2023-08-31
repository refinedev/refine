import { getDefaultFilter } from "@refinedev/core";
import {
    DateField,
    FilterDropdown,
    useTable,
    getDefaultSortOrder,
} from "@refinedev/antd";
import {
    Avatar,
    DatePicker,
    Input,
    Radio,
    Space,
    Table,
    Typography,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { ActionCell } from "../../components/audit-log/action-cell";
import { CustomAvatar } from "../../components";
import { Audit } from "../../interfaces/graphql";

export const AuditLogPage = () => {
    const { tableProps, filters, sorters } = useTable<Audit>({
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
        <div className="page-container">
            <Typography.Title level={3} style={{ marginBottom: "44px" }}>
                Audit Log
            </Typography.Title>
            <Table
                className="audit-log-table"
                {...tableProps}
                rowKey="id"
                scroll={{ x: true }}
                pagination={{
                    ...tableProps.pagination,
                    showTotal: (total) => {
                        return (
                            <span
                                style={{
                                    marginLeft: "54px",
                                }}
                            >
                                <span className="ant-text secondary">
                                    {total}
                                </span>{" "}
                                actions in total
                            </span>
                        );
                    },
                }}
            >
                <Table.Column
                    dataIndex="user.name"
                    title="User"
                    width="15%"
                    filterIcon={<SearchOutlined />}
                    render={(_, record: Audit) => {
                        return (
                            <Space>
                                <CustomAvatar
                                    src={record.user?.avatarUrl}
                                    name={record.user?.name}
                                />
                                {record.user?.name || "N/A"}
                            </Space>
                        );
                    }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input />
                        </FilterDropdown>
                    )}
                    defaultFilteredValue={getDefaultFilter(
                        "user.name",
                        filters,
                        "contains",
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
                    defaultFilteredValue={getDefaultFilter(
                        "action",
                        filters,
                        "eq",
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
                    defaultFilteredValue={getDefaultFilter(
                        "createdAt",
                        filters,
                        "between",
                    )}
                    defaultSortOrder={getDefaultSortOrder("createdAt", sorters)}
                />
            </Table>
        </div>
    );
};
