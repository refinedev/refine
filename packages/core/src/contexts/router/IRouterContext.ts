import React from "react";

export interface IRouterProvider {
    useHistory: () => any;
    useLocation: () => any;
    useParams: <
        Params extends { [K in keyof Params]?: string } = {},
    >() => Params;
    Prompt: React.FC<PromptProps>;
    Link: React.FC<any>;
    RouterComponent?: React.FC<any>;
}

export interface IRouterContext {
    useHistory: () => any;
    useLocation: () => any;
    useParams: <
        Params extends { [K in keyof Params]?: string } = {},
    >() => Params;
    Prompt: React.FC<PromptProps>;
    Link: React.FC<any>;
}

export type PromptProps = {
    message: string;
    when?: boolean;
    setWarnWhen?: (warnWhen: boolean) => void;
};
