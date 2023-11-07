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
                    active: true,
                },
                "/pages/my-products/index.tsx": {
                    code: ListTsxCode,
                },
                "/pages/my-products/[id].tsx": {
                    code: ShowTsxCode,
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
            <Component {...pageProps} />
        </Refine>
    );
}

export default App;
`.trim();

const ListTsxCode = /* tsx */ `
import React from "react";
import { useGo, useList } from "@refinedev/core";

const ProductList = () => {
    // We're inferring the resource from the route
    // So we call \`useList\` hook without any arguments.
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
                                    action: "show",
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

const ShowTsxCode = /* tsx */ `
import React from "react";
import { useGo, useShow } from "@refinedev/core";

const ProductShow = () => {
    const {
        queryResult: { data, isLoading },
        // We're inferring the resource and the id from the route params
        // So we can call useShow hook without any arguments.
    } = useShow();

    const go = useGo();

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <div>
                <h1>{data?.data?.name}</h1>
                <p>Material: {data?.data?.material}</p>
                <small>ID: {data?.data?.id}</small>
            </div>
            <button
                onClick={() => {
                    go({ to: { resource: "products", action: "list" } });
                }}
            >
                Go to Products list
            </button>
        </>
    );
};

export default ProductShow;
`.trim();
