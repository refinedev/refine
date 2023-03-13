import React from "react";

export interface IRouterProvider {
    useHistory: () => {
        push: (...args: any) => any;
        replace: (...args: any) => any;
        goBack: (...args: any) => any;
    };
    useLocation: () => {
        search: string;
        pathname: string;
    };
    useParams: <
        Params extends { [K in keyof Params]?: string } = {},
    >() => Params;
    Prompt: React.FC<PromptProps>;
    Link: React.FC<any>;
    RouterComponent?: React.FC<any>;
    routes?: any;
}

export interface IRouterContext {
    useHistory: () => any;
    useLocation: () => any;
    useParams: <
        Params extends { [K in keyof Params]?: string } = {},
    >() => Params;
    Prompt: React.FC<PromptProps>;
    Link: React.FC<any>;
    routes?: any;
}

export type PromptProps = {
    message: string;
    when?: boolean;
    setWarnWhen?: (warnWhen: boolean) => void;
};
