import { SandpackNextJS } from "@site/src/components/sandpack";
import React from "react";

export default function NextJSUseFormUsage() {
    return (
        <SandpackNextJS
            showFiles
            startRoute="/my-products"
            files={{
                "/style.css": {
                    code: StyleCssCode,
                    hidden: true,
                },
                "/pages/_app.tsx": {
                    code: AppTsxCode,
                },
                "/pages/my-products/index.tsx": {
                    code: ListTsxCode,
                },
                "/pages/my-products/[id]/edit.tsx": {
                    code: EditTsxCode,
                    active: true,
                },
            }}
        />
    );
}

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

const AppTsxCode = /* tsx */ `
import React from "react";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import dataProvider from "@refinedev/simple-rest";
import type { AppProps } from "next/app";

import "../style.css";

function App({ Component, pageProps }: AppProps) {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "products",
                    list: "/my-products",
                    edit: "/my-products/:id/edit",
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
    const { data, isLoading } = useList({resource: "products"});

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
                        edit
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
import { useGo, useForm } from "@refinedev/core";

const ProductEdit = () => {
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
                    {formLoading && <div>Loading...</div>}
                    <span>Save</span>
                </button>
            </form>
        </div>
    );
};

export default ProductEdit;
`.trim();
