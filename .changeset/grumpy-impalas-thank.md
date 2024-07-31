---
"@refinedev/codemod": minor
---

feat: added `npx @refinedev/codemod@latest use-show-query-result` to automatically refactor `useShow`'s `queryResult` to `query` #6163

```diff
- const { queryResult } = useShow();
+ const { query } = useShow();
```
