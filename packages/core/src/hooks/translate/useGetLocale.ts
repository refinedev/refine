import { useContext, useCallback } from "react";
import { TranslationContext } from "@contexts/translation";

export type UseGetLocaleType = () => () => string;

export const useGetLocale: UseGetLocaleType = () => {
    const { i18nProvider } = useContext(TranslationContext);

    return useCallback(() => i18nProvider.getLocale(), []);
};
