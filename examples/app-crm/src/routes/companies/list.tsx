import { FC, PropsWithChildren, useState } from "react";
import { HttpError, useNavigation } from "@refinedev/core";
import { List, useTable } from "@refinedev/antd";
import { Form, Input, Space, Radio, Button } from "antd";
import {
    AppstoreOutlined,
    PlusCircleOutlined,
    SearchOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { debounce } from "lodash";

import {
    CompaniesTableView,
    CompaniesCardView,
} from "../../components/company";
import { Company } from "../../interfaces/graphql";
import { useLocation, useNavigate } from "react-router-dom";

type View = "card" | "table";

export const CompanyListPage: FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { createUrl } = useNavigation();
    const [view, setView] = useState<View>("table");

    const {
        tableProps,
        tableQueryResult,
        searchFormProps,
        filters,
        sorters,
        setCurrent,
        setPageSize,
        pageSize,
        current,
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
    };

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchFormProps?.onFinish?.({
            name: e.target.value ?? "",
        });
    };
    const debouncedOnChange = debounce(onSearch, 500);

    return (
        <>
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
                    <Button
                        style={{
                            width: "192px",
                        }}
                        type="primary"
                        size="large"
                        icon={<PlusCircleOutlined />}
                        onClick={() =>
                            navigate(
                                `${createUrl("companies")}?to=${pathname}`,
                                {
                                    replace: true,
                                },
                            )
                        }
                    >
                        Add new company
                    </Button>
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
                        companies={tableProps.dataSource || []}
                        pagination={{
                            pageSize,
                            current,
                            total: tableQueryResult.data?.total || 0,
                            onChange: (page, pageSize) => {
                                setCurrent(page);
                                setPageSize(pageSize);
                            },
                        }}
                    />
                )}
            </List>
            {children}
        </>
    );
};
