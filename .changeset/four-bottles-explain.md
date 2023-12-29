---
"@refinedev/core": minor
---

// TODO
data provider custom methods

**Example Usage**

```tsx
const { mutate } = useCustomMethod("myCustomMethod", { as: "mutation" });
const { data, isLoading } = useCustomMethod("myCustomMethod", { as: "query" });
const { data, isLoading } = useCustomMethod("myCustomMethod");
```

**Example Implementation**

```tsx
import simpleRestDataProvider from "@refinedev/simple-rest";

const dataProvider = {
  ...simpleRestDataProvider("https://my.api.com"),
  customMethods: {
    myCustomMethod: ({ params, meta }) => ({
      data: {},
    }),
  },
};
```
