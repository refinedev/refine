---
title: "Tables и lists | Refine v5"
display_title: "Tables"
sidebar_label: "Tables"
description: "Создавайте tables, lists, filters, sorting и pagination с Refine."
---

Tables и lists превращают API data в удобный интерфейс. Refine дает hooks для связи pagination, filters, sorting и loading states с data provider.

## Lists

`useTable` и `useList` — базовые hooks для списков с UI integration или собственными components.

```tsx
const table = useTable({
  resource: "products",
  pagination: { pageSize: 10 },
});
```

## Filters и sorting

Filters и sorters превращаются в параметры, которые data provider отправляет в API. Так backend communication остается отделенной от UI.

## CRUD actions

Связывайте lists с actions create, edit, show и delete. Actions могут учитывать permissions и переводить labels через i18n.
