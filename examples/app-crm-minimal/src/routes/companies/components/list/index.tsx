import { FC, PropsWithChildren } from "react";

import { CreateButton, List, useTable } from "@refinedev/antd";
import { HttpError, useGo } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

import { CompaniesListQuery } from "@/graphql/types";

import { CompaniesTableView } from "..";

import { COMPANIES_LIST_QUERY } from "./queries";

export const CompanyList: FC<PropsWithChildren> = ({ children }) => {
    const go = useGo();

    const { tableProps, filters, sorters } = useTable<
        GetFieldsFromList<CompaniesListQuery>,
        HttpError,
        GetFieldsFromList<CompaniesListQuery>
    >({
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
            ],
        },
        pagination: {
            pageSize: 12,
        },
        meta: {
            gqlQuery: COMPANIES_LIST_QUERY,
        },
    });

    return (
        <div className="page-container">
            <List
                breadcrumb={false}
                headerButtons={() => {
                    return (
                        <CreateButton
                            onClick={() => {
                                // modal is a opening from the url (/companies/new)
                                // to open modal we need to navigate to the create page (/companies/new)
                                // we are using `go` function because we want to keep the query params
                                go({
                                    to: {
                                        resource: "companies",
                                        action: "create",
                                    },
                                    options: {
                                        keepQuery: true,
                                    },
                                    type: "replace",
                                });
                            }}
                        />
                    );
                }}
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
