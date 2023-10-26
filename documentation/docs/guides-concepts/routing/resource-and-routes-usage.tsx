import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function ResourcesAndRoutesUsage() {
    return (
        <Sandpack
            // showNavigator
            dependencies={{
                "@refinedev/core": "latest",
                "@refinedev/simple-rest": "latest",
                "@refinedev/react-router-v6": "latest",
                "react-router-dom": "latest",
                "react-router": "latest",
            }}
            startRoute="/products"
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
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routerProvider from "@refinedev/react-router-v6";

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
                        list: "/products",
                        show: "/products/:id",
                        // For sake of simplicity, we are not defining other routes here but the implementation is the same
                        // create: "/products/create",
                        // edit: "/products/edit/:id",
                        // clone: "/products/clone/:id",
                    }
                ]}
            >
                <Routes>
                    <Route path="/products" element={<List />} />
                    <Route path="/products/:id" element={<Show />} />
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
import { useList, BaseKey, useNavigation } from "@refinedev/core";

export const List: React.FC = () => {
    // We're inferring the resource from the route
    // TODO: REMOVE EMPTY BRACES
    const {
        data,
        isLoading,
        isError
    } = useList<IProduct>({});

    // \`useNavigation\` is a hook that provides navigation methods, you can find more information about it in the documentation
    const { show } = useNavigation();

    if (isLoading) return <div>Loading...</div>;

    return (
        <ul>
            {data?.data?.map((product) => (
                <li
                    key={product.id}
                >
                    <span>{product.name}</span>
                    <button onClick={() => show("products", product.id)}>show</button>
                </li>
            ))}
        </ul>
    );
};

interface IProduct {
    id: BaseKey;
    name: string;
    material: string;
}
`.trim();

const ShowTsxCode = `
import { useShow, BaseKey } from "@refinedev/core";

export const Show: React.FC = () => {
    // We're inferring the resource and the id from the route params
    const { queryResult: { data, isLoading, isError } } = useShow<IProduct>();

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1>{data?.data?.name}</h1>
            <p>Material: {data?.data?.material}</p>
            <small>ID: {data?.data?.id}</small>
        </div>
    );
};

interface IProduct {
    id: BaseKey;
    name: string;
    material: string;
}
`.trim();
