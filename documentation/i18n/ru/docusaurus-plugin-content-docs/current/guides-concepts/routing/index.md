---
title: "Routing | Refine v5"
display_title: "Routing"
sidebar_label: "Routing"
description: "Настройте routing в Refine с React Router, Next.js, Remix или другой совместимой системой."
---

Routing важен для любого CRUD-приложения. Headless-архитектура Refine позволяет выбрать удобное решение для routes без привязки к конкретному framework.

Refine включает integrations для **React Router**, **Next.js** и **Remix**. Они помогают автоматически определять параметры, выполнять redirects после mutations или authentication и использовать navigation utilities.

Refine остается router agnostic, поэтому routes вы определяете сами: в `Routes` для React Router, в `pages` или `app` для Next.js и в `app/routes` для Remix.

## Подключение router provider

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes } from "react-router";

export const App = () => (
  <BrowserRouter>
    <Refine routerProvider={routerProvider}>
      <Routes>{/* ваши routes */}</Routes>
    </Refine>
  </BrowserRouter>
);
```

Держите routes согласованными с resources и по возможности передавайте `resource`, `id` и другие параметры через router.
