import { ResourceRouterParams, RouteAction } from "@refinedev/core";

const actions: RouteAction[] = ["clone", "create", "edit", "show"];

export const isAction = (param: string): boolean => {
    return actions.includes(param as RouteAction);
};

export const lastActionIndex = (params: string[]): number => {
    const reversedFirstIndex = params.slice().reverse().findIndex(isAction);

    if (reversedFirstIndex === -1) {
        return -1;
    }

    return params.length - reversedFirstIndex - 1;
};

export const composeParams = (params: string[]): ResourceRouterParams => {
    const actionIndex = lastActionIndex(params);

    if (actionIndex !== -1 && actionIndex !== 0) {
        const resource = params.slice(0, actionIndex).join("/");
        const action = params[actionIndex];
        const id = params[actionIndex + 1];

        return {
            resource,
            action: action as RouteAction,
            id,
        };
    }

    const resource = params.join("/");

    return {
        resource,
        action: undefined,
    };
};

export const handleRefineParams = (
    refineParams?: string | string[],
): ResourceRouterParams | Record<string, string> =>
    Array.isArray(refineParams) ? composeParams(refineParams) : {};
