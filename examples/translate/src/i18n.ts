import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";

i18n.use(Backend)
    .use(initReactI18next)
    .init({
        lng: "en",
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json",
        },
        fallbackLng: ["en", "tr"],
        react: {
            useSuspense: false,
        },
    });

export default i18n;
