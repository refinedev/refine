import { FC, PropsWithChildren } from "react";

import { List, useTable } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";

import { SearchOutlined } from "@ant-design/icons";
import { Form, Grid, Input, Space, Spin } from "antd";
import debounce from "lodash/debounce";

import { ListTitleButton } from "@components";
import { CompaniesTableView } from "..";

import { Company } from "@interfaces";

export const CompanyList: FC<PropsWithChildren> = ({ children }) => {
    const screens = Grid.useBreakpoint();

    const { tableProps, tableQueryResult, searchFormProps, filters, sorters } =
        useTable<Company, HttpError, { name: string }>({
            resource: "companies",
            onSearch: (values) => {
                return [
                    {
                        field: "name",
                        operator: "contains",
                        value: values.name,
                    },
                ];
            },
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
                        field: "name",
                        operator: "contains",
                        value: undefined,
                    },
                    {
                        field: "contacts.id",
                        operator: "in",
                        value: undefined,
                    },
                ],
            },
            pagination: {
                pageSize: 12,
            },
            meta: {
                to: "undefined",
                fields: [
                    "id",
                    "name",
                    "avatarUrl",
                    {
                        dealsAggregate: [
                            {
                                sum: ["value"],
                            },
                        ],
                    },
                    { salesOwner: ["id", "name", "avatarUrl"] },
                    { contacts: [{ nodes: ["id", "name", "avatarUrl"] }] },
                ],
            },
        });

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchFormProps?.onFinish?.({
            name: e.target.value ?? "",
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
                                <Form.Item name="name" noStyle>
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
                    <ListTitleButton
                        toPath="companies"
                        buttonText="Add new company"
                    />
                }
            >
                <CompaniesTableView
                    tableProps={tableProps}
                    filters={filters}
                    sorters={sorters}
                />
            </List>
            {children}
        </div>
    );
};
