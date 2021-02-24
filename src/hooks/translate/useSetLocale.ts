import React, { useContext } from "react";
import { TranslationContext } from "@contexts/translation";

export const useSetLocale = () => {
    const { i18nProvider } = useContext(TranslationContext);

    const changeLanguage = React.useCallback((lang: string) => {
        i18nProvider.changeLocale(lang);
    }, []);

    return changeLanguage;
};
