export type Translate = (key: string, options?: any) => string;

export interface I18nProvider {
    translate: Translate;
    changeLocale: (locale: string, options?: any) => Promise<void>;
    getLocale: () => string;
}

export interface ITranslationContext {
    locale?: string;
    i18nProvider: I18nProvider;
}
