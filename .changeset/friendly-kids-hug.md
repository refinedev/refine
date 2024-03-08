---
"@refinedev/core": patch
---

feat: added `useTranslation` hook. It combines `useTranslate`, `useSetLocale` and `useGetLocale` hooks and returns `translate`, `changeLocale` and `getLocale` methods from that hooks for better developer experience.

It returns all [`i18nProvider`](/docs/i18n/i18n-provider) methods in one hook. It can be used to translate texts, change the locale, and get the current locale in your own components.

```tsx
import { useTranslation } from "@refinedev/core";

export const MyComponent = () => {
  const { translate, getLocale, changeLocale } = useTranslation();
  const currentLocale = getLocale();

  return (
    <div>
      <h1>{translate("languages")}</h1>
      <button
        onClick={() => changeLocale("en")}
        disabled={currentLocale === "en"}
      >
        English
      </button>
      <button
        onClick={() => changeLocale("de")}
        disabled={currentLocale === "de"}
      >
        German
      </button>
    </div>
  );
};
```
