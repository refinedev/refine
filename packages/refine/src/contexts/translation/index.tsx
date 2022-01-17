import React from "react";

import { ITranslationContext } from "../../interfaces";

export const defaultProvider: ITranslationContext = {
    i18nProvider: {
        translate: (key: string, options: any, defaultMessage?: string) =>
            defaultMessage || options,
        changeLocale: () => Promise.resolve(),
        getLocale: () => "en",
    },
};

export const TranslationContext =
    React.createContext<ITranslationContext>(defaultProvider);

export const TranslationContextProvider: React.FC<ITranslationContext> = ({
    children,
    i18nProvider,
}) => {
    return (
        <TranslationContext.Provider
            value={{
                i18nProvider: i18nProvider,
            }}
        >
            {children}
        </TranslationContext.Provider>
    );
};
