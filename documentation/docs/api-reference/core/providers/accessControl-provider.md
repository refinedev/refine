---
id: accessControl-provider
title: Access Control Provider
sidebar_label: Access Control Provider
---

## Overview

Access control is a broad topic with lots of advanced solutions that provide different sets of features.

**refine** provides an agnostic API via the `accessControlProvider` to manage access control throughout your app, which allows you to integrate different methods, such as `RBAC`, `ABAC`, `ACL`, etc., and libraries, such as [Casbin](https://casbin.org/), [CASL](https://casl.js.org/v5/en/), [Cerbos](https://cerbos.dev/) and [AccessControl.js](https://onury.io/accesscontrol/).

To check if a desired access will be granted, the `accessControlProvider` should have a single asynchronous method named `can` with the following interface:

```ts
type CanParams = {
    resource: string;
    action: string;
    params?: {
        resource?: IResourceItem;
        id?: BaseKey;
        [key: string]: any;
    };
};

type CanReturnType = {
    can: boolean;
    reason?: string;
}

const accessControlProvider = {
    can: ({ resource, action, params }: CanParams) => Promise<CanReturnType>;
}
```

> For more information, refer to these sections in the Interface References documentation [`IResourceItem`][iresourceitem], [`BaseKey`][basekey], [`CanParams`][canparams], [`CanReturnType`][canreturntype]

A basic usage would be like this:

```tsx
const App: React.FC = () => {
    return (
        <Refine
            // other providers and props
            accessControlProvider={{
                can: async ({ resource, action, params }) => {
                    if (resource === "posts" && action === "edit") {
                        return {
                            can: false,
                            reason: "Unauthorized",
                        };
                    }

                    return { can: true };
                },
            }}
        >
            {/* your app */}
        </Refine>
    );
};
```

:::caution

Depending on your router, providing `accessControlProvider` to the `<Refine>` component **won't enforce** access control by itself; you may need to wrap protected routes with the `<CanAccess>` component.

Refer to one of the following documentations, depending on your preferred router:

-   [React Router Access Control](/docs/packages/documentation/routers/react-router-v6#usage-with-access-control-providers)

-   [NextJS Router Access Control](/docs/packages/documentation/routers/nextjs#access-control)

-   [Remix Router Access Control](/docs/packages/documentation/routers/remix#access-control)

:::

---

:::tip
You can also access the resource object directly.

In the example below, the `can` function receives the `resource`([ResourceItemProps][iresourceitem]) object you pass to the `<Refine/>` component, which allows you to use Attribute Based Access Control (ABAC), which allows you to grant permissions based on the value of a field in the resource object.

```tsx
export const accessControlProvider = {
    can: async ({ resource, action, params }) => {
        const resourceName = params?.resource?.name;
        const anyUsefulMeta = params?.resource?.meta?.yourUsefulMeta;

        if (
            resourceName === "posts" &&
            anyUsefulMeta === true &&
            action === "edit"
        ) {
            return {
                can: false,
                reason: "Unauthorized",
            };
        }
    },
};
```

:::

---

:::tip
You can pass a `reason` along with `can`. It will be accessible using `useCan`. It will be shown at the tooltip of the buttons from **refine** when they are disabled.
:::

---

:::tip
You can find access control examples made with **refine**

-   **Casbin** &#8594 [Source Code](https://github.com/refinedev/refine/tree/master/examples/access-control-casbin) - [Demo](https://codesandbox.io/embed/github/refinedev/refine/tree/next/examples/access-control-casbin/?view=preview&theme=dark&codemirror=1)
-   **Cerbos** &#8594 [Source Code](https://github.com/refinedev/refine/tree/master/examples/access-control-cerbos) - [Demo](https://codesandbox.io/embed/github/refinedev/refine/tree/next/examples/access-control-cerbos/?view=preview&theme=dark&codemirror=1)

:::

[**refine** checks for access control in its related components and pages.](#list-of-default-access-control-points)

## Hooks and Components

**refine** provides a hook and a component to use the `can` method from the `accessControlProvider`.

### `useCan`

`useCan` uses the `can` for the query function for **react-query**'s `useQuery`. It takes the parameters that `can` takes, can be configured with `queryOptions` of `useQuery` and returns the result of `useQuery`.

```tsx
const { data } = useCan({
    resource: "resource-you-ask-for-access",
    action: "action-type-on-resource",
    params: { foo: "optional-params" },
});
```

```ts
const useCan: ({
    action,
    resource,
    params,
    queryOptions,
}: CanParams* & {
    queryOptions?: UseQueryOptions<CanReturnType>;
}) => UseQueryResult<CanReturnType*>
```

> For more information, refer to these sections in the Interfaces documentation: [`CanParams`](/api-reference/core/interfaces.md#canparams) and [`CanReturnType`](/api-reference/core/interfaces.md#canreturntype)

### `<CanAccess />`

`<CanAccess />` is a wrapper component that uses `useCan` to check for access control. It takes the parameters that `can` method takes and also a `fallback`. If access control returns true, it renders its children; otherwise, it renders `fallback`, if it was provided.

```tsx
<CanAccess
    resource="posts"
    action="edit"
    params={{ id: 1 }}
    fallback={<CustomFallback />}
>
    <YourComponent />
</CanAccess>
```

## Performance

As the number of points that check for access control in your app increases, the performance of your app may take a hit, especially if its access control involves remote endpoints. Caching the access control checks helps quite a lot, which can be done easily by configuring the [`staleTime` and `cacheTime`](https://react-query.tanstack.com/reference/useQuery) properties since **refine** uses react-query.

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

:::note
By default, **refine** uses 5 minutes for `cacheTime` and 0 minutes for `staleTime` for its own access control points.
:::

## List of Default Access Control Points

Here is a list of components and pages **refine** checks for access control:

### Sider

Sider is integrated, which means that unaccessible resources won't appear in the sider menu.

Menu items will check access control with `{ resource, action: "list" }`. For example, if your app has a resource called `posts`, it will be checked with `{ resource: "posts", action: "list" }`.

### Buttons

These buttons will be checked for access control.

Let's say they are rendered where `resource` is `posts` and `id` is `1` where applicable. The `can` function will receive the `resource`([ResourceItemProps][iresourceitem]) object you passed to the `<Refine/>` component, which allows you to use Attribute Based Access Control (ABAC), which allows you to grant permissions based on the value of a field in the resource object.

-   [**List**](/api-reference/antd/components/buttons/list.md): `{ resource: "posts", action: "list", params: { *resource } }`
-   [**Create**](/api-reference/antd/components/buttons/create.md): `{ resource: "posts", action: "create", params: { *resource } }`
-   [**Clone**](/api-reference/antd/components/buttons/clone.md): `{ resource: "posts", action: "create", params: { id: 1, *resource } }`
-   [**Edit**](/api-reference/antd/components/buttons/edit.md): `{ resource: "posts", action: "edit", params: { id: 1, *resource } }`
-   [**Delete**](/api-reference/antd/components/buttons/delete.md): `{ resource: "posts, action: "delete", params: { id: 1, *resource } }`
-   [**Show**](/api-reference/antd/components/buttons/show.md): `{ resource: "posts", action: "show", params: { id: 1, *resource } }`

These buttons will be disabled if access control returns `{ can: false }`

## Examples

This example is for **Casbin** access control provider. You can check our other access control provider, [**Cerbos**](/docs/examples/access-control/cerbos/) as well.
<CodeSandboxExample path="access-control-casbin" />

[iresourceitem]: /api-reference/core/interfaces.md#resourceitemprops
[basekey]: /api-reference/core/interfaces.md#basekey
[canparams]: /api-reference/core/interfaces.md#canparams
[canreturntype]: /api-reference/core/interfaces.md#canreturntype
