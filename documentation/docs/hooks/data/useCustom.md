---
id: useCustom
title: useCustom
siderbar_label: useCustom
---

`useCustom` is a modified version of `react-query`'s [`useQuery`](https://react-query.tanstack.com/reference/useQuery) for custom requests. It uses the `custom` method from the `dataProvider` that is passed to `<Admin>`.

:::danger attention
`useCustom` should **not** be used when creating, updating, or deleting a resource, as it will be with a [query invalidation](https://react-query.tanstack.com/guides/query-invalidation) problem. For these, the [useCreate](/docs/hooks/data/useCreate), useUpdate and [useDelete](/docs/hooks/data/useDelete) hooks should be used.
:::

### Features

-   You can send a request to any link, using all methods (`get, delete, head, options, post, put, patch`).
-   You can send comprehensive requests to resources with `Sort` and `Filter` parameters.

### Usage

Let's make a use case. We need to verify that the header in the post resource is unique. For this, we have an end-point similar to the one below.

```json title="https://refine-fake-rest.pankod.com/posts/unique-check?title=Foo bar"
{
    "isAvailable": true
}
```

```tsx
import { useCustom, useApiUrl } from "@pankod/refine";

interface IPost {
    id: string;
    title: string;
    content: string;
}

const apiUrl = useApiUrl();

// highlight-start
const { data, isLoading } = useCustom<IPost[]>(
    `${apiUrl}/posts/unique-check`,
    "get",
    {
        query: {
            title: "Foo bar",
        },
    },
);
// highlight-end
```

### API

#### Parameters

| Property                                         | Description                                                             | Type                                                             | Required |
| ------------------------------------------------ | ----------------------------------------------------------------------- | ---------------------------------------------------------------- | -------- |
| url <div className="required">Required</div>    | URL                                                                     | string                                                           | true     |
| method <div className="required">Required</div> | Method                                                                  | "get", "delete", "head", "options", "post", "put", "patch"       | true     |
| config                                           | Query Params                                                            | { sort?: Sort; filters?: CrudFilters; payload?: {}; query?: {} } | false    |
| queryOptions                                     | [useQuery Options](https://react-query.tanstack.com/reference/useQuery) | object                                                           | false    |

#### Type Parameters

| Property   | Desription                                          | Type              | Default           |
| ---------- | --------------------------------------------------- | ----------------- | ----------------- |
| TData      | Result data of the query. Extends [`BaseRecord`](#) | [`BaseRecord`](#) | [`BaseRecord`](#) |
| TError     | Custom error object that extends [`HttpError`](#)   | [`HttpError`](#)  | [`HttpError`](#)  |
| TVariables | Values for request function                         | `{}`              | `{}`              |

#### Return value

| Description                            | Type                                                                                                        |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Result of the `react-query`'s useQuery | [`QueryObserverResult<CustomResponse<TData>, TError>`](https://react-query.tanstack.com/reference/useQuery) |
