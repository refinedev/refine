import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function ResourcesAndRoutesUsage() {
    return (
        <Sandpack
            showNavigator
            dependencies={{
                "@refinedev/core": "latest",
                "@refinedev/simple-rest": "latest",
                "@refinedev/react-router-v6": "latest",
                "react-router-dom": "latest",
                "react-router": "latest",
            }}
            startRoute="/my-products"
            files={{
                "/App.tsx": {
                    code: AppTsxCode,
                    active: true,
                },
                "/style.css": {
                    code: StyleCssCode,
                    hidden: true,
                },
                "/list.tsx": {
                    code: ListTsxCode,
                },
                "/show.tsx": {
                    code: ShowTsxCode,
                },
            }}
        />
    );
}

const AppTsxCode = /* jsx */ `
import React from "react";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./style.css";

import { List } from "./list.tsx";
import { Show } from "./show.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                resources={[
                    {
                        name: "products",
                        // We're defining the routes and assigning them to an action of a resource
                        list: "/my-products",
                        show: "/my-products/:id",
                        // For sake of simplicity, we are not defining other routes here but the implementation is the same
                        // create: "/my-products/create",
                        // edit: "/my-products/edit/:id",
                        // clone: "/my-products/clone/:id",
                    },
                ]}
            >
                <Routes>
                    <Route path="/my-products" element={<List />} />
                    <Route path="/my-products/:id" element={<Show />} />
                </Routes>
            </Refine>
        </BrowserRouter>
    );
}
`.trim();

const StyleCssCode = `
html {
    margin: 0;
    padding: 0;
}
body {
    margin: 0;
    padding: 12px;
}
* {
    box-sizing: border-box;
}
body {
    font-family: sans-serif;
}
form label, form input, form button {
    display: block;
    width: 100%;
    margin-bottom: 6px;
}
span + button {
    margin-left: 6px;
}
ul > li {
    margin-bottom: 6px;
}
`.trim();

const ListTsxCode = `
import React from "react";

import { useGo, useList } from "@refinedev/core";

export const List: React.FC = () => {
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
`.trim();

const ShowTsxCode = `
import React from "react";

import { useGo, useShow } from "@refinedev/core";

export const Show: React.FC = () => {
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
                    go({
                        to: {
                            resource: "products",
                            action: "list",
                        },
                    });
                }}
            >
                Go to Products list
            </button>
        </>
    );
};
`.trim();
