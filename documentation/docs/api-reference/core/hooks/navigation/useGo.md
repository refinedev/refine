---
id: useGo
title: useGo
sidebar_label: useGo 🆕
---

`useGo` is a hook that leverages the `go` method of the [`routerProvider`][routerprovider] to perform navigation operations.

## Basic Usage

```tsx
import { useGo } from "@refinedev/core";

const MyComponent = () => {
    const go = useGo();

    return (
        <Button
            onClick={() => {
                go({
                    to: "/posts",
                    query: {
                        filters: [
                            {
                                field: "title",
                                operator: "contains",
                                value: "Refine",
                            },
                        ],
                    },
                    type: "push",
                });
            }}
        >
            Go Posts With Default Filters
        </Button>
    );
};
```

## Parameters

### `to`

The `to` parameter is the path you want to navigate to. If left empty, it will navigate to the current path, which is useful for updating the query parameters.

### `query`

The `query` parameter is the query parameters you want to add to the path. It is an object which the `routerProvider` will convert to the query string.

### `type`

The `type` parameter is the type of navigation you want to perform. It can be one of the following:

-   `push`: It adds a new entry to the history stack.
-   `replace`: It replaces the current entry on the history stack.
-   `path`: Returns the navigation path for the given config. Doesn't mutate the history stack at all.

### `hash`

The `hash` parameter is the hash you want to add to the path.

### `options.keepQuery`

The `options.keepQuery` parameter is a boolean that determines whether the current query parameters should be kept or not. If it is `true`, the current query parameters will be merged with the new query parameters. If it is `false`, the current query parameters will be ignored.

### `options.keepHash`

The `options.keepHash` parameter is a boolean that determines whether the current hash should be kept or not. If it is `true`, the current hash will be kept in the URL. If it is `false`, the current hash will be ignored.

## Return Value

`useGo` is not returning any value except for the `path` type which returns the navigation path for the given config without mutating the history stack.

[routerprovider]: /docs/api-reference/core/providers/router-provider.md
