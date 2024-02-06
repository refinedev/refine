---
"@refinedev/nextjs-router": patch
---

fix: `meta` has corrupted route parameters.

`parse` function from `@refinedev/nextjs-router` provides returns search params as following structure:

```json
{
  "pageSize": "25",
  "current": "1",
  "sorters[0][field]": "status",
  "sorters[0][order]": "asc",
  "filters[0][field]": "status",
  "filters[0][value]": "draft",
  "filters[0][operator]": "contains"
}
```

This structure is not predictable and not sanitazble. So, `parse` function has been updated to provide following structure:

```json
{
  "pageSize": "25",
  "current": "1",
  "sorters": [
    {
      "field": "status",
      "order": "asc"
    }
  ],
  "filters": [
    {
      "field": "status",
      "value": "draft",
      "operator": "contains"
    }
  ]
}
```

With this schema we can easily sanitize, deduplicate and predict the structure of the query parameters.
