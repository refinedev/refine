import { useContext } from "react";
import { LocaleContext } from "@contexts/locale";

export const useTranslation = () => {
    const locale = useContext(LocaleContext);

    return locale;
};
