import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationFR from "./locales/fr/translation.json";
import commonFR from "./locales/fr/common.json";
import commonEN from "./locales/en/common.json";

const resources = {
    en: {
        translation: translationEN,
        common: commonEN,
    },
    fr: {
        translation: translationFR,
        common: commonFR,
    },
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
