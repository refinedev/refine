---
"@refinedev/react-table": patch
---

fix: updated column filter transformation logic to handle conditional filters

`useTable` hook was ignoring the conditional filters with `"and"` and `"or"` operators, causing custom filtering logic inside the table to not work as expected and omitting the filters from the query. This PR enables working with conditionenal filters and fixes the disappearing filters issue.

To customize the `key` value of the conditional filter, you can use the `filterKey` property in the column's `meta` property. This property will be used as the key for the filter when setting the filter value to the table from `@refinedev/core`'s filter state and when setting the filter value to the filter state from the table.

Resolves [#5856](https://github.com/refinedev/refine/issues/5856)
