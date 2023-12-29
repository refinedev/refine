---
"@refinedev/core": minor
---

// TODO
data provider custom methods

```tsx
const { mutate } = useCustomMethod("myCustomMethod", { as: "mutation" });
const { mutate } = useCustomMethod("myCustomMethod", { as: "query" });
const { mutate } = useCustomMethod("myCustomMethod");
```

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
