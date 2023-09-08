import { FC, PropsWithChildren, useState } from "react";
import { HttpError } from "@refinedev/core";
import { List, useTable } from "@refinedev/antd";
import { Form, Input, Space, Radio, Spin, Grid } from "antd";
import {
    AppstoreOutlined,
    SearchOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { debounce } from "lodash";

import {
    CompaniesTableView,
    CompaniesCardView,
} from "../../components/company";
import { Company } from "../../interfaces/graphql";
import { ListTitleButton } from "../../components/list-title-button";

type View = "card" | "table";

export const CompanyListPage: FC<PropsWithChildren> = ({ children }) => {
    const [view, setView] = useState<View>("card");
    const screens = Grid.useBreakpoint();

    const {
        tableProps,
        tableQueryResult,
        searchFormProps,
        filters,
        sorters,
        setCurrent,
        setPageSize,
        setFilters,
    } = useTable<Company, HttpError, { name: string }>({
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

    const onViewChange = (value: View) => {
        setView(value);
        setFilters([], "replace");
        // TODO: useForm should handle this automatically. remove this when its fixed from antd useForm.
        searchFormProps.form?.resetFields();
    };

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
                        toPath="companies"
                        buttonText="Add new company"
                    />
                }
            >
                {view === "table" ? (
                    <CompaniesTableView
                        tableProps={tableProps}
                        filters={filters}
                        sorters={sorters}
                    />
                ) : (
                    <CompaniesCardView
                        tableProps={tableProps}
                        setPageSize={setPageSize}
                        setCurrent={setCurrent}
                    />
                )}
            </List>
            {children}
        </div>
    );
};
