---
"@refinedev/codemod": minor
---

feat: added `npx @refinedev/codemod@latest august2024-release` to automatically refactor all deprecated values to their new values on the august release #6154

Following exameples are the changes that will be made:

```diff
- const { tableQueryResult } = useTable(); // or useDataGrid
+ const { tableQuery } = useTable();
```

```diff
- const { queryResult } = useSimpleList();
+ const { query } = useSimpleList()
```

```diff
- const { queryResult, mutationResult } = useForm();
+ const { query, mutation } = useForm();
```

```diff
- const { queryResult } = useShow();
+ const { query } = useShow();
```

```diff
- const { queryResult, defaultValueQueryResult } = useSelect(); // or useAutocomplete, useCheckboxGroup, useRadioGroup
+ const { query, defaultValueQuery } = useSelect();
```
