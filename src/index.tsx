import JsonServer from "./dataProviders/jsonServer";
import JsonGraphqlServer from "./dataProviders/jsonGraphqlServer";

export * from "./dataProviders/graphql";

export { JsonServer, JsonGraphqlServer };

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
