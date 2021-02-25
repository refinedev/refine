import JsonServer from "./dataProviders/jsonServer";

export { JsonServer };
export { Admin, Resource } from "./containers";

export * from "./components/antd";
export * from "./components/fields";
export * from "./components/input";
export * from "./components/table";
export * from "./components/crud";

export { Layout, Authenticated, Reference } from "./components";

export * from "./hooks";

export { IAuthContext as AuthProvider, Sort, Pagination } from "./interfaces";
export { IDataContext as DataProvider } from "./interfaces";

export * from "./icons";
