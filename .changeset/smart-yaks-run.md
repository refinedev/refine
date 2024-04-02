---
"@refinedev/core": patch
---

feat: added headless button hooks

We've added a new set of hooks to make it easier to create and manage UI buttons of Refine. There's a hook for each type of button which previously had duplicated logic across the codebase between UI integrations of Refine. Now all these buttons will be powered by the same hooks maintained in the `@refinedev/core` package to ensure consistency and reduce duplication.

New Hooks:

- `useListButton`: A navigation button that navigates to the list page of a resource.
- `useCreateButton`: A navigation button that navigates to the create page of a resource.
- `useShowButton`: A navigation button that navigates to the show page of a record.
- `useEditButton`: A navigation button that navigates to the edit page of a record.
- `useCloneButton`: A navigation button that navigates to the clone page of a record.
- `useRefreshButton`: A button that triggers an invalidation of the cache of a record.
- `useDeleteButton`: A button that triggers a delete mutation on a record.
- `useSaveButton`: A button to be used inside a form to trigger a save mutation.
- `useExportButton`: A button to be used with `useExport` to trigger an export bulk data of a resource.
- `useImportButton`: A button to be used with `useImport` to trigger an import bulk data for a resource.
