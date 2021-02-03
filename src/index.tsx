import JsonServer from "./dataProviders/jsonServer";

export { JsonServer };
export { Admin, Resource } from "./containers";
export {
    List,
    Column,
    Table,
    Form,
    FormItem,
    Create,
    Edit,
    Input,
    Textarea,
    Select,
} from "./components";

export { IAuthContext as AuthProvider } from "./interfaces";
export { IDataContext as DataProvider } from "./interfaces";
