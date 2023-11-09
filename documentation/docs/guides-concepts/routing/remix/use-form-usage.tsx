import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export function RemixUseFormUsage() {
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
                },
                "/app/routes/my-products.$id.edit.tsx": {
                    code: EditTsxCode,
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
                            list: "/my-products",
                            edit: "/my-products/:id/edit",
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
import { useGo, useList } from "@refinedev/core";

const ProductList = () => {
    const { data, isLoading } = useList();

    const go = useGo();

    if (isLoading) return <div>Loading...</div>;

    return (
        <ul>
            {data?.data?.map((product) => (
                <li key={product.id}>
                    <span>{product.name}</span>
                    <button
                        onClick={() => {
                            go({
                                to: {
                                    resource: "products",
                                    action: "edit",
                                    id: product.id,
                                },
                            });
                        }}
                    >
                        show
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default ProductList;
`.trim();

const EditTsxCode = /* tsx */ `
import React from "react";

import { useForm } from "@refinedev/core";

const ProductEdit: React.FC = () => {
    const { formLoading, onFinish, queryResult } = useForm();
    const defaultValues = queryResult?.data?.data;

    const onSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());

        onFinish(data);
    };

    return (
        <div>
            <br />
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name">name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="name"
                        defaultValue={defaultValues?.name}
                    />
                </div>
                <button type="submit" disabled={formLoading}>
                    <span>Save</span>
                </button>
            </form>
        </div>
    );
};

export default ProductEdit;
`.trim();
