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
