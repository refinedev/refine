import React from "react";

import type { Action } from "../types";

export interface LegacyRouterProvider {
  useHistory: () => {
    push: (...args: any) => any;
    replace: (...args: any) => any;
    goBack: (...args: any) => any;
  };
  useLocation: () => {
    search: string;
    pathname: string;
  };
  useParams: <Params extends { [K in keyof Params]?: string } = {}>() => Params;
  Prompt: React.FC<PromptProps>;
  Link: React.FC<any>;
  RouterComponent?: React.FC<any>;
  routes?: any;
}

export interface ILegacyRouterContext {
  useHistory: () => any;
  useLocation: () => any;
  useParams: <Params extends { [K in keyof Params]?: string } = {}>() => Params;
  Prompt: React.FC<PromptProps>;
  Link: React.FC<any>;
  routes?: any;
}

export type PromptProps = {
  message: string;
  when?: boolean;
  setWarnWhen?: (warnWhen: boolean) => void;
};

export type RouteAction = Exclude<Action, "list"> | undefined;

export type ActionWithPage = Extract<Action, "show" | "create" | "edit">;

export type ResourceRouterParams = {
  resource: string;
  id?: string;
  action: RouteAction;
};

export type ResourceErrorRouterParams = {
  resource: string;
  action: ActionWithPage | undefined;
};
