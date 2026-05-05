---
title: "Data Fetching | Refine v5"
display_title: "Data Fetching"
sidebar_label: "Data Fetching"
description: "Aprende cómo Refine conecta la interfaz con APIs y gestiona datos mediante data providers y hooks."
---

Los datos son el centro de una aplicación administrativa. Refine conecta la UI con una o varias fuentes de datos mediante un `dataProvider` que implementa la interfaz [`DataProvider`](/core/docs/core/interface-references#dataprovider).

El data provider recibe información como el `resource`, el `id` y la propiedad `meta`, y se encarga de llamar al endpoint correcto de tu API.

## Hooks de datos

Cuando registras un data provider puedes usar hooks como `useList`, `useOne`, `useCreate`, `useUpdate` y `useDelete` para manejar operaciones CRUD.

```tsx
import { useOne } from "@refinedev/core";

const Product = () => {
  const { data, isLoading } = useOne({
    resource: "products",
    id: 1,
  });

  if (isLoading) return <span>Loading...</span>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
```

## Estado y caché

Los hooks de datos usan TanStack Query por debajo. Esto aporta estados de carga, error y éxito, caché, deduplicación de requests, invalidación automática y actualizaciones optimistas.

## Múltiples providers

Puedes usar providers distintos para recursos distintos. Por ejemplo, `posts` puede venir de REST y `users` de GraphQL, manteniendo una API consistente en los componentes.
