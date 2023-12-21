---
title: useGetLocale
---

If you need to know the current locale, Refine provides the `useGetLocale` hook. It returns the `getLocale` method from [`i18nProvider`](/docs/i18n/i18n-provider/#usage) under the hood.

## Usage

> This hook can only be used if [`i18nProvider`](/docs/i18n/i18n-provider/#usage) is provided.

You can get the `locale` value from the `i18nProvider` that you provided.
For example, `<LanguageSwitcher>` component needs to know the current locale in order to disable the button for the current language.

```tsx
import { useTranslate, useGetLocale, useSetLocale } from "@refinedev/core";

export const LanguageSwitcher = () => {
  const changeLanguage = useSetLocale();

  const locale = useGetLocale();
  const currentLocale = locale();

  return (
    <div>
      <span>Languages</span>
      <button disabled={currentLocale === "en"} onClick={() => changeLanguage("en")}>
        English
      </button>
      <button disabled={currentLocale === "es"} onClick={() => changeLanguage("es")}>
        Spanish
      </button>
    </div>
  );
};
```
