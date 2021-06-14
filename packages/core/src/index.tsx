import "node_modules/antd/dist/antd.css";

export * from "./components";
export * from "./components/antd";
export * from "./hooks";
export { Link } from "react-router-dom";

export { IAuthContext as AuthProvider, Pagination } from "./interfaces";
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
    TitleProps,
    CrudFilter,
    CrudFilters,
    CrudOperators,
    CrudSorting,
    CrudSort,
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
