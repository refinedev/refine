---
title: "Conceptos generales | Refine v5"
display_title: "Conceptos generales"
sidebar_label: "Conceptos generales"
description: "Aprende los conceptos base de Refine: arquitectura headless, resources, providers, hooks y meta."
---

Refine es un framework extensible para crear aplicaciones web con rapidez. Su arquitectura moderna se apoya en **hooks**, un sistema de **providers** conectables y una solución sólida para estado y datos.

## Concepto headless

Refine no te obliga a usar un conjunto cerrado de componentes visuales. En su lugar ofrece `hooks`, `components`, `providers` y utilidades que separan la lógica de negocio de la interfaz.

Esa separación permite usar diseños propios o frameworks de UI como Tailwind CSS, Ant Design, Material UI, Mantine y Chakra UI sin perder las ventajas del núcleo `@refinedev/core`.

## Resource

Un **resource** representa una entidad de la aplicación, como `products`, `blogPosts` u `orders`. La definición del resource conecta rutas, operaciones CRUD, menús y providers de forma estructurada.

```tsx title=App.tsx
import { Refine } from "@refinedev/core";

export const App = () => (
  <Refine
    resources={[
      {
        name: "products",
        list: "/products",
        show: "/products/:id",
        edit: "/products/:id/edit",
        create: "/products/new",
      },
    ]}
  />
);
```

## Providers

Los providers gestionan áreas clave: datos, autenticación, autorización, notificaciones, i18n, tiempo real, routing y auditoría. Puedes usar providers incluidos o crear los tuyos para adaptar Refine a tu API y a tus reglas de negocio.

## Hooks

Los hooks de Refine son headless y agnósticos a la librería. Por ejemplo, `useGo` navega sin importar si usas React Router, Next.js o Remix; `useCan` consulta permisos con el access control provider; y `useTranslate` accede al provider de i18n.

## Meta

La propiedad `meta` permite pasar información adicional a providers y hooks. Es útil para headers, parámetros especiales, selección de campos, multi-tenancy o generación de consultas GraphQL.
