import { useState } from "react";
import { HttpError } from "@refinedev/core";
import {
    AppstoreOutlined,
    PlusSquareOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { CreateButton, List, useTable } from "@refinedev/antd";
import { Form, Input, Space, Radio } from "antd";
import { Company, CompanyFilter } from "../../interfaces/graphql";
import { CompaniesTableView } from "./table-view";
import { CompaniesCardView } from "./card-view";

type View = "card" | "table";

export const CompanyListPage = () => {
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
    } = useTable<Company, HttpError, CompanyFilter>({
        onSearch: (values) => {
            return [
                {
                    field: "name",
                    operator: "contains",
                    value: values.name,
                },
            ];
        },
        filters: {
            initial: [
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
                "totalRevenue",
                { salesOwner: ["id", "name", "avatarUrl"] },
                { contacts: [{ nodes: ["id", "name", "avatarUrl"] }] },
            ],
        },
    });

    const onViewChange = (value: View) => {
        setView(value);
    };

    return (
        <List
            breadcrumb={false}
            headerButtons={() => {
                return (
                    <Space>
                        <Form
                            {...searchFormProps}
                            onChange={searchFormProps.form?.submit}
                            layout="inline"
                        >
                            <Form.Item name="name" noStyle>
                                <Input.Search
                                    size="large"
                                    placeholder="Search"
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
                <CreateButton
                    style={{
                        width: "192px",
                    }}
                    size="large"
                    type="primary"
                    icon={<PlusSquareOutlined />}
                >
                    Add new company
                </CreateButton>
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
    );
};
