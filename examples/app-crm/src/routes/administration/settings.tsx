import { FilterDropdown, useTable } from "@refinedev/antd";
import { getDefaultFilter } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

import {
    EnvironmentOutlined,
    GlobalOutlined,
    MailOutlined,
    PhoneOutlined,
    SearchOutlined,
    ShopOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { Card, Col, Input, Row, Select, Space, Table } from "antd";
import cn from "classnames";

import { CustomAvatar, Logo, Text } from "@/components";
import { User } from "@/graphql/schema.types";
import { AdministrationUsersQuery } from "@/graphql/types";

import { RoleTag } from "./components";
import { ADMINISTRATION_USERS_QUERY } from "./queries";
import styles from "./settings.module.css";

export const SettingsPage = () => {
    return (
        <div className="page-container">
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
            <Row
                gutter={[32, 32]}
                style={{
                    marginTop: 32,
                }}
            >
                <Col
                    xs={{ span: 24 }}
                    md={{ span: 24 }}
                    lg={{ span: 24 }}
                    xl={{ span: 16 }}
                >
                    <UsersTable />
                </Col>
                <Col
                    xs={{ span: 24 }}
                    md={{ span: 24 }}
                    lg={{ span: 24 }}
                    xl={{ span: 8 }}
                >
                    <CompanyInfo />
                </Col>
            </Row>
        </div>
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
    const { tableProps, filters } = useTable<
        GetFieldsFromList<AdministrationUsersQuery>
    >({
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
            gqlQuery: ADMINISTRATION_USERS_QUERY,
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

const companyInfo = [
    {
        label: "Address",
        value: "2158 Mount Tabor, Westbury, New York, USA 11590",
        icon: <EnvironmentOutlined className="tertiary" />,
    },
    {
        label: "Phone",
        value: "+123 456 789 01 23",
        icon: <PhoneOutlined className="tertiary" />,
    },
    {
        label: "Email",
        value: "info@globexcorp.com",
        icon: <MailOutlined className="tertiary" />,
    },
    {
        label: "Website",
        value: "https://globexcorp.com",
        icon: <GlobalOutlined className="tertiary" />,
    },
];

export const CompanyInfo = () => {
    return (
        <Card
            title={
                <Space>
                    <ShopOutlined />
                    <Text>Company info</Text>
                </Space>
            }
            headStyle={{
                padding: "1rem",
            }}
            bodyStyle={{
                padding: "0",
            }}
        >
            <div className={styles.list}>
                {companyInfo.map((item) => {
                    return (
                        <div key={item.label} className={styles.listItem}>
                            <div>{item.icon}</div>
                            <div className={styles.listItemContent}>
                                <Text size="xs" className="tertiary">
                                    {item.label}
                                </Text>
                                <Text
                                    className={cn(
                                        styles.listItemContent,
                                        "primary",
                                    )}
                                >
                                    {item.value}
                                </Text>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};
