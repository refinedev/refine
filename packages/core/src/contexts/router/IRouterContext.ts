import React from "react";

export interface IRouterProvider {
    useHistory: () => any;
    useLocation: <S = any>() => any;
    useParams: <
        Params extends { [K in keyof Params]?: string } = {},
    >() => Params;
    Prompt: React.FC<PromptProps>;
    Link: any;
    RouterComponent?: React.FC;
}

export interface IRouterContext {
    useHistory: () => any;
    useLocation: <S = any>() => any;
    useParams: <
        Params extends { [K in keyof Params]?: string } = {},
    >() => Params;
    Prompt: React.FC<PromptProps>;
    Link: any;
}

export type PromptProps = {
    message: string;
    when?: boolean;
    setWarnWhen?: (warnWhen: boolean) => void;
};
