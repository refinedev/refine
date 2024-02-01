import { FC, PropsWithChildren } from "react";

import {
    DeleteButton,
    EditButton,
    FilterDropdown,
    getDefaultSortOrder,
    List,
    ShowButton,
    useTable,
} from "@refinedev/antd";
import { getDefaultFilter, HttpError } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

import { SearchOutlined } from "@ant-design/icons";
import { Form, Grid, Input, Select, Space, Spin, Table } from "antd";
import dayjs from "dayjs";
import debounce from "lodash/debounce";

import {
    CustomAvatar,
    ListTitleButton,
    PaginationTotal,
    Participants,
    QuoteStatusTag,
    Text,
} from "@/components";
import { Quote, QuoteStatus } from "@/graphql/schema.types";
import { QuotesTableQuery } from "@/graphql/types";
import { useCompaniesSelect } from "@/hooks/useCompaniesSelect";
import { useUsersSelect } from "@/hooks/useUsersSelect";
import { currencyNumber } from "@/utilities";

import { QUOTES_TABLE_QUERY } from "./queries";

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
    const screens = Grid.useBreakpoint();

    const { tableProps, searchFormProps, filters, sorters, tableQueryResult } =
        useTable<
            GetFieldsFromList<QuotesTableQuery>,
            HttpError,
            { title: string }
        >({
            resource: "quotes",
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
                gqlQuery: QUOTES_TABLE_QUERY,
            },
        });

    const { selectProps: selectPropsCompanies } = useCompaniesSelect();

    const { selectProps: selectPropsUsers } = useUsersSelect();
    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchFormProps?.onFinish?.({
            title: e.target.value ?? "",
        });
    };

    const debouncedOnChange = debounce(onSearch, 500);

    return (
        <div className="page-container">
            <List
                breadcrumb={false}
                headerButtons={() => {
                    return (
                        <Space
                            style={{
                                marginTop: screens.xs ? "1.6rem" : undefined,
                            }}
                        >
                            <Form {...searchFormProps} layout="inline">
                                <Form.Item name="title" noStyle>
                                    <Input
                                        size="large"
                                        prefix={
                                            <SearchOutlined className="anticon tertiary" />
                                        }
                                        suffix={
                                            <Spin
                                                size="small"
                                                spinning={
                                                    tableQueryResult.isFetching
                                                }
                                            />
                                        }
                                        placeholder="Search by name"
                                        onChange={debouncedOnChange}
                                    />
                                </Form.Item>
                            </Form>
                        </Space>
                    );
                }}
                contentProps={{
                    style: {
                        marginTop: "28px",
                    },
                }}
                title={
                    <ListTitleButton buttonText="Add quote" toPath="quotes" />
                }
            >
                <Table
                    {...tableProps}
                    pagination={{
                        ...tableProps.pagination,
                        showTotal: (total) => (
                            <PaginationTotal
                                total={total}
                                entityName="quotes"
                            />
                        ),
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
                                    <CustomAvatar
                                        shape="square"
                                        name={record.company.name}
                                        src={record.company.avatarUrl}
                                    />
                                    <Text style={{ whiteSpace: "nowrap" }}>
                                        {record.company.name}
                                    </Text>
                                </Space>
                            );
                        }}
                    />
                    <Table.Column
                        dataIndex="total"
                        title="Total Amount"
                        sorter
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
                            return <QuoteStatusTag status={value} />;
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
                            return (
                                <Participants
                                    userOne={record.salesOwner}
                                    userTwo={record.contact}
                                />
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
                        fixed="right"
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
        </div>
    );
};
