---
id: authenticated
title: <Authenticated>
sidebar_label: <Authenticated>
---

`<Authenticated>` is the component form of [`useIsAuthenticated`][use-is-authenticated].

It internally uses [`useIsAuthenticated`][use-is-authenticated]'s return values (`data.authenticated`, `data.error`, and, `isLoading`) to provide its functionality.

When:

-   `data.authenticated` is `true`, it renders to children.
-   `data.authenticated` is `false`, it renders [`fallback`](#fallback) prop if provided. Otherwise, it redirects to `data.redirectTo` page.
-   `isLoading` is `true`, it renders [`loading`](#loading) prop.

You may want to use this component when rendering a page that requires authentication. You will be able to render a fallback or redirect to an authentication page depending on your case. `Authenticated` can also be used to render a conditional content based on the user's authentication status.

## Basic Usage

```tsx
import { Authenticated } from "@refinedev/core";

const MyPage = () => (
    <Authenticated>
        <YourComponent />
    </Authenticated>
);
```

## Properties

### `redirectOnFail`

The path to redirect to if the user is not logged in. If left empty, the user will be redirected to the `redirectTo` property of the `check` function of the `AuthProvider`.

:::info

This property only works if the `fallback` prop is not provided.

:::

### `appendCurrentPathToQuery`

If `true`, the current path will be appended to the `to` query parameter. This is useful when you want to redirect the user to the page they were trying to access after they log in.

### `fallback`

Component to render if the user is not logged in. If `undefined`, the page will be redirected to `/login`.

```tsx
<Authenticated fallback={<div>You cannot access this section</div>}>
    <YourComponent />
</Authenticated>
```

### `loading`

Component to render while checking whether the user is logged in.

```tsx
<Authenticated loading={<div>loading...</div>}>
    <YourComponent />
</Authenticated>
```

## API Reference

### Properties

<PropsTable module="@refinedev/core/Authenticated"/>

[use-is-authenticated]: docs/api-reference/core/hooks/authentication/useIsAuthenticated