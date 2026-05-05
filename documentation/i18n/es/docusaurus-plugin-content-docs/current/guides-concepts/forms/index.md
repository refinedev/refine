---
title: "Formularios | Refine v5"
display_title: "Formularios"
sidebar_label: "Formularios"
description: "Crea formularios CRUD con Refine, UI integrations y validación del servidor."
---

Los formularios son una parte central de las aplicaciones CRUD. Refine proporciona hooks y componentes que conectan campos de formulario con data providers, validación y mutaciones.

## Enfoque general

Puedes usar integraciones para Ant Design, Material UI, Mantine, Chakra UI o React Hook Form. La lógica de Refine se mantiene separada de la capa visual, por lo que puedes elegir la biblioteca que encaje con tu producto.

## Crear y editar

Hooks como `useForm`, `useModalForm`, `useDrawerForm` y `useStepsForm` ayudan a crear flujos de creación, edición y formularios por pasos.

```tsx
const { formProps, saveButtonProps } = useForm({
  resource: "products",
  action: "edit",
});
```

## Selects y relaciones

`useSelect` carga opciones desde un resource y facilita campos relacionados, filtros y búsqueda remota.

## Validación

Puedes combinar validación local con errores devueltos por el servidor. Mantén los mensajes de error claros y tradúcelos con el provider de i18n cuando la aplicación sea multilingüe.
