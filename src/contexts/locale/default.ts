import { ILocaleContext } from "./ILocaleContext";

const capitalize = (str: string): string =>
    str
        .split(" ")
        .map((s) => `${s[0].toUpperCase()}${s.slice(1)}`)
        .join(" ");

const defaultLocale: ILocaleContext = {
    common: {
        ok: "OK",
        cancel: "Cancel",
        confirm: "Are you sure?",
        delete: "Delete",
        page: "Page",
        nodata: "No Data",
    },
    auth: {
        username: "Username",
        password: "Password",
        login: "Login",
        logout: "Logout",
    },
    routes: {
        list: (values) => capitalize(`List ${values?.resource}`),
        edit: (values) => capitalize(`Edit ${values?.resource}`),
        create: (values) => capitalize(`Create ${values?.resource}`),
        view: (values) => capitalize(`View ${values?.resource}`),
    },
    actions: {
        title: () => "Actions",
        create: (values) => capitalize(`Create ${values?.resource}`),
        edit: () => "Edit",
        delete: () => "Delete",
        save: () => "Save",
    },
    sider: {
        dashboard: "Dashboard",
    },
};

export default defaultLocale;
