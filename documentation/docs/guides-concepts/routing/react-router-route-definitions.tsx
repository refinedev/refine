import React from 'react';
import { Sandpack } from "@site/src/components/sandpack";

export default function ReactRouterRouteDefinitions() {
    return (
        <Sandpack hidePreview showFiles files={{
            '/src/App.tsx': {
                code: AppTsxCode,
                active: true,
            },
            '/src/pages/my-products/list.tsx': {
                code: ListTsxCode
            },
            "/src/pages/my-products/show.tsx": {
                code: ShowTsxCode
            }
        }} />
    )
}

const AppTsxCode = /* tsx */ `
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProductList } from "./pages/my-products/list";
import { ProductShow } from "./pages/my-products/show";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/my-products" element={<ProductList />} />
                <Route path="/my-products/:id" element={<ProductShow />} />
            </Routes>
        </BrowserRouter>
    )
}
`.trim()

const ListTsxCode = /* tsx */ `
export const ProductList = () => {
    return (
        <h1>Product List Page</h1>
    )
};
`.trim()

const ShowTsxCode = /* tsx */ `

export const ProductShow = () => {
    return (
        <h1>Product Show Page</h1>
    )
};
`.trim()
