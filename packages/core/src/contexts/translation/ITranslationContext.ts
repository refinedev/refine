import { ReactNode } from "react";

export type Translate = (
    key: string,
    options?: any,
    defaultMessage?: string,
) => string;

export interface I18nProvider {
    translate: Translate;
    changeLocale: (locale: string, options?: any) => Promise<any>;
    getLocale: () => string;
}

export interface ITranslationContext {
    i18nProvider?: I18nProvider;
}

export type TranslationProvider = Required<ITranslationContext>;
