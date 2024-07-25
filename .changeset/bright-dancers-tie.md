---
"@refinedev/codemod": minor
---

feat: added `npx @refinedev/codemod@latest use-select-query-result` to automatically refactor `useSelect`'s `queryResult` and `defaultValueQueryResult` to `query` and `defaultValueQuery` #6179

```diff
- const { queryResult, defaultValueQueryResult } = useSelect(); // or useAutocomplete, useCheckboxGroup, useRadioGroup
+ const { query, defaultValueQuery } = useSelect();
```
