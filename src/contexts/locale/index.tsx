import React from "react";
import deepmerge from "deepmerge";

import defaultLocale from "./default";
import { ILocaleContext, ICustomLocale } from "./ILocaleContext";

export const LocaleContext = React.createContext<ILocaleContext>(defaultLocale);

export const LocaleContextProvider: React.FC<{
    locale: ICustomLocale;
}> = ({ locale, children }) => {
    const merged = deepmerge(defaultLocale, locale) as ILocaleContext;

    return (
        <LocaleContext.Provider value={merged}>
            {children}
        </LocaleContext.Provider>
    );
};
