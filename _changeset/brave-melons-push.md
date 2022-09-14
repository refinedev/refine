---
"@pankod/refine-strapi-v4": minor
---

Added `metaData` support for the `/me` request

```tsx
const strapiAuthHelper = AuthHelper(API_URL + "/api");

strapiAuthHelper.me("token", {
    metaData: {
        populate: ["role"],
    },
});
```