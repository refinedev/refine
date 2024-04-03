import { Action } from "../../../contexts/router/types";
import { removeLeadingTrailingSlashes } from "./remove-leading-trailing-slashes";

/**
 * This helper function returns the default path for a given action and resource.
 * It also applies the parentPrefix if provided.
 * This is used by the legacy router and the new router if the resource doesn't provide a custom path.
 */
export const getDefaultActionPath = (
  resourceName: string,
  action: Action,
  parentPrefix?: string,
): string => {
  const cleanParentPrefix = removeLeadingTrailingSlashes(parentPrefix || "");

  let path = `${cleanParentPrefix}${
    cleanParentPrefix ? "/" : ""
  }${resourceName}`;

  if (action === "list") {
    path = `${path}`;
  } else if (action === "create") {
    path = `${path}/create`;
  } else if (action === "edit") {
    path = `${path}/edit/:id`;
  } else if (action === "show") {
    path = `${path}/show/:id`;
  } else if (action === "clone") {
    path = `${path}/clone/:id`;
  }

  return `/${path.replace(/^\//, "")}`;
};
