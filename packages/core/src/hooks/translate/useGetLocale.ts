import { useContext, useCallback } from "react";
import { TranslationContext } from "@contexts/translation";

export type UseGetLocaleType = () => () => string | undefined;

/**
 * If you need to know the current locale, refine provides the `useGetLocale` hook.
 * It returns the `getLocale` method from `i18nProvider` under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/translate/useGetLocale} for more details.
 */
export const useGetLocale: UseGetLocaleType = () => {
    const { i18nProvider } = useContext(TranslationContext);

    return useCallback(() => i18nProvider?.getLocale(), []);
};
