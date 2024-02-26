"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../../../public/locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    lng: undefined, // let detect the language on client side
    fallbackLng: "en",
    defaultNS: "common",
    detection: {
      order: ["htmlTag", "cookie"],
    },
  });
