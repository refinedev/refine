---
title: "I18n Provider | Refine v5"
display_title: "I18n Provider"
sidebar_label: "I18n Provider"
description: "Подключите Refine к выбранной библиотеке переводов через i18nProvider."
---

Refine не навязывает библиотеку переводов. Он использует `i18nProvider`, который адаптирует `react-i18next`, `next-i18next` или внутреннее решение.

## Минимальный интерфейс

```tsx
const i18nProvider = {
  translate: (key, options, defaultMessage) => defaultMessage ?? key,
  changeLocale: (lang) => Promise.resolve(lang),
  getLocale: () => "ru",
};
```

Передайте provider в `<Refine />`, чтобы hooks, menus, buttons и components могли получать translations.

```tsx
<Refine i18nProvider={i18nProvider}>{/* ... */}</Refine>
```

Используйте `useTranslate`, `useSetLocale` и `useGetLocale` для переводов, смены языка и чтения active locale.
