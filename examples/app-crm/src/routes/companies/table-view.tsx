import { FC } from "react";
import {
    DeleteButton,
    FilterDropdown,
    ShowButton,
    getDefaultSortOrder,
    useSelect,
} from "@refinedev/antd";
import { CrudFilters, CrudSorting, getDefaultFilter } from "@refinedev/core";
import { Avatar, Select, Space, Table, TableProps, Tooltip } from "antd";

import { Text, CustomAvatar } from "../../components";
import { currencyNumber } from "../../utilities";
import { Company } from "../../interfaces/graphql";

type Props = {
    tableProps: TableProps<Company>;
    filters: CrudFilters;
    sorters: CrudSorting;
};

export const CompaniesTableView: FC<Props> = ({
    tableProps,
    filters,
    sorters,
}) => {
    const { selectProps: selectPropsCompanies } = useSelect({
        resource: "companies",
        optionLabel: "name",
        pagination: {
            mode: "off",
        },
        meta: {
            fields: ["id", "name"],
        },
    });

    const { selectProps: selectPropsUsers } = useSelect({
        resource: "users",
        optionLabel: "name",
        pagination: {
            mode: "off",
        },
        meta: {
            fields: ["id", "name"],
        },
    });

    const { selectProps: selectPropsContacts } = useSelect({
        resource: "contacts",
        optionLabel: "name",
        pagination: {
            mode: "off",
        },
        meta: {
            fields: ["id", "name"],
        },
    });

    return (
        <Table
            {...tableProps}
            pagination={{
                ...tableProps.pagination,
                pageSizeOptions: ["12", "24", "48", "96"],
                showTotal: (total) => {
                    return (
                        <span
                            style={{
                                marginLeft: "48px",
                            }}
                        >
                            <span className="ant-text secondary">{total}</span>{" "}
                            compaines in total
                        </span>
                    );
                },
            }}
            rowKey="id"
        >
            <Table.Column<Company>
                dataIndex="id"
                title="Company title"
                defaultFilteredValue={getDefaultFilter("id", filters)}
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Select
                            placeholder="Search Company"
                            style={{ width: 220 }}
                            {...selectPropsCompanies}
                        />
                    </FilterDropdown>
                )}
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
            />
            <Table.Column<Company>
                dataIndex={["salesOwner", "id"]}
                title="Sales Owner"
                defaultFilteredValue={getDefaultFilter(
                    "salesOwner.id",
                    filters,
                )}
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Select
                            placeholder="Search Sales owner"
                            style={{ width: 220 }}
                            {...selectPropsUsers}
                        />
                    </FilterDropdown>
                )}
                render={(_, record) => {
                    const salesOwner = record.salesOwner;
                    return (
                        <Space>
                            <CustomAvatar
                                name={salesOwner.name}
                                src={salesOwner.avatarUrl}
                            />
                            <Text
                                style={{
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {salesOwner.name}
                            </Text>
                        </Space>
                    );
                }}
            />
            <Table.Column<Company>
                dataIndex={"totalRevenue"}
                title="Open deals amount"
                sorter
                defaultSortOrder={getDefaultSortOrder("totalRevenue", sorters)}
                render={(value) => {
                    return <Text>{currencyNumber(value || 0)}</Text>;
                }}
            />
            <Table.Column<Company>
                dataIndex={["contacts", "id"]}
                title="Related Contacts"
                defaultFilteredValue={getDefaultFilter(
                    "contacts.id",
                    filters,
                    "in",
                )}
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Select
                            mode="multiple"
                            placeholder="Search related contacts"
                            style={{ width: 220 }}
                            {...selectPropsContacts}
                        />
                    </FilterDropdown>
                )}
                render={(_, record: Company) => {
                    const value = record.contacts;

                    return (
                        <Avatar.Group maxCount={3} size="small">
                            {value?.nodes?.map((contact) => {
                                return (
                                    <Tooltip
                                        title={contact.name}
                                        key={contact.id}
                                    >
                                        <CustomAvatar
                                            name={contact.name}
                                            src={contact.avatarUrl}
                                        />
                                    </Tooltip>
                                );
                            })}
                        </Avatar.Group>
                    );
                }}
            />
            <Table.Column<Company>
                dataIndex="id"
                title="Actions"
                render={(value) => (
                    <Space>
                        <ShowButton
                            hideText
                            size="small"
                            recordItemId={value}
                        />

                        <DeleteButton
                            hideText
                            size="small"
                            recordItemId={value}
                        />
                    </Space>
                )}
            />
        </Table>
    );
};
