---
id: accessControl-provider
title: Access Control Provider
sidebar_label: Access Control Provider
---

Access control is a broad topic where there are lots of advanced solutions that provide different set of features. **refine** is deliberately agnostic for its own API to be able to integrate different methods (RBAC, ABAC, ACL, etc.) and different libraries ([Casbin](https://casbin.org/), [CASL](https://casl.js.org/v5/en/), [Cerbos](https://cerbos.dev/), [AccessControl.js](https://onury.io/accesscontrol/)). `can` method would be the entry point for those solutions.

**refine** provides an agnostic API via the `accessControlProvider` to manage access control throughout your app.

An `accessControlProvider` must implement only one async method named `can` to be used to check if the desired access will be granted.

`can` must have the interface:

```ts
type CanParams = {
    resource: string;
    action: string;
    params?: any;
};

type CanReturnType = {
    can: boolean;
    reason?: string;
}

const accessControlProvider = {
    can: ({ resource, action, params }: CanParams) => Promise<CanReturnType>;
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
                if (resource === "posts" && action === "edit") {
                    return Promise.resolve({
                        can: false,
                        reason: "Unauthorized",
                    });
                }

                return Promise.resolve({ can: true });
            },
        }}
    />;
};
```

:::tip
You can pass a `reason` along with `can`. It will be accessible using `useCan`. It will be shown at the tooltip of the buttons from **refine** when they are disabled.
:::

:::tip
You can find access control examples made with **refine**

-   **Casbin** &#8594 [Source Code](https://github.com/pankod/refine/tree/master/examples/accessControl/casbin) - [Demo](https://codesandbox.io/s/access-control-casbin-react-l06vy)
-   **Cerbos** &#8594 [Source Code](https://github.com/pankod/refine/tree/master/examples/accessControl/cerbos) - [Demo](https://codesandbox.io/s/access-control-cerbos-react-mbhei)
-   **Permify** &#8594 [Source Code](https://github.com/Permify/permify-refine) - [Demo](https://codesandbox.io/s/access-control-permify-react-tcs2g1)

:::

**refine** checks for access control in its related components and pages. [Refer here to see all the places **refine** checks for access control.](#list-of-default-access-control-points)

## Hooks and Components

**refine** provides a hook and a component to use the `can` method from the `accessControlProvider`.

### `useCan`

`useCan` uses the `can` as the query function for **react-query**'s `useQuery`. It takes the parameters that `can` takes. It can also be configured with `queryOptions` for `useQuery`. Returns the result of `useQuery`.

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

> `*`: Too see &#8594 [`CanParams`](/core/interfaces.md#canparams), [`CanReturnType`](/core/interfaces.md#canreturntype)

### `<CanAccess />`

`<CanAccess />` is a wrapper component that uses `useCan` to check for access control. It takes the parameters that `can` method takes and also a `fallback`. It renders its children if the access control returns true and if access control returns false renders `fallback` if provided.

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

[`@pankod/refine-nextjs-router`][nextjsrouter], [`@pankod/refine-react-router`][reactrouter], and [`@pankod/refine-react-location`][reactlocation] packages integrate access control for CRUD pages at `[resource]/[action]` and root routes.

They will check access control with parameters:

-   dashboard (`/`): `{ resource: "dashboard", action: "list" }`
-   list (e.g. `/posts`): `{ resource: "posts", action: "list" }`
-   create (e.g. `/posts/create`): `{ resource: "posts", action: "create" }`
-   clone (e.g. `/posts/clone/1`): `{ resource: "posts", action: "create", params: { id :1 } }`
-   edit (e.g. `/posts/edit/1`): `{ resource: "posts", action: "edit", params: { id :1 } }`
-   show (e.g. `/posts/show/1`): `{ resource: "posts", action: "show", params: { id :1 } }`

In case access control returns `false` they will show [`cathcAll`][catchall] if provided or a standard error page otherwise.

### Sider

Sider is also integrated so that unaccessible resources won't appear in the sider menu.

Menu items will check access control with `{ resource, action: "list" }`

For example if your app has resource `posts` it will be checked with `{ resource: "posts", action: "list" }`

### Buttons

These buttons will check for access control.
Let's say these buttons are rendered where `resource` is `posts` and `id` is `1` where applicable.

-   [**List**](/ui-frameworks/antd/components/buttons/list.md): `{ resource: "posts, action: "list" }`
-   [**Create**](/ui-frameworks/antd/components/buttons/create.md): `{ resource: "posts, action: "create" }`
-   [**Clone**](/ui-frameworks/antd/components/buttons/clone.md): `{ resource: "posts, action: "create", params: { id: 1 } }`
-   [**Edit**](/ui-frameworks/antd/components/buttons/edit.md): `{ resource: "posts, action: "edit", params: { id: 1 } }`
-   [**Delete**](/ui-frameworks/antd/components/buttons/delete.md): `{ resource: "posts, action: "delete", params: { id: 1 } }`
-   [**Show**](/ui-frameworks/antd/components/buttons/show.md): `{ resource: "posts, action: "show", params: { id: 1 } }`

These buttons will be disabled if access control returns `{ can: false }`

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/access-control-casbin-react-l06vy?autoresize=1&fontsize=14&module=%2Fsrc%2FApp.tsx&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="access-control-casbin-react"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

[nextjsrouter]: https://www.npmjs.com/package/@pankod/refine-nextjs-router
[reactrouter]: https://www.npmjs.com/package/@pankod/refine-react-router
[reactlocation]: https://www.npmjs.com/package/@pankod/refine-react-location
[catchall]: /core/components/refine-config.md#catchall
[listbtn]: /ui-frameworks/antd/components/buttons/list.md
