import { FC, PropsWithChildren } from "react";
import {
    CreateButton,
    DeleteButton,
    EditButton,
    FilterDropdown,
    List,
    ShowButton,
    getDefaultSortOrder,
    useSelect,
    useTable,
} from "@refinedev/antd";
import { Avatar, Form, Input, Select, Space, Table, Tooltip } from "antd";
import { PlusCircleOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Quote, QuoteFilter, QuoteStatus } from "../../interfaces/graphql";
import {
    currencyNumber,
    getNameInitials,
    getRandomColorFromString,
} from "../../utilities";
import { Text, QuoteStatusTag } from "../../components";
import dayjs from "dayjs";
import { HttpError, getDefaultFilter } from "@refinedev/core";

const statusOptions: { label: string; value: QuoteStatus }[] = [
    {
        label: "Draft",
        value: "DRAFT",
    },
    {
        label: "Sent",
        value: "SENT",
    },
    {
        label: "Accepted",
        value: "ACCEPTED",
    },
];

export const QuotesListPage: FC<PropsWithChildren> = ({ children }) => {
    const { tableProps, searchFormProps, filters, sorters } = useTable<
        Quote,
        HttpError,
        QuoteFilter
    >({
        onSearch: (values) => {
            return [
                {
                    field: "title",
                    operator: "contains",
                    value: values.title,
                },
            ];
        },
        filters: {
            initial: [
                {
                    field: "title",
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
        sorters: {
            initial: [
                {
                    field: "createdAt",
                    order: "desc",
                },
            ],
        },
        meta: {
            fields: [
                "id",
                "title",
                "status",
                "total",
                "createdAt",
                { company: ["id", "name"] },
                { contact: ["id", "name", "avatarUrl"] },
                { salesOwner: ["id", "name", "avatarUrl"] },
            ],
        },
    });

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

    return (
        <>
            <List
                breadcrumb={false}
                headerButtons={() => {
                    return (
                        <Form
                            {...searchFormProps}
                            onChange={searchFormProps.form?.submit}
                            layout="inline"
                        >
                            <Form.Item name="title" noStyle>
                                <Input.Search
                                    size="large"
                                    placeholder="Search"
                                />
                            </Form.Item>
                        </Form>
                    );
                }}
                contentProps={{
                    style: {
                        marginTop: "28px",
                    },
                }}
                title={
                    <CreateButton
                        style={{
                            width: "192px",
                        }}
                        size="large"
                        type="primary"
                        icon={<PlusSquareOutlined />}
                    >
                        Add Quote
                    </CreateButton>
                }
            >
                <Table
                    {...tableProps}
                    pagination={{
                        ...tableProps.pagination,
                        showTotal: (total) => {
                            return (
                                <span
                                    style={{
                                        marginLeft: "16px",
                                    }}
                                >
                                    <span className="ant-text secondary">
                                        {total}
                                    </span>{" "}
                                    quotes in total
                                </span>
                            );
                        },
                    }}
                    rowKey="id"
                >
                    <Table.Column
                        dataIndex="title"
                        title="Title"
                        defaultFilteredValue={getDefaultFilter(
                            "title",
                            filters,
                        )}
                        filterDropdown={(props) => (
                            <FilterDropdown {...props}>
                                <Input placeholder="Search Name" />
                            </FilterDropdown>
                        )}
                    />
                    <Table.Column<Quote>
                        dataIndex={["company", "id"]}
                        title="Company"
                        defaultFilteredValue={getDefaultFilter(
                            "company.id",
                            filters,
                            "in",
                        )}
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
                                        style={{
                                            textTransform: "uppercase",
                                            backgroundColor:
                                                getRandomColorFromString(
                                                    record.company.name,
                                                ),
                                        }}
                                    >
                                        {getNameInitials({
                                            name: record.company.name,
                                        })}
                                    </Avatar>
                                    <Text
                                        style={{
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {record.company.name}
                                    </Text>
                                </Space>
                            );
                        }}
                    />
                    <Table.Column
                        dataIndex="total"
                        title="Total Amount"
                        render={(value) => {
                            return (
                                <Text
                                    style={{
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {currencyNumber(value)}
                                </Text>
                            );
                        }}
                    />
                    <Table.Column<Quote>
                        dataIndex="status"
                        title="Stage"
                        defaultFilteredValue={getDefaultFilter(
                            "status",
                            filters,
                            "in",
                        )}
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
                        render={(value) => {
                            return <QuoteStatusTag value={value} />;
                        }}
                    />
                    <Table.Column<Quote>
                        dataIndex={["salesOwner", "id"]}
                        title="Participants"
                        filterDropdown={(props) => {
                            return (
                                <FilterDropdown {...props}>
                                    <Select
                                        style={{ width: "200px" }}
                                        placeholder="Select Sales Owner"
                                        {...selectPropsUsers}
                                    />
                                </FilterDropdown>
                            );
                        }}
                        render={(_, record) => {
                            const salesOwnerName = record.salesOwner?.name;
                            const contactName = record.contact?.name;

                            return (
                                <Space
                                    size={4}
                                    style={{
                                        textTransform: "uppercase",
                                    }}
                                >
                                    <Tooltip title={salesOwnerName}>
                                        <Avatar
                                            size="small"
                                            src={record.salesOwner?.avatarUrl}
                                            style={{
                                                backgroundColor:
                                                    getRandomColorFromString(
                                                        salesOwnerName,
                                                    ),
                                            }}
                                        >
                                            {getNameInitials({
                                                name: salesOwnerName,
                                            })}
                                        </Avatar>
                                    </Tooltip>
                                    <PlusCircleOutlined className="xs tertiary" />
                                    <Tooltip title={contactName}>
                                        <Avatar
                                            size="small"
                                            src={record.contact?.avatarUrl}
                                            style={{
                                                backgroundColor:
                                                    getRandomColorFromString(
                                                        contactName,
                                                    ),
                                            }}
                                        >
                                            {getNameInitials({
                                                name: contactName,
                                            })}
                                        </Avatar>
                                    </Tooltip>
                                </Space>
                            );
                        }}
                    />
                    <Table.Column<Quote>
                        dataIndex={"createdAt"}
                        title="Created at"
                        sorter
                        defaultSortOrder={getDefaultSortOrder(
                            "createdAt",
                            sorters,
                        )}
                        render={(value) => {
                            return <Text>{dayjs(value).fromNow()}</Text>;
                        }}
                    />
                    <Table.Column<Quote>
                        title="Actions"
                        dataIndex="actions"
                        render={(_, record) => {
                            return (
                                <Space>
                                    <ShowButton
                                        hideText
                                        size="small"
                                        recordItemId={record.id}
                                        style={{
                                            backgroundColor: "transparent",
                                        }}
                                    />
                                    <EditButton
                                        hideText
                                        size="small"
                                        recordItemId={record.id}
                                        style={{
                                            backgroundColor: "transparent",
                                        }}
                                    />
                                    <DeleteButton
                                        hideText
                                        size="small"
                                        recordItemId={record.id}
                                        style={{
                                            backgroundColor: "transparent",
                                        }}
                                    />
                                </Space>
                            );
                        }}
                    />
                </Table>
            </List>
            {children}
        </>
    );
};
