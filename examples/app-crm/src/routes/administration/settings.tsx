import { getDefaultFilter } from "@refinedev/core";
import { FilterDropdown, useTable } from "@refinedev/antd";
import { Card, Input, Select, Space, Table } from "antd";
import { SearchOutlined, TeamOutlined } from "@ant-design/icons";
import { CustomAvatar, RoleTag, Text } from "../../components";
import { User } from "../../interfaces/graphql";
import { Logo } from "../../components/logo";

export const SettingsPage = () => {
    return (
        <>
            <Space
                size={16}
                style={{
                    width: "100%",
                    paddingBottom: "24px",
                    borderBottom: "1px solid #D9D9D9",
                }}
            >
                <Logo width={96} height={96} />
                <Text style={{ fontSize: "32px", fontWeight: 700 }}>
                    Globex Corporation
                </Text>
            </Space>
            <div style={{ marginTop: "32px" }}>
                <UsersTable />
            </div>
        </>
    );
};

const roleOptions: {
    label: string;
    value: User["role"];
}[] = [
    {
        label: "Admin",
        value: "ADMIN",
    },
    {
        label: "Sales Intern",
        value: "SALES_INTERN",
    },
    {
        label: "Sales Person",
        value: "SALES_PERSON",
    },
    {
        label: "Sales Manager",
        value: "SALES_MANAGER",
    },
];

const UsersTable = () => {
    const { tableProps, filters } = useTable<User>({
        resource: "users",
        sorters: {
            initial: [
                {
                    field: "createdAt",
                    order: "desc",
                },
            ],
        },
        filters: {
            initial: [
                {
                    field: "jobTitle",
                    value: "",
                    operator: "contains",
                },
                {
                    field: "name",
                    value: "",
                    operator: "contains",
                },
                {
                    field: "status",
                    value: undefined,
                    operator: "in",
                },
            ],
        },
        meta: {
            fields: ["id", "name", "jobTitle", "role", "avatarUrl"],
        },
    });

    return (
        <Card
            bodyStyle={{ padding: 0 }}
            headStyle={{
                borderBottom: "1px solid #D9D9D9",
                marginBottom: "1px",
            }}
            title={
                <Space size="middle">
                    <TeamOutlined />
                    <Text>Contacts</Text>
                </Space>
            }
            extra={
                <>
                    <Text className="tertiary">Total users: </Text>
                    <Text strong>
                        {tableProps?.pagination !== false &&
                            tableProps.pagination?.total}
                    </Text>
                </>
            }
        >
            <Table {...tableProps}>
                <Table.Column<User>
                    dataIndex="name"
                    title="Name"
                    defaultFilteredValue={getDefaultFilter(
                        "name",
                        filters,
                        "contains",
                    )}
                    filterIcon={<SearchOutlined />}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input placeholder="Search Name" />
                        </FilterDropdown>
                    )}
                    render={(_, record) => {
                        return (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                }}
                            >
                                <CustomAvatar
                                    src={record.avatarUrl}
                                    name={record.name}
                                />
                                <Text>{record.name}</Text>
                            </div>
                        );
                    }}
                />
                <Table.Column
                    dataIndex="jobTitle"
                    title="Title"
                    defaultFilteredValue={getDefaultFilter(
                        "jobTitle",
                        filters,
                        "contains",
                    )}
                    filterIcon={<SearchOutlined />}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input placeholder="Search title" />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<User>
                    dataIndex="role"
                    title="Role"
                    defaultFilteredValue={getDefaultFilter(
                        "role",
                        filters,
                        "in",
                    )}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ width: "200px" }}
                                mode="multiple"
                                placeholder="Select Stage"
                                options={roleOptions}
                            />
                        </FilterDropdown>
                    )}
                    render={(_, record) => {
                        return <RoleTag role={record.role} />;
                    }}
                />
            </Table>
        </Card>
    );
};
