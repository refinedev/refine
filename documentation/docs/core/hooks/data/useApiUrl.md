---
id: useApiUrl
title: useApiUrl
---

`useApiUrl` lets you access the API URL of the `dataProvider` that was configured in [`<Refine>`][Refine] component.

This hook uses the `getApiUrl` method of the used [`dataProvider`][Data Provider].

## Usage

An example use case might be using it with [`useCustom`][useCustom] hook.

```tsx
import {
    // highlight-next-line
    useCustom,
    useApiUrl
} from "@pankod/refine-core";

interface PostUniqueCheckResponse {
    isAvailable: boolean;
}

const apiUrl = useApiUrl();

// highlight-start
const { data, isLoading } = useCustom<PostUniqueCheckResponse>({
    url: `${apiUrl}/posts-unique-check`,
    method: "get",
    config: {
        query: {
            title: "Foo bar",
        },
    },
});
// highlight-end
```

## API

### Return value

| Description | Type     |
| ----------- | -------- |
| API URL     | `string` |

[Refine]: /core/components/refine-config.md
[Data Provider]: /core/providers/data-provider.md
[useCustom]: /core/hooks/data/useCustom.md
