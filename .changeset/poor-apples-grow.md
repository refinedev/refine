---
"@pankod/refine-react-router-v6": major
---

We're releasing a new way to connect your router to **refine**. 

The legacy `routerProvider` and its exports are now deprecated but accessible at `@pankod/refine-react-router-v6/legacy` path.

The new `routerBindings` are smaller and more flexible than the previos one.

## New `routerBindings` export

New `routerBindings` contains following properties;

- `go`: Which returns a function to handle the navigation in `react-router-v6`. It accepts a config object and navigates to the given path. Uses `useNavigate` hook under the hood.
- `back`: Which returns a function to handle the navigation in `react-router-v6`. It navigates back to the previous page. Uses `useNavigate` hook under the hood.
- `parse`: Which returns a function to parse the given path and returns the `resource`, `id`, `action` and additional `params`. Uses `useParams` and `useLocation` hooks and `qs` package under the hood.
- `Link`: A component that accepts `to` prop and renders a link to the given path. Uses `Link` component from `react-router-dom` under the hood.

## Complemetary Components

- `RefineRoutes` - A component that renders the routes for the resources when the actions are defined as components. This can be used to achieve the legacy behavior of `routerProvider` prop. `RefineRoutes` component accepts a render function as a child and passed a `JSX.Element` array containing `Route` components for the resource routes. You can wrap it to a `Routes` component and let it handle the route creation process for you. Additionally, If you want to add custom routes, you can place them inside the `Routes` component or you can place an another `Routes` component. Both apporaches are now valid and accepted by **refine**.

- `NavigateToResource` - A component that navigates to the first `list` action of the `resources` array of `<Refine>`. Optionally, you can pass a `resource` prop to navigate to `list` action of the resource. This can be placed at the `index` route of your app to redirect to the first resource.

- `UnsavedChangesNotifier` - This component handles the prompt when the user tries to leave the page with unsaved changes. It can be placed under the `Refine` component.

## Exported values from `react-router-dom`

In earlier versions, we've re-exported the `react-router-dom` package. This was a bad practice and we've removed it in this version. If you're using `react-router-dom` in your project, you should install it as a dependency and import the values from it.
