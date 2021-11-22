---
id: accessControl-provider
title: Access Control Provider
sidebar_label: Access Control Provider
---

**refine** provides an agnostic API via the `accessControlProvider` to manage access control throughout your app.

An `accessControlProvider` must implement only one async method named `can` to be used to check if the desired access will be granted.

`can` must have the interface:

```ts
type CanParams = {
    resource: string;
    action: string;
    params?: any;
};

const accessControlProvider = {
    can: ({ resource, action, params }: CanParams) => Promise<boolean>;
}
```

A basic example looks like:

```tsx
const App: React.FC = () => {
    <Refine
        // other providers and props
        accessControlProvider={{
            can: async ({ action, params, resource }) => {
                if(resource === "posts" && action === "edit") return false
                return true
            },
        }}
    />
}
```

:::important
Access control is a broad topic where there are lots of advanced solutions that provide different set of features. **refine** is deliberately agnostic for its own API to be able to integrate different solutions. `can` method would be the entry point for those solutions.
:::

**refine** checks for access control in its related components and pages. [Refer here to see all the places **refine** checks for access control.](#list-of-access-control-points)

## Check Access Control Yourself

**refine** provides a hook and a component to use the `can` method from the `accessControlProvider`.

### `useCan`

`useCan` uses the `can` as the query function for **react-query**'s `useQuery`. It takes the parameters that `can` takes. It can also be configured with `queryOptions` for `useQuery`. Returns the result of `useQuery`.

```tsx
// inside your component

const { data } = useCan(
    {
        resource: "resource-you-ask-for-access",
        action: "action-type-on-resource",
        params: { foo: "optional-params" } },
);
```

```ts
const useCan: (
    params: CanParams,
    queryOptions?: UseQueryOptions<boolean>,
) => UseQueryResult<boolean>
```

### `<CanAccess/>`

`<CanAccess/>` is a wrapper component that uses `useCan` to check for access control. It takes the parameters that `can` method takes and also a `fallback`. It renders its children if the access control returns true and if access control returns false renders `fallback` if provided.

```tsx
<CanAccess
    resource="posts"
    action="edit"
    fallback={<CustomFallback>}
>
    <YourComponent>
</CanAccess>
```

## Performance

As the number of points that checks for access control in your app increases the performance of your app may take a hit especially if its access control involves remote endpoints. Caching the access control checks helps a great deal. Since **refine** uses react-query it can be easily done configuring [`staleTime` and `cacheTime`](https://react-query.tanstack.com/reference/useQuery) properties.

```ts
// inside your component

const { data } = useCan(
    {
        resource: "resource-you-ask-for-access",
        action: "action-type-on-resource",
        params: { foo: "optional-params" } },
    {
        staleTime: 5 * 60 * 1000, // 5 minutes
    }
);
```

**refine** uses 5 minutes `cacheTime` by default for its own access control points.

## List of Default Access Control Points 