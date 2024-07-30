---
"@refinedev/codemod": minor
---

feat: added `npx @refinedev/codemod@latest use-select-query-result` to automatically refactor `useForm`'s `queryResult` and `mutationResult` to `query` and `mutation` #6163

```diff
- const { queryResult, mutationResult } = useForm();
+ const { query, mutation } = useForm();
```
