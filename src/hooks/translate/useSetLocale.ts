import { useCallback, useContext } from "react";
import { TranslationContext } from "@contexts/translation";

export const useSetLocale = () => {
    const { i18nProvider } = useContext(TranslationContext);

    return useCallback((lang: string) => i18nProvider.changeLocale(lang), []);
};
