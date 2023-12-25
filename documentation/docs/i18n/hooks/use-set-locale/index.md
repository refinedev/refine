---
title: useSetLocale
---

If you need to change the locale at runtime, Refine provides the `useSetLocale` hook, It returns the changeLocale method from [`i18nProvider`](/docs/i18n/i18n-provider/#usage) under the hood.

## Usage

> This hook can only be used if [`i18nProvider`](/docs/i18n/i18n-provider/#usage) is provided.

You can use the features of your own i18n library to change the locale in your own components.

```tsx
import { useSetLocale } from "@refinedev/core";

export const LanguageSwicher = () => {
  const changeLanguage = useSetLocale();

  return (
    <div>
      <span>Languages</span>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("es")}>Spanish</button>
    </div>
  );
};
```
