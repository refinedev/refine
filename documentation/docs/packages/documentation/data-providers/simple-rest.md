---
id: simple-rest
title: Simple REST
---

The Simple REST data provider is a package that provides an implementation for working with REST APIs that conform to a standard API design. It is built on the foundation of the [json-server](https://github.com/typicode/json-server) package.

You can use this data provider to quickly get started with **refine** and then customize it to fit your specific needs.

Run the following command to install:

```bash
npm install @refinedev/simple-rest
```

## Usage

The package exports a function that accepts two parameters: `apiUrl` and `httpClient`.

-   **`apiUrl`:** The base URL for your API endpoints. All requests made through the data provider will be made relative to this URL.

    ```tsx
    import { Refine } from "@refinedev/core";
    import dataProvider from "@refinedev/simple-rest";

    const App = () => {
        return (
            <Refine
                dataProvider={dataProvider("https://my.api.com")}
                /* ... */
            />
        );
    };
    ```

-   **`httpClient`:** An axios instance used to make HTTP requests. You can provide your own instance otherwise the data provider will create one for you.

    ```tsx
    import { Refine, HttpError } from "@refinedev/core";
    import dataProvider from "@refinedev/simple-rest";
    import axios from "axios";

    const httpClient = axios.create();

    httpClient.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            const customError: HttpError = {
                ...error,
                message: error.response?.data?.message,
                statusCode: error.response?.status,
            };

            return Promise.reject(customError);
        },
    );

    const App = () => {
        return (
            <Refine
                dataProvider={dataProvider("https://my.api.com", httpClient)}
                /* ... */
            />
        );
    };
    ```

## URL design

The data provider methods are designed to work with REST APIs that follow the standard design. The following table shows the expected URL for each method:

| Method      | URL                          | Query Parameters                   | Body              |
| ----------- | ---------------------------- | ---------------------------------- | ----------------- |
| `getList`   | `apiUrl` / `resource`        | `pagination`, `sorters`, `filters` |                   |
| `getOne`    | `apiUrl` / `resource` / `id` |                                    |                   |
| `getMany`   | `apiUrl` / `resource`        | `id`                               |                   |
| `create`    | `apiUrl` / `resource`        |                                    | `variables`       |
| `update`    | `apiUrl` / `resource` / `id` |                                    | `variables`       |
| `deleteOne` | `apiUrl` / `resource` / `id` |                                    | `data: variables` |

## Default HTTP methods and customizing them

The following table shows the HTTP method used for each data provider method:

| Method      | HTTP Method |
| ----------- | ----------- |
| `getList`   | `GET`       |
| `getOne`    | `GET`       |
| `getMany`   | `GET`       |
| `create`    | `POST`      |
| `update`    | `PATCH`     |
| `deleteOne` | `DELETE`    |

You can customize the HTTP method used for each data provider method by passing a `method` property in the `meta` parameter when calling a hook.

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

## Passing custom headers

You can pass custom headers to the data provider by passing a `headers` property in the `meta` parameter.

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

## Customizing the data provider

In some cases, you may need to customize the data provider to work with a REST API that doesn't follow the simple-rest design. In this case, you can use the `swizzle` command to customize the data provider.

:::caution

The `swizzle` command is only available in the `@refinedev/cli` package. If you don't have it installed, refer to the [CLI documentation](/docs/packages/documentation/cli/).

:::

1. Run the `swizzle` command in the project directory:

    ```bash
    npm run refine swizzle
    ```

2. Select `@refinedev/simple-rest` from the list of available data providers.

3. Edit the `/rest-data-provider/index.ts` file to customize the data provider.

4. Pass the customized data provider to the `dataProvider` prop of the `Refine` component.

    ```tsx
    import { Refine } from "@refinedev/core";

    import { dataProvider } from "./rest-data-provider";

    const App = () => {
        return (
            <Refine
                dataProvider={dataProvider}
                /* ... */
            />
        );
    };
    ```
