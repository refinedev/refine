import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function NextJSRouteDefinitions() {
    return (
        <Sandpack
            hidePreview
            showFiles
            files={{
                "/pages/_app.tsx": {
                    code: AppTsxCode,
                },
                "/pages/my-products/index.tsx": {
                    code: ListTsxCode,
                    active: true,
                },
            }}
        />
    );
}

const AppTsxCode = /* tsx */ `
import React from "react";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import dataProvider from "@refinedev/simple-rest";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "products",
                    list: "/my-products",
                },
            ]}
        >
            <Component {...pageProps} />
        </Refine>
    );
}

export default App;
`.trim();

const ListTsxCode = /* tsx */ `
import React from "react";

import { useTable } from "@refinedev/core";
import { parseTableParams } from "@refinedev/nextjs-router";
import dataProvider from "@refinedev/simple-rest";

export const getServerSideProps = async (context) => {
    const { pagination, filters, sorters } = parseTableParams(
        new URL(context.resolvedUrl).searchParams.toString(),
    );

    const data = await dataProvider("https://api.fake-rest.refine.dev").getList(
        {
            resource: "products",
            filters,
            pagination,
            sorters,
        },
    );

    return {
        props: { initialData: data },
    };
};

const ProductList = (props) => {
    const { initialData } = props;
    const {
        tableQueryResult,
        isLoading,
        current,
        setCurrent,
        pageSize,
        pageCount,
        filters,
        setFilters,
        sorters,
        setSorters,
    } = useTable({ queryOptions: { initialData } });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h3>Products</h3>
            <table style={{ border: "1px solid black" }}>
                <thead>
                    <tr key="header">
                        <td>id</td>
                        <td>name</td>
                        <td>categoryId</td>
                    </tr>
                </thead>
                <tbody>
                    {tableQueryResult.data?.data?.map((record) => (
                        <tr key={record.id}>
                            <td>{record.id}</td>
                            <td>{record.name}</td>
                            <td>{record.category.id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            Sorting by field:{" "}
            <b>
                {sorters[0].field}, order {sorters[0].order}
            </b>
            <br />
            <button
                onClick={() => {
                    setSorters([
                        {
                            field: "id",
                            order: sorters[0].order === "asc" ? "desc" : "asc",
                        },
                    ]);
                }}
            >
                Toggle Sort
            </button>
            <hr />
            Filtering by field:{" "}
            <b>
                {filters[0].field}, operator {filters[0].operator}, value{" "}
                {filters[0].value}
            </b>
            <br />
            <button
                onClick={() => {
                    setFilters([
                        {
                            field: "category.id",
                            operator: "eq",
                            value: filters[0].value === "1" ? "2" : "1",
                        },
                    ]);
                }}
            >
                Toggle Filter
            </button>
            <hr />
            <p>Current Page: {current}</p>
            <p>Page Size: {pageSize}</p>
            <button
                onClick={() => {
                    setCurrent(current - 1);
                }}
                disabled={current < 2}
            >
                Previous Page
            </button>
            <button
                onClick={() => {
                    setCurrent(current + 1);
                }}
                disabled={current === pageCount}
            >
                Next Page
            </button>
        </div>
    );
};

export default ProductList;
`.trim();
