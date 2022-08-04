---
id: useCreateMany
title: useCreateMany
siderbar_label: useCreateMany
description: useCreateMany data hook from refine is a modified version of react-query's useMutation for multiple create mutations
---

`useCreateMany` is a modified version of `react-query`'s [`useMutation`](https://react-query.tanstack.com/reference/useMutation#) for multiple create mutations.

It uses `createMany` method as mutation function from the [`dataProvider`](/core/providers/data-provider.md) which is passed to `<Refine>`.

## Features

-   Shows notifications after the mutation succeeds or fails.

-   Automatically invalidates the `list` queries after the mutation is succesfully run.
    [Refer to React Query docs for detailed information &#8594](https://react-query.tanstack.com/guides/invalidations-from-mutations)

## Usage

Let's say that we have a resource named `categories`.

```ts title="https://api.fake-rest.refine.dev/categories"
{
    [
        {
            id: 1,
            title: "E-business",
        },
        {
            id: 2,
            title: "Virtual Invoice Avon",
        },
    ];
}
```

```tsx 
type CategoryMutationResult = {
    id: number;
    title: string;
};

import { useCreateMany } from "@pankod/refine-core";

const { mutate } = useCreateMany<CategoryMutationResult>();

mutate({
    resource: "categories",
    values: [
        {
            title: "New Category",
        },
        {
            title: "Another New Category",
        },
    ],
});
```

:::tip
`mutate` can also accept lifecycle methods like `onSuccess` and `onError`. 

```tsx 
mutate(
    {
        resource: "categories",
        values: [
            {
                title: "New Category",
            },
            {
                title: "Another New Category",
            },
        ],
    },
    {
        onError: (error, variables, context) => {
            // An error happened!
        },
        onSuccess: (data, variables, context) => {
            // Let's celebrate!
        },
    },
);
```

[Refer to react-query docs for further information. &#8594](https://react-query.tanstack.com/guides/mutations#mutation-side-effects)
:::

<br />

After the mutation runs `categories` will be updated as below:

```ts title="https://api.fake-rest.refine.dev/categories"
{
    [
        {
            id: 1,
            title: "E-business",
        },
        {
            id: 2,
            title: "Virtual Invoice Avon",
        },
// highlight-start
        {
            id: 3,
            title: "New Category",
        },
        {
            id: 4,
            title: "Another New Category",
        },
// highlight-end
    ];
}
```

:::note
Queries that use `/categories` endpoint will be automatically invalidated to show the updated data. For example, data returned from [`useList`](useList.md) will be automatically updated.
:::

:::tip
`useCreateMany` returns `react-query`'s `useMutation` result which includes [a lot of properties](https://react-query.tanstack.com/reference/useMutation), one of which being `mutate`.
:::

:::important
Variables passed to `mutate` must have these types.

```tsx
{
    resource: string;
    values: TVariables[] = {};
}
```

:::

## API

### Properties

| Property                                                                                            | Description                                                                                        | Type                                                                       | Default                                                              |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| <div className="required-block"><div>resource</div> <div className=" required">Required</div></div> | Resource name for API data interactions                                                            | `string`                                                                   |                                                                      |
| values <div className=" required">Required</div>                                                    | Values for mutation function                                                                       | `TVariables[]`                                                             | [{}]                                                                 |
| successNotification                                                                                 | Successful Mutation notification                                                                   | [`SuccessErrorNotification`](/core/interfaces.md#successerrornotification) | "Successfully created `resource`s"                                   |
| errorNotification                                                                                   | Unsuccessful Mutation notification                                                                 | [`SuccessErrorNotification`](/core/interfaces.md#successerrornotification) | "There was an error creating `resource` (status code: `statusCode`)" |
| metaData                                                                                            | Metadata query for `dataProvider`                                                                  | [`MetaDataQuery`](/core/interfaces.md#metadataquery)                       | {}                                                                   |
| dataProviderName                                                                                    | If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use. | `string`                                                                   | `default`                                                            |
| invalidates                                                                                        | You can use it to manage the invalidations that will occur at the end of the mutation.           | `all`, `resourceAll`, `list`, `many`, `detail`, `false`                    | `["list", "many"]`                                                   |

### Type Parameters

| Property   | Desription                                                                          | Type                                           | Default                                        |
| ---------- | ----------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| TData      | Result data of the mutation. Extends [`BaseRecord`](/core/interfaces.md#baserecord) | [`BaseRecord`](/core/interfaces.md#baserecord) | [`BaseRecord`](/core/interfaces.md#baserecord) |
| TError     | Custom error object that extends [`HttpError`](/core/interfaces.md#httperror)       | [`HttpError`](/core/interfaces.md#httperror)   | [`HttpError`](/core/interfaces.md#httperror)   |
| TVariables | Values for mutation function                                                        | `{}`                                           | `{}`                                           |

### Return value

| Description                               | Type                                                                                                                                                                                     |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Result of the `react-query`'s useMutation | [`UseMutationResult<`<br/>`{ data: TData[]},`<br/>`TError,`<br/>` { resource: string; values: TVariables[]; },`<br/>` unknown>`](https://react-query.tanstack.com/reference/useMutation) |
