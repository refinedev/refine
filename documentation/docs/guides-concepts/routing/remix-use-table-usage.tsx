import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function RemixRouteDefinitions() {
    return (
        <Sandpack
            hidePreview
            showFiles
            files={{
                "/app/root.tsx": {
                    code: RootTsxCode,
                },
                "/app/routes/my-products._index.tsx": {
                    code: ListTsxCode,
                    active: true,
                },
            }}
        />
    );
}

const RootTsxCode = /* tsx */ `
import React from "react";

import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import dataProvider from "@refinedev/simple-rest";

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    resources={[
                        {
                            name: "products",
                            // We're defining the routes and assigning them to an action of a resource
                            list: "/products",
                            show: "/products/:id",
                            // For sake of simplicity, we are not defining other routes here but the implementation is the same
                            // create: "/products/create",
                            // edit: "/products/edit/:id",
                            // clone: "/products/clone/:id",
                        },
                    ]}
                >
                    <Outlet />
                </Refine>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
`.trim();

const ListTsxCode = /* tsx */ `
import React from "react";

import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { useTable } from "@refinedev/core";
import { parseTableParams } from "@refinedev/remix-router";
import dataProvider from "@refinedev/simple-rest";

export async function loader({ request }: LoaderArgs) {
    const url = new URL(request.url);

    const { pagination, filters, sorters } = parseTableParams(url.search);

    const data = await dataProvider("https://api.fake-rest.refine.dev").getList(
        {
            resource: "products",
            filters,
            pagination,
            sorters,
        },
    );

    return json({ initialData: data });
}

const ProductList = () => {
    const { initialData } = useLoaderData<typeof loader>();
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
