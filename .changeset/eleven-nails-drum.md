---
"@pankod/refine-nextjs-router": major
---


We're releasing a new way to connect your router to **refine**. 

The legacy `routerProvider` and its exports are now deprecated but accessible at `@pankod/refine-nextjs-router/legacy-app` and `@pankod/refine-nextjs-router/legacy-pages`.

The new `routerBindings` are smaller and more flexible than the previos one.

## New `routerBindings` export

New `routerBindings` contains following properties;

- `go`: Which returns a function to handle the navigation in `next`. It accepts a config object and navigates to the given path. Uses `useRouter` hook under the hood.
- `back`: Which returns a function to handle the navigation in `next`. It navigates back to the previous page. Uses `useRouter` hook under the hood.
- `parse`: Which returns a function to parse the given path and returns the `resource`, `id`, `action` and additional `params`. Uses `useRouter` for `/pages` dir and `usePathname` and `useSearchParams` for `/app` dir.
- `Link`: A component that accepts `to` prop and renders a link to the given path. Uses `Link` component from `next/link` under the hood.

## Complemetary Components

- `RefineRoutes` - A component that renders the routes for the resources when the actions are defined as components. This can be used to achieve the legacy behavior of `routerProvider` prop. `RefineRoutes` component accepts a render function as a child and passes `JSX.Element` if there's a match for the given path, `undefined` is passed otherwise. You can use this in `[[...refine]]` route to render the matching action component for a resource. We're encouraging our users to use file based routing instead of `[[...refine]]` route which provides more flexibility and a better development experience with its performance benefits.

- `NavigateToResource` - A component that navigates to the first `list` action of the `resources` array of `<Refine>`. Optionally, you can pass a `resource` prop to navigate to `list` action of the resource. This can be placed at the `index` route of your app to redirect to the first resource.

- `UnsavedChangesNotifier` - This component handles the prompt when the user tries to leave the page with unsaved changes. It can be placed under the `Refine` component.
