import React, { useState } from "react";
import "../../../i18n.js";
import { useTranslation } from "react-i18next";

import { ITranslationContext } from "@interfaces";
import { useSetLocale } from "@hooks/index.js";

const defaultProvider: ITranslationContext = {
    locale: "en",
    i18nProvider: null,
};

export const TranslationContext = React.createContext<ITranslationContext>(
    defaultProvider,
);

export const TranslationProvider: React.FC = ({ children }) => {
    const { t, i18n } = useTranslation();
    const setLocal = useSetLocale();
    const changeLanguage = (code: any) => {
        i18n.changeLanguage(code);
    };

    return (
        <TranslationContext.Provider
            value={{
                locale: "en",
                i18nProvider: i18n,
            }}
        >
            {children}
        </TranslationContext.Provider>
    );
};
