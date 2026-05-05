---
title: "Formulaires | Refine v5"
display_title: "Formulaires"
sidebar_label: "Formulaires"
description: "Créez des formulaires CRUD avec Refine, les UI integrations et la validation serveur."
---

Les formulaires sont centraux dans les applications CRUD. Refine fournit des hooks et composants qui relient champs, data providers, validation et mutations.

## Approche générale

Vous pouvez utiliser Ant Design, Material UI, Mantine, Chakra UI ou React Hook Form. La logique Refine reste séparée de l'UI, ce qui laisse le choix de la bibliothèque.

## Création et édition

`useForm`, `useModalForm`, `useDrawerForm` et `useStepsForm` aident à créer des parcours de création, édition et formulaires en plusieurs étapes.

```tsx
const { formProps, saveButtonProps } = useForm({
  resource: "products",
  action: "edit",
});
```

## Relations et validation

`useSelect` charge les options depuis un resource. Combinez validation locale et erreurs serveur, puis traduisez les messages avec l'i18n provider dans les applications multilingues.
