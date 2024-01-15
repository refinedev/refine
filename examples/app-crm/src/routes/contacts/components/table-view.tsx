import {
    DeleteButton,
    FilterDropdown,
    getDefaultSortOrder,
    ShowButton,
} from "@refinedev/antd";
import { CrudFilters, CrudSorting, getDefaultFilter } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

import { PhoneOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space, Table, type TableProps } from "antd";

import {
    ContactStatusTag,
    CustomAvatar,
    PaginationTotal,
    Text,
} from "@/components";
import { ContactStatusEnum } from "@/enums";
import { Contact } from "@/graphql/schema.types";
import { ContactsListQuery } from "@/graphql/types";
import { useCompaniesSelect } from "@/hooks/useCompaniesSelect";

type Props = {
    tableProps: TableProps<GetFieldsFromList<ContactsListQuery>>;
    filters: CrudFilters;
    sorters: CrudSorting;
};

const statusOptions = Object.keys(ContactStatusEnum).map((key) => ({
    label: `${key[0]}${key.slice(1).toLowerCase()}`,
    value: ContactStatusEnum[key as keyof typeof ContactStatusEnum],
}));

export const TableView: React.FC<Props> = ({
    tableProps,
    filters,
    sorters,
}) => {
    const { selectProps } = useCompaniesSelect();

    return (
        <Table
            {...tableProps}
            pagination={{
                ...tableProps.pagination,
                pageSizeOptions: ["12", "24", "48", "96"],
                showTotal: (total) => (
                    <PaginationTotal total={total} entityName="contacts" />
                ),
            }}
            rowKey="id"
        >
            <Table.Column
                dataIndex="name"
                title="Name"
                width={200}
                defaultFilteredValue={getDefaultFilter("name", filters)}
                defaultSortOrder={getDefaultSortOrder("name", sorters)}
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Input placeholder="Search Name" />
                    </FilterDropdown>
                )}
                render={(_, record: Contact) => {
                    return (
                        <Space>
                            <CustomAvatar
                                src={record.avatarUrl}
                                name={record.name}
                            />
                            <Text>{record.name}</Text>
                        </Space>
                    );
                }}
            />
            <Table.Column
                dataIndex="email"
                title="Email"
                defaultFilteredValue={getDefaultFilter("email", filters)}
                defaultSortOrder={getDefaultSortOrder("email", sorters)}
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Input placeholder="Search Email" />
                    </FilterDropdown>
                )}
            />
            <Table.Column
                dataIndex={["company", "id"]}
                title="Company"
                defaultFilteredValue={getDefaultFilter("company.id", filters)}
                defaultSortOrder={getDefaultSortOrder("company.id", sorters)}
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Select
                            placeholder="Search Company"
                            style={{ width: 220 }}
                            {...selectProps}
                        />
                    </FilterDropdown>
                )}
                render={(_, record: Contact) => {
                    return <span>{record?.company.name}</span>;
                }}
            />
            <Table.Column
                dataIndex="jobTitle"
                title="Title"
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Input placeholder="Search Title" />
                    </FilterDropdown>
                )}
            />
            <Table.Column
                dataIndex="status"
                title="Status"
                sorter
                defaultFilteredValue={getDefaultFilter("status", filters)}
                defaultSortOrder={getDefaultSortOrder("status", sorters)}
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Select
                            style={{ width: "200px" }}
                            defaultValue={null}
                            mode="multiple"
                            options={statusOptions}
                        ></Select>
                    </FilterDropdown>
                )}
                render={(value: ContactStatusEnum) => (
                    <ContactStatusTag status={value} />
                )}
            />
            <Table.Column<Contact>
                fixed="right"
                title="Actions"
                dataIndex="actions"
                render={(_, record) => (
                    <Space>
                        <ShowButton
                            hideText
                            size="small"
                            recordItemId={record.id}
                        />
                        <Button
                            size="small"
                            href="tel:1234567890"
                            icon={<PhoneOutlined />}
                        />
                        <DeleteButton
                            hideText
                            size="small"
                            recordItemId={record.id}
                        />
                    </Space>
                )}
            />
        </Table>
    );
};
