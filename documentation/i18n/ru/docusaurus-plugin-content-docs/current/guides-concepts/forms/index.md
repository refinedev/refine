---
title: "Forms | Refine v5"
display_title: "Forms"
sidebar_label: "Forms"
description: "Создавайте CRUD forms с Refine, UI integrations и server validation."
---

Forms — важная часть CRUD applications. Refine предоставляет hooks и components, которые связывают fields, data providers, validation и mutations.

## Общий подход

Можно использовать Ant Design, Material UI, Mantine, Chakra UI или React Hook Form. Логика Refine отделена от UI, поэтому библиотеку можно выбрать под продукт.

## Create и edit

`useForm`, `useModalForm`, `useDrawerForm` и `useStepsForm` помогают создавать flows для create, edit и step forms.

```tsx
const { formProps, saveButtonProps } = useForm({
  resource: "products",
  action: "edit",
});
```

## Relations и validation

`useSelect` загружает options из resource. Совмещайте local validation с server errors и переводите messages через i18n provider в multilingual apps.
