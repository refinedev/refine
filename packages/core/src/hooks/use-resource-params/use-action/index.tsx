import { useParsed } from "../../router/use-parsed";
import { useRouterContext } from "../../legacy-router/useRouterContext";
import { Action } from "../../../contexts/router/types";
import { useRouterType } from "../../../contexts/router/picker";
import { ResourceRouterParams } from "../../../contexts/router/legacy/types";

/**
 * Returns the action from the router regardless of the router type.
 * In legacy routers, `useParsed` won't work and in the new router bindings, `useParams` won't work.
 * To make it easier to get the action from the router, this hook can be used.
 *
 * Additionally, if an action is provided as a parameter, it will be used instead of the inferred action.
 *
 * @internal usage only
 */
export const useAction = (action?: Action) => {
  const routerType = useRouterType();
  const { useParams } = useRouterContext();

  const parsed = useParsed();
  const legacyParams = useParams<Partial<ResourceRouterParams>>();

  const inferredAction =
    routerType === "legacy" ? legacyParams.action : parsed.action;

  return action ?? inferredAction;
};
