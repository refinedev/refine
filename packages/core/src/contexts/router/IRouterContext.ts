import React from "react";

export interface IRouterProvider {
    useHistory: () => any;
    useLocation: <S = any>() => any;
    useParams: <
        Params extends { [K in keyof Params]?: string } = {},
    >() => Params;
    BrowserRouter: any;
    Switch: any;
    Route: any;
    Prompt: React.FC<PromptProps>;
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
    Prompt: React.FC<PromptProps>;
    Link: any;
    Redirect: any;
}

export type PromptProps = {
    message: string;
    when: boolean;
    setWarnWhen?: (warnWhen: boolean) => void;
};
