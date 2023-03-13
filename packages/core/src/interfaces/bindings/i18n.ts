/**
 * @author aliemir
 *
 * i18n bindings are same with the `i18nProvider` interface.
 *
 * We should probably enforce the three or single parameter use in our hooks.
 *
 * Currently, we cover the `key, options`, `key, defaultMessage`, `key, options, defaultMessage` usages internally in i18n hooks.
 * Which creates an unnecessary confusion in the codebase.
 */

export type TranslateFunction = (
    key: string,
    options?: unknown,
    defaultMessage?: string,
) => string;

export type ChangeLocaleFunction = (
    locale: string,
    options?: unknown,
) => Promise<unknown> | unknown;

export type GetLocaleFunction = () => string;

export type i18nBindings = {
    translate: TranslateFunction;
    changeLocale: ChangeLocaleFunction;
    getLocale: GetLocaleFunction;
};
