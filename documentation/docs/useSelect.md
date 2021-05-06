---
id: useSelect
title: useSelect
siderbar_label: useSelect
---

`useSelect` works with ant-design [Select](https://ant.design/components/select/) component. `useSelect` returns the props of the `<Select>` component, `queryResult` and `defaultValueQueryResult`.

The `selectProps` contains `options`, `onSearch` and `Loading` properties. Therefore, it is very easy for us to manage the `<Select>` component.

Now let's do with examples which props our hook gets and what it does.

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
