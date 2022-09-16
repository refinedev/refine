import { RouteAction } from "./actions";

export type ResourceRouterParams = {
    resource: string;
    id?: string;
    action: RouteAction;
};
