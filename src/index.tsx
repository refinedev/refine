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
    TextInput,
    TextareaInput,
    SelectInput,
    AutoComplete,
    ReferenceInput,
} from "./components";

export { IAuthContext as AuthProvider } from "./interfaces";
export { IDataContext as DataProvider } from "./interfaces";
