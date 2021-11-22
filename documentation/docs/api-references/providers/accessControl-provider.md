---
id: accessControl-provider
title: Access Control Provider
sidebar_label: Access Control Provider
---

Access control is a broad topic where there are lots of advanced solutions that provide different set of features. **refine** is deliberately agnostic for its own API to be able to integrate different solutions(RBAC, ABAC, ACL, [casbin](https://casbin.org/), [casl](https://casl.js.org/v5/en/), [cerbos](https://cerbos.dev/), [accesscontrol.js](https://onury.io/accesscontrol/)). `can` method would be the entry point for those solutions.

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

## Usage

A basic example looks like:

```tsx
const App: React.FC = () => {
    <Refine
        // other providers and props
        accessControlProvider={{
            can: async ({ resource, action, params }) => {
                if(resource === "posts" && action === "edit") return false
                return true
            },
        }}
    />
}
```

:::tip
[You can find access control examples made with **refine** here](https://github.com/pankod/refine/tree/master/examples/accessControl)
:::

**refine** checks for access control in its related components and pages. [Refer here to see all the places **refine** checks for access control.](#list-of-default-access-control-points)

## Hooks and Components

**refine** provides a hook and a component to use the `can` method from the `accessControlProvider`.

### `useCan`

`useCan` uses the `can` as the query function for **react-query**'s `useQuery`. It takes the parameters that `can` takes. It can also be configured with `queryOptions` for `useQuery`. Returns the result of `useQuery`.

```tsx
// inside your component

const { data } = useCan({
    resource: "resource-you-ask-for-access",
    action: "action-type-on-resource",
    params: { foo: "optional-params" } },
);
```

```ts
const useCan: (
    params: CanParams*,
    queryOptions?: UseQueryOptions<boolean>,
) => UseQueryResult<boolean>
```

> `*`: Too see &#8594 [`CanParams`](/api-references/interfaces.md#canparams)

### `<CanAccess/>`

`<CanAccess/>` is a wrapper component that uses `useCan` to check for access control. It takes the parameters that `can` method takes and also a `fallback`. It renders its children if the access control returns true and if access control returns false renders `fallback` if provided.

```tsx
<CanAccess
    resource="posts"
    action="edit"
    fallback={<CustomFallback/>}
>
    <YourComponent>
</CanAccess>
```

## Performance

As the number of points that checks for access control in your app increases the performance of your app may take a hit especially if its access control involves remote endpoints. Caching the access control checks helps a great deal. Since **refine** uses react-query it can be easily done configuring [`staleTime` and `cacheTime`](https://react-query.tanstack.com/reference/useQuery) properties.

```ts
// inside your component

const { data } = useCan({
    resource: "resource-you-ask-for-access",
    action: "action-type-on-resource",
    params: { foo: "optional-params" } },
    queryOptions: {
        staleTime: 5 * 60 * 1000, // 5 minutes
    }
);
```

**refine** uses 5 minutes `cacheTime` and 0 for `staleTime` by default for its own access control points.

## List of Default Access Control Points
### Routes

[`@pankod/refine-nextjs-router`][NextjsRouter] and [`@pankod/refine-react-router`][ReactRouter] packages integrate access control for crud pages at `[resource]/[action]` routes.

They will check access control with parameters:

- list (e.g. `/posts`): `{resource: "posts", action: "list"}`
- create (e.g. `/posts/create`): `{resource: "posts", action: "create"}`
- clone (e.g. `/posts/create/1`): `{resource: "posts", action: "create", params: {id :1}}`
- edit (e.g. `/posts/edit/1`): `{resource: "posts", action: "edit", params: {id :1}}`
- show (e.g. `/posts/show/1`): `{resource: "posts", action: "show", params: {id :1}}`

In case access control returns `false` they will show [`cathcAll`][CatchAll] if provided or a standard error page otherwise.

### Sider

Sider is also integrated so that unaccessible resources won't appear in the sider menu.

Menu items will check access control with `{resource, action: "list"}`

For example if your app has resource `posts` it will be checked with `{resource: "posts", action: "list"}`

### Buttons

These buttons will check for access control.
Let's say these buttons are rendered where `resource` is `posts` and `id` is `1` where applicable.

- [**list**](/api-references/components/buttons/list): `{resource: "posts, action: "list"}`
- [**create**](/api-references/components/buttons/create): `{resource: "posts, action: "create"}`
- [**clone**](/api-references/components/buttons/clone): `{resource: "posts, action: "create", params: { id: 1 }}`
- [**edit**](/api-references/components/buttons/edit): `{resource: "posts, action: "edit", params: { id: 1 }}`
- [**delete**](/api-references/components/buttons/delete): `{resource: "posts, action: "delete", params: { id: 1 }}`
- [**show**](/api-references/components/buttons/show): `{resource: "posts, action: "show", params: { id: 1 }}`

These buttons will be disabled if access control returns `false`

[NextjsRouter]: https://www.npmjs.com/package/@pankod/refine-nextjs-router
[ReactRouter]: https://www.npmjs.com/package/@pankod/refine-react-router
[CatchAll]: /api-references/components/refine-config.md#catchall
[ListBtn]: /api-references/components/buttons/list.md