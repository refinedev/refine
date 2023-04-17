---
"@refinedev/simple-rest": minor
---

feat: add the abilities to pass custom headers and custom http method to the request

Example of changing the http method:

```tsx
import { useUpdate } from "@refinedev/core";

const { mutate } = useUpdate();

mutate({
    resource: "posts",
    id: 1,
    variables: {
        title: "New title",
    },
    //highlight-start
    meta: {
        method: "put",
    },
    //highlight-end
});
```

Example of passing custom headers:

```tsx
import { useOne } from "@refinedev/core";

useOne({
    resource: "posts",
    id: 1,
    //highlight-start
    meta: {
        headers: {
            "X-Custom-Header": "Custom header value",
        },
    },
    //highlight-end
});
```
