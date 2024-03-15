import React from "react";

import { I18nProvider, II18nContext } from "./types";

/** @deprecated default value for translation context has no use and is an empty object.  */
export const defaultProvider: Partial<I18nProvider> = {};

export const I18nContext = React.createContext<II18nContext>({});

export const I18nContextProvider: React.FC<
  II18nContext & {
    children?: React.ReactNode;
  }
> = ({ children, i18nProvider }) => {
  return (
    <I18nContext.Provider
      value={{
        i18nProvider,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};
