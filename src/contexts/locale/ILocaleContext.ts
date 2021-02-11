type LocaleFn<T> = (values?: T) => string;

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
