import React, { useState } from "react";

import { List, useTable } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

import {
    AppstoreOutlined,
    SearchOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { Form, Grid, Input, Radio, Space, Spin } from "antd";
import debounce from "lodash/debounce";

import { ListTitleButton } from "@/components";
import { ContactsListQuery } from "@/graphql/types";

import { CardView, TableView } from "./components";
import { CONTACTS_LIST_QUERY } from "./queries";

type Props = React.PropsWithChildren;
type View = "card" | "table";

export const ContactsListPage: React.FC<Props> = ({ children }) => {
    const [view, setView] = useState<View>("table");
    const screens = Grid.useBreakpoint();

    const {
        tableProps,
        searchFormProps,
        setCurrent,
        setPageSize,
        filters,
        sorters,
        setFilters,
        tableQueryResult,
    } = useTable<
        GetFieldsFromList<ContactsListQuery>,
        HttpError,
        { name: string }
    >({
        pagination: {
            pageSize: 12,
        },
        sorters: {
            initial: [
                {
                    field: "createdAt",
                    order: "asc",
                },
            ],
        },
        filters: {
            initial: [
                {
                    field: "name",
                    value: undefined,
                    operator: "contains",
                },
                {
                    field: "email",
                    value: undefined,
                    operator: "contains",
                },
                {
                    field: "company.id",
                    value: undefined,
                    operator: "eq",
                },
                {
                    field: "jobTitle",
                    value: undefined,
                    operator: "contains",
                },
                {
                    field: "status",
                    value: undefined,
                    operator: "in",
                },
            ],
        },
        onSearch: (values) => {
            return [
                {
                    field: "name",
                    operator: "contains",
                    value: values.name,
                },
            ];
        },
        meta: {
            gqlQuery: CONTACTS_LIST_QUERY,
        },
    });

    const onViewChange = (value: View) => {
        setView(value);
        setFilters([], "replace");
        // TODO: useForm should handle this automatically. remove this when its fixed from antd useForm.
        searchFormProps.form?.resetFields();
    };

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchFormProps?.onFinish?.({
            name: e.target.value,
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
                            {!screens.xs ? (
                                <Radio.Group
                                    size="large"
                                    value={view}
                                    onChange={(e) =>
                                        onViewChange(e.target.value)
                                    }
                                >
                                    <Radio.Button value="table">
                                        <UnorderedListOutlined />
                                    </Radio.Button>
                                    <Radio.Button value="card">
                                        <AppstoreOutlined />
                                    </Radio.Button>
                                </Radio.Group>
                            ) : null}
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
                        toPath="contacts"
                        buttonText="Add new contact"
                    />
                }
            >
                {screens.xs || view === "card" ? (
                    <CardView
                        tableProps={tableProps}
                        setPageSize={setPageSize}
                        setCurrent={setCurrent}
                    />
                ) : (
                    <TableView
                        tableProps={tableProps}
                        filters={filters}
                        sorters={sorters}
                    />
                )}
                {children}
            </List>
        </div>
    );
};
