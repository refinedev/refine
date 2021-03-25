import { useContext, useCallback } from "react";
import { TranslationContext } from "@contexts/translation";

export const useTranslate = () => {
    const { i18nProvider } = useContext(TranslationContext);

    return useCallback(
        (key: string, options?: any) => i18nProvider?.translate(key, options),
        [],
    );
};
