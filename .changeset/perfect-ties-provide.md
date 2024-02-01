---
"@refinedev/simple-rest": patch
---

fix: `dataProvider.getList` method adds `?` to the request url when there is no `filters`, `sorters` and `pagination` in the request. #5359

```diff
- Expected
+ Received

- "https://api.fake-rest.refine.dev/categories",
+ "https://api.fake-rest.refine.dev/categories?",
```

From now on, `dataProvider.getList` method will not add `?` to the request url when there is no `filters`, `sorters` and `pagination` in the request.
