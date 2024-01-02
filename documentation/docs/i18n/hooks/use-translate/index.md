---
title: useTranslate
---

If you need to translate the texts in your own components, Refine provides the `useTranslate` hook, It returns the translate method from [`i18nProvider`](/docs/i18n/i18n-provider/#usage) under the hood.

## Usage

> This hook can only be used if [`i18nProvider`](/docs/i18n/i18n-provider/#usage) is provided.

You can use the features of your own i18n library for translation in your own components.

```tsx
import { useTranslate } from "@refinedev/core";

export const MyComponent = () => {
  const translate = useTranslate();

  return <button>{translate("my.translate.text")}</button>;
};
```
