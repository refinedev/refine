import React from 'react';
import { Sandpack } from "@site/src/components/sandpack";

export default function RemixRouteDefinitions() {
    return (
        <Sandpack hidePreview showFiles files={{
            '/app/root.tsx': {
                code: RootTsxCode,
                active: true,
            },
            '/app/routes/my-products._index.tsx': {
                code: ListTsxCode
            },
            "/app/routes/my-products.$id.tsx": {
                code: ShowTsxCode
            }
        }} />
    )
}

const RootTsxCode = /* tsx */ `
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
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
