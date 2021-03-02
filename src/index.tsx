import JsonServer from "./dataProviders/jsonServer";

export { JsonServer };

export * from "./components";
export * from "./components/antd";
export * from "./hooks";

export { IAuthContext as AuthProvider, Sort, Pagination } from "./interfaces";
export {
    IDataContext as DataProvider,
    ITranslationContext as TranslationProvider,
    I18nProvider,
} from "./interfaces";

export * from "./definitions/upload";
