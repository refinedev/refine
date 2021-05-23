---
id: useCustom
title: useCustom
siderbar_label: useCustom
---

`useCustom` is a modified version of `react-query`'s [`useQuery`](https://react-query.tanstack.com/reference/useQuery) for custom requests. It uses `custom` method as from the `dataProvider` that is passed to `<Admin>`.

### Features

-   You can send a request to any link, using all methods (`get, delete, head, options, post, put, patch`).
-   You can send comprehensive requests to resources with `Sort` and `Filter` parameters.

### Usage 

// TODO

### API

#### Parameters

| Property     | Description                                                             | Type   | Required |
| ------------ | ----------------------------------------------------------------------- | ------ | -------- |
| url          | URL                                                                     | string | true     |
| method       | Method                                                                  | string | true     |
| config       | Query Params                                                            | object | false    |
| queryOptions | [useQuery Options](https://react-query.tanstack.com/reference/useQuery) | object | false    |

#### Type Parameters

| Property   | Desription                                             | Type              | Default           |
| ---------- | ------------------------------------------------------ | ----------------- | ----------------- |
| TData      | Result data of the mutation. Extends [`BaseRecord`](#) | [`BaseRecord`](#) | [`BaseRecord`](#) |
| TError     | Custom error object that extends [`HttpError`](#)      | [`HttpError`](#)  | [`HttpError`](#)  |
| TVariables | Values for mutation function                           | `{}`              | `{}`              |

#### Return value

| Description                            | Type                                                                                                        |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Result of the `react-query`'s useQuery | [`QueryObserverResult<CustomResponse<TData>, TError>`](https://react-query.tanstack.com/reference/useQuery) |
