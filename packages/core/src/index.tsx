import "../node_modules/antd/dist/antd.css";
import "../node_modules/antd/es/date-picker/style/index.css";

export * from "./components";
export * from "./components/antd";
export * from "./hooks";

export { IAuthContext as AuthProvider, Sort, Pagination } from "./interfaces";
export {
    IDataContext as DataProvider,
    ITranslationContext as TranslationProvider,
    I18nProvider,
    MutationMode,
    IResourceComponents,
    IResourceComponentsProps,
    ILoginForm,
    HttpError,
    UploadedFile,
    LayoutProps,
    SiderProps,
    TitleProps,
    CrudFilter,
    CrudFilters,
    CrudOperators,
} from "./interfaces";

// sunflower types
export {
    useModalFormFromSFReturnType,
    useStepsFormFromSFReturnType,
} from "../types/sunflower";

export * from "./definitions/upload";
export { getDefaultSortOrder, getDefaultFilter } from "./definitions/table";
export { defaultConfigProviderProps } from "./definitions/config";

// antd upload (useStrapiUpload)
export { RcFile, UploadFile } from "antd/lib/upload/interface";
