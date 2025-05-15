export type TranslateFunction = (key: string, defaultMessage?: string) => string;

export const useTranslate: () => TranslateFunction; 