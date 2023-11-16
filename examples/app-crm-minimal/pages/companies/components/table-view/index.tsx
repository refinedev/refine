import { FC } from "react";

import { DeleteButton, EditButton, FilterDropdown } from "@refinedev/antd";
import { CrudFilters, CrudSorting, getDefaultFilter } from "@refinedev/core";

import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Space, Table, TableProps } from "antd";

import { CustomAvatar, PaginationTotal, Text } from "@components";
import { Company } from "@interfaces";
import { currencyNumber } from "@utilities";

type Props = {
    tableProps: TableProps<Company>;
    filters: CrudFilters;
    sorters: CrudSorting;
};

export const CompaniesTableView: FC<Props> = ({ tableProps, filters }) => {
    return (
        <Table
            {...tableProps}
            pagination={{
                ...tableProps.pagination,
                pageSizeOptions: ["12", "24", "48", "96"],
                showTotal: (total) => (
                    <PaginationTotal total={total} entityName="companies" />
                ),
            }}
            rowKey="id"
        >
            <Table.Column<Company>
                dataIndex="name"
                title="Company title"
                defaultFilteredValue={getDefaultFilter("id", filters)}
                filterIcon={<SearchOutlined />}
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Input placeholder="Search Company" />
                    </FilterDropdown>
                )}
                render={(_, record) => {
                    return (
                        <Space>
                            <CustomAvatar
                                shape="square"
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
                dataIndex={"totalRevenue"}
                title="Open deals amount"
                render={(_, company) => {
                    return (
                        <Text>
                            {currencyNumber(
                                company?.dealsAggregate?.[0].sum?.value || 0,
                            )}
                        </Text>
                    );
                }}
            />
            <Table.Column<Company>
                fixed="right"
                dataIndex="id"
                title="Actions"
                render={(value) => (
                    <Space>
                        <EditButton
                            icon={<EyeOutlined />}
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
