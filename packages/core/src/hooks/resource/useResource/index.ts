import { useContext } from "react";

import { ResourceContext } from "@contexts/resource";
import { useResourceWithRoute, useRouterContext } from "@hooks";

import type { BaseKey } from "../../../contexts/data/types";
import type { IResourceItem } from "../../../contexts/resource/types";
import type { ResourceRouterParams } from "../../../contexts/router/legacy/types";
import { useRouterType } from "../../../contexts/router/picker";
import type { Action } from "../../../contexts/router/types";
import { pickResource } from "../../../definitions/helpers/pick-resource";
import { useParsed } from "../../router/use-parsed";

export type UseResourceLegacyProps = {
  /**
   * Determines which resource to use for redirection
   * @deprecated resourceName deprecated. Use resourceNameOrRouteName instead # https://github.com/refinedev/refine/issues/1618
   */
  resourceName?: string;
  /**
   * Determines which resource to use for redirection
   * @default Resource name that it reads from route
   */
  resourceNameOrRouteName?: string;
  /**
   * Adds id to the end of the URL
   * @deprecated resourceName deprecated. Use resourceNameOrRouteName instead # https://github.com/refinedev/refine/issues/1618
   */
  recordItemId?: BaseKey;
};

/**
 * Matches the resource by identifier.
 * If not provided, the resource from the route will be returned.
 * If your resource does not explicitly define an identifier, the resource name will be used.
 */
export type UseResourceParam = string | undefined;

type SelectReturnType<T extends boolean> = T extends true
  ? { resource: IResourceItem; identifier: string }
  : { resource: IResourceItem; identifier: string } | undefined;

export type UseResourceReturnType = {
  resources: IResourceItem[];
  resource?: IResourceItem;
  /**
   * @deprecated Use `resource.name` instead when you need to get the resource name.
   */
  resourceName?: string;
  /**
   * @deprecated This value may not always reflect the correct "id" value. Use `useResourceParams` to obtain the calculated "id"` or `useParsed` to obtain the id from the route instead.
   */
  id?: BaseKey;
  /**
   * @deprecated This value may not always reflect the correct "action" value. Use `useResourceParams` to obtain the calculated "action" or `useParsed` to obtain the action from the route instead.
   */
  action?: Action;
  select: <T extends boolean = true>(
    resourceName: string,
    force?: T,
  ) => SelectReturnType<T>;
  identifier?: string;
};

type UseResourceReturnTypeWithResource = UseResourceReturnType & {
  resource: IResourceItem;
  identifier: string;
};

/**
 * @deprecated Use `useResource` with `identifier` property instead. (`identifier` does not check by route name in new router)
 */
export function useResource(
  props: UseResourceLegacyProps,
): UseResourceReturnType;
export function useResource(): UseResourceReturnType;
export function useResource<TIdentifier = UseResourceParam>(
  identifier: TIdentifier,
): TIdentifier extends NonNullable<UseResourceParam>
  ? UseResourceReturnTypeWithResource
  : UseResourceReturnType;
/**
 * `useResource` is used to get `resources` that are defined as property of the `<Refine>` component.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/resource/useResource} for more details.
 */
export function useResource(
  args?: UseResourceLegacyProps | UseResourceParam,
): UseResourceReturnType {
  const { resources } = useContext(ResourceContext);

  const routerType = useRouterType();

  const params = useParsed();

  const oldProps = {
    resourceName: args && typeof args !== "string" ? args.resourceName : args,
    resourceNameOrRouteName:
      args && typeof args !== "string" ? args.resourceNameOrRouteName : args,
    recordItemId:
      args && typeof args !== "string" ? args.recordItemId : undefined,
  };

  const select = <T extends boolean = true>(
    resourceName: string,
    force = true,
  ): SelectReturnType<T> => {
    const isLegacy = routerType === "legacy";
    const pickedResource = pickResource(resourceName, resources, isLegacy);

    if (pickedResource) {
      return {
        resource: pickedResource,
        identifier: pickedResource.identifier ?? pickedResource.name,
      } as SelectReturnType<T>;
    }

    if (force) {
      const resource: IResourceItem = {
        name: resourceName,
        identifier: resourceName,
      };

      const identifier = resource.identifier ?? resource.name;

      return {
        resource,
        identifier,
      } as SelectReturnType<T>;
    }

    return undefined as SelectReturnType<T>;
  };

  /**
   * Legacy Router - Start
   *
   * using `useParams` and `route` to match resource and get params.
   */
  const resourceWithRoute = useResourceWithRoute();

  const { useParams } = useRouterContext();

  const legacyParams = useParams<Partial<ResourceRouterParams>>();

  if (routerType === "legacy") {
    const resourceKeyToCheck = oldProps.resourceNameOrRouteName
      ? oldProps.resourceNameOrRouteName
      : legacyParams.resource;

    const legacyResource = resourceKeyToCheck
      ? resourceWithRoute(resourceKeyToCheck)
      : undefined;
    const legacyId = oldProps?.recordItemId ?? legacyParams.id;
    const legacyAction = legacyParams.action;
    const legacyResourceName = oldProps?.resourceName ?? legacyResource?.name;
    const legacyIdentifier = legacyResource?.identifier ?? legacyResource?.name;

    return {
      resources,
      resource: legacyResource,
      resourceName: legacyResourceName,
      id: legacyId,
      action: legacyAction,
      select,
      identifier: legacyIdentifier,
    };
  }
  /** Legacy Router - End */

  /** New Router */
  let resource: IResourceItem | undefined = undefined;
  // we try to pick the resource from props first
  const identifier =
    typeof args === "string" ? args : oldProps?.resourceNameOrRouteName;
  if (identifier) {
    const pickedFromProps = pickResource(identifier, resources);
    if (pickedFromProps) {
      resource = pickedFromProps;
    } else {
      resource = {
        name: identifier as string,
      };
    }
  } else if (params?.resource) {
    resource = params.resource;
  }

  return {
    resources,
    resource,
    resourceName: resource?.name,
    id: params.id,
    action: params.action,
    select,
    identifier: resource?.identifier ?? resource?.name,
  };
}
