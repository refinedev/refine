---
title: "Authentication | Refine v5"
display_title: "Authentication"
sidebar_label: "Authentication"
description: "Реализуйте login, logout, register и session check через auth provider Refine."
---

Authentication проверяет личность users или clients. В internal tools и dashboards она защищает pages и sensitive data.

Refine использует `authProvider`. Этот объект содержит async methods для login, logout, register, session check, error handling, identity и permissions.

```tsx title="auth-provider.ts"
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const isValid = email && password;
    return isValid
      ? { success: true, redirectTo: "/dashboard" }
      : { success: false, error: { name: "LoginError", message: "Invalid credentials" } };
  },
  check: async () => ({ authenticated: true }),
  logout: async () => ({ success: true, redirectTo: "/login" }),
  onError: async () => ({}),
};
```

Используйте `useLogin`, `useLogout`, `useRegister`, `useIsAuthenticated`, `useGetIdentity` или component `<Authenticated />` для защиты routes.
