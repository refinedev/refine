---
title: "Autenticación | Refine v5"
display_title: "Autenticación"
sidebar_label: "Autenticación"
description: "Implementa login, logout, registro y comprobación de sesión con el auth provider de Refine."
---

La autenticación verifica la identidad de usuarios o clientes. En aplicaciones internas, dashboards y paneles de administración es una pieza clave para proteger páginas y datos.

Refine implementa autenticación mediante un `authProvider`. Este objeto contiene métodos asíncronos para iniciar sesión, cerrar sesión, registrar usuarios, comprobar sesión, manejar errores y obtener identidad o permisos.

## Auth provider

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

## Hooks de autenticación

Refine expone hooks como `useLogin`, `useLogout`, `useRegister`, `useIsAuthenticated` y `useGetIdentity`. También puedes usar el componente `<Authenticated />` para proteger rutas o renderizar contenido condicional.

## Integraciones

Puedes crear tu propio flujo o integrar proveedores como Google, Auth0, Amazon Cognito u Okta.
