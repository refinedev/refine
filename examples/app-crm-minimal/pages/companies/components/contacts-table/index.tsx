import { FC, useMemo } from "react";
import { useParams } from "next/navigation";
import { FilterDropdown, useTable } from "@refinedev/antd";

import {
    MailOutlined,
    PhoneOutlined,
    SearchOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { Button, Card, Input, Select, Space, Table } from "antd";

import { ContactStatusTag, CustomAvatar, Text } from "@components";
import { Contact } from "@interfaces";

type Props = {
    style?: React.CSSProperties;
};

export const CompanyContactsTable: FC<Props> = ({ style }) => {
    const params = useParams();

    const { tableProps, filters, setFilters } = useTable<Contact>({
        resource: "contacts",
        syncWithLocation: false,
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
            permanent: [
                {
                    field: "company.id",
                    operator: "eq",
                    value: params?.id as string,
                },
            ],
        },
        meta: {
            fields: [
                "id",
                "name",
                "avatarUrl",
                "jobTitle",
                "email",
                "phone",
                "status",
            ],
        },
    });

    const hasData = tableProps.loading
        ? true
        : tableProps?.dataSource?.length || 0 > 0;

    const showResetFilters = useMemo(() => {
        return filters?.filter((filter) => {
            if ("field" in filter && filter.field === "company.id") {
                return false;
            }

            if (!filter.value) {
                return false;
            }

            return true;
        });
    }, [filters]);

    return (
        <Card
            style={style}
            headStyle={{
                borderBottom: "1px solid #D9D9D9",
                marginBottom: "1px",
            }}
            bodyStyle={{ padding: 0 }}
            title={
                <Space size="middle">
                    <TeamOutlined />
                    <Text>Contacts</Text>

                    {showResetFilters?.length > 0 && (
                        <Button
                            size="small"
                            onClick={() => setFilters([], "replace")}
                        >
                            Reset filters
                        </Button>
                    )}
                </Space>
            }
            extra={
                <>
                    <Text className="tertiary">Total contacts: </Text>
                    <Text strong>
                        {tableProps?.pagination !== false &&
                            tableProps.pagination?.total}
                    </Text>
                </>
            }
        >
            {!hasData && (
                <div
                    style={{
                        padding: 16,
                        borderBottom: "1px solid #D9D9D9",
                    }}
                >
                    <Text>No contacts yet</Text>
                </div>
            )}
            {hasData && (
                <Table
                    {...tableProps}
                    rowKey="id"
                    pagination={{
                        ...tableProps.pagination,
                        showSizeChanger: false,
                    }}
                >
                    <Table.Column<Contact>
                        title="Name"
                        dataIndex="name"
                        render={(_, record) => {
                            return (
                                <Space>
                                    <CustomAvatar
                                        name={record.name}
                                        src={record.avatarUrl}
                                    />
                                    <Text
                                        style={{
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {record.name}
                                    </Text>
                                </Space>
                            );
                        }}
                        filterIcon={<SearchOutlined />}
                        filterDropdown={(props) => (
                            <FilterDropdown {...props}>
                                <Input placeholder="Search Name" />
                            </FilterDropdown>
                        )}
                    />
                    <Table.Column
                        title="Title"
                        dataIndex="jobTitle"
                        filterIcon={<SearchOutlined />}
                        filterDropdown={(props) => (
                            <FilterDropdown {...props}>
                                <Input placeholder="Search Title" />
                            </FilterDropdown>
                        )}
                    />
                    <Table.Column<Contact>
                        title="Stage"
                        dataIndex="status"
                        render={(_, record) => {
                            return <ContactStatusTag status={record.status} />;
                        }}
                        filterDropdown={(props) => (
                            <FilterDropdown {...props}>
                                <Select
                                    style={{ width: "200px" }}
                                    mode="multiple"
                                    placeholder="Select Stage"
                                    options={statusOptions}
                                ></Select>
                            </FilterDropdown>
                        )}
                    />
                    <Table.Column<Contact>
                        dataIndex="id"
                        width={112}
                        render={(value, record) => {
                            return (
                                <Space>
                                    <Button
                                        size="small"
                                        href={`mailto:${record.email}`}
                                        icon={<MailOutlined />}
                                    />
                                    <Button
                                        size="small"
                                        href={`tel:${record.phone}`}
                                        icon={<PhoneOutlined />}
                                    />
                                </Space>
                            );
                        }}
                    />
                </Table>
            )}
        </Card>
    );
};

const statusOptions: {
    label: string;
    value: Contact["status"];
}[] = [
    {
        label: "New",
        value: "NEW",
    },
    {
        label: "Qualified",
        value: "QUALIFIED",
    },
    {
        label: "Unqualified",
        value: "UNQUALIFIED",
    },
    {
        label: "Won",
        value: "WON",
    },
    {
        label: "Negotiation",
        value: "NEGOTIATION",
    },
    {
        label: "Lost",
        value: "LOST",
    },
    {
        label: "Interested",
        value: "INTERESTED",
    },
    {
        label: "Contacted",
        value: "CONTACTED",
    },
    {
        label: "Churned",
        value: "CHURNED",
    },
];
