---
"@pankod/refine-core": patch
---

Fix **useCan** hook params keys.

Since `react-query` stringifies the query keys, it will throw an error for a circular dependency if we include `React.ReactNode` elements inside the keys.
The feature in #2220(https://github.com/pankod/refine/issues/2220) includes such change and to fix this, we need to remove `icon` property in the `resource`
