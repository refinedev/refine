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
            options?: string | any,
            defaultMessage?: string,
        ) {
            return (
                i18nProvider?.translate(key, options, defaultMessage) ??
                defaultMessage ??
                (typeof options === "string" &&
                typeof defaultMessage === "undefined"
                    ? options
                    : key)
            );
        }

        return translate;
    }, [i18nProvider]);

    return fn;
};
