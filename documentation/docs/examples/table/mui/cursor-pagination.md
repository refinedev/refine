---
id: cursor-pagination
title: "Cursor Pagination Example | Best Practices in Refine v5"
display_title: "Cursor Pagination"
sidebar_label: "Cursor Pagination"
description: "Secure Cursor Pagination in Refine v5. Learn best practices. Learn best practices for provider for real-world React admin panels. See practical code samples."
example-title: Cursor Pagination
example-tags: [table, mui]
---

[Cursor Pagination](https://mui.com/x/react-data-grid/pagination/#cursor-implementation) is a pagination method and [Material UI](https://mui.com/material-ui/getting-started/overview/) supports it by default. This sample application shows how to use it.

Refine also provides built-in cursor pagination support via `pagination.mode: "cursor"` in the [`useTable`](/core/docs/data/hooks/use-table#paginationcursor) hook. When using cursor mode, the data provider's `getList` response should include a `cursor` object with `next` and/or `prev` values, and the hook returns `cursor.goToNextPage()` / `cursor.goToPreviousPage()` for navigation.

<CodeSandboxExample path="table-material-ui-cursor-pagination" />
