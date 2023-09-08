import React, { useState } from "react";
import { HttpError } from "@refinedev/core";
import { useTable, List } from "@refinedev/antd";
import { Form, Input, Radio, Space } from "antd";
import {
    UnorderedListOutlined,
    AppstoreOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import debounce from "lodash/debounce";

import { TableView, CardView } from "../../components/contact";
import { Contact } from "../../interfaces/graphql";
import { ListTitleButton } from "../../components/list-title-button";

type Props = React.PropsWithChildren<{}>;
type View = "card" | "table";

export const ContactsListPage: React.FC<Props> = ({ children }) => {
    const [view, setView] = useState<View>("table");

    const {
        tableProps,
        searchFormProps,
        setCurrent,
        setPageSize,
        filters,
        sorters,
        setFilters,
        tableQueryResult,
    } = useTable<Contact, HttpError, { name: string }>({
        pagination: {
            pageSize: 12,
        },
        sorters: {
            initial: [
                {
                    field: "id",
                    order: "desc",
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
            fields: [
                "id",
                "name",
                "email",
                {
                    company: ["id", "name", "avatarUrl"],
                },
                "jobTitle",
                "status",
                "avatarUrl",
            ],
        },
    });

    const onViewChange = (value: View) => {
        setView(value);
        setFilters([], "replace");
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
                        <Space>
                            <Form {...searchFormProps} layout="inline">
                                <Form.Item name="name" noStyle>
                                    <Input
                                        size="large"
                                        prefix={
                                            <SearchOutlined className="anticon tertiary" />
                                        }
                                        placeholder="Search by name"
                                        onChange={debouncedOnChange}
                                    />
                                </Form.Item>
                            </Form>
                            <Radio.Group
                                size="large"
                                value={view}
                                onChange={(e) => onViewChange(e.target.value)}
                            >
                                <Radio.Button value="table">
                                    <UnorderedListOutlined />
                                </Radio.Button>
                                <Radio.Button value="list">
                                    <AppstoreOutlined />
                                </Radio.Button>
                            </Radio.Group>
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
                {view === "table" ? (
                    <TableView
                        tableProps={tableProps}
                        filters={filters}
                        sorters={sorters}
                    />
                ) : (
                    <CardView
                        loading={tableQueryResult?.isFetching}
                        tableProps={tableProps}
                        setPageSize={setPageSize}
                        setCurrent={setCurrent}
                    />
                )}
                {children}
            </List>
        </div>
    );
};
