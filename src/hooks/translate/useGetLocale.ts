import { useContext, useCallback } from "react";
import { TranslationContext } from "@contexts/translation";

export const useGetLocale = () => {
    const { i18nProvider } = useContext(TranslationContext);

    return useCallback(() => i18nProvider.getLocale(), []);
};
