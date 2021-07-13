If you need to know the current locale, refine provides the `useGetLocale` hook, It returns the `getLocale` method from `i18nProvider` under the hood.

## Usage

You can use the locale as your own i18n library provides. For example `<LanguageSwicher>` needs to know the current locale in order to disable the button for the current language.

```tsx
import { Button, useTranslate } from "@pankod/refine";

export const LanguageSwicher = () => {
    const locale = useSetLocale();

    return (
        <div>
            <span>Languages</span>
            <Button
                disabled={locale === "en"}
                onClick={() => changeLanguage("en")}
            >
                English
            </Button>
            <Button
                disabled={locale === "es"}
                onClick={() => changeLanguage("es")}
            >
                Spanish
            </Button>
        </div>
    );
};
```

:::caution
This hook can only be used if `i18nProvider` is provided.
:::
