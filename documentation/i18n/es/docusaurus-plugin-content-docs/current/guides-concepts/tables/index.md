---
title: "Tablas y listas | Refine v5"
display_title: "Tablas"
sidebar_label: "Tablas"
description: "Construye tablas, listas, filtros, ordenación y paginación con Refine."
---

Las tablas y listas convierten datos de una API en interfaces explorables. Refine ofrece hooks que conectan paginación, filtros, ordenación y estado de carga con tu data provider.

## Listados

`useTable` y `useList` son las bases para construir listados. Puedes usarlos con UI integrations o con componentes propios.

```tsx
const table = useTable({
  resource: "products",
  pagination: { pageSize: 10 },
});
```

## Filtros y ordenación

Los filtros y sorters se transforman en parámetros que el data provider puede enviar a la API. Esto mantiene la UI y la comunicación con backend desacopladas.

## Acciones CRUD

Combina listados con botones de crear, editar, mostrar y eliminar. Las acciones pueden respetar permisos desde el access control provider y traducir etiquetas con i18n.

## Experiencia de usuario

Muestra estados de carga, vacíos y error. En tablas grandes, prefiere paginación o carga incremental para mantener la interfaz rápida.
