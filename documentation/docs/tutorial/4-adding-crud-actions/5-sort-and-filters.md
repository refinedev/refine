---
id: sort-and-filters
title: 6. Sort and Filters
tutorial:
    order: 0
    prev: tutorial/adding-crud-pages/{preferredUI}/add-delete-feature
    next: tutorial/understanding-authprovider/index
---

The [Blog Posts List](/docs/tutorial/adding-crud-pages/mui/index) page section briefly explains how we have displayed blog posts data in a table using `<DataGrid />` in the `<BlogPostList />` component.

The **Material UI** `<DataGrid />` component is very powerful and **refine** has excellent support for many of its props. For example, **refine** provides built-in support for sorting and filtering records inside `<DataGrid />` so we don't have to manually implement these features.

We can these features in action when we click on the arrow icons on the table header. A menu of items pop up and presents options to will sort, filter, select and hide the data in the table. An arrow appears when each column title is hovered and that allows us sort the table rows by the columns. by the column you clicked.

The props for all these features come baked into the `dataGridProps` object exposed by the `useDataGrid()` hook provided by **refine**'s **Material UI** support package, `@refinedev/mui`.

:::tip
To see how the filtering and sorting work and more detail, you can refer to the [`useDataGrid()` documentation](/docs/api-reference/mui/hooks/useDataGrid/).
:::

<br/>
<br/>

<Checklist>

<ChecklistItem id="add-search-and-filters-mui">
I added search and filters to the table
</ChecklistItem>

</Checklist>
