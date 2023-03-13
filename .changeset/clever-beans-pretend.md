---
"@refinedev/core": major
---

## 🪄 Migrating your project automatically with refine-codemod ✨

[`@refinedev/codemod`](https://github.com/refinedev/refine/tree/master/packages/codemod) package handles the breaking changes for your project automatically, without any manual steps. It migrates your project from `3.x.x` to `4.x.x`.

Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

```sh
npx @refinedev/codemod refine3-to-refine4
```

And it's done. Now your project uses `refine@4.x.x`.

## 📝 Changelog

We're releasing a new way to connect routers to **refine**. Now the `routerProvider` prop is marked as optional in `<Refine>` component.

New `routerProvider` property is smaller and more flexible than the previous one which is now can be used with `legacyRouterProvider` property. 

We've redesigned our bindings to the router libraries. Instead of handling the route creation process, now **refine** leaves this to the user and only uses a way to communicate with the router and the routes through the bindings provided to `routerProvider` property.

The changes in routing system comes with a new way to define resource actions as well. Actions now can be defined as paths, components or both. We're encouraging our users to use paths, which enables our users to use all the optimizations that the router libraries provide without giving up any features of **refine**.

Router libraries are also comes with components like `RefineRoutes` which can be used to define routes for resources when you pass components to the actions of the resources. Please refer to the documentation for more information.

## Changes in `resources`

Now you can define actions in multiple ways;

1. As a path

```tsx
<Refine
    resources={[
        {
            name: "posts",
            list: "/posts",
        },
    ]}
>
...
</Refine>
```

2. As a component

```tsx
import { PostList } from "src/posts";

<Refine
    resources={[
        {
            name: "posts",
            list: PostList,
        },
    ]}
>
...
</Refine>
```

3. As both

```tsx
import { PostList } from "src/posts";

<Refine
    resources={[
        {
            name: "posts",
            list: {
                path: "/posts",
                component: PostList,
            },
        },
    ]}
>
...
</Refine>
```

This also comes with some additional changes;

- `options` property is renamed to `meta` for consistency.
- `parentName` is now defined with `parent` property in `meta` object.
- `auditLog` is renamed to `audit`.
- `route` in `options` is now deprecated for the new routing system. If you want to define a custom route for a resource, you can define such routes in action definitions.
- Parents are not included in the routes by default. If you want to inclue parents in the routes, you need to define action paths explicitly.
- `identifier` can be passed to the resource definition to distinguish between resources with the same name. This is useful when you have multiple resources with the same name.

### Nested routes

Now, **refine** supports nested routes with parameters. You can define the action paths for a resource with parameters. Parameters will be filled with the current ones in the URL and additional ones can be provided via `meta` properties in hooks and components.

```tsx
<Refine
    resources={[
        {
            name: "posts",
            list: "users/:authorId/posts",
            show: "users/:authorId/posts/:id",
        },
    ]}
>
```

When you're in the `list` page of the `posts` resource, assuming you already have the `authorId` parameter present in the URL, the `show` action will be rendered with the `authorId` parameter filled with the current one in the URL. If you want to use a different `authorId`, you can pass `meta` properties to the components or hooks, such as `useGetToPath` hook to get the navigation path.

```tsx
const { go } = useGo();
const getToPath = useGetToPath();

const to = getToPath({
    resource: "posts",
    action: "show",
    meta: {
        id: 1,
        authorId: 2,
    },
});
// "to" will be "/users/2/posts/1"

go({ to, type: "push" });
```

## Changes in `routerProvider`

`routerProvider` is now smaller and more flexible. It only contains the following properties;

- `Link`: A component that accepts `to` prop and renders a link to the given path.
- `go`: A function that returns a function that accepts a config object and navigates to the given path.
- `back`: A function that returns a function that navigates back to the previous page.
- `parse`: A function that returns a function that returns the `resource`, `id`, `action` and additional `params` from the given path. This is the **refine**'s way to communicate with the router library.

None of the properties are required. Missing properties may result in some features not working but it won't break **refine**.

Our users are able to provide different implementations for the router bindings, such as handling the search params in the path with a different way or customizing the navigation process.

**Note**: Existing `routerProvider` implementation is preserved as `legacyRouterProvider` and will continue working as before. We're planning to remove it in the next major version.

**Note**: New routing system do not handle the authentication process. You can now wrap your components with `Authenticated` component or handle the authentication check inside your components through `useIsAuthenticated` hook to provide more flexible auth concepts in your app.

## Changes in hooks

We're now providing new hooks for the new routing system. You're free to use them or use the ones provided by your router library.

- `useGo`
- `useBack`
- `useParsed`
- `useLink`
- `useGetToPath`

are provided by **refine** to use the properties of `routerProvider` in a more convenient way.

- `useResourceWithRoute` is now deprecated and only works with the legacy routing system.
- `useResource` has changed its definition and now accepts a single argument which is the `resource` name. It returns the `resource` object depending on the current route or the given `resource` name. If `resource` is provided but not found, it will create a temporary one to use with the given `resource` name.
- `useNavigation`'s functions in its return value are now accepting `meta` object as an argument. This can be used to provide parameters to the target routes. For example, if your path for the `edit` action of a resource is `/:userId/posts/:id/edit`, you can provide `userId` parameter in `meta` object and it will be used in the path. 
- Hooks using routes, redirection etc. are now accepts `meta` property in their arguments. This can be used to provide parameters to the target routes. This change includes `useMenu` and `useBreadcrumb` which are creating paths to the resources for their purposes.
- `selectedKey` in `useMenu` hook's return type now can be `undefined` if the current route is not found in the menu items.

## `warnWhenUnsavedChanges` prop

In earlier versions, **refine** was handling this feature in `beforeunload` event. This was causing unintended dependencies to the `window` and was not customizable. Now, **refine** is leaving this to the router libraries. Router packages `@refinedev/react-router-v6`, `@refinedev/nextjs-router` and `@refinedev/remix-router` are now exporting a component `UnsavedChangesNotifier` which can be placed under the `<Refine>` component and registers a listener to the necessary events to handle the `warnWhenUnsavedChanges` feature.

## Changes in `Authenticated` component.

`<Authenticated>` component now accepts `redirectOnFail` to override the redirection path on authentication failure. This can be used to redirect to a different page when the user is not authenticated. This property only works if the `fallback` prop is not provided. 

`redirectOnFail` also respects the newly introduced `appendCurrentPathToQuery` prop which can be used to append the current path to the query string of the redirection path. This can be used to redirect the user to the page they were trying to access after they logged in.

## Changes in `<Refine>`

We've removed the long deprecated props from `<Refine />` component and deprecated some more to encourage users to use the new routing system.

In earlier versions, we've accepted layout related props such as `Layout`, `Sider`, `Header`, `Footer`, `OffLayoutArea` and `Title`. All these props were used in the route creation process while wrapping the components to the `Layout` and others were passed to the `Layout` for configuration. Now, we've deprecated these props and we're encouraging users to use `Layout` prop and its props in the `children` of `<Refine />` component. This will allow users to customize the layout easily and provide custom layouts per route.

We've also deprecated the route related props such as;

- `catchAll`, which was used in rendering 404 pages and was unclear to the user when its going to be rendered in the app.
- `LoginPage`, which was rendered at `/login` path and was not customizable enough.
- `DashboardPage`, which wass rendered at `/` path and was limiting our users to handle the index page just with a single prop.
- `ReadyPage`, which was shown when `<Refine>` had no resources defined. Now, we're accepting empty resources array and rendering nothing in this case.

We're encouraging our users to create their own routes for the above props and give them the flexibility to use the full potential of the router library they're using.

## Integration with existing apps

We've made the changes to the routing system, the resource definitions and some additional changes to make the integration with existing apps possible. 

Now you can migrate your existing apps to **refine** with ease and incrementally adopt **refine**'s features.

## Backward compatibility

We've made all the changes in a backward compatible way. You can continue using the old routing system and the old props of `<Refine />` component. Migrating to the new behaviors are optional but encouraged. 

We're planning to keep the support for the deprecated props and the old behaviors until the next major version.