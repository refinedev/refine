import React, { useContext } from "react";
import { TranslationContext } from "@contexts/translation";

export const useSetLocale = () => {
    const { i18nProvider } = useContext(TranslationContext);

    const changeLanguage = React.useCallback((lang: string) => {
        i18nProvider.changeLanguage(lang);
    }, []);

    return changeLanguage;

    /* return i18nProvider.changeLanguage("fr"); */
};
