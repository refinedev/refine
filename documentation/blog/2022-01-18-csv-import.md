---
title: How to Import CSV File with React
description: In this guide, I will show you how to import CSV files using React and JavaScript.
slug: how-to-import-csv
authors: melih
tags: [JavaScript, csv, import, React]
image: https://refine.dev/img/refine_social.png
hide_table_of_contents: false
---

import console from '@site/static/img/blog/2022-01-18-csv-import/console.gif';
import overview from '@site/static/img/blog/2022-01-18-csv-import/overview.gif';
import importing from '@site/static/img/blog/2022-01-18-csv-import/importing.gif';

In this guide, we will learn how to import any CSV file received from the user with React. Our application will consist of two parts. We will create a form for the user to select a file. Next, we will do some operations with JavaScript to be able to view this CSV file. Let's start with our example.

<!--truncate-->

## Example

First, let's create a [Form](https://tr.reactjs.org/docs/forms.html) in React so that the user can upload a CSV file.

```tsx title="App.js"
function App() {
    return (
        <div style={{ textAlign: "center" }}>
            <h1>REACTJS CSV IMPORT EXAMPLE </h1>
            <form>
                //highlight-start
                <input type={"file"} accept={".csv"} />
                //highlight-end
                <button>IMPORT CSV</button>
            </form>
        </div>
    );
}
```

We created a simple form and our input items. With the accept feature of the input element, we specify that the format of the file can only be CSV. Now, let's load and read the CSV file selected by the user with [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader).

```tsx
import React, { useState } from "react";

function App() {
    const [file, setFile] = useState();

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const csvOutput = event.target.result;
            };

            fileReader.readAsText(file);
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h1>REACTJS CSV IMPORT EXAMPLE </h1>
            <form>
                <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                />

                <button
                    onClick={(e) => {
                        handleOnSubmit(e);
                    }}
                >
                    IMPORT CSV
                </button>
            </form>
        </div>
    );
}
```

Here, once the user-selected file has been successfully uploaded, we can process and display the file. Now let's load a sample CSV file and see it output on our console.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={console} alt="console_csv_output" />
</div>
<br />

As you can see, we can now read a selected CSV file. We can convert this file, which we read as a plain text type, into an Array of Object with JavaScript and place it inside a Table element.

```tsx
function App() {
 import React, { useState } from "react";

function App() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <div style={{ textAlign: "center" }}>
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>

      <br />

      <table>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
....
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={overview} alt="overview_csv" />
</div>
<br />

We formatted the CSV file that came in plain text format, using Javascript [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice) and [split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) methods, and created two separate array. Then we converted Header and Rows arrays to Array of Object format as Key, Value.

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/csv-import-example-hw3ne?autoresize=1&fontsize=14&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="csv-import-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Are You Looking React Web Framework?

A React-based framework for building internal tools, rapidly. **refine** offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. Use-cases include, but are not limited to admin panels, B2B applications and dashboards.

🔥 **Headless** : Works with any UI framework

⚙️ Zero-configuration: One-line setup with superplate. It takes less than a minute to start a project.

📦 Out-of-the-box : Routing, networking, authentication, state management, i18n and UI.

🔌 Backend Agnostic : Connects to any custom backend. Built-in support for REST API, Strapi, NestJs CRUD, Airtable, Supabase, Appwrite and Altogic.

📝 Native Typescript Core : You can always opt-out for plain JavaScript.

🐜 Enterprise UI : Works seamlessly with Ant Design System. (Support for multiple UI frameworks is on the Roadmap)

📝 Boilerplate-free Code : Keeps your codebase clean and readable.

[Refer to the **refine** documentation for more information. →](https://refine.dev/docs/getting-started/overview/)

## How to CSV Import with Refine?

The CSV import with **refine** is very simple and out-of-the-box feature. How to use it is explained step by step in the guide and example.

[Refer to the **refine** CSV import guide for more information. →](https://refine.dev/docs/guides-and-concepts/import-export/csv-import/)

[View Source](https://github.com/pankod/refine/blob/master/examples/importExport/src/pages/posts/list.tsx#L32)

## Refine CSV Import Usage

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={importing} alt="importing_csv" />
</div>
<br />

Importing CSV files is simple and fast using the [`useImport`](https://refine.dev/docs/core/hooks/import-export/useImport/) hook and [`ImportButton`](https://refine.dev/docs/ui-frameworks/antd/components/buttons/import-button/) provided by **refine**.

```tsx
import {
    List,
    Table,
    useTable,
    //highlight-start
    useImport,
    ImportButton,
    //highlight-end
} from "@pankod/refine";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    //highlight-start
    const importProps = useImport<IPostFile>();
    //highlight-end

    return (
        <List
            pageHeaderProps={{
                //highlight-start
                extra: <ImportButton {...importProps} />,
                //highlight-end
            }}
        >
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column dataIndex="status" title="Status" />
            </Table>
        </List>
    );
};

interface IPostFile {
    title: string;
    categoryId: string;
}
interface IPost {
    id: string;
    title: string;
    status: string;
}
```

You can also divide the data into chunk with the `batchSize` option while performing the insertion process.

[Refer to the **refine** CSV Import API References for more information. →](https://refine.dev/docs/core/hooks/import-export/useImport/#api-reference)

## Refine CSV Import Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-import-export-example-4nneu?autoresize=1&fontsize=14&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-import-export-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
