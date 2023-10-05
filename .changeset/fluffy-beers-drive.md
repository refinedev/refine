---
"@refinedev/core": patch
---

feat: pass `dataProviderName` to `liveProvider.subscribe` method.
From now on, you can use the `dataProviderName` to distinguish between different data providers.

[Refer to documentation for more info about multiple data providers ->](https://refine.dev/docs/api-reference/core/providers/data-provider/#multiple-data-providers)

#### Usage

```ts
import { useForm, useList } from "@refinedev/core";

useList({
    dataProviderName: "first-data-provider",
});

useForm({
    dataProviderName: "second-data-provider",
});
```

```ts
import { LiveProvider } from "@refinedev/core";

export const liveProvider = (client: any): LiveProvider => {
    return {
        subscribe: ({ channel, types, params, callback, dataProviderName }) => {
            console.log({ dataProviderName }); //  "second-data-provider"
        },
    };
};
```
