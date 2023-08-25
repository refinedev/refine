import {
    DeleteButton,
    FilterDropdown,
    ShowButton,
    getDefaultSortOrder,
    useSelect,
} from "@refinedev/antd";
import { CrudFilters, CrudSorting, getDefaultFilter } from "@refinedev/core";
import { Avatar, Select, Space, Table, TableProps, Tooltip } from "antd";
import {
    currencyNumber,
    getNameInitials,
    getRandomColorFromString,
} from "../../utilities";
import { Text } from "../../components";
import { Company } from "../../interfaces/graphql";
import { FC } from "react";

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
                            <Avatar
                                size="small"
                                src={record.avatarUrl}
                                style={{
                                    textTransform: "uppercase",
                                    backgroundColor: getRandomColorFromString(
                                        record.name,
                                    ),
                                }}
                            >
                                {getNameInitials({
                                    name: record.name,
                                })}
                            </Avatar>
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
                            <Avatar
                                size="small"
                                src={salesOwner.avatarUrl}
                                style={{
                                    textTransform: "uppercase",
                                    backgroundColor: getRandomColorFromString(
                                        salesOwner.name,
                                    ),
                                }}
                            >
                                {getNameInitials({
                                    name: salesOwner.name,
                                })}
                            </Avatar>
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
                                        <Avatar
                                            src={contact.avatarUrl}
                                            size="small"
                                            style={{
                                                textTransform: "uppercase",
                                                backgroundColor:
                                                    getRandomColorFromString(
                                                        contact.name,
                                                    ),
                                            }}
                                        >
                                            {getNameInitials({
                                                name: contact.name,
                                            })}
                                        </Avatar>
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
