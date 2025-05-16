import { useContext } from "react";
import { I18nContext } from "@contexts/i18n";

export type TranslateFunction = (key: string, defaultMessage?: string) => string;

export const useTranslate = (): TranslateFunction => {
  const { i18nProvider } = useContext(I18nContext);

  const translate: TranslateFunction = (key: string, defaultMessage?: string) => {
    if (!i18nProvider) {
      return defaultMessage || key;
    }

    return i18nProvider.translate(key, defaultMessage);
  };

  return translate;
}; 