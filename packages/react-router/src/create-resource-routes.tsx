import React from "react";
import type { Action, ResourceProps } from "@refinedev/core";

import { Route } from "react-router";

export const createResourcePathWithAction = (
  resource: ResourceProps,
  action: Action,
) => {
  const { name, list, create, show, edit } = resource;

  if (typeof list === "string" && action === "list") {
    return list;
  }
  if (typeof list === "object" && action === "list") {
    return list.path;
  }
  if (typeof create === "string" && action === "create") {
    return create;
  }
  if (typeof create === "object" && action === "create") {
    return create.path;
  }
  if (typeof show === "string" && action === "show") {
    return show;
  }
  if (typeof show === "object" && action === "show") {
    return show.path;
  }
  if (typeof edit === "string" && action === "edit") {
    return edit;
  }
  if (typeof edit === "object" && action === "edit") {
    return edit.path;
  }

  /**
   * Default path fallback
   */
  const nameSegment = `/${name}`;
  const actionSegment = `${
    ["edit", "create", "clone", "show"].includes(action) ? action : ""
  }`;
  const idSegment = `${
    ["edit", "show", "clone"].includes(action) ? ":id" : ""
  }`;

  return [nameSegment, actionSegment, idSegment].filter(Boolean).join("/");
};

export const createResourceRoutes = (resources: ResourceProps[]) => {
  const routes = resources.flatMap((resource) => {
    const actions: {
      action: Action;
      element: React.ComponentType<any>;
      path: string;
    }[] = [];

    (["list", "show", "edit", "create"] as const).forEach((action) => {
      const item = resource[action];
      if (typeof item !== "undefined" && typeof item !== "string") {
        const element = typeof item === "function" ? item : item.component;
        const path = createResourcePathWithAction(resource, action);

        actions.push({ action, element: element, path });
        if (action === "create") {
          actions.push({
            action: "clone",
            element: element,
            path,
          });
        }
      }
    });

    return actions.map(({ action, element: Component, path }) => {
      const element = <Component />;

      return <Route key={`${action}-${path}`} path={path} element={element} />;
    });
  });

  return routes;
};
