import React from "react";

import { ITranslationContext } from "../../interfaces";

/** @deprecated default value for translation context has no use and is an empty object.  */
export const defaultProvider: ITranslationContext = {};

export const TranslationContext = React.createContext<ITranslationContext>({});

export const TranslationContextProvider: React.FC<
    ITranslationContext & {
        children?: React.ReactNode;
    }
> = ({ children, i18nProvider }) => {
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
