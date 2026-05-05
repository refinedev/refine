---
title: "Data Fetching | Refine v5"
display_title: "Data Fetching"
sidebar_label: "Data Fetching"
description: "Узнайте, как Refine соединяет UI с API через data providers и hooks."
---

Данные — центр admin application. Refine соединяет UI с одним или несколькими источниками данных через `dataProvider`, который реализует интерфейс [`DataProvider`](/core/docs/core/interface-references#dataprovider).

Data provider получает `resource`, `id` и `meta`, а затем вызывает нужный endpoint API.

## Data hooks

После регистрации provider используйте `useList`, `useOne`, `useCreate`, `useUpdate` и `useDelete` для CRUD operations.

```tsx
import { useOne } from "@refinedev/core";

const Product = () => {
  const { data, isLoading } = useOne({ resource: "products", id: 1 });
  if (isLoading) return <span>Loading...</span>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
```

## State и cache

Data hooks используют TanStack Query для loading, error, success states, cache, request deduplication, invalidation и optimistic updates.

## Несколько providers

Можно использовать REST для одного resource и GraphQL для другого, сохраняя единый API в components.
