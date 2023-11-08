import React from "react";

import { useTable } from "@refinedev/core";
import { parseTableParams } from "@refinedev/nextjs-router";
import dataProvider from "@refinedev/simple-rest";

import { ProductList } from "../../components/products/list";

export const getServerSideProps = async (context) => {
    const {
        pagination: queryPagination,
        filters: queryFilters,
        sorters: querySorters,
    } = parseTableParams(context.resolvedUrl?.split("?")[1] ?? "");

    const pagination = {
        current: queryPagination.current ?? 1,
        pageSize: queryPagination.pageSize ?? 2,
    };

    const filters = queryFilters ?? [
        {
            field: "category.id",
            operator: "eq",
            value: "1",
        },
    ];

    const sorters = querySorters ?? [{ field: "id", order: "asc" }];

    const data = await dataProvider("https://api.fake-rest.refine.dev").getList(
        {
            resource: "products",
            filters,
            pagination,
            sorters,
        },
    );

    return {
        props: {
            initialData: data,
            initialProps: { pagination, filters, sorters },
        },
    };
};

const ProductListPage = (props) => {
    const {
        initialData,
        initialProps: { filters, sorters, pagination },
    } = props;

    const tableProps = useTable({
        queryOptions: { initialData },
        filters: { initial: filters },
        sorters: { initial: sorters },
        pagination,
    });

    return <ProductList tableProps={tableProps} />;
};

export default ProductListPage;
