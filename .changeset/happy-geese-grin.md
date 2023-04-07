---
"@refinedev/antd": minor
"@refinedev/core": minor
"@refinedev/mantine": minor
"@refinedev/mui": minor
"@refinedev/react-hook-form": minor
"@refinedev/react-table": minor
---

Added missing third generic parameter to hooks which are using `useQuery` internally.

For example:

```ts
import { useOne, HttpError } from "@refinedev/core";

const { data } = useOne<{ count: string }, HttpError, { count: number }>({
    resource: "product-count",
    queryOptions: {
        select: (rawData) => {
            return {
                data: {
                    count: Number(rawData?.data?.count),
                },
            };
        },
    },
});

console.log(typeof data?.data.count); // number
```
