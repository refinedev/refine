export interface RouterProvider {
    useHistory: () => any;
    useLocation: <S = any>() => any;
    useParams: <
        Params extends { [K in keyof Params]?: string } = {},
    >() => Params;
    BrowserRouter: any;
    Switch: any;
    Route: any;
    Prompt: any;
    Link: any;
    Redirect: any;
}

export interface IRouterContext {
    useHistory: () => any;
    useLocation: <S = any>() => any;
    useParams: <
        Params extends { [K in keyof Params]?: string } = {},
    >() => Params;
    BrowserRouter: any;
    Switch: any;
    Route: any;
    Prompt: any;
    Link: any;
    Redirect: any;
}
