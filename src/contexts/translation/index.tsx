import React from "react";

import { ITranslationContext } from "@interfaces";

const defaultProvider: ITranslationContext = {
    i18nProvider: {
        translate: (key) => key,
        changeLocale: () => Promise.resolve(),
        getLocale: () => "en",
    },
};

export const TranslationContext = React.createContext<ITranslationContext>(
    defaultProvider,
);

export const TranslationContextProvider: React.FC<ITranslationContext> = ({
    children,
    i18nProvider,
}) => {
    return (
        <TranslationContext.Provider
            value={{
                i18nProvider,
            }}
        >
            {children}
        </TranslationContext.Provider>
    );
};
