---
"@pankod/refine-airtable": patch
"@pankod/refine-altogic": patch
"@pankod/refine-nestjsx-crud": patch
"@pankod/refine-sdk": patch
"@pankod/refine-simple-rest": patch
"@pankod/refine-strapi": patch
"@pankod/refine-strapi-graphql": patch
"@pankod/refine-strapi-v4": patch
---

Updated axios version (0.21.4 to 0.26.1). In this version, the way of sending headers has changed as follows.

```
// old
axiosInstance.defaults.headers = { Authorization: `Bearer ${data.jwt}` };

// new
axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
```
