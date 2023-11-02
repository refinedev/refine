import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function UseTableUsage() {
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
            startRoute="/products?current=1&pageSize=2&sorters[0][field]=id&sorters[0][order]=asc&filters[0][field]=category.id&filters[0][operator]=eq&filters[0][value]=1"
            files={{
                "/App.tsx": {
                    code: AppTsxCode,
                },
                "/style.css": {
                    code: StyleCssCode,
                    hidden: true,
                },
                "/list.tsx": {
                    code: ListTsxCode,
                    active: true,
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
            list: "/products",

          }
        ]}
        options={{syncWithLocation: true}}
      >
        <Routes>
          <Route path="/products" element={<List />} />
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
import { useList, useGo, useTable } from "@refinedev/core";

export const List: React.FC = () => {
  const { tableQueryResult, isLoading, current, pageSize, filters, sorters } = useTable()

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
        <h1>Products</h1>
        Sorters:
        <ul>
            {
                sorters.map((sorter) => (
                    <li key={sorter.field}>
                        field: {sorter.field}, order: {sorter.order}
                    </li>
                    ))
            }
        </ul>
        Filters:
        <ul>
            {
                filters.map((filter) => (
                    <li key={filter.field}>
                        field: {filter.field}, operator: {filter.operator}, value: {filter.value}
                    </li>
                    ))
            }
        </ul>
        <p>Current Page: {current}</p>
        <p>Current Page Size: {pageSize}</p>
        <p>Results:</p>
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
    </div>
  );
};
`.trim();
