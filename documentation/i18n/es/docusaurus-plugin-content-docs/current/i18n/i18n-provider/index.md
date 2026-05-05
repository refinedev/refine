---
title: "I18n Provider | Refine v5"
display_title: "I18n Provider"
sidebar_label: "I18n Provider"
description: "Conecta Refine con tu biblioteca de traducción favorita mediante i18nProvider."
---

Refine no impone una biblioteca de traducción. En su lugar usa un `i18nProvider` que adapta librerías como `react-i18next`, `next-i18next` o cualquier solución propia.

## Interfaz básica

```tsx
const i18nProvider = {
  translate: (key, options, defaultMessage) => defaultMessage ?? key,
  changeLocale: (lang) => Promise.resolve(lang),
  getLocale: () => "es",
};
```

Pasa el provider a `<Refine />` para que hooks, menús, botones y componentes puedan leer traducciones.

```tsx
<Refine i18nProvider={i18nProvider}>{/* ... */}</Refine>
```

## Hooks

Usa `useTranslate` para obtener una función `translate`, `useSetLocale` para cambiar idioma y `useGetLocale` para consultar el idioma activo.

## Recomendaciones

Mantén claves estables, evita traducir identificadores técnicos y prueba cada locale con datos reales para detectar textos largos, plurales y formatos de fecha o moneda.
