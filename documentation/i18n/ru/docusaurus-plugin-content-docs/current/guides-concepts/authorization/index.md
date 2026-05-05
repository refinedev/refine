---
title: "Authorization | Refine v5"
display_title: "Authorization"
sidebar_label: "Authorization"
description: "Управляйте permissions и доступом к actions, routes и components через access control provider."
---

Authorization определяет, что может делать authenticated user. В Refine это моделируется через `accessControlProvider`, который можно использовать в hooks, buttons, menus и pages.

## Access control provider

Главный метод — `can`. Он получает resource, action и дополнительные параметры, а затем возвращает решение о доступе.

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

`useCan` помогает адаптировать UI, но окончательная проверка permissions должна оставаться на backend.
