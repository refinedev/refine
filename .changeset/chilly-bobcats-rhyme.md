---
"@refinedev/remix-router": major
---

## 🪄 Migrating your project automatically with refine-codemod ✨

[`@refinedev/codemod`](https://github.com/refinedev/refine/tree/master/packages/codemod) package handles the breaking changes for your project automatically, without any manual steps. It migrates your project from `3.x.x` to `4.x.x`.

Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

```sh
npx @refinedev/codemod refine3-to-refine4
```

And it's done. Now your project uses `refine@4.x.x`.

## 📝 Changelog

We're releasing a new way to connect your router to **refine**. 

The legacy `routerProvider` and its exports are now deprecated but accessible at `@refinedev/remix-router/legacy` path.

The new `routerBindings` are smaller and more flexible than the previos one.

## New `routerBindings` export

New `routerBindings` contains following properties;

- `go`: Which returns a function to handle the navigation in `@remix-run/react`. It accepts a config object and navigates to the given path. Uses `useNavigate` hook under the hood.
- `back`: Which returns a function to handle the navigation in `@remix-run/react`. It navigates back to the previous page. Uses `useNavigate` hook under the hood.
- `parse`: Which returns a function to parse the given path and returns the `resource`, `id`, `action` and additional `params`. Uses `useParams` and `useLocation` hooks under the hood.
- `Link`: A component that accepts `to` prop and renders a link to the given path. Uses `Link` component from `@remix-run/react` under the hood.

## Complemetary Components

- `RefineRoutes` - A component that renders the routes for the resources when the actions are defined as components. This can be used to achieve the legacy behavior of `routerProvider` prop. `RefineRoutes` component accepts a render function as a child and passes `JSX.Element` if there's a match for the given path, `undefined` is passed otherwise. You can use this in `$` splat route to render the matching action component for a resource. We're encouraging our users to use file based routing instead of `$` splat route which provides more flexibility and a better development experience with its performance benefits.

- `NavigateToResource` - A component that navigates to the first `list` action of the `resources` array of `<Refine>`. Optionally, you can pass a `resource` prop to navigate to `list` action of the resource. This can be placed at the `index` route of your app to redirect to the first resource.

- `UnsavedChangesNotifier` - This component handles the prompt when the user tries to leave the page with unsaved changes. It can be placed under the `Refine` component.

