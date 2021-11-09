If you need to change the locale at runtime, refine provides the `useSetLocale` hook, It returns the changeLocale method from `i18nProvider` under the hood.

## Usage

You can use the features of your own i18n library to change the locale in your own components.

```tsx 
import { Button, useSetLocale } from "@pankod/refine";

export const LanguageSwicher = () => {
    const changeLanguage = useSetLocale();

    return (
        <div>
            <span>Languages</span>
            <Button onClick={() => changeLanguage("en")}>English</Button>
            <Button onClick={() => changeLanguage("es")}>Spanish</Button>
        </div>
    );
};
```

:::caution
This hook can only be used if `i18nProvider` is provided.
:::
