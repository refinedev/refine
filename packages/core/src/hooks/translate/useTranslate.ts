import { useContext, useCallback } from "react";
import { TranslationContext } from "@contexts/translation";

/**
 * If you need to translate the texts in your own components, refine provides the `useTranslate` hook.
 * It returns the translate method from `i18nProvider` under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/translate/useTranslate} for more details.
 */
export const useTranslate = () => {
    const { i18nProvider } = useContext(TranslationContext);

    return useCallback(
        (key: string, options?: any, defaultMessage?: string) =>
            i18nProvider?.translate(key, options, defaultMessage),
        [],
    );
};
