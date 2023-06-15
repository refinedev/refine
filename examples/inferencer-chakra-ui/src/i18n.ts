import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

i18n.use(Backend)
    .use(initReactI18next)
    .init({
        supportedLngs: ["en", "de"],
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json",
        },
        defaultNS: "common",
        fallbackLng: ["en", "de"],
    });

export default i18n;
