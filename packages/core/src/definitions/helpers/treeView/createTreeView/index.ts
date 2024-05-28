import { pickNotDeprecated } from "@definitions/helpers/pickNotDeprecated";

import type {
  IMenuItem,
  IResourceItem,
  ITreeMenu,
} from "../../../../contexts/resource/types";

/**
 * @deprecated This helper is deprecated. Please use `createTree` instead.
 */
export const createTreeView = (
  resources: IResourceItem[] | IMenuItem[],
): ITreeMenu[] | ITreeMenu[] => {
  const tree = [];
  const resourcesRouteObject: { [key: string]: any } = {};
  const resourcesNameObject: { [key: string]: any } = {};
  let parent: IResourceItem | IMenuItem;
  let child: ITreeMenu;

  for (let i = 0; i < resources.length; i++) {
    parent = resources[i];

    const route =
      parent.route ??
      pickNotDeprecated(parent?.meta, parent.options)?.route ??
      "";

    resourcesRouteObject[route] = parent;
    resourcesRouteObject[route]["children"] = [];

    resourcesNameObject[parent.name] = parent;
    resourcesNameObject[parent.name]["children"] = [];
  }

  for (const name in resourcesRouteObject) {
    if (Object.hasOwn(resourcesRouteObject, name)) {
      child = resourcesRouteObject[name];

      if (child.parentName && resourcesNameObject[child.parentName]) {
        resourcesNameObject[child.parentName]["children"].push(child);
      } else {
        tree.push(child);
      }
    }
  }

  return tree;
};
