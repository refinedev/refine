type LocaleFn<T> = (values: T) => string;

// type LocaleType<T = Record<string, unknown>> = LocaleFn<T> | string;

interface ICommonLocale {
    ok: string;
    cancel: string;
    confirm: string;
    delete: string;
    page: string;
    nodata: string;
}

interface IAuthLocale {
    username: string;
    password: string;
    login: string;
    logout: string;
}

interface IRouteLocale {
    list: LocaleFn<{ resource: string }>;
    edit: LocaleFn<{ resource: string }>;
    create: LocaleFn<{ resource: string }>;
    view: LocaleFn<{ resource: string }>;
}

interface IActionLocale {
    title: LocaleFn<{ resource: string }>;
    create: LocaleFn<{ resource: string }>;
    edit: LocaleFn<{ resource: string }>;
    delete: LocaleFn<{ resource: string }>;
    save: LocaleFn<{ resource: string }>;
}

export interface ILocaleContext {
    common: ICommonLocale;
    auth: IAuthLocale;
    routes: IRouteLocale;
    actions: IActionLocale;
    sider: Record<string, string>;
}

export interface ICustomLocale {
    common?: Partial<ICommonLocale>;
    auth?: Partial<IAuthLocale>;
    routes?: Partial<IRouteLocale>;
    actions?: Partial<IActionLocale>;
    sider?: Partial<Record<string, string>>;
}

const capitalize = (str: string): string =>
    str
        .split(" ")
        .map((s) => `${s[0].toUpperCase()}${s.slice(1)}`)
        .join(" ");

export const defaultLocale: ILocaleContext = {
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
        list: ({ resource }) => capitalize(`List ${resource}`),
        edit: ({ resource }) => capitalize(`Edit ${resource}`),
        create: ({ resource }) => capitalize(`Create ${resource}`),
        view: ({ resource }) => capitalize(`View ${resource}`),
    },
    actions: {
        title: "Actions",
        create: ({ resource }) => capitalize(`Create ${resource}`),
        edit: "Edit",
        delete: "Delete",
        save: "Save",
    },
    sider: {
        dashboard: "Dashboard",
    },
};
