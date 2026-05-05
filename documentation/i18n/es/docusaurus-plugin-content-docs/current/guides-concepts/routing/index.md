---
title: "Routing | Refine v5"
display_title: "Routing"
sidebar_label: "Routing"
description: "Configura routing en Refine con React Router, Next.js, Remix u otra solución compatible."
---

El routing es esencial en una aplicación CRUD. La arquitectura headless de Refine permite usar la solución de rutas que prefieras sin quedar atado a un framework concreto.

Refine incluye integraciones para **React Router**, **Next.js** y **Remix**. Estas integraciones facilitan:

- Detectar parámetros automáticamente en hooks y componentes.
- Redirigir después de mutaciones o cambios de autenticación.
- Usar utilidades de navegación, breadcrumbs y menús.

Como Refine es agnóstico al router, tú sigues definiendo las rutas de la aplicación. En React Router lo harás con `Routes`; en Next.js con `pages` o `app`; y en Remix dentro de `app/routes`.

## Integrar un router provider

Importa la integración elegida y pásala al prop `routerProvider` de `<Refine />`.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes } from "react-router";

export const App = () => (
  <BrowserRouter>
    <Refine routerProvider={routerProvider}>
      <Routes>{/* tus rutas */}</Routes>
    </Refine>
  </BrowserRouter>
);
```

## Buenas prácticas

Mantén las rutas alineadas con tus resources, usa nombres consistentes y deja que los hooks de Refine reciban `resource`, `id` y demás parámetros desde el router cuando sea posible.
