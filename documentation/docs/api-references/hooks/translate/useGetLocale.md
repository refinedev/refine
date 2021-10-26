If you need to know the current locale, refine provides the `useGetLocale` hook. It returns the `getLocale` method from `i18nProvider` under the hood.

## Usage

You can get the `locale` value from the `i18nProvider` that you provided.  
For example, `<LanguageSwitcher>` component needs to know the current locale in order to disable the button for the current language.

```tsx 
import { Button, useTranslate, useGetLocale, useSetLocale } from "@pankod/refine";

export const LanguageSwitcher = () => {
    const changeLanguage = useSetLocale();

    const locale = useGetLocale();
    const currentLocale = locale();

    return (
        <div>
            <span>Languages</span>
            <Button
                disabled={currentLocale === "en"}
                onClick={() => changeLanguage("en")}
            >
                English
            </Button>
            <Button
                disabled={currentLocale === "es"}
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
