---
title: Using Material UI DataGrid component with refine app
description: How to use Material UI DataGrid component with refine apps?
slug: mui-datagrid-refine
authors: michael
tags: [material-ui, react, refine]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-23-mui-usedatagrid/social.png
hide_table_of_contents: false
---


:::caution

This post was created using version 3.x.x of **refine**. Although we plan to update it with the latest version of **refine** as soon as possible, you can still benefit from the post in the meantime.

You should know that **refine** version 4.x.x is backward compatible with version 3.x.x, so there is no need to worry. If you want to see the differences between the two versions, check out the [migration guide](https://refine.dev/docs/migration-guide/).

Just be aware that the source code example in this post have been updated to version 4.x.x.

:::












## Introduction
In this article, we'll show how to use Material UI [`<DataGrid/>`](https://mui.com/x/react-data-grid/) component and refine's [`useDataGrid`](https://refine.dev/docs/ui-frameworks/mui/hooks/useDataGrid/) hook to render data from a mock API server in tabular form using a `refine` application.  



[refine](https://github.com/refinedev/refine) is a React-based framework for rapidly developing data-driven applications through a collection of helper `hooks`, `components`, and `data-providers`. refine is a headless framework that doesn't include UI components by default but has support and configurations to inject any UI libraries or a framework of choices such as Material UI or Tailwind CSS.

Material UI is a React UI component library with a rich set of components and tools for bootstrapping elegant user interfaces. We'll use the `<DataGrid/>` component to render a list of employees from a mock server. We'll also look at some of the properties and custom configurations that can be used with the component.

Steps we’ll cover:
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Setting up a `refine` application](#setting-up-a-refine-application)
- [Creating mock API with Mockaroo and My JSON Server](#creating-mock-api-with-mockaroo-and-my-json-server)
- [Material UI DataGrid component](#material-ui-datagrid-component)
- [Adding styled-components](#adding-styled-components)
- [refine's `useDataGrid` hook](#refines-usedatagrid-hook)
- [Rendering data with the `<DataGrid/>` component](#rendering-data-with-the-datagrid-component)
- [Pagination, Filtering, and Sorting using the `useDataGrid` hook](#pagination-filtering-and-sorting-using-the-usedatagrid-hook)
  - [Pagination](#pagination)
  - [Sorting](#sorting)
    - [Initial sort order](#initial-sort-order)
    - [Controlled sorting](#controlled-sorting)
  - [Filtering](#filtering)
    - [Controlled filtering](#controlled-filtering)
- [Conclusion](#conclusion)
- [Example](#example)
  

## Prerequisites
refine is a react application shipped with TypeScript by default. Our tutorial application will be written in typescript-react, so a good background in coding in React and TypeScript is essential. Also, ensure you have the following versions of node and npm to avoid running into errors with superplate:

- Node v16.14 or later
- Npm v8.3 or later
 
You can run `node -v` and `npm -v` on your terminal to confirm your installed versions before proceeding.

 ## Setting up a `refine` application

There are two possible ways to set up a refine application: using [superplate](https://pankod.github.io/superplate/) or adding the refine module into an empty React application. We'll go with the former method in this tutorial as it's the recommended way to get started.  
  
Run the following command in your terminal to create a refine app with superplate:

```bash
npm create refine-app@latest datagrid -- -p refine-react -b v3
```  
In the command above, the `-p` flag specifies the project type which in our case, a refine-react project. `datagrid` is the name I chose as the app name for brevity. You can always choose any name you're comfortable with.  

You will be asked a few questions by the installer. Select the following options to proceed:


<div class="img-container">
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-23-mui-usedatagrid/cli.png" alt="cli" />
</div>

<br/>


After superplate has finished creating our app, run `npm run dev` to start the development server and then navigate to `localhost:8000` in the browser to view the app. If each went smoothly, the following should be rendered on the browser:


<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-23-mui-usedatagrid/welcome.png" alt="welcome" />
</div>

<br/>

## Creating mock API with Mockaroo and My JSON Server

The fake employee data we're going to render in the `<DataGrid/>` component will be created with Mockaroo and My JSON Server. [Mockaroo](https://www.mockaroo.com/) is a random fake data generator for generating up to 1,000 realistic test data in JSON, CSV, and other formats.

[My JSON Server](https://my-json-server.typicode.com/) is a fake online REST Server for prototyping application APIs without a backend. The REST Server for the JSON data we'll use in this tutorial is hosted [here](https://my-json-server.typicode.com/Mich45/employee-data), and the fake JSON data created with Mockaroo is on [GitHub](https://github.com/Mich45/employee-data/blob/main/db.json).


## Material UI DataGrid component

The Material UI DataGrid component is an extendable and feature-rich component used to display tabular data in React applications. Some of its powerful features include automatic pagination, table data filtering and sorting, and many other cool features.

The component is available in two versions, the MIT `<DataGrid/>` and Commercial `<DataGridPro/>` (Pro and Premium) versions. The MIT version is free-to-use while the commercial version is paid and extends the features of the MIT version such as the ability to filter and sort multiple columns at the same time.

The `<DataGrid/>` component requires two mandatory properties namely: `rows` and `columns`. The `columns` prop accepts an array of fields which are used as the table header while the `rows` prop accepts an array of objects (data) to be rendered within the table rows. 

The following example shows a basic usage of the `DataGrid` component: 


```javascript
<DataGrid
  columns={[{ field: 'name' }]}
  rows={[
    { id: 1, name: 'React' },
    { id: 2, name: 'MUI' },
  ]}
/>
```

Although **refine** is a headless framework that can be used with any UI framework of choice, it has built-in support for a few UI frameworks, such as Material UI. The `refine-mui` module, for example ships with some common Material UI components such as `DataGrid`, `GridColumn`, and so on. 

We'll see how to leverage these components with refine's `useDataGrid` hook in our refine app in the coming sections.

<br/>
<div>
<a href="https://github.com/refinedev/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/github-support-banner.png" alt="github support banner" />
</a>
</div>

## Adding styled-components

We'll use styled-components to style our app, as refine doesn't control how we choose to style our applications. So let's go ahead and install it with its types definition as follows:


```bash
npm install styled-components && npm install --save-dev @types/styled-components
```
Next, create two folders: `components` and `pages` in the `src` folder. We'll be writing the bulk of our code in these folders.

Then, create a `Layout.tsx` file in the `components` folder and add the following code to it: 

```tsx title="src/components/Layout.tsx"
import React from 'react';
import { LayoutProps } from "@refinedev/core";
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 80%;
  margin: 50px auto;
  height: 100%;
`;

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <>
            <Wrapper>
                {children}
            </Wrapper>
        </>
    );
}

export default Layout;
```

Above, we're creating a div to wrap our app content through the `children` prop and then aligning it in the center of the page.

## refine's `useDataGrid` hook

In addition to integrating MUI components, **refine** provides a clean interface through the `useDataGrid` hook for implementing some properties that can be used with MUI `<DataGrid/>` component. The hook simplifies working with features such as pagination, sorting, and filtering which come as out-of-box.

For instance, if you have a page component where you want to render tabular data, you might do something like the below:

```tsx title="src/pages/example.tsx"
import React from'react'
import { useDataGrid, DataGrid, GridColumns } from "@refinedev/mui"

const Table: React.FC = () => {
    const { dataGridProps } = useDataGrid();
    const columns: GridColumns = [
        {
            field: "id",
            headerName: "ID",
        },
        { 
            field: "name",
            headerName: "Name" 
        },
        { 
            field: "Age",
            headerName: "Age" 
        },
    ];

    return (
        <DataGrid
          {...dataGridProps} 
          columns={columns} 
          autoHeight 
        />
    )
}

export default Table;
```



It's important to note that in the above example, we're not passing the `rows` prop to the `<DataGrid/>` component. This is because the `dataGridProps` variable automatically injects the `rows` values into the `<DataGrid>` component through the native `<Refine/>` component's `dataProvider` prop available in the `src/App.tsx` file of your refine application. 

The `dataProvider` prop is used to read data from an API endpoint and then make the data available in the entire application.

[Refer to refine data provider documentation for detailed usage](https://refine.dev/docs/core/providers/data-provider/)

## Rendering data with the `<DataGrid/>` component

We'll use the mock API we created with Mockaroo and My JSON Server as the data source for our DataGrid component.

To get started, create a folder in the `pages` folder named `employees`, and then in this folder, create a file named `employees.tsx`. 

Add the following code to the `employees.tsx` file: 

```tsx title="src/pages/employees.tsx"
import React from 'react';
import { useDataGrid, DataGrid, GridColumns, List } from '@refinedev/mui';

const EmployeeList: React.FC = () => {
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColumns>(
        () => [
            { field: 'id', headerName: 'ID', Width: 30 },
            {
                field: 'full_name',
                headerName: 'Full Name',
                minWidth: 150,
                flex: 1,
                valueGetter: (params) =>
                    `${params.row.first_name || ''} ${
                        params.row.last_name || ''
                    }`,
            },
            {
                field: 'email',
                headerName: 'Email',
                minWidth: 250,
            },
            {
                field: 'department',
                headerName: 'Department',
                minWidth: 150,
            },
            {
                field: 'role',
                headerName: 'Role',
                minWidth: 150,
            },
            {
                field: 'level',
                headerName: 'Level',
                Width: 30,
            },
        ],
        []
    );

    return (
        <List>
            <DataGrid
                {...dataGridProps}
                checkboxSelection
                disableSelectionOnClick
                columns={columns}
                autoHeight
            />
        </List>
    );
};

export default EmployeeList;
```

Let's understand what's going on above. 

The `columns` variable defines the column fields for our data. We also wrapped the fields in a `React.Memo` higher order component for memoizing the values and then created fields for each of the properties from our resource endpoint. We also used the `valueGetter` attribute to compose a value from two different fields.

Next, edit `App.tsx` in the `src` folder to the following:

```tsx title="src/App.tsx" 
import { Refine } from '@refinedev/core';
import {
    CssBaseline,
    GlobalStyles,
    ThemeProvider,
    LightTheme,
} from '@refinedev/mui';
import routerProvider from '@refinedev/react-router-v6';
import dataProvider from '@refinedev/simple-rest';
import Layout from './components/Layout';
import EmployeeList from './pages/employees';

function App() {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
            <Refine
                Layout={Layout}
                routerProvider={routerProvider}
                dataProvider={dataProvider(
                    'https://my-json-server.typicode.com/Mich45/employee-data'
                )}
                resources={[{ name: 'employees', list: EmployeeList }]}
            />
        </ThemeProvider>
    );
}

export default App;
```


Here's a breakdown of what is going on above: 

The native `<Refine/>` component accepts a `dataProvider` prop which specifies the source of our data (the fake REST API we created earlier), and a `resources` prop which takes an array of object properties:
- The `name` property is the name of the resource we are expecting from the REST API - this value must match the resource we created in the REST API. In our case, `employees`. 
- The `list` property takes a page component to render the data. This is the `EmployeeList` component we're importing from the `pages/employees` folder. 

We also added a layout component (`Layout.tsx`) to the `Layout` prop. This is to customize the look and feel of our app. 

Now, if you navigate to `localhost:8000/employees`, you should see the following:


<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-23-mui-usedatagrid/employees_list.png" alt="employees list" />
</div>

<br/>

Voila! We've successfully displayed our data from a REST API in a MUI DataGrid component. In the next section we'll look at how we can use the `useDataGrid` hook to simplify operations such as pagination, sorting, and filtering.


## Pagination, Filtering, and Sorting using the `useDataGrid` hook

The `useDataGrid` hook simplifies operations such as pagination, sorting, and filtering on the `<DataGrid/>` component through a flexible API. In this part, we'll leverage the hook to add pagination, sorting, and filter features to our employees table data.

### Pagination

Pagination lets us display a certain number of rows on a DataGrid at a time and is enabled by default. It cannot be disabled either. It is available at the bottom of the DataGrid component like so:

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-23-mui-usedatagrid/pagination.png" alt="pagination" />
</div>

<br/>

For example, our employees list has a total of 28 rows, but we may want to render just 10 rows per page. Here’s a demo showing how we can render 10 rows of items on the initial page render with the initialPageSize property (defaults to 25). 

This is similar to using the `initialState` prop on the DataGrid component. We can also define how many rows the user can choose to view per page using the `rowsPerPageOptions` prop.

 Update the `employees.tsx` with the following codes: 


```tsx title="src/pages/employees.tsx"
import React from 'react';
import { useDataGrid, DataGrid, GridColumns, List } from '@refinedev/mui';

   ...

// highlight-start
const { dataGridProps } = useDataGrid({initialPageSize: 10});
    const {
        pageSize,
        onPageSizeChange,
        ...restDataGridProps
    } = dataGridProps;
 // highlight-end
    
    ...

return (
        <List>
        // highlight-start
            <DataGrid
                {...restDataGridProps}
                checkboxSelection
                disableSelectionOnClick
                columns={columns}
                pageSize={10}
                onPageSizeChange={onPageSizeChange}
                rowsPerPageOptions={[10, 15]}
                autoHeight
            />
            // highlight-end
        </List>
    );

export default EmployeeList;
```

Which renders our grid like this:

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-23-mui-usedatagrid/grid.png" alt="grid" />
</div>

<br/>

You can refer to the pagination [documentation](https://mui.com/x/react-data-grid/pagination/) for additional props on pagination.

---

<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />


---

### Sorting

The DataGrid component lets us sort the data in the rows based on one criterion at a time. Sorting is enabled for all columns by default in the MIT version and can also be disabled either for all columns or a single column.

We can sort the rows in three orders: ascending (ASC), descending (DESC) or null (sorting will be disabled).

To sort the rows, click or hover on any column header, this displays an arrow indicator pointing up or down depending on your sorting order. When it's ascending the arrow points upward, and points downward for descending. Alternatively, we can also access it from the grid column menu.


<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-23-mui-usedatagrid/sorting.png" alt="sorting" />
</div>

<br/>


#### Initial sort order

We can initialize a sorting order for each or all fields in the grid using the `intialSorter` property of the `useDataGrid` component. This lets us sort the rows on the initial page render.

```tsx title="src/pages/employees/employees.tsx"
const { dataGridProps } = useDataGrid({
    sorters: { initial: [{ field: "level", order: "desc" }] },
});
```
The above example will sort the rows using the *level* column on the initial render in descending order like so: 


<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-23-mui-usedatagrid/sorting_employees.png" alt="sortingEmployees" />
</div>

<br/>


#### Controlled sorting 

We can also sort rows externally using the `setSorter` function from the `useDataGrid` hook. The following code shows how we can sort the rows by clicking on custom buttons outside the DataGrid component.

```tsx title="src/pages/employees.tsx"
import React from 'react';
import styled from 'styled-components';
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    List,
     //highlight-start
    Button,
    ButtonGroup,
     //highlight-end
} from '@refinedev/mui';

 //highlight-start
const ButtonsWrapper = styled.div`
    width: 100%;
    margin: 20px 0;
`;
 //highlight-end

const EmployeeList: React.FC = () => {
   //highlight-start
    const { dataGridProps, setSorter } = useDataGrid();
     //highlight-end

    const columns = React.useMemo<GridColumns>(
        () => [
            { field: 'id', headerName: 'ID', Width: 30 },
            {
                field: 'full_name',
                headerName: 'Full Name',
                minWidth: 150,
                flex: 1,
                valueGetter: (params) =>
                    `${params.row.first_name || ''} ${
                        params.row.last_name || ''
                    }`,
            },
            {
                field: 'email',
                headerName: 'Email',
                minWidth: 250,
            },
            {
                field: 'department',
                headerName: 'Department',
                minWidth: 150,
            },
            {
                field: 'role',
                headerName: 'Role',
                minWidth: 150,
            },
            {
                field: 'level',
                headerName: 'Level',
                Width: 30,
            },
        ],
        []
    );

    //highlight-start
    const handleSorting = (order: 'asc' | 'desc') => {
        setSorter([
            {
                field: 'level',
                order,
            },
        ]);
    };
    //highlight-end

    return (
        <List>
          //highlight-start
            <ButtonsWrapper>
                <ButtonGroup variant="outlined">
                    <Button onClick={() => handleSorting('asc')}>Asc</Button>
                    <Button onClick={() => handleSorting('desc')}>Desc</Button>
                </ButtonGroup>
            </ButtonsWrapper>
            <DataGrid
                {...dataGridProps}
                checkboxSelection
                columns={columns}
                autoHeight
            />
             //highlight-end
        </List>
    );
};

export default EmployeeList;
```


Here's a GIF showing the result of the above example.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-23-mui-usedatagrid/employees_gif.gif" alt="employees Gif" />
</div>

<br/>



Refer to the sorting [documentation](https://mui.com/x/react-data-grid/sorting/) to learn more about the feature.



### Filtering

Filtering lets us search the rows for values in the DataGrid component based on one criterion at a time. 

We can access the sort feature by either clicking on the *filter* item in the column menu: 

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-23-mui-usedatagrid/filtering_column.png" alt="filtering Column" />
</div>

<br/>

or by using the filter button in the grid toolbar:

<div class="img-container">
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-23-mui-usedatagrid/filtering_tab.png" alt="filtering tab" />
</div>

<br/>


You can import the GridToolbar component and use it like so:

```tsx title="src/pages/employees.tsx"
import { GridToolbar } from "@refinedev/mui"

<DataGrid
  {...dataGridProps} 
  checkboxSelection
  columns={columns}
  components={{ Toolbar: GridToolbar }} 
  autoHeight 
/>
```
The filter feature works by searching the rows for values that match a given filter operator. The list of operators which can be used in the *sortModel* can be found [here](https://refine.dev/docs/core/interfaceReferences/#crudfilters).

For instance in our employees table we can filter the *department* column for rows that contain a `Support` value by using any of the above methods. 

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-23-mui-usedatagrid/employees_filter.png" alt="employees filter" />
</div>

<br/>


Here's the code for the above example. Update the `employees.tsx` with highlighted code.

```tsx title="src/pages/employees.tsx"
import React from 'react';
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    List,
    //highlight-next-line
    GridToolbar,
} from '@refinedev/mui';

//highlight-next-line
const { dataGridProps} = useDataGrid();

... 

//highlight-start
const {
    filterMode,
    filterModel,
    onFilterModelChange,
    ...restDataGridProps
} = dataGridProps;
//highlight-end


return (
        <List>
        //highlight-start
            <DataGrid
                {...restDataGridProps}
                filterMode={filterMode}
                filterModel={filterModel}
                onFilterModelChange={onFilterModelChange}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                autoHeight
            />
            //highlight-end
        </List>
    );

export default EmployeeList;
```


#### Controlled filtering

We can also choose to filter the table externally by using the `setFilters` function of the `useDataGrid` hook to set a filter state. The function accepts three properties to filter the table.

1. `field` - the column field in the table to apply the filter
2. `operator` - the criterion to filter the table
3. `value` - the value to search for

Here's an example showing how we can use a custom checkbox to search the rows for employees with *role* that equals **Recruiter**.

Update the `employees.tsx` with highlighted code:

```tsx title="src/pages/employees.tsx"
import React from 'react';
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    List,
    GridToolbar,
    //highlight-start
    FormControlLabel,
    Checkbox,
    //highlight-end
} from '@refinedev/mui';

const EmployeeList: React.FC = () => {
    const { dataGridProps, setFilters } = useDataGrid();

    const columns = React.useMemo<GridColumns>(
        () => [
            { field: 'id', headerName: 'ID', Width: 30 },
            {
                field: 'full_name',
                headerName: 'Full Name',
                minWidth: 150,
                flex: 1,
                valueGetter: (params) =>
                    `${params.row.first_name || ''} ${
                        params.row.last_name || ''
                    }`,
            },
            {
                field: 'email',
                headerName: 'Email',
                minWidth: 250,
            },
            {
                field: 'department',
                headerName: 'Department',
                minWidth: 150,
            },
            {
                field: 'role',
                headerName: 'Role',
                minWidth: 150,
            },
            {
                field: 'level',
                headerName: 'Level',
                Width: 30,
            },
        ],
        []
    );
    const {
        filterMode,
        filterModel,
        onFilterModelChange,
        ...restDataGridProps
    } = dataGridProps;

//highlight-start
    const handleFilter = (
        e: React.ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => {
        setFilters([
            {
                field: 'role',
                value: checked ? 'Recruiter' : undefined,
                operator: 'eq',
            },
        ]);
    };
//highlight-end
    return (
        <List>
        //highlight-start
            <FormControlLabel
                label="Filter Employees with Recruiter Role"
                control={<Checkbox onChange={handleFilter} />}
            />
            //highlight-end
            <DataGrid
                {...restDataGridProps}
                filterMode={filterMode}
                filterModel={filterModel}
                onFilterModelChange={onFilterModelChange}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                autoHeight
            />
        </List>
    );
};
export default EmployeeList;
```
Which gives the following result when you click on the checkbox: 



<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-23-mui-usedatagrid/employees_checkbox.png" alt="employees check" />
</div>

<br/>



Refer to the filtering [documentation](https://mui.com/x/react-data-grid/filtering/) for more information on available settings and advanced usage.


## Conclusion

In this article we introduced you to the MUI `<DataGrid/>` component and how to use it to render tabular data. We also learned how to simplify operations such as pagination, sorting and filtering on the component using the `useDataGrid` hook.

We hope this article helps you in getting started with the `<DataGrid/>` component in your refine applications.

Where to go next? Check the useDataGrid hook documentation [here](https://refine.dev/docs/ui-frameworks/mui/hooks/useDataGrid/) and the MUI X `<DataGrid/>` [documentation](https://mui.com/x/react-data-grid/) for additional usage information and reference.

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="discord banner" />
</a>
</div>


## Example

<CodeSandboxExample path="blog-material-ui-datagrid" />


