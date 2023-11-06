import React from 'react';
import { Sandpack } from "@site/src/components/sandpack";

export default function NextJSRouteDefinition() {
    return (
        <Sandpack hidePreview showFiles files={{
            '/pages/_app.tsx': {
                code: AppTsxCode,
                active: true,
            },
            '/pages/my-products/index.tsx': {
                code: ListTsxCode
            },
            "/pages/my-products/[id].tsx": {
                code: ShowTsxCode
            }
        }} />
    )
}

const AppTsxCode = /* tsx */ `
import React from "react";
import type { NextPage } from "next";

import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router";

function App({ Component, pageProps }: AppProps) {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "products",
                    list: "/my-products",
                    show: "/my-products/:id",
                },
            ]}
            options={{ syncWithLocation: true }}
        >
            <Component {...pageProps} />
        </Refine>
    )
}
`.trim()

const ListTsxCode = /* jsx */ `
import { useList } from "@refinedev/core";

const ProductList = () => {
    const { data } = useList()

    return (
        <ul>
            {data.map((record) => (
                <li key={record.id}>{record.name}</li>
            ))}
        </ul>
    )
};

export default ProductList;
`.trim()

const ShowTsxCode = /* jsx */ `
import { useShow } from "@refinedev/core";

const ProductShow = () => {
    const { queryResult: { data, isLoading } } = useShow()

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
        </div>
    )
};

export default ProductShow;
`.trim()
