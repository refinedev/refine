export type Action = "create" | "edit" | "list" | "show" | "clone";

export type RouteAction = Exclude<Action, "list"> | undefined;

export type RedirectAction =
  | Extract<Action, "create" | "edit" | "list" | "show">
  | false;

/**
 * @deprecated use RedirectAction type instead
 */
export type RedirectionTypes = RedirectAction;

export type ActionWithPage = Extract<Action, "show" | "create" | "edit">;
