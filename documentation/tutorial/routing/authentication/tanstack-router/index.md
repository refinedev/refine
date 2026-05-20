---
title: Authentication
---

import { Sandpack, AddAuthenticationToApp } from "./sandpack.tsx";

<Sandpack>

Before defining resource routes, we should split public and protected parts of the route tree.

With TanStack Router, a clean Refine setup is:

1. Keep a root route that renders `<Refine />`.
2. Add a protected layout route that wraps its children with `<Authenticated redirectOnFail="/login" />`.
3. Add a dedicated `/login` route that renders the login page when the user is logged out and redirects back when they are already authenticated.

```tsx title="src/App.tsx"
<Authenticated key="authenticated-routes" redirectOnFail="/login">
  <Header />
  <Outlet />
</Authenticated>
```

For the login page:

```tsx title="src/App.tsx"
<Authenticated key="auth-pages" fallback={<Login />}>
  <Navigate to="/" />
</Authenticated>
```

TanStack Router handles the route tree, while Refine keeps the authentication logic centered around the same `authProvider` contract you already configured in earlier units.

<AddAuthenticationToApp />

The next step is defining the actual CRUD routes and mapping them to Refine resources.

</Sandpack>
