import { useRouterType } from "@contexts/router/picker";
import { pickResource } from "@definitions/helpers/pick-resource";
import { getActionRoutesFromResource } from "@definitions/helpers/router";
import { composeRoute } from "@definitions/helpers/router/compose-route";
import { useResource, useRouterContext } from "@hooks";
import { useBack } from "@hooks/router/use-back";
import { useGo } from "@hooks/router/use-go";
import { useParsed } from "@hooks/router/use-parsed";

import { BaseKey, MetaDataQuery } from "../../contexts/data/types";
import { IResourceItem } from "../../contexts/resource/types";

export type HistoryType = "push" | "replace";

/**
 * `refine` uses {@link https://reactrouter.com/en/hooks/use-navigate `React Router`} and comes with all redirects out of the box.
 * It allows you to manage your routing operations in refine.
 * Using this hook, you can manage all the routing operations of your application very easily.
 *
 * @internal This is an internal hook of refine. Do not use it directly.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation} for more details.
 */
export const useNavigation = () => {
  const { resources } = useResource();
  const routerType = useRouterType();
  const { useHistory } = useRouterContext();
  const history = useHistory();
  const parsed = useParsed();
  const go = useGo();
  const back = useBack();

  const handleUrl = (url: string, type: HistoryType = "push") => {
    if (routerType === "legacy") {
      history[type](url);
    } else {
      go({ to: url, type });
    }
  };

  const createUrl = (
    resource: string | IResourceItem,
    meta: MetaDataQuery = {},
  ) => {
    if (routerType === "legacy") {
      const resourceItem =
        typeof resource === "string"
          ? pickResource(resource, resources, true) ?? {
              name: resource,
              route: resource,
            }
          : resource;

      const createActionRoute = getActionRoutesFromResource(
        resourceItem,
        resources,
        true,
      ).find((r) => r.action === "create");

      if (!createActionRoute) {
        return "";
      }

      return composeRoute(
        createActionRoute.route,
        resourceItem?.meta,
        parsed,
        meta,
      );
    }
    const resourceItem =
      typeof resource === "string"
        ? pickResource(resource, resources) ?? { name: resource }
        : resource;

    const createActionRoute = getActionRoutesFromResource(
      resourceItem,
      resources,
    ).find((r) => r.action === "create")?.route;

    if (!createActionRoute) {
      return "";
    }

    return go({
      to: composeRoute(createActionRoute, resourceItem?.meta, parsed, meta),
      type: "path",
    }) as string;
  };

  const editUrl = (
    resource: string | IResourceItem,
    id: BaseKey,
    meta: MetaDataQuery = {},
  ) => {
    const encodedId = encodeURIComponent(id);
    if (routerType === "legacy") {
      const resourceItem =
        typeof resource === "string"
          ? pickResource(resource, resources, true) ?? {
              name: resource,
              route: resource,
            }
          : resource;

      const editActionRoute = getActionRoutesFromResource(
        resourceItem,
        resources,
        true,
      ).find((r) => r.action === "edit");

      if (!editActionRoute) {
        return "";
      }

      return composeRoute(editActionRoute.route, resourceItem?.meta, parsed, {
        ...meta,
        id: encodedId,
      });
    }
    const resourceItem =
      typeof resource === "string"
        ? pickResource(resource, resources) ?? { name: resource }
        : resource;

    const editActionRoute = getActionRoutesFromResource(
      resourceItem,
      resources,
    ).find((r) => r.action === "edit")?.route;

    if (!editActionRoute) {
      return "";
    }

    return go({
      to: composeRoute(editActionRoute, resourceItem?.meta, parsed, {
        ...meta,
        id: encodedId,
      }),
      type: "path",
    }) as string;
  };

  const cloneUrl = (
    resource: string | IResourceItem,
    id: BaseKey,
    meta: MetaDataQuery = {},
  ) => {
    const encodedId = encodeURIComponent(id);

    if (routerType === "legacy") {
      const resourceItem =
        typeof resource === "string"
          ? pickResource(resource, resources, true) ?? {
              name: resource,
              route: resource,
            }
          : resource;

      const cloneActionRoute = getActionRoutesFromResource(
        resourceItem,
        resources,
        true,
      ).find((r) => r.action === "clone");

      if (!cloneActionRoute) {
        return "";
      }

      return composeRoute(cloneActionRoute.route, resourceItem?.meta, parsed, {
        ...meta,
        id: encodedId,
      });
    }
    const resourceItem =
      typeof resource === "string"
        ? pickResource(resource, resources) ?? { name: resource }
        : resource;

    const cloneActionRoute = getActionRoutesFromResource(
      resourceItem,
      resources,
    ).find((r) => r.action === "clone")?.route;

    if (!cloneActionRoute) {
      return "";
    }

    return go({
      to: composeRoute(cloneActionRoute, resourceItem?.meta, parsed, {
        ...meta,
        id: encodedId,
      }),
      type: "path",
    }) as string;
  };

  const showUrl = (
    resource: string | IResourceItem,
    id: BaseKey,
    meta: MetaDataQuery = {},
  ) => {
    const encodedId = encodeURIComponent(id);
    if (routerType === "legacy") {
      const resourceItem =
        typeof resource === "string"
          ? pickResource(resource, resources, true) ?? {
              name: resource,
              route: resource,
            }
          : resource;

      const showActionRoute = getActionRoutesFromResource(
        resourceItem,
        resources,
        true,
      ).find((r) => r.action === "show");

      if (!showActionRoute) {
        return "";
      }

      return composeRoute(showActionRoute.route, resourceItem?.meta, parsed, {
        ...meta,
        id: encodedId,
      });
    }
    const resourceItem =
      typeof resource === "string"
        ? pickResource(resource, resources) ?? { name: resource }
        : resource;

    const showActionRoute = getActionRoutesFromResource(
      resourceItem,
      resources,
    ).find((r) => r.action === "show")?.route;

    if (!showActionRoute) {
      return "";
    }

    return go({
      to: composeRoute(showActionRoute, resourceItem?.meta, parsed, {
        ...meta,
        id: encodedId,
      }),
      type: "path",
    }) as string;
  };

  const listUrl = (
    resource: string | IResourceItem,
    meta: MetaDataQuery = {},
  ) => {
    if (routerType === "legacy") {
      const resourceItem =
        typeof resource === "string"
          ? pickResource(resource, resources, true) ?? {
              name: resource,
              route: resource,
            }
          : resource;

      const listActionRoute = getActionRoutesFromResource(
        resourceItem,
        resources,
        true,
      ).find((r) => r.action === "list");

      if (!listActionRoute) {
        return "";
      }

      return composeRoute(
        listActionRoute.route,
        resourceItem?.meta,
        parsed,
        meta,
      );
    }
    const resourceItem =
      typeof resource === "string"
        ? pickResource(resource, resources) ?? { name: resource }
        : resource;

    const listActionRoute = getActionRoutesFromResource(
      resourceItem,
      resources,
    ).find((r) => r.action === "list")?.route;

    if (!listActionRoute) {
      return "";
    }

    return go({
      to: composeRoute(listActionRoute, resourceItem?.meta, parsed, meta),
      type: "path",
    }) as string;
  };

  const create = (
    resource: string | IResourceItem,
    type: HistoryType = "push",
    meta: MetaDataQuery = {},
  ) => {
    handleUrl(createUrl(resource, meta), type);
  };

  const edit = (
    resource: string | IResourceItem,
    id: BaseKey,
    type: HistoryType = "push",
    meta: MetaDataQuery = {},
  ) => {
    handleUrl(editUrl(resource, id, meta), type);
  };

  const clone = (
    resource: string | IResourceItem,
    id: BaseKey,
    type: HistoryType = "push",
    meta: MetaDataQuery = {},
  ) => {
    handleUrl(cloneUrl(resource, id, meta), type);
  };

  const show = (
    resource: string | IResourceItem,
    id: BaseKey,
    type: HistoryType = "push",
    meta: MetaDataQuery = {},
  ) => {
    handleUrl(showUrl(resource, id, meta), type);
  };

  const list = (
    resource: string | IResourceItem,
    type: HistoryType = "push",
    meta: MetaDataQuery = {},
  ) => {
    handleUrl(listUrl(resource, meta), type);
  };

  /**
   * @deprecated Please use `useGo` hook instead.
   */
  const push = (path: string, ...rest: unknown[]) => {
    if (routerType === "legacy") {
      history.push(path, ...rest);
    } else {
      go({ to: path, type: "push" });
    }
  };

  /**
   * @deprecated Please use `useGo` hook instead.
   */
  const replace = (path: string, ...rest: unknown[]) => {
    if (routerType === "legacy") {
      history.replace(path, ...rest);
    } else {
      go({ to: path, type: "replace" });
    }
  };

  /**
   * @deprecated Please use `useBack` hook instead.
   */
  const goBack = () => {
    if (routerType === "legacy") {
      history.goBack();
    } else {
      back();
    }
  };

  return {
    create,
    createUrl,
    edit,
    editUrl,
    clone,
    cloneUrl,
    show,
    showUrl,
    list,
    listUrl,
    push,
    replace,
    goBack,
  };
};
