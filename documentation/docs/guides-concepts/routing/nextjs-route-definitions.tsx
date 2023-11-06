import React from 'react';
import { Sandpack } from "@site/src/components/sandpack";

export default function NextJSRouteDefinitions() {
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
import type { NextPage } from "next";
impoty type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps): NextPage {
    return (
        <Component {...pageProps} />
    )
}
`.trim()

const ListTsxCode = /* tsx */ `
const ProductList = () => {
    return (
        <h1>Product List Page</h1>
    )
};

export default ProductList;
`.trim()

const ShowTsxCode = /* tsx */ `

const ProductShow = () => {
    return (
        <h1>Product Show Page</h1>
    )
};

export default ProductShow;
`.trim()
