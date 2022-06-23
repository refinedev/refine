import { useContext, useMemo } from "react";
import { TranslationContext } from "@contexts/translation";

/**
 * If you need to translate the texts in your own components, refine provides the `useTranslate` hook.
 * It returns the translate method from `i18nProvider` under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/translate/useTranslate} for more details.
 */
export const useTranslate = () => {
    const { i18nProvider } = useContext(TranslationContext);

    const fn = useMemo(() => {
        function translate(
            key: string,
            options?: any,
            defaultMessage?: string,
        ): string;
        function translate(key: string, defaultMessage?: string): string;

        function translate(
            key: string,
            optionsOrDefaultMessage?: string | any,
            defaultMessage?: string,
        ) {
            const hasI18nProvider = Boolean(i18nProvider);

            const i18nResponse = i18nProvider?.translate(
                key,
                optionsOrDefaultMessage,
                defaultMessage,
            );
            const isSameAsKey = i18nResponse === key;

            const fallback =
                defaultMessage ??
                (typeof optionsOrDefaultMessage === "string" &&
                typeof defaultMessage === "undefined"
                    ? optionsOrDefaultMessage
                    : key);

            if (hasI18nProvider && !isSameAsKey) {
                return i18nResponse ?? fallback;
            } else {
                return fallback;
            }
        }

        return translate;
    }, [i18nProvider]);

    return fn;
};
