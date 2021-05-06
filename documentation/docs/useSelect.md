---
id: useSelect
title: useSelect
siderbar_label: useSelect
---

The `useSelect` hook allows you manage a Ant Design [Select](https://ant.design/components/select/) component. If we look in detail, `useSelect` returns `selectProps`, `queryResult` and `defaultValueQueryResult`.

So all we have to do is pass the `selectProps` it return to the `<Select>` component.

Now let's examine what `useSelect` does, with step-by-step examples.

#### `resource`

```tsx
const { selectProps } = useSelect({
    resource: "categories",
});
```

Burada ilk olarak resource gösterdik. Ardından resource ile verinin fetch edildiğinden bahsetmek gerekiyor.

#### `defaultValue`

```tsx
const { selectProps } = useSelect({
    resource: "categories",
    defaultValue,
});
```

Burada ise default value props anlatılır

#### `optionLabel` and `optionLabel`

```tsx
const { selectProps } = useSelect({
    resource: "categories",
    optionLabel = "title",
    optionLabel = "id",
});
```

Option'ları nasıl oluşturcağımız ile ilgili kısımlar.

#### `filters`

```tsx
const { selectProps } = useSelect({
    resource: "categories",
    optionLabel = "title",
    optionValue = "id",
    filters,
});
```

Filtereme işlemi örneği.

#### `sort`

```tsx
const { selectProps } = useSelect({
    resource: "categories",
    optionLabel = "title",
    optionValue = "id",
    filters,
    sort,
});
```

Sort işlemi örnek.

#### Basic Example

Select propsların select component'e verildiği bir örnek yapılabilir.
