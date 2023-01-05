---
id: adding-search-and-filters
title: 6. Adding Search and Filters
tutorial:
    order: 0
    next: tutorial/understanding-authprovider/{preferredUI}/authpage-component
    prev: tutorial/adding-crud-pages/{preferredUI}/add-create-page
---

## Overview

In the previous ["Adding List Page"](/docs/tutorial/adding-crud-pages/mantine/index) section, we have displayed posts data in a table. Now we will learn how to add sorting and filtering to the table to user can have more control over the data.

## Sort and Filters

The `@pankod/refine-react-table` package based on the [**Tanstack Table**](https://tanstack.com/table/v8) package. So, we can add sorting and filtering features to our table as suggested in the **Tanstack Table** documentation.

[Refer to the **@pankod/refine-react-table** `useTable` documentation for more information &#8594](/docs/packages/documentation/react-table/)

**Tanstack Table** keeps the `sorting` and `filters` states in the `useTable` hook. When we change the these states, the `useTable` hook will automatically fetch the data and update the table with the new data.

:::info
Under the hood, `sorting` and `filters` states of **Tanstack Table** are converted to the `CrudSorting` and `CrudFilter` types of **refine**. So, when you change the **Tanstack Table**'s `sorting` or `filters` state, `useTable` hook will pass the converted params to the `getList` method of the `dataProvider`.
:::

Since `@pankod/refine-react-table` provides a headless solution, there are many ways to handle filtering and sorting. So, you can check the [**Tanstack Table** documentation](https://tanstack.com/table/v8) to learn more about the filtering and sorting.
