---
title: "Autorización | Refine v5"
display_title: "Autorización"
sidebar_label: "Autorización"
description: "Controla permisos y acceso a acciones, rutas y componentes con access control provider."
---

La autorización define qué puede hacer un usuario autenticado. Refine la modela mediante un `accessControlProvider`, que permite consultar permisos desde hooks, botones, menús y páginas.

## Access control provider

El método principal es `can`. Recibe información sobre el recurso, la acción y parámetros adicionales. Con esa información decide si la acción está permitida.

```tsx
const accessControlProvider = {
  can: async ({ resource, action }) => {
    if (resource === "posts" && action === "delete") {
      return { can: false, reason: "Only admins can delete posts" };
    }

    return { can: true };
  },
};
```

## Uso en componentes

Usa `useCan` para consultar permisos y adaptar la UI:

```tsx
const { data } = useCan({ resource: "posts", action: "delete" });

return data?.can ? <DeleteButton /> : null;
```

## Buenas prácticas

Usa el access control provider para mejorar la experiencia de usuario, pero conserva la validación definitiva en el backend.
