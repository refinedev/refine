import { FC, PropsWithChildren } from "react";

import { CreateButton, List, useTable } from "@refinedev/antd";
import { HttpError, useGetToPath, useGo } from "@refinedev/core";

import { CompaniesTableView } from "..";
import { Company } from "@/interfaces";

export const CompanyList: FC<PropsWithChildren> = ({ children }) => {
    const getToPath = useGetToPath();
    const go = useGo();

    const { tableProps, filters, sorters } = useTable<
        Company,
        HttpError,
        { name: string }
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
            ],
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
                                // modal is a opening from the url (/companies/create)
                                // to open modal we need to navigate to the create page (/companies/create)
                                // we are using `go` function because we want to keep the query params
                                go({
                                    to: getToPath({
                                        action: "create",
                                    }),
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
