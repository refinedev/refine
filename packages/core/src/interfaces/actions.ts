export type Action = "create" | "edit" | "list" | "show" | "clone";

export type RouteAction = Exclude<Action, "list"> | undefined;

export type RedirectAction =
    | Extract<Action, "list" | "show" | "edit" | "create">
    | false;

/**
 * @deprecated use RedirectAction type instead
 */
export type RedirectionTypes = RedirectAction;

export type FormAction = Extract<Action, "create" | "edit" | "clone">;

export type ActionWithPage = Extract<Action, "show" | "create" | "edit">;
