import { FC, PropsWithChildren } from "react";

import { List, useTable } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";

import { CompaniesTableView } from "..";
import { Company } from "@interfaces";

export const CompanyList: FC<PropsWithChildren> = ({ children }) => {
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
            <List breadcrumb={false}>
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
