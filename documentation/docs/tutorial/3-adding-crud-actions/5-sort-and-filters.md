---
id: sort-and-filters
title: 4.6. Sort and Filters
tutorial:
    prev: tutorial/adding-crud-actions/add-delete-action
    next: tutorial/understanding-authprovider/index
---

The [Blog Posts List](/docs/tutorial/adding-crud-pages/index) page section briefly explains how we have displayed blog posts data in a table using `<DataGrid />` in the `<BlogPostList />` component.


## The `<DataGrid />` Component

The **Material UI** `<DataGrid />` component is very powerful and **refine** has excellent support for many of its props. For example, **refine** provides built-in support for sorting and filtering records inside `<DataGrid />` so we don't have to manually implement these features.

We can see these features in action when we click on the arrow icon which appears in a table header when it is hovered. Clicking allows us sort the table rows ascending or descending by the columns.

When we hover on the topleft corder of the table, a menu of items pops up and presents options to sort, filter, select and hide the data in the table.

The props for all these features come baked into the `dataGridProps` object exposed by the `useDataGrid()` hook. `useDataGrid()` is a high level hook provided by **refine**'s **Material UI** support package, `@refinedev/mui`.

:::tip
To see how filtering and sorting work and more detail, you can refer to the [`useDataGrid()` documentation](/docs/api-reference/mui/hooks/useDataGrid/).
:::

<Checklist>
<ChecklistItem id="add-search-and-filters-mui">
I understand how sort and filters come implemented out-of-the-box in the {`<DataGrid />`} component.
</ChecklistItem>
</Checklist>
