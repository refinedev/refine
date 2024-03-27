import { useParsed } from "../../router/use-parsed";
import { useRouterContext } from "../../legacy-router/useRouterContext";
import { BaseKey } from "../../../contexts/data/types";
import { useRouterType } from "../../../contexts/router/picker";
import { ResourceRouterParams } from "../../../contexts/router/legacy/types";

/**
 * Returns the id from the router regardless of the router type.
 * In legacy routers, `useParsed` won't work and in the new router bindings, `useParams` won't work.
 * To make it easier to get the id from the router, this hook can be used.
 *
 * Additionally, if an id is provided as a parameter, it will be used instead of the inferred id.
 *
 * @internal usage only
 */
export const useId = (id?: BaseKey) => {
  const routerType = useRouterType();
  const { useParams } = useRouterContext();

  const parsed = useParsed();
  const legacyParams = useParams<Partial<ResourceRouterParams>>();

  const inferredId = routerType === "legacy" ? legacyParams.id : parsed.id;

  return id ?? inferredId;
};
