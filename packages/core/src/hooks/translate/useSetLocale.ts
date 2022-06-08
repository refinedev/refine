import { useCallback, useContext } from "react";
import { TranslationContext } from "@contexts/translation";

/**
 * If you need to change the locale at runtime, refine provides the `useSetLocale` hook.
 * It returns the changeLocale method from `i18nProvider` under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/translate/useSetLocale} for more details.
 */
export const useSetLocale = () => {
    const { i18nProvider } = useContext(TranslationContext);

    return useCallback((lang: string) => i18nProvider?.changeLocale(lang), []);
};
